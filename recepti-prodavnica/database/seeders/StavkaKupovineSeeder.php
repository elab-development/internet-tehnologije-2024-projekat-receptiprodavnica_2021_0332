<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\StavkaKupovine;


class StavkaKupovineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StavkaKupovine::factory()->count(5)->create();
    }
}
