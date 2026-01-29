<?php
namespace App\Http\Controllers;
use App\Item;
use Illuminate\Http\Request;

class ItemController extends Controller {
    public function getStats() {
        return response()->json([
            'total' => Item::count(),
            'tersedia' => Item::where('status', 'Tersedia')->count(),
            'dipinjam' => Item::where('status', 'Dipinjam')->count(),
            'maintenance' => Item::where('status', 'Maintenance')->count(),
        ]);
    }

    public function index() {
        return response()->json(Item::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request) {
        return response()->json(Item::create($request->all()), 201);
    }

    public function borrow($kode_barang) {
        $item = Item::where('kode_barang', $kode_barang)->first();
        if ($item) {
            $item->status = 'Dipinjam'; // Logika peminjaman barang
            $item->save();
            return response()->json(['message' => 'Berhasil diupdate', 'data' => $item]);
        }
        return response()->json(['message' => 'Aset tidak ditemukan'], 404);
    }

    public function showByCode($kode_barang) {
        $item = Item::where('kode_barang', $kode_barang)->first();
        return response()->json($item);
    }
}