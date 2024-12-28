<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceptProizvod extends Model
{
    protected $primaryKey = 'idReceptProizvod';
    protected $table = 'recepti_proizvodi';
    protected $fillable = ['potrebnaKolicina', 'idRecepta', 'idProizvoda'];
    /** @use HasFactory<\Database\Factories\ReceptProizvodFactory> */
    use HasFactory;

    public function recept() {
        return $this->belongsTo(Recept::class, 'idRecepta');
       

    }
    public function proizvod(){
        return $this->belongsTo(Proizvod::class, 'idProizvoda');
        
    }
}
