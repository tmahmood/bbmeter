<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		$this->down();
		Schema::create('users', function($table) {
			$table->increments('id');
			$table->string('name');
			$table->string('password', 64);
			$table->string('remember_token', 65);
			$table->timestamps();
		});
	}

	/**
	my_pasmy_passs * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		if (Schema::hasTable('users')) {
			DB::statement('set FOREIGN_KEY_CHECKS = 0');
			Schema::drop('users');
			DB::statement('set FOREIGN_KEY_CHECKS = 1');
		}
	}
}
