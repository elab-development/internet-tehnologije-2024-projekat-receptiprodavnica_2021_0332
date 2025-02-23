<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recept extends Model
{
    /** @use HasFactory<\Database\Factories\ReceptFactory> */
    protected $primaryKey = 'idRecepta';
    protected $table = 'recepti';
    protected $fillable = ['naziv', 'uputstvo', 'vremePripreme', 'brojPorcija', 'slika', 'kategorija', 'broj_kalorija'];
    use HasFactory;

   public function receptProizvod()  {
    //return $this->hasMany(ReceptProizvod :: class, 'idRecepta');
    return $this->belongsToMany(Proizvod::class, 'recepti_proizvodi', 'idRecepta', 'idProizvoda')
    ->withPivot('potrebnaKolicina');   
    }
}
