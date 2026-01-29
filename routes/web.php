<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    // Jalur Utama Inventaris
    $router->get('/items', 'ItemController@index');
    $router->get('/dashboard-stats', 'ItemController@getStats');
    $router->post('/items', 'ItemController@store');
    $router->put('/items/{id}', 'ItemController@update');
    $router->delete('/items/{id}', 'ItemController@destroy');
    
    // Jalur Scan & Detail
    $router->get('/items/detail/{kode_barang}', 'ItemController@showByCode');

    // Jalur Peminjaman Barang
    $router->post('/items/{id}/borrow', 'ItemController@borrow');
});