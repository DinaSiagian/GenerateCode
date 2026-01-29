<?php
namespace App\Http\Controllers;

use App\Item;
use App\Peminjaman; 
use Illuminate\Http\Request;

class ItemController extends Controller {
    
    // 1. Statistik (Otomatis update jumlah 'Tersedia' & 'Dipinjam')
    public function getStats() {
        return response()->json([
            'total'       => Item::count(),
            'tersedia'    => Item::where('status', 'Tersedia')->count(),
            'dipinjam'    => Item::where('status', 'Dipinjam')->count(),
            'maintenance' => Item::where('status', 'Maintenance')->count(),
        ]);
    }

    // 2. Tampil Semua Barang
    public function index() {
        return response()->json(Item::orderBy('created_at', 'desc')->get());
    }

    // 3. LOGIKA UTAMA PEMINJAMAN (ENDPOINT POST)
    public function borrow(Request $request, $id) {
        // Cari barang (bisa pakai ID asli atau Kode Barang GEN-xxxx dari QR)
        $item = Item::where('id', $id)->orWhere('kode_barang', $id)->first();

        if (!$item) return response()->json(['message' => 'Barang tidak ditemukan'], 404);
        if ($item->status !== 'Tersedia') return response()->json(['message' => 'Barang sedang dibawa/dipinjam'], 400);

        // A. Update status barang di tabel 'items'
        $item->status = 'Dipinjam';
        $item->save();

        // B. Simpan riwayat ke tabel 'peminjamans' (Mencatat riwayat baru)
        Peminjaman::create([
            'item_id' => $item->id,
            'nama_peminjam' => $request->input('nama_peminjam', 'User Scanner'), 
            'tanggal_pinjam' => date('Y-m-d H:i:s'),
            'status_pinjam' => 'Aktif',
            'is_notified' => false
        ]);

        return response()->json(['message' => 'Peminjaman berhasil dicatat!', 'status' => 'Dipinjam']);
    }

    public function showByCode($kode_barang) {
        $item = Item::where('kode_barang', $kode_barang)->first();
        if (!$item) return response()->json(['message' => 'Barang tidak ditemukan'], 404);
        return response()->json($item);
    }

    public function store(Request $request) {
        $this->validate($request, ['nama_barang' => 'required', 'kode_barang' => 'required|unique:items', 'kategori' => 'required', 'lokasi' => 'required']);
        $data = $request->all();
        $data['status'] = 'Tersedia'; 
        return response()->json(Item::create($data), 201);
    }

    public function destroy($id) { Item::destroy($id); return response()->json(['message' => 'Berhasil dihapus']); }
}