<?php

namespace App\Http\Controllers;

// BARIS INI WAJIB ADA UNTUK MEMPERBAIKI ERROR "CLASS NOT FOUND"
use App\Item; 
use Illuminate\Http\Request;

<<<<<<< Updated upstream
class ItemController extends Controller
{
    public function index()
    {
        try {
            // Memanggil data dari tabel items
            $items = Item::orderBy('created_at', 'desc')->get();
            return response()->json($items);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
=======
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

    public function store(Request $request) {
>>>>>>> Stashed changes
        $this->validate($request, [
            'nama_barang' => 'required',
            'kode_barang' => 'required|unique:items',
            'kategori'    => 'required',
            'lokasi'      => 'required',
            'status'      => 'required'
        ]);

<<<<<<< Updated upstream
        try {
            $item = Item::create($request->all());
            return response()->json($item, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal simpan: ' . $e->getMessage()], 500);
        }
=======
    public function update(Request $request, $id) {
        $item = Item::find($id);
        if (!$item) return response()->json(['message' => 'Not Found'], 404);
        $item->update($request->all());
        return response()->json($item);
    }

    public function destroy($id) {
        Item::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }

    public function showByCode($kode_barang) {
        $item = Item::where('kode_barang', $kode_barang)->first();
        return $item ? response()->json($item) : response()->json(['message' => 'Not Found'], 404);
>>>>>>> Stashed changes
    }
}