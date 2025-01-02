<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProizvodController;
use App\Http\Controllers\ReceptController;


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