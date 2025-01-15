<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReceptResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'idRecepta' => $this->idRecepta,
            'naziv' => $this->naziv,
            'uputstvo' => $this->uputstvo,
            'vremePripreme' => $this->vremePripreme . ' minuta',
            'brojPorcija' => $this->brojPorcija . ' porcija',
            'kreiran' => $this->created_at->format('d.m.Y H:i'),
            'azuriran' => $this->updated_at->format('d.m.Y H:i'),
        ];
    }
}
