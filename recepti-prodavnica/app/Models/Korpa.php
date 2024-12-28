<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Korpa extends Model
{
    /** @use HasFactory<\Database\Factories\KorpaFactory> */
    protected $primaryKey = 'idKorpe';
    use HasFactory;
    public function korpaStavka()  {
        return $this->hasMany(KorpaStavka :: class, 'idKorpe');
    }
    public function korisnik()  {
        return $this->belongsTo(Korisnik :: class, 'idKorisnik');
    }

}
