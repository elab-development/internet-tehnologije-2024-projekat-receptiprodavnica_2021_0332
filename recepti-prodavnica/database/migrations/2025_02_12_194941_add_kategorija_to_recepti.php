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
        Schema::table('recepti', function (Blueprint $table) {
            $table->string('kategorija')->nullable(); // Dodajemo novu kolonu
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recepti', function (Blueprint $table) {
            $table->dropColumn('kategorija'); // Uklonimo kolonu ako se migracija poništi
        });
    }
};
