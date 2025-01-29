<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recept;
use App\Models\ReceptProizvod;
use App\Models\Proizvod;
use Illuminate\Support\Facades\Validator;

class ReceptController extends Controller
{
    public function index()
{
    try {
        $recepti = Recept::with('receptProizvod')->get();
        return response()->json($recepti, 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Greška prilikom preuzimanja recepata.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


    public function show($idRecepta)
{
    try {
        $recept = Recept::with('receptProizvod')->findOrFail($idRecepta);

        return response()->json($recept, 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Recept nije pronađen.',
            'error' => $e->getMessage(),
        ], 404);
    }
}
    public function store(Request $request)
{
    // Validacija podataka
    $validated = $request->validate([
        'naziv' => 'required|string|max:255',
        'uputstvo' => 'required|string',
        'vremePripreme' => 'required|integer|min:1',
        'brojPorcija' => 'required|integer|min:1',
    ]);

    try {
        // Kreiranje recepta
        $recept = Recept::create([
            'naziv' => $validated['naziv'],
            'uputstvo' => $validated['uputstvo'],
            'vremePripreme' =>$validated['vremePripreme'],
            'brojPorcija' =>$validated['brojPorcija'],
        ]);

        return response()->json([
            'message' => 'Uspešno kreiran recept!',
            'recept' => $recept,
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Neuspešno kreiranje recepta.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

public function update(Request $request, $idRecepta)
{
    // Validacija podataka
    $validated = $request->validate([
        'naziv' => 'required|string|max:255',
        'uputstvo' => 'required|string',
        'vremePripreme' => 'required|integer|min:1',
        'brojPorcija' => 'required|integer|min:1',
    ]);

    try {
        // Pronalaženje recepta
        $recept = Recept::findOrFail($idRecepta);

        // Ažuriranje podataka
        $recept->update([
            'naziv' => $validated['naziv'],
            'uputstvo' => $validated['uputstvo'],
            'vremePripreme' =>$validated['vremePripreme'],
            'brojPorcija' =>$validated['brojPorcija'],
        ]);

        return response()->json([
            'message' => 'Uspešno izmenjen recept!',
            'recept' => $recept,
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Neuspešno ažuriranje recepta.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

public function destroy($idRecepta)
{
    try {
        // Pronalaženje recepta
        $recept = Recept::findOrFail($idRecepta);

        // Brisanje recepta
        $recept->delete();

        return response()->json([
            'message' => 'Uspešno obrisan recept!',
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Neuspešno brisanje recepta.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

public function searchByIngredients(Request $request)
{
    // $sastojci = $request->input('sastojci'); // Očekuje niz stringova sa imenima sastojaka

    // if (empty($sastojci) || !is_array($sastojci)) {
    //     return response()->json(['error' => 'Unesite validan niz sastojaka.'], 400);
    // }

    // // Pretraživanje recepata koji odgovaraju unetim sastojcima
    // $recepti = Recept::whereHas('receptProizvod', function ($query) use ($sastojci) {
    //     $query->whereIn('naziv', $sastojci);
    // })->with(['receptProizvod' => function ($query) {
    //     $query->select('naziv', 'mernaJedinica');
    // }])->get();

    // if ($recepti->isEmpty()) {
    //     return response()->json(['message' => 'Nema odgovarajućih recepata za unete sastojke!'], 404);
    // }

    // return response()->json($recepti, 200);
    // Validacija ulaznih podataka
    $validated = $request->validate([
        'sastojci' => 'nullable|array', // Očekuje niz sastojaka
        'sastojci.*' => 'string|max:255', // Svaki sastojak je string
        'vremePripreme' => 'nullable|integer|min:1', // Filtriranje po vremenu pripreme
        'brojPorcija' => 'nullable|integer|min:1', // Filtriranje po broju porcija
        'page' => 'nullable|integer|min:1', // Paginacija (broj stranice)
    ]);

    $sastojci = $validated['sastojci'] ?? [];

    try {
        // Kreiranje osnovnog query-a za recepte
        $query = Recept::query();

        // Filtriranje po sastojcima
        if (!empty($sastojci)) {
            $query->whereHas('receptProizvod', function ($subQuery) use ($sastojci) {
                $subQuery->whereIn('naziv', $sastojci);
            });
        }

        // Filtriranje po vremenu pripreme
        if (!empty($validated['vremePripreme'])) {
            $query->where('vremePripreme', '<=', $validated['vremePripreme']);
        }

        // Filtriranje po broju porcija
        if (!empty($validated['brojPorcija'])) {
            $query->where('brojPorcija', '>=', $validated['brojPorcija']);
        }

        // Paginacija
        $recepti = $query->with(['receptProizvod' => function ($subQuery) {
            $subQuery->select('naziv', 'mernaJedinica');
        }])->paginate(10); // 10 rezultata po stranici

        // Provera da li ima rezultata
        if ($recepti->isEmpty()) {
            return response()->json(['message' => 'Nema odgovarajućih recepata za unete kriterijume!'], 404);
        }

        return response()->json($recepti, 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Greška prilikom pretrage recepata.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


}
