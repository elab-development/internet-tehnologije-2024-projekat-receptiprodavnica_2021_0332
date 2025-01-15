<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Kupovina;
use App\Models\Proizvod;
use App\Models\StavkaKupovine;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StavkaKupovine>
 */
class StavkaKupovineFactory extends Factory
{
    protected $model = StavkaKupovine::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kolicina' => $this->faker->numberBetween(1, 10),
            'cena' => $this->faker->randomFloat(2, 10, 1000), // Cena između 10 i 1000 sa 2 decimale
            'idKupovine' => Kupovina::factory(),
            'idProizvoda' => Proizvod::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
