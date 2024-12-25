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
        Schema::create('proizvodi', function (Blueprint $table) {
            $table->id('idProizvoda')->autoIncrement();
            $table->string('naziv');
            $table->decimal('cena', 6, 2);
            $table->string('mernaJedinica');
            $table->string('kategorija');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proizvods');
    }
};
