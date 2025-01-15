<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Korpa;
use App\Models\Proizvod;
use App\Models\KorpaStavka;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\KorpaStavka>
 */
class KorpaStavkaFactory extends Factory
{
    protected $model = KorpaStavka::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            
        ];
    }
}
