<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kupovina;
use App\Models\StavkaKupovine;
use App\Models\Korpa;
use App\Models\KorpaStavka;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;



class KupovinaController extends Controller
{
    public function potvrdiKupovinu(Request $request)
    {
        $korpa = Korpa::where('idKorisnika', auth()->id())->first();
        
        if (!$korpa || $korpa->korpaStavka->isEmpty()) {
            return response()->json(['message' => 'Korpa je prazna ili nije pronađena.'], 400);
        }

        // Validacija podataka za dostavu
        $validated = $request->validate([
            'imeKupca' => 'required|string',
            'prezimeKupca' => 'required|string',
            'email' => 'required|email',
            'adresaIsporuke' => 'required|string',
        ]);

        // Početak transakcije
        DB::beginTransaction();

        try {
            // Kreiranje nove kupovine
            $kupovina = Kupovina::create([
                'imeKupca' => $validated['imeKupca'],
                'prezimeKupca' => $validated['prezimeKupca'],
                'email' => $validated['email'],
                'adresaIsporuke' => $validated['adresaIsporuke'],
                'datumKupovine' => now(),
                'ukupnaCena' => $korpa->ukupnaCena,
            ]);

            // Dodavanje stavki u kupovinu
            foreach ($korpa->korpaStavka as $stavka) {
                StavkaKupovine::create([
                    'idKupovine' => $kupovina->idKupovine,
                    'idProizvoda' => $stavka->idProizvoda,
                    'kolicina' => $stavka->kolicina,
                    'cena' => $stavka->cena,
                ]);
            }

            // Brisanje stavki iz korpe nakon uspešne kupovine
            KorpaStavka::where('idKorpe', $korpa->idKorpe)->delete();

            // Ažuriranje statusa korpe
            $korpa->update(['ukupnaCena' => 0]);

            // Potvrda transakcije
            DB::commit();

            return response()->json([
                'message' => 'Vaša kupovina je uspešno izvršena!',
                'kupovina' => $kupovina
            ], 200);
        } catch (\Exception $e) {
            // Rollback u slučaju greške
            DB::rollBack();
            return response()->json(['message' => 'Greška prilikom plaćanja, pokušajte ponovo!'], 500);
        }
    }
}
