<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Recept;
use App\Models\Korpa;
use App\Models\Proizvod;
use App\Models\KorpaStavka;
use App\Models\ReceptProizvod;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Normalizer;

class KorpaController extends Controller
{
    public function pregledKorpe()
    {
        $korpa = Korpa::with('korpaStavka.proizvod')->where('idKorisnika', auth()->id())->first();

        if (!$korpa) {
            return response()->json(['message' => 'Korpa je prazna!'], 404);
        }

        return response()->json([
            'korpa' => $korpa,
            'stavke' => $korpa->korpaStavka,
        ], 200);
    }

    public function obrisiStavkuIzKorpe($idProizvoda)
{
    if (!auth()->check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    $korpa = Korpa::where('idKorisnika', auth()->id())->first();

    if (!$korpa) {
        return response()->json(['message' => 'Korpa ne postoji.'], 404);
    }

    // Pronalazimo stavku u korpi
    $stavka = KorpaStavka::where('idKorpe', $korpa->idKorpe)
                          ->where('idProizvoda', $idProizvoda)
                          ->first();

    if (!$stavka) {
        return response()->json(['message' => 'Stavka nije pronađena u korpi.'], 404);
    }

    // Brišemo stavku iz baze
    $stavka->delete();

    // Ažuriranje ukupne cene korpe
    $ukupnaCena = KorpaStavka::where('idKorpe', $korpa->idKorpe)->sum('cena');
    $korpa->update(['ukupnaCena' => $ukupnaCena]);

    return response()->json(['message' => 'Proizvod je uklonjen iz korpe.'], 200);
}


    public function dodajAzurirajStavku(Request $request, $idProizvoda)
{
    if (!auth()->check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }
    
    $validated = $request->validate([
        'kolicina' => 'required|integer|min:1',
    ]);

    // Pronalaženje ili kreiranje korpe za korisnika
    $korpa = Korpa::firstOrCreate(
        ['idKorisnika' => auth()->id()],
        ['datumKreiranja' => now(), 'ukupnaCena' => 0]
    );

    $proizvod = Proizvod::find($idProizvoda);

    if (!$proizvod) {
        return response()->json(['message' => 'Proizvod nije pronađen!'], 404);
    }

    // Dodavanje ili ažuriranje stavke
    $stavka = KorpaStavka::updateOrCreate(
        ['idKorpe' => $korpa->idKorpe, 'idProizvoda' => $idProizvoda],
        [
            'kolicina' => $validated['kolicina'],
            'cena' => $proizvod->cena * $validated['kolicina'],
        ]
    );

    // Ažuriranje ukupne cene korpe
    $ukupnaCena = KorpaStavka::where('idKorpe', $korpa->idKorpe)->sum('cena');
    $korpa->update(['ukupnaCena' => $ukupnaCena]);

    return response()->json(['message' => 'Korpa je uspešno ažurirana!', 'stavka' => $stavka], 200);
}
    // Generisanje korpe prema receptu
    public function generateCart($idRecepta, Request $request)
    {
        $recept = Recept::with('receptProizvod')->find($idRecepta);

        if (!$recept) {
            return response()->json(['error' => 'Recept nije pronađen.'], 404);
        }

        // Dohvatanje trenutne korpe korisnika
        $korpa = Korpa::firstOrCreate([
            'idKorisnika' => auth()->id(),
        ], [
            'datumKreiranja' => now(),
            'ukupnaCena' => 0,
        ]);

        // Kreiranje ili ažuriranje stavki u korpi na osnovu recepta
        $stavke = [];
        foreach ($recept->receptProizvod as $proizvod) {
            $stavka = KorpaStavka::updateOrCreate(
                ['idKorpe' => $korpa->idKorpe, 'idProizvoda' => $proizvod->idProizvoda],
                [
                    'kolicina' => $proizvod->pivot->potrebnaKolicina,
                    'cena' => $proizvod->cena * $proizvod->pivot->potrebnaKolicina,
                ]
            );
            $stavke[] = [
                //'idKorpaStavka' => $stavka->idKorpaStavka,
                //'idProizvoda' => $proizvod->idProizvoda,
                'naziv' => $proizvod->naziv,
                'kolicina' => $stavka->kolicina,
                'cena' => $stavka->cena,
            ];
        }

        // Ažuriranje ukupne cene korpe
        $ukupnaCena = KorpaStavka::where('idKorpe', $korpa->idKorpe)->sum('cena');
        $korpa->update(['ukupnaCena' => $ukupnaCena]);

        return response()->json([
            'message' => 'Korpa je generisana na osnovu recepta.',
            'korpa' => $korpa,
            'stavke' => $stavke,
        ], 200);
    }

    public function dodajNedostajuceSastojke(Request $request)
    {
    // Provera da li je korisnik prijavljen
    if (!auth()->check()) {
        return response()->json(['error' => 'Korisnik nije prijavljen'], 401);
    }

    // Preuzmi recept
    $recept = Recept::findOrFail($request->idRecepta);
   
    // Preuzmi sve proizvode povezane sa receptom
    $receptProizvodi = $recept->receptProizvod;

    // Proveri da li je lista proizvoda prazna
    if ($receptProizvodi->isEmpty()) {
        return response()->json(['error' => 'Recept nema proizvode'], 400);
    }

    Log::info('Proizvodi iz recepta:', $receptProizvodi->toArray());

    // Sastojci koje korisnik već ima (normalizovani)
    $korisnickiSastojci = array_map(function ($sastojak) {
        return $this->normalizeString($sastojak);
    }, $request->input('sastojci', []));

    // Filtriraj sastojke koje korisnik nema (takođe normalizovani)
    $nedostajuciSastojci = $receptProizvodi->filter(function ($proizvod) use ($korisnickiSastojci) {
        return !in_array($this->normalizeString($proizvod->naziv), $korisnickiSastojci);
    });

    // Proveri da li postoje nedostajući sastojci
    if ($nedostajuciSastojci->isEmpty()) {
        return response()->json(['message' => 'Korisnik već ima sve sastojke'], 200);
    }

    Log::info('Nedostajući sastojci:', $nedostajuciSastojci->toArray());

    // Kreiraj ili pronađi postojeću korpu
    $korpa = Korpa::firstOrCreate(
        ['idKorisnika' => auth()->id()],
        ['datumKreiranja' => now(), 'ukupnaCena' => 0]
    );

    if (!$korpa->idKorpe) {
        return response()->json(['error' => 'Greška prilikom kreiranja korpe'], 500);
    }

    // Ažuriraj ukupnu cenu pre dodavanja stavki
    $ukupnaCena = $korpa->ukupnaCena;

    $noviSastojci = [];

    // Dodaj nedostajuće sastojke u korpu
    foreach ($nedostajuciSastojci as $sastojak) {
        $potrebnaKolicina = 1;
        $cena = $sastojak->cena ?? 0;
    
        // Provera da li proizvod već postoji u korpi
        $existingItem = KorpaStavka::where('idKorpe', $korpa->idKorpe)
                                    ->where('idProizvoda', $sastojak->idProizvoda)
                                    ->first();
    
        if ($existingItem) {
            // Ako je proizvod već u korpi, povećaj količinu
            $existingItem->kolicina += 1;
            $existingItem->save();
        } else {
            // Ako nije, dodaj novi proizvod u korpu
            KorpaStavka::create([
                'idKorpe' => $korpa->idKorpe,
                'idProizvoda' => $sastojak->idProizvoda,
                'kolicina' => $potrebnaKolicina,
                'cena' => $cena
            ]);
        }
    
        // Dodaj sastojak u listu novih sastojaka
        $noviSastojci[] = [
            'idProizvoda' => $sastojak->idProizvoda,
            'naziv' => $sastojak->naziv,
            'kolicina' => $potrebnaKolicina,
            'cena' => $cena
        ];
    
        $ukupnaCena += $potrebnaKolicina * $cena;
    }
    
    // Ažuriraj ukupnu cenu u korpi
    $korpa->ukupnaCena = $ukupnaCena;
    $korpa->save();

    return response()->json([
        'message' => 'Nedostajući sastojci su dodati u korpu!',
        'noviSastojci' => $noviSastojci
    ]);
}
/**
 * Normalizuje string: uklanja razliku između velikih/malih slova i latiničnih/slovnih varijacija (šđčćž -> sdcxz).
 */
private function normalizeString($string)
{
    $string = mb_strtolower($string); // Ignoriše velika/mala slova
    $string = Normalizer::normalize($string, Normalizer::FORM_D); // Konvertuje specijalna slova
    $string = preg_replace('/\pM/u', '', $string); // Uklanja diakritičke znakove (ć -> c, š -> s)
    return $string;
}
}