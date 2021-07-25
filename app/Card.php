<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Card extends Model
{
    protected $guarded = [];
    //
    public function cardList():BelongsTo{
        return $this->belongsTo(CardList::class);
    }

    public function owner():BelongsTo{
        return $this->belongsTo(User::class, 'user_id');
    }

}
