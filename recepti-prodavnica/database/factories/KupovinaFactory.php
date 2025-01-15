<?php

namespace Database\Factories;
use App\Models\Kupovina;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kupovina>
 */
class KupovinaFactory extends Factory
{
    protected $model = Kupovina::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'imeKupca' => $this->faker->firstName,
            'prezimeKupca' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'adresaIsporuke' => $this->faker->address,
            'datumKupovine' => $this->faker->date(),
            'ukupnaCena' => $this->faker->randomFloat(2, 100, 10000), // Cena od 100 do 10000 sa 2 decimale
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
