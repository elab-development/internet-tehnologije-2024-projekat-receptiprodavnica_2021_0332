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





