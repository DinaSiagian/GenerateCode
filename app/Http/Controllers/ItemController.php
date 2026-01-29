<?php
namespace App\Http\Controllers;

use App\Item;
use App\Peminjaman; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Tambahkan DB Facade jika perlu transaksi manual

class ItemController extends Controller {
    
    public function getStats() {
        return response()->json([
            'total'       => Item::count(),
            'tersedia'    => Item::where('status', 'Tersedia')->count(),
            'dipinjam'    => Item::where('status', 'Dipinjam')->count(),
            'maintenance' => Item::where('status', 'Maintenance')->count(),
        ]);
    }

    public function index() {
        return response()->json(Item::orderBy('created_at', 'desc')->get());
    }

    // FUNGSI UTAMA PEMINJAMAN
    public function borrow(Request $request, $id) {
        // Validasi input nama peminjam dari Frontend
        $this->validate($request, [
            'nama_peminjam' => 'required|string|max:255'
        ]);

        // Cari barang berdasarkan ID atau Kode Barang
        $item = Item::where('id', $id)->orWhere('kode_barang', $id)->first();

        if (!$item) {
            return response()->json(['message' => 'Barang tidak ditemukan'], 404);
        }

        // Cek status case-insensitive (mengantisipasi 'tersedia' vs 'Tersedia')
        if (strtolower($item->status) !== 'tersedia') {
            return response()->json(['message' => 'Barang sedang tidak tersedia (Status: ' . $item->status . ')'], 400);
        }

        // Mulai Transaksi Database (Opsional tapi disarankan agar data konsisten)
        // Jika tidak pakai DB::transaction, kode di bawah tetap jalan normal
        
        // A. Update status barang
        $item->status = 'Dipinjam';
        $item->save();

        // B. Simpan riwayat
        Peminjaman::create([
            'item_id' => $item->id,
            'nama_peminjam' => $request->input('nama_peminjam'),
            'tanggal_pinjam' => date('Y-m-d H:i:s'),
            'status_pinjam' => 'Aktif',
            'is_notified' => false
        ]);

        return response()->json([
            'message' => 'Peminjaman berhasil dicatat atas nama ' . $request->input('nama_peminjam'), 
            'status' => 'Dipinjam'
        ]);
    }

    public function showByCode($kode_barang) {
        $item = Item::where('kode_barang', $kode_barang)->first();
        if (!$item) return response()->json(['message' => 'Barang tidak ditemukan'], 404);
        return response()->json($item);
    }

    public function store(Request $request) {
        $this->validate($request, [
            'nama_barang' => 'required', 
            'kode_barang' => 'required|unique:items', 
            'kategori' => 'required', 
            'lokasi' => 'required'
        ]);
        $data = $request->all();
        $data['status'] = 'Tersedia'; 
        return response()->json(Item::create($data), 201);
    }

    // Saya asumsikan Anda mungkin butuh update barang juga (meski tidak diminta diperbaiki)
    public function update(Request $request, $id) {
        $item = Item::find($id);
        if (!$item) return response()->json(['message' => 'Not found'], 404);
        $item->update($request->all());
        return response()->json($item);
    }

    public function destroy($id) { 
        Item::destroy($id); 
        return response()->json(['message' => 'Berhasil dihapus']); 
    }
}