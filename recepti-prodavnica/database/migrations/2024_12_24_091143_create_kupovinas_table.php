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
        Schema::create('kupovine', function (Blueprint $table) {
            $table->id('idKupovine')->autoIncrement();
            $table->string('imeKupca');
            $table->string('prezimeKupca');
            $table->string('email');
            $table->string('adresaIsporuke');
            $table->date('datumKupovine');
            $table->decimal('ukupnaCena', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kupovinas');
    }
};
