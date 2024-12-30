<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProizvodController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/proizvodi', [ProizvodController::class, 'store']);
Route::put('/proizvodi/{idProizvoda}', [ProizvodController::class, 'update']);
Route::delete('/proizvodi/{idProizvoda}', [ProizvodController::class, 'destroy']);
Route::get('/proizvodi/pretraga', [ProizvodController::class, 'search']);


