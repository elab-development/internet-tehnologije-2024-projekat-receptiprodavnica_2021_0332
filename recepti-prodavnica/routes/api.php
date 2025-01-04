<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProizvodController;
use App\Http\Controllers\ReceptController;
use App\Http\Controllers\KorpaController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/proizvodi', [ProizvodController::class, 'store']);
Route::put('/proizvodi/{idProizvoda}', [ProizvodController::class, 'update']);
Route::delete('/proizvodi/{idProizvoda}', [ProizvodController::class, 'destroy']);
Route::get('/proizvodi/pretraga', [ProizvodController::class, 'search']);


Route::post('/recepti', [ReceptController::class, 'store']);
Route::put('/recepti/{idRecepta}', [ReceptController::class, 'update']);
Route::delete('/recepti/{idRecepta}', [ReceptController::class, 'destroy']);
Route::post('/pretraga-recepata', [ReceptController::class, 'searchByIngredients']);


Route::get('/korpa', [KorpaController::class, 'pregledKorpe']); // Pregled trenutne korpe
Route::put('/korpa/{idKorpe}/proizvod/{idProizvoda}', [KorpaController::class, 'dodajAzurirajStavku']);
//Route::put('/korpa/{id}', [KorpaController::class, 'azurirajKorpu']); // Izmena korpe
Route::post('/generisi-korpu/{idRecepta}', [KorpaController::class, 'generateCart']);