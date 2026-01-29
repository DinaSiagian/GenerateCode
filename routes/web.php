<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// Group API routes
$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('/dashboard-stats', 'ItemController@getStats');
    $router->get('/items', 'ItemController@index');
    $router->post('/items', 'ItemController@store');
    $router->get('/items/scan/{kode_barang}', 'ItemController@showByCode');
    $router->put('/items/borrow/{kode_barang}', 'ItemController@borrow'); // Endpoint untuk update status
});