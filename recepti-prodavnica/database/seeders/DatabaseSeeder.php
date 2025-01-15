<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(5)->create();

        // $this->call([
        //     ReceptSeeder::class,
        // ]);

        // $this->call(KupovinaSeeder::class);
        // $this->call(ReceptProizvodSeeder::class);

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call(StavkaKupovineSeeder::class);
    }
}
