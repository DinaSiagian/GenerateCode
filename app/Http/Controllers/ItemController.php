<?php
namespace App\Http\Controllers;

use App\Item;
use App\Peminjaman; 
use Illuminate\Http\Request;

class ItemController extends Controller {
    
    public function index() {
        return response()->json(Item::orderBy('created_at', 'desc')->get());
    }

    public function getStats() {
        return response()->json([
            'total'       => Item::count(),
            'tersedia'    => Item::where('status', 'Tersedia')->count(),
            'dipinjam'    => Item::where('status', 'Dipinjam')->count(),
            'maintenance' => Item::where('status', 'Maintenance')->count(),
        ]);
    }

    // 3. Tambah Barang (DIPERBAIKI)
    public function store(Request $request) {
        $this->validate($request, [
            'nama_barang' => 'required',
            'kode_barang' => 'required|unique:items',
            'kategori'    => 'required',
            'lokasi'      => 'required', // Menyesuaikan input di dashboard
        ]);

        // Default status adalah 'Tersedia' jika tidak dikirim dari frontend
        $data = $request->all();
        if (!isset($data['status'])) {
            $data['status'] = 'Tersedia';
        }

        return response()->json(Item::create($data), 201);
    }

    public function update(Request $request, $id) {
        $item = Item::find($id);
        if (!$item) return response()->json(['message' => 'Data tidak ditemukan'], 404);
        $item->update($request->all());
        return response()->json($item);
    }

    // 5. Fitur Pinjam Barang (Hanya SATU fungsi saja agar tidak Error 500)
    public function borrow(Request $request, $id) {
        $item = Item::find($id);

        if (!$item) return response()->json(['message' => 'Barang tidak ditemukan'], 404);
        if ($item->status !== 'Tersedia') return response()->json(['message' => 'Barang sedang tidak tersedia'], 400);

        $item->status = 'Dipinjam';
        $item->save();

        Peminjaman::create([
            'item_id' => $item->id,
            'nama_peminjam' => $request->input('nama_peminjam', 'User Scanner'), 
            'tanggal_pinjam' => date('Y-m-d H:i:s'),
            'status_pinjam' => 'Aktif',
            'is_notified' => false
        ]);

        return response()->json(['message' => 'Peminjaman berhasil dicatat!']);
    }

    public function showByCode($kode_barang) {
        $item = Item::where('kode_barang', $kode_barang)->first();
        if (!$item) return response()->json(['message' => 'Barang tidak ditemukan'], 404);
        return response()->json($item);
    }

    public function destroy($id) {
        Item::destroy($id);
        return response()->json(['message' => 'Berhasil dihapus']);
    }
}