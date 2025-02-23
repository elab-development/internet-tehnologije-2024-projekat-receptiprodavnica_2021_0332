<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProizvodController;
use App\Http\Controllers\ReceptController;
use App\Http\Controllers\KorpaController;
use App\Http\Controllers\KupovinaController;
use App\Http\Controllers\API\AuthController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Rute za Admina
Route::middleware(['auth:sanctum', 'App\Http\Middleware\CheckUserType:admin'])->group(function () {
    // CRUD operacije za proizvode
    Route::post('/proizvodi', [ProizvodController::class, 'store']);
    Route::put('/proizvodi/{idProizvoda}', [ProizvodController::class, 'update']);
    Route::delete('/proizvodi/{idProizvoda}', [ProizvodController::class, 'destroy']);

    // CRUD operacije za recepte
    Route::post('/recepti', [ReceptController::class, 'store']);
    Route::put('/recepti/{idRecepta}', [ReceptController::class, 'update']);
    Route::delete('/recepti/{idRecepta}', [ReceptController::class, 'destroy']);
});

// Rute za registrovanog korisnika
Route::middleware(['auth:sanctum', 'App\Http\Middleware\CheckUserType:registrovani'])->group(function () {
    // Ruta za pregled korpe
    Route::get('/korpa', [KorpaController::class, 'pregledKorpe']);
    
    // Ruta za dodavanje ili ažuriranje stavke u korpi
    Route::post('/korpa/{idProizvoda}', [KorpaController::class, 'dodajAzurirajStavku']);
    Route::delete('/korpa/obrisi/{idProizvoda}', [KorpaController::class, 'obrisiStavkuIzKorpe']);
    
    // Ruta za generisanje korpe prema receptu
    Route::post('/korpa/recept/{idRecepta}', [KorpaController::class, 'generateCart']);
    Route::post('/kupovina/potvrdi', [KupovinaController::class, 'potvrdiKupovinu']);
    
});

// Rute za sve korisnike (ukljucujuci anonimne)

Route::get('/proizvodi/pretraga', [ProizvodController::class, 'search']);
Route::post('/pretraga-recepata', [ReceptController::class, 'searchByIngredients']);

Route::get('/recepti/{id}', [ReceptController::class, 'show']);//Prikaz pojedinacnog recepta
Route::get('/recepti', [ReceptController::class, 'index']);// Prikaz svih recepata
Route::get('/recepti/filter', [RecipeController::class, 'filterRecipes']); //Filtriranje recepata






