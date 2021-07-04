<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CardList extends Model
{
    protected $guarded = [];
    //
    public function cards():HasMany
    {
        return $this->hasMany(Card::class);
    }

    public function board():BelongsTo
    {
        return $this->belongsTo(Board::class);
    }


}
