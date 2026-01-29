<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model {
    protected $table = 'peminjamans';
    protected $fillable = ['item_id', 'nama_peminjam', 'tanggal_pinjam', 'status_pinjam', 'is_notified'];
}