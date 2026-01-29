<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration {
    public function up() {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('nama_barang');
            $table->string('kode_barang')->unique();
            $table->string('kategori');
            $table->string('lokasi')->nullable(); // Kolom lokasi langsung dibuat di sini
            $table->string('status')->default('Tersedia');
            $table->timestamps();
        });
    }
    public function down() { Schema::dropIfExists('items'); }
}