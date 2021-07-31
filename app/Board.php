<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Board extends Model
{
    protected $guarded = [];
    //
    protected static function booted(){
        static::creating(function ($board){
            $board->user_id = auth()->id();
        });
    }
    public function cardLists():HasMany
    {
        return $this->hasMany(CardList::class);
    }

    public function owner():BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
