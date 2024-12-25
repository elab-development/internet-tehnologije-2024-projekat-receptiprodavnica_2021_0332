<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proizvod extends Model
{
    /** @use HasFactory<\Database\Factories\ProizvodFactory> */
    protected $table = 'proizvodi';
    protected $guarded = [];
    use HasFactory;
}
