<?php
namespace App\Http\Controllers;
use App\Item;
use Illuminate\Http\Request;

class ItemController extends Controller {
    // 1. Tampil Data (READ)
    public function index() {
        return response()->json(Item::orderBy('created_at', 'desc')->get());
    }

    // 2. Statistik Dashboard (SUDAH BERHASIL)
    public function getStats() {
        return response()->json([
            'total'       => Item::count(),
            'tersedia'    => Item::where('status', 'Tersedia')->count(),
            'dipinjam'    => Item::where('status', 'Dipinjam')->count(),
            'maintenance' => Item::where('status', 'Maintenance')->count(),
        ]);
    }

    // 3. Tambah Barang (CREATE)
    public function store(Request $request) {
        $this->validate($request, [
            'nama_barang' => 'required',
            'kode_barang' => 'required|unique:items',
            'kategori'    => 'required',
            'status'      => 'required'
        ]);
        return response()->json(Item::create($request->all()), 201);
    }

    // 4. Update Status (UPDATE)
    public function update(Request $request, $id) {
        $item = Item::find($id);
        if (!$item) return response()->json(['message' => 'Data tidak ditemukan'], 404);
        $item->update($request->all());
        return response()->json($item);
    }

    // 5. Hapus Barang (DELETE)
    public function destroy($id) {
        Item::destroy($id);
        return response()->json(['message' => 'Berhasil dihapus']);
    }

    // Mencari detail barang berdasarkan kode_barang untuk fitur scan
public function showByCode($kode_barang) {
    $item = Item::where('kode_barang', $kode_barang)->first();
    if (!$item) return response()->json(['message' => 'Barang tidak ditemukan'], 404);
    return response()->json($item);
}
}
