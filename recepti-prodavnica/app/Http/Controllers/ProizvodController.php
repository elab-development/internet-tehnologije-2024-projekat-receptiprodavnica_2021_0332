<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Proizvod;
use Illuminate\Support\Facades\Validator;

class ProizvodController extends Controller
{
    public function store(Request $request)
    {
        // Validacija podataka
        $validated = $request->validate([
            'naziv' => 'required|string|max:255',
            'cena' => 'required|numeric|min:0',
            'mernaJedinica'=> 'required|string|max:255',
            'kategorija' => 'required|string|max:255',
        ]);

        try {
            // Kreiranje proizvoda
            $proizvod = Proizvod::create([
                'naziv' => $validated['naziv'],
                'cena' => $validated['cena'],
                'mernaJedinica' =>$validated['mernaJedinica'],
                'kategorija' =>$validated['kategorija'],
                'slika' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            return response()->json([
                'message' => 'Uspešno kreiran proizvod!',
                'proizvod' => $proizvod,
            ], 201);
        } 
        catch (\Exception $e) {
            return response()->json([
                'message' => 'Neuspešno kreiranje proizvoda.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $idProizvoda)
    {
        // Validacija podataka
        $validated = $request->validate([
            'naziv' => 'nullable|string|max:255',
            'cena' => 'nullable|numeric|min:0',
            'mernaJedinica'=> 'nullable|string|max:255',
            'kategorija' => 'nullable|string|max:255',
            'slika' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        try {
            // Pronaći proizvod po idProizvoda
            $proizvod = Proizvod::findOrFail($idProizvoda);
            // Ažurirati samo prisutne atribute
            $proizvod->fill($validated);
            // Sačuvati promene
            $proizvod->save();

            // Uspešan odgovor
            return response()->json([
                'message' => 'Uspešno izmenjen proizvod!',
                'proizvod' => $proizvod,
            ], 200);
        } 
        catch (\Exception $e) {
            // Greška u slučaju neuspeha
            return response()->json([
                'message' => 'Neuspešna izmena proizvoda.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($idProizvoda)
    {
        try {
            // Pronađi proizvod po ID-u
            $proizvod = Proizvod::findOrFail($idProizvoda);
            // Obrisi proizvod
            $proizvod->delete();

        return response()->json([
            'message' => 'Uspešno obrisan proizvod!',
        ], 200);
        } 
        catch (\Exception $e) {
            return response()->json([
            'message' => 'Greška prilikom brisanja proizvoda!',
            'error' => $e->getMessage(),
        ], 500);
    }
}

public function search(Request $request)
{
    // Validacija unosa
    $validated = $request->validate([
        'naziv' => 'nullable|string|max:255',
        'kategorija' => 'nullable|string|max:255',
        'cena' => 'nullable|numeric|min:0',
        'per_page' => 'nullable|integer|min:1', // Dodata opcija za broj rezultata po stranici
    ]);

    try {
        // Početno pretraga bazirana na opcijama iz request-a
        $query = Proizvod::query();

        if ($request->has('naziv')) {
            $query->where('naziv', 'like', '%' . $validated['naziv'] . '%');
        }

        if ($request->has('kategorija')) {
            $query->where('kategorija', 'like', '%' . $validated['kategorija'] . '%');
        }
        // Ako je uneta cena, filtriraj prema ceni
        if ($request->has('cena')) {
        $query->where('cena', '=', $request->cena);
        }

        $query->select('idProizvoda', 'naziv', 'cena', 'mernaJedinica', 'kategorija', 'slika');

        $perPage = $validated['per_page'] ?? 10;
        $proizvodi = $query->paginate($perPage);


        if ($proizvodi->isEmpty()) {
            return response()->json([
                'message' => 'Nema rezultata pretrage!',
            ], 404);
        }
        
        $proizvodi->getCollection()->transform(function ($proizvod) {
            $proizvod->slika = asset('storage/' . $proizvod->slika); // Pretvaranje putanje u pun URL
            return $proizvod;
        });


        return response()->json([
            'proizvodi' => $proizvodi,
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Greška prilikom pretrage proizvoda!',
            'error' => $e->getMessage(),
        ], 500);
    }
}
}
