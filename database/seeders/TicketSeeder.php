<?php

namespace Database\Seeders;
use App\Models\Ticket;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       // Migration data for tickets table
       Ticket::create([
            'customer_name' => 'Tharindu Gamage',
            'issue_description' => 'Payment failed at checkout',
            'priority' => 'high',
            'status' => 'open',
        ]);

        Ticket::create([
            'customer_name' => 'Nuwan Thushara',
            'issue_description' => 'Late delivery on order #1234',
            'priority' => 'medium',
            'status' => 'open',
        ]);

        Ticket::create([
            'customer_name' => 'Kamal deshppriya',
            'issue_description' => 'Wrong product received',
            'priority' => 'low',
            'status' => 'closed',
        ]);
    }
}
