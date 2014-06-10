<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', 'HomeController@showWelcome');

Route::get('/graph', 'HomeController@showGraph');



Route::group(array('before'=>'auth'), function() {

});

Route::get('login', 'Users@showLogin');
Route::get('logout', 'Users@logout');
Route::post('users/login', array('before'=>'csrf', 'uses'=>'Users@login'));

Route::get('notify', function(){
	return Redirect::to('/')
		->with('message', 'Test message')
		->with('warn', 'This is warning')
		->with('success', 'WE got this')
		->with('error', 'Went wrong');
});

Route::get('/catss', 'HomeController@showCatss');
Route::get('/compendium', 'HomeController@showCompendium');
Route::get('/demography', 'HomeController@showDemography');
Route::get('/visual', 'HomeController@showVisualization');
Route::get('/', 'HomeController@showWelcome');
