<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDatatables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		$this->down();

		Schema::create('graphtypes', function($table) {
			$table->increments('id');
			$table->string('name');
			$table->timestamps();
		});

		Schema::create('results', function($table) {
			$table->increments('id');
			$table->string('key');
			$table->string('date');
			$table->string('group');
			$table->unsignedInteger('graphtype_id');
			$table->string('colors');
			$table->foreign('graphtype_id')
					->references('id')->on('graphtypes');
			$table->timestamps();
		});

		Schema::create('resultvalues', function($table) {
			$table->increments('id');
			$table->unsignedInteger('result_id');
			$table->string('label');
			$table->string('value');
			$table->foreign('result_id')
					->references('id')->on('results')
					->onDelete('cascade');
			$table->timestamps();
		});

		Schema::create('', function($table) {
			$table->increments('id');
			$table->unsignedInteger('result_id');
			$table->string('label');
			$table->string('value');
			$table->foreign('result_id')
					->references('id')->on('results')
					->onDelete('cascade');
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
		DB::statement('set FOREIGN_KEY_CHECKS = 0');
		Schema::drop('graphtypes');
		Schema::drop('results');
		Schema::drop('resultvalues');
		DB::statement('set FOREIGN_KEY_CHECKS = 1');
	}

}
