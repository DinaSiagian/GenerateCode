<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'items';
    protected $fillable = ['nama_barang', 'kode_barang', 'kategori', 'status'];
    // Jika di MySQL kamu sudah ada created_at, biarkan true
    public $timestamps = true; 
}