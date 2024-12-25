<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('korisnici', function (Blueprint $table) {
            $table->id('idKorisnika')->autoIncrement();
            $table->string('korisnickoIme');
            $table->string('lozinka');
            $table->string('tipKorisnika');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('korisniks');
    }
};
