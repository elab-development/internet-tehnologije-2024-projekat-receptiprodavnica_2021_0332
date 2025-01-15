<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProizvodResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'idProizvoda' => $this->idProizvoda,
            'naziv' => $this->naziv,
            'cena' => number_format($this->cena, 2) . ' RSD', // Formatiranje cene
            'mernaJedinica' => $this->mernaJedinica,
            'kategorija' => $this->kategorija,
            'kreiran' => $this->created_at->format('d.m.Y H:i'),
            'azuriran' => $this->updated_at->format('d.m.Y H:i'),
        ];

    }
}
