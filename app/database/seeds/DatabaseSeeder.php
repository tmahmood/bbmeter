<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		DB::statement('set FOREIGN_KEY_CHECKS = 0');
		DB::statement('TRUNCATE `users`');
		DB::statement('TRUNCATE `locationtypes`');
		DB::statement('TRUNCATE `locations`');
		DB::statement('TRUNCATE `roles`');
		DB::statement('TRUNCATE `role_user`');
		DB::statement('set FOREIGN_KEY_CHECKS = 1');

		$this->call('RoleTableSeeder');
		$this->call('UserTableSeeder');
		$this->call('LocationTypeSeeder');
		$this->call('LocationTableSeeder');
	}

}

class LocationTableSeeder extends Seeder {
    public function run()
    {
		DB::statement("insert into locations (name, code, locationtype_id, parent_id) select name, lpad(id, 2, 0), 1, id from divisions");
		DB::statement("insert into locations (name, code, locationtype_id, parent_id) select name, concat(lpad(division_id, 2, 0), ',', lpad(id, 2, 0)), 2, id from districts");
		DB::statement("insert into locations (name, code, locationtype_id, parent_id) select c.name, concat(l.code, ',', lpad(c.id, 3, 0)), 3, c.id from constituencies c join locations l on locationtype_id = 2 and parent_id = c.district_id");
		DB::statement("insert into locations (name, code, locationtype_id, parent_id) select c.name, concat(l.code, ',', lpad(c.id, 3, 0)), 4, c.id from upazilas c join locations l on locationtype_id = 3 and parent_id = c.constituency_id");
		DB::statement("insert into locations (name, code, locationtype_id, parent_id) select c.name, concat(l.code, ',', lpad(c.id, 4, 0)), 5, c.id from unions c join locations l on locationtype_id = 4 and parent_id = c.upazila_id");
	}
}


class LocationTypeSeeder extends Seeder {
    public function run()
    {
        Locationtype::create(array( 'name' => 'divisions'));
        Locationtype::create(array( 'name' => 'districts'));
        Locationtype::create(array( 'name' => 'constituencies'));
        Locationtype::create(array( 'name' => 'upazilas'));
        Locationtype::create(array( 'name' => 'unions'));
	}
}

class RoleTableSeeder extends Seeder {
    public function run()
    {
        Role::create(array( 'name' => 'login'));
        Role::create(array( 'name' => 'admin'));
        Role::create(array( 'name' => 'profile manager'));
        Role::create(array( 'name' => 'view profiles'));
        Role::create(array( 'name' => 'edit profile'));
	}
}

class UserTableSeeder extends Seeder {

    public function run()
    {
        $u = User::create(array(
						'name' => 'bbadmin',
						'password' => Hash::make('pw3b p@ss'),
					));
		$u->roles()->attach(1);
		$u->roles()->attach(2);
    }
}

class GraphTypeTableSeeder extends Seeder {

    public function run()
    {
        Graphtype::create(array( 'name' => 'DiscretBar',));
        Graphtype::create(array( 'name' => 'Pie',));
        Graphtype::create(array( 'name' => 'SimpleLine',));
        Graphtype::create(array( 'name' => 'GroupedMultiBar',));
    }
}
