<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status = $request->query('status');
        $search = $request->query('search');
        $sort = $request->query('sort', 'desc');

        $query = Ticket::query();

        if (in_array($status, ['open', 'closed'])) {
            $query->where('status', $status);
        }

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'like', "%$search%")
                ->orWhere('issue_description', 'like', "%$search%");
            });
        }

        if (!in_array($sort, ['asc', 'desc'])) {
            $sort = 'desc';
        }

        $tickets = $query->orderBy('created_at', $sort)->get();

        return view('tickets.index', [
            'tickets' => $tickets,
            'status' => $status,
            'search' => $search,
            'sort' => $sort,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         return view('tickets.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
        'customer_name' => 'required|max:255',
        'issue_description' => 'required',
        'priority' => 'in:low,medium,high',
        ]);

        try {
            Ticket::create($validated);
            return redirect()->route('tickets.index')->with('success', 'Ticket Created Successfully!');
        } catch (\Exception $e) {
            return redirect()->route('tickets.index')->with('error', 'Failed to create Ticket!');
        }
    
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $ticket = Ticket::findOrFail($id);
        return view('tickets.edit',compact('ticket'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$id)
    {
        $validated = $request->validate([
        'customer_name' => 'required|max:255',
        'issue_description' => 'required',
        'priority' => 'in:low,medium,high',
        'status' => 'in:open,closed',
        ]);
        
        try {
            $ticket = Ticket::findOrFail($id);
            $ticket->update($validated);
            return redirect()->route('tickets.index')->with('success','Ticket Updated Successfully!');
        } catch (\Exception $e) {
            return redirect()->route('tickets.index')->with('error', 'Failed to Update Ticket!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $ticket = Ticket::findOrFail($id);
            $ticket->delete();
            return redirect()->route('tickets.index')->with('success','Ticket Deleted Successfully!');
        } catch (\Exception $e) {
            return redirect()->route('tickets.index')->with('error', 'Failed to Update Ticket!');
        }    
    
    }
}
