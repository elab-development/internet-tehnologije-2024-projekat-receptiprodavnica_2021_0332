<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kupovina extends Model
{
    /** @use HasFactory<\Database\Factories\KupovinaFactory> */
    protected $primaryKey = 'idKupovine';
    protected $table = 'kupovine';
    protected $fillable = ['imeKupca', 'prezimeKupca', 'email', 'adresaIsporuke', 'datumKupovine', 'ukupnaCena'];
    use HasFactory;
    public function stavkaKupovine()  {
        return $this->hasMany(StavkaKupovine :: class, 'idKupovine');
        
    }
}
