<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recept extends Model
{
    protected $primaryKey = 'idRecepta';
    protected $table = 'recepti';
    protected $fillable = ['naziv', 'uputstvo', 'vremePripreme', 'brojPorcija'];
    /** @use HasFactory<\Database\Factories\ReceptFactory> */
    use HasFactory;

   public function receptProizvod()  {
    return $this->hasMany(ReceptProizvod :: class, 'idRecepta');
        
    }
}
