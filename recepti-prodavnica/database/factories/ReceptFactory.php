<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recept>
 */
class ReceptFactory extends Factory
{
    protected $model = \App\Models\Recept::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'naziv' => $this->faker->sentence(3), // Nasumičan naziv recepta
            'uputstvo' => $this->faker->paragraph(), // Nasumično uputstvo za pripremu
            'vremePripreme' => $this->faker->numberBetween(10, 120), // Nasumično vreme pripreme (u minutima)
            'brojPorcija' => $this->faker->numberBetween(1, 10), // Nasumičan broj porcija
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
