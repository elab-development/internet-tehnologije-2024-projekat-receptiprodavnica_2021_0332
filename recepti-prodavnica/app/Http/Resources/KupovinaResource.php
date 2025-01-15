<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KupovinaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'idKupovine' => $this->idKupovine,
            'imeKupca' => $this->imeKupca,
            'prezimeKupca' => $this->prezimeKupca,
            'email' => $this->email,
            'adresaIsporuke' => $this->adresaIsporuke,
            'datumKupovine' => $this->datumKupovine->format('d.m.Y'),
            'ukupnaCena' => number_format($this->ukupnaCena, 2) . ' RSD', // Formatiranje cene
            'kreiran' => $this->created_at->format('d.m.Y H:i'),
            'azuriran' => $this->updated_at->format('d.m.Y H:i'),
        ];
    }
}
