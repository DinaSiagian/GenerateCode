<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeminjamansTable extends Migration {
    public function up() {
        Schema::create('peminjamans', function (Blueprint $table) {
            $table->id();
            $table->integer('item_id');
            $table->string('nama_peminjam');
            $table->dateTime('tanggal_pinjam');
            $table->dateTime('tanggal_kembali')->nullable();
            $table->string('status_pinjam')->default('Aktif');
            $table->boolean('is_notified')->default(false);
            $table->timestamps();
        });
    }
    public function down() { Schema::dropIfExists('peminjamans'); }
}