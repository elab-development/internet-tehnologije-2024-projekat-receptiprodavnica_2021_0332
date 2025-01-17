<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KorpaStavka extends Model
{
    /** @use HasFactory<\Database\Factories\KorpaStavkaFactory> */
    protected $primaryKey = 'idKorpaStavka';
    protected $table = 'korpa_stavke';
    protected $fillable = ['kolicina', 'cena', 'idKorpe', 'idProizvoda'];
    use HasFactory;
    public function proizvod() {
        return $this->belongsTo(Proizvod::class, 'idProizvoda');
    }
    public function korpa() {
        return $this->belongsTo(Korpa::class, 'idKorpe');
    }
}
