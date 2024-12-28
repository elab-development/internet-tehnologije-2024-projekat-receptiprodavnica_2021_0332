<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Korisnik extends Model
{
    /** @use HasFactory<\Database\Factories\KorisnikFactory> */
    protected $primaryKey = 'idKorisnika';
    protected $table = 'korisnici';
    protected $fillable = ['korisnickoIme', 'lozinka', 'tipKorisnika'];
    use HasFactory;
    public function korpa()  {
        return $this->hasMany(Kropa :: class, 'idKorisnika');
    }
}
