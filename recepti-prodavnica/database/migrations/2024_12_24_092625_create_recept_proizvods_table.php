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
        Schema::create('recepti_proizvodi', function (Blueprint $table) {
            $table->id('idReceptProizvod')->autoIncrement();
            $table->decimal('potrebnaKolicina', 8, 2);
            $table->foreignId('idRecepta');
            $table->foreignId('idProizvoda');
            $table->timestamps();
        });
    }

    /**
     * 
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recept_proizvods');
    }
};
