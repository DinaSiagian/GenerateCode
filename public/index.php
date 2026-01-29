<?php

/**
 * PEMBERIAN IZIN AKSES (CORS) - Letakkan di paling atas!
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, X-Requested-With');

// Jika HP hanya mengetes koneksi (OPTIONS), langsung jawab OK
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

/*
|--------------------------------------------------------------------------
| Menjalankan Aplikasi Lumen
|--------------------------------------------------------------------------
*/
$app = require __DIR__.'/../bootstrap/app.php';
$app->run();