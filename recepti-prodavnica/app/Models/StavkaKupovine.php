<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StavkaKupovine extends Model
{
    /** @use HasFactory<\Database\Factories\StavkaKupovineFactory> */
    protected $primaryKey = 'idStavkeKupovine';
    protected $table = 'stavke_kupovine';
    protected $fillable = ['kolicina', 'cena', 'idKupovine', 'idProizvoda'];
    use HasFactory;
    public function kupovina(){
        return $this->belongsTo(Kupovina::class, 'idKupovine');
    }
    public function proizvod()  {
        return $this->belongsTo(Proizvod::class, 'idProizvoda');
    }
}
