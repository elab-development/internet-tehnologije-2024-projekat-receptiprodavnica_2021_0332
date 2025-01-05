<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Korisnik extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\KorisnikFactory> */
    use HasApiTokens, HasFactory;
    protected $primaryKey = 'idKorisnika';
    protected $table = 'korisnici';
    protected $fillable = ['korisnickoIme', 'lozinka', 'tipKorisnika'];
    protected $hidden = [
        'lozinka',
    ];
    
    public function korpa()  {
        return $this->hasMany(Korpa :: class, 'idKorisnika');
    }
}
