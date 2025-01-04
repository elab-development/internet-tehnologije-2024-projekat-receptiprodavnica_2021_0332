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

        return response()->json($korpa, 200);
    }

    // 2. Dodavanje stavke u korpu
    // public function dodajStavku(Request $request)
    // {
    //     $validated = $request->validate([
    //         'idProizvoda' => 'required|exists:proizvodi,id',
    //         'kolicina' => 'required|integer|min:1',
    //     ]);

    //     $korpa = Korpa::firstOrCreate(['idKorisnika' => auth()->id()]);

    //     $stavka = StavkaKorpe::updateOrCreate(
    //         ['idKorpe' => $korpa->idKorpe, 'idProizvoda' => $validated['idProizvoda']],
    //         ['kolicina' => $validated['kolicina']]
    //     );

    //     return response()->json(['message' => 'Proizvod je dodat u korpu!', 'stavka' => $stavka], 201);
    // }

    public function dodajAzurirajStavku(Request $request, $idKorpe, $idProizvoda)
    {
        // Validacija količine
        $validated = $request->validate([
            'kolicina' => 'required|integer|min:1',
        ]);
        
        // Pronalaženje ili kreiranje stavke u korpi
        $stavka = KorpaStavka::updateOrCreate(
            ['idKorpe' => $idKorpe, 'idProizvoda' => $idProizvoda],
            ['kolicina' => $request->input('kolicina')]
        );
        
        // Vraćanje odgovora
        return response()->json(['message' => 'Korpa je uspešno ažurirana!'], 200);
    }


    public function generateCart($idRecepta, Request $request)
    {
        // Pronađi recept na osnovu ID-a
        $recept = Recept::with(['receptProizvod'])->find($idRecepta);

        if (!$recept) {
            return response()->json(['error' => 'Recept nije pronađen.'], 404);
        }

        // Kreiraj listu potrebnih sastojaka za recept
        $sastojci = $recept->receptProizvod->map(function ($proizvod) {
            return [
                'idProizvoda' => $proizvod->idProizvoda,
                'naziv' => $proizvod->naziv,
                'potrebnaKolicina' => $proizvod->pivot->potrebnaKolicina,
                'mernaJedinica' => $proizvod->mernaJedinica,
            ];
        });

        if ($sastojci->isEmpty()) {
            return response()->json(['error' => 'Nema sastojaka za generisanje korpe.'], 404);
        }

        // Prikaz liste korisniku sa opcijom potvrde
        return response()->json([
            'message' => 'Lista sastojaka generisana.',
            'sastojci' => $sastojci,
        ], 200);
    }
}
