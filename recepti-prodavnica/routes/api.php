<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProizvodController;
use App\Http\Controllers\ReceptController;
use App\Http\Controllers\KorpaController;
use App\Http\Controllers\API\AuthController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);




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