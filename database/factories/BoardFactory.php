<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Board;
use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Arr;

$factory->define(Board::class, function (Faker $faker) {
    return [
        //
        'title' => $faker->sentence(7),
        'color' => Arr::random(['pink', 'purple', 'blue', 'indigo']),
        'user_id' => User::all()->first()
    ];
});
