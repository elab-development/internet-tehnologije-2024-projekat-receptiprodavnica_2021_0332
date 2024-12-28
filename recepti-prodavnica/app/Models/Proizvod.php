<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proizvod extends Model
{
    /** @use HasFactory<\Database\Factories\ProizvodFactory> */
    protected $primaryKey = 'idProizvoda';
    protected $table = 'proizvodi';
    protected $guarded = [];
    use HasFactory;
    public function receptProizvod() {
        return $this ->hasMany(ReceptProizvod :: class, 'idProizvoda');
    }
    public function stavkaKupovine()  {
        return $this ->hasMany(StavkaKupovine :: class, 'idProizvoda');
        
    }
    public function korpaStavka()  {
        return $this ->hasMany(KorpaStavka :: class, 'idProizvoda');
        
    }

}
