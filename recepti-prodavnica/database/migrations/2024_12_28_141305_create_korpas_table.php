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
        Schema::create('korpe', function (Blueprint $table) {
            $table->id('idKorpe')->autoIncrement();
            $table->dateTime('datumKreiranja');
            $table->decimal('ukupnaCena', 10, 2);
            $table->foreignId('idKorisnika');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('korpe');
    }
};
