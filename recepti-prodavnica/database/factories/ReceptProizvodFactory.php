<?php

namespace Database\Factories;

use App\Models\Recept;
use App\Models\Proizvod;
use App\Models\ReceptProizvod;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReceptProizvod>
 */
class ReceptProizvodFactory extends Factory
{
    protected $model = ReceptProizvod::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'potrebnaKolicina' => $this->faker->randomFloat(2, 0.1, 100), // Količina od 0.1 do 100 sa 2 decimale
            'idRecepta' => Recept::factory(),
            'idProizvoda' => Proizvod::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
