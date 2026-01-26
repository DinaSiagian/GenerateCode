<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// WAJIB ADA GRUP PREFIX 'api'
$router->group(['prefix' => 'api'], function () use ($router) {
    
    // Alamat: localhost:8000/api/items
    $router->get('/items', 'ItemController@index');
    
    // Alamat: localhost:8000/api/items (POST)
    $router->post('/items', 'ItemController@store');
    
    // Alamat untuk hapus: localhost:8000/api/items/{id}
    $router->delete('/items/{id}', 'ItemController@destroy');
});