<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLocationTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('locations', function($table) {
			$table->increments('id');
			$table->string('name');
			$table->string('code', 30);
			$table->integer('locationtype_id');
			$table->integer('parent_id');
			$table->timestamps();
			$table->unique(array('name', 'locationtype_id'));
		});
		Schema::create('locationtypes', function($table) {
			$table->increments('id');
			$table->string('name')->unique();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('locationtypes');
		Schema::drop('locations');
	}

}
