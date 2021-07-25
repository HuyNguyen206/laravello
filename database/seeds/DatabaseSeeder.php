<?php

use App\Board;
use App\Card;
use App\CardList;
use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        factory(User::class)->create([
            'name' => 'huy',
            'email' => 'huy@gmail.com'
        ]);
        factory(User::class, 10)->create();
        $board1 = Board::create([
            'title' => 'Groceries', 'color' => 'green', 'user_id' => User::pluck('id')->random()
        ]);
        $board2 = Board::create([
            'title' => 'Housework', 'color' => 'yellow', 'user_id' => User::pluck('id')->random()
        ]);
        $board3 = Board::create([
            'title' => 'Job', 'color' => 'indigo', 'user_id' => User::pluck('id')->random()
        ]);

        collect([$board1, $board2, $board3])->each(function (Board $board) {
//           $board->cardLists()->saveMany([
//               CardList::make(['title' => 'Stuff'.$board->id]),
//               CardList::make(['title' => 'Vegetable'.$board->id])
//           ]);
            $cardList1 = CardList::create(['title' => 'Stuff of ' . $board->title, 'board_id' => $board->id]);
            $cardList2 = CardList::create(['title' => 'Vegetable of ' . $board->title, 'board_id' => $board->id]);
            collect([$cardList1, $cardList2])->each(function (CardList $cardList) use ($board) {
                $order = 1;
                $cardList->cards()->saveMany([
                    Card::make(['title' => 'First of ' . $cardList->title, 'user_id' => $board->user_id, 'order' => $order++]),
                    Card::make(['title' => 'Second of ' . $cardList->title, 'user_id' => $board->user_id, 'order' => $order++])
                ]);

//                $card1 = Card::create(['title' => 'First'.$cardList->id, 'card_list_id' => $cardList->id,
//                    'user_id' => $board->owner_id, 'order' => random_int(1, 10)]);
//                $card2 = Card::create(['title' => 'Second'.$cardList->id, 'card_list_id' => $cardList->id,
//                    'user_id' => $board->owner_id, 'order' => random_int(1, 10)]);
//            });
            });

        });
    }
}
