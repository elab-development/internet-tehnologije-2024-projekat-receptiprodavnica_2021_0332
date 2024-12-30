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
            //'image' => 'required|string|max:255', // Za URL slike, koristite validaciju 'url' umesto 'string'
            'kategorija' => 'required|string|max:255',
        ]);

       
        try {
            // Kreiranje proizvoda
            $proizvod = Proizvod::create([
                'naziv' => $validated['naziv'],
                'cena' => $validated['cena'],
                'mernaJedinica' =>$validated['mernaJedinica'],
                'kategorija' =>$validated['kategorija'],
            ]);

            return response()->json([
                'message' => 'Uspešno kreiran proizvod!',
                'proizvod' => $proizvod,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Neuspešno kreiranje proizvoda.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
