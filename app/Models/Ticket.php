<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    // create & editable attributes for the Ticket model
    protected $fillable = ['customer_name','issue_description','priority','status'];
}
