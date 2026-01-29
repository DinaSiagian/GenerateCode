<?php
/** @var \Laravel\Lumen\Routing\Router $router */

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('/items', 'ItemController@index');
    $router->get('/dashboard-stats', 'ItemController@getStats');
    $router->post('/items', 'ItemController@store');
    $router->put('/items/{id}', 'ItemController@update');
    $router->delete('/items/{id}', 'ItemController@destroy');
    $router->get('/items/detail/{kode_barang}', 'ItemController@showByCode');

    // ENDPOINT PEMINJAMAN (POST)
    // {id} di sini nanti akan menangkap kode_barang yang dikirim frontend
    $router->post('/items/{id}/borrow', 'ItemController@borrow');
});