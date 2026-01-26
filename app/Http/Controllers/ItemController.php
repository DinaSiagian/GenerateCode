<?php

namespace App\Http\Controllers;

// BARIS INI WAJIB ADA UNTUK MEMPERBAIKI ERROR "CLASS NOT FOUND"
use App\Item; 
use Illuminate\Http\Request;

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
        $this->validate($request, [
            'nama_barang' => 'required',
            'kode_barang' => 'required|unique:items',
            'kategori'    => 'required',
            'status'      => 'required'
        ]);

        try {
            $item = Item::create($request->all());
            return response()->json($item, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal simpan: ' . $e->getMessage()], 500);
        }
    }
}