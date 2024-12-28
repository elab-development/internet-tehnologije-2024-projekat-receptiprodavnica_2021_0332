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
        Schema::create('korpa_stavke', function (Blueprint $table) {
            $table->id('idKorpaStavka')->autoIncrement();
            $table->integer('kolicina');
            $table->decimal('cena', 10, 2);
            $table->foreignId('idKorpe');
            $table->foreignId('idProizvoda');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('korpa_stavkas');
    }
};
