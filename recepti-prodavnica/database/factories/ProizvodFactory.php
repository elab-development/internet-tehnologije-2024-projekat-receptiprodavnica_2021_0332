<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proizvod>
 */
class ProizvodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv'=>$this->faker->word(),
            'cena'=>$this->faker->randomFloat(2, 10, 5000),
            'mernaJedinica'=>$this->faker->randomElement(['kg', 'g', 'l', 'ml']),
            'kategorija'=>$this->faker->randomElement(['Voce', 'Povrce', 'Meso', 'Mlecni proizvodi'])
        ];
    }
}
