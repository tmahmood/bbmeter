<?php

class Users extends \BaseController {

	public function showLogin()
	{
		if (!Auth::check()) {
			return View::make('login');
		}

		return Redirect::to('/')
				->with('warn', 'You are already logged in');
	}

	public function logout()
	{
		if (Auth::check()) {

			Auth::logout();
			return Redirect::to(Config::get('client.onlogout'))
					->with('message', 'You are now logged out');

		}
		return Redirect::to('/');
	}

	public function login()
	{
		if ($this->check_user_info()) {

			return Redirect::to(Config::get('client.onlogin.other'))
				->with('message', 'You are now logged in!');

		}

		return Redirect::to('login')
			->with('error', 'Your username/password combination was incorrect')
			->withInput();
	}

	private function check_user_info()
	{
		return Auth::attempt(array('name'=>Input::get('name'), 'password'=>Input::get('password')));
	}


}

