import React from 'react';
import ReactDOM from 'react-dom/client';

import TicketList from './pages/TicketList.jsx';
import CreateTicketForm from './pages/CreateTicketForm.jsx';
import EditTicketForm from './pages/EditTicketForm.jsx';

// Ticket list mount
const listApp = document.getElementById('ticket-app');
if (listApp) {
  const tickets = JSON.parse(listApp.dataset.tickets);
  ReactDOM.createRoot(listApp).render(<TicketList tickets={tickets} />);
}

// Create ticket form mount
const createApp = document.getElementById('create-ticket-app');
if (createApp) {
  ReactDOM.createRoot(createApp).render(<CreateTicketForm />);
}

// Edit ticket form mount
const editApp = document.getElementById('edit-ticket-app');
if (editApp) {
  ReactDOM.createRoot(editApp).render(<EditTicketForm />);
}