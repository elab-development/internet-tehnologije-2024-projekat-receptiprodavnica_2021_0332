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
        Schema::create('recepti', function (Blueprint $table) {
            $table->id('idRecepta')->autoIncrement();
            $table->string('naziv');
            $table->text('uputstvo');
            $table->integer('vremePripreme');
            $table->integer('brojPorcija');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recepts');
    }
};
