<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoleManagement extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('roles', function($table) {
			$table->increments('id');
			$table->string('name');
			$table->timestamps();
		});

		Schema::create('role_user', function($table) {
			$table->increments('id');
			$table->unsignedInteger('user_id');
			$table->unsignedInteger('role_id');
			$table->timestamps();
			$table->foreign('user_id')
					->references('id')->on('users')
					->onDelete('cascade');
			$table->foreign('role_id')
					->references('id')->on('roles')
					->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		DB::statement('set FOREIGN_KEY_CHECKS = 0');
		Schema::drop('roles');
		Schema::drop('role_user');
		DB::statement('set FOREIGN_KEY_CHECKS = 1');
	}

}
