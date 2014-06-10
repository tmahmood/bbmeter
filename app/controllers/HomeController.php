<?php

class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function showWelcome()
	{
		return View::make('welcome');
	}

	public function showCatss()
	{
		return View::make('catss');
	}

	public function showCompendium()
	{
		return View::make('compendium');
	}

	public function showDemography()
	{
		return View::make('demography');
	}

	public function showVisualization($param)
	{
		return View::make('visual');
	}


}
