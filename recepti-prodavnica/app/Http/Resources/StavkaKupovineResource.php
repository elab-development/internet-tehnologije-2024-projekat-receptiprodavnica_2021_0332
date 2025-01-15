<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StavkaKupovineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'idStavkeKupovine' => $this->idStavkeKupovine,
            'kolicina' => $this->kolicina,
            'cena' => $this->cena,
            'idKupovine' => $this->idKupovine,
            'idProizvoda' => $this->idProizvoda,
            'created_at' => $this->created_at->format('d.m.Y H:i'),
            'updated_at' => $this->updated_at->format('d.m.Y H:i'),
        ];
    }
}
