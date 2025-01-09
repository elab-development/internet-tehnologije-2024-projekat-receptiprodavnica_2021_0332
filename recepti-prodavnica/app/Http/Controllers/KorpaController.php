<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recept;
use App\Models\Korpa;
use App\Models\Proizvod;
use App\Models\KorpaStavka;

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

    

    public function dodajAzurirajStavku(Request $request, $idProizvoda)
{
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
            $stavke[] = $stavka;
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
}
