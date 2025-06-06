import React, { useState } from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

const TicketList = ({ tickets }) => {
  const root = document.getElementById('ticket-app');
  const baseUrl = root?.dataset?.action;
  const currentStatus = root?.dataset.status || '';
  const currentSearch = root?.dataset.search || '';
  const currentSort = root?.dataset.sort || 'desc';
  const flashMessage = root?.dataset.flash || null;
  const errorMessage = root?.dataset.error || null;

  const [flash, setFlash] = useState(flashMessage);
  const [error, setError] = useState(errorMessage);

  const getRowBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-50';
      case 'medium': return 'bg-yellow-50';
      case 'low': return 'bg-green-50';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    const options = { dateStyle: 'medium', timeStyle: 'short' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const openCount = tickets.filter((t) => t.status === 'open').length;
  const closedCount = tickets.filter((t) => t.status === 'closed').length;

  return (
    <div className="space-y-4">
      {/* Flash success */}
      {flash && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded text-sm font-medium shadow">
          {flash}
        </div>
      )}

      {/* Flash error */}
      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded text-sm font-medium shadow">
          {error}
        </div>
      )}

      {/* Ticket summary */}
      <div className="flex gap-4 text-sm font-medium">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded">Open: {openCount}</div>
        <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded">Closed: {closedCount}</div>
      </div>

      {/* Filter and search */}
      <form method="GET" action={`${baseUrl}/tickets`} className="flex items-center gap-4 mb-4 flex-wrap">
        <div>
          <label className="text-sm font-medium mr-2">Status:</label>
          <select
            name="status"
            defaultValue={currentStatus}
            onChange={(e) => e.target.form.submit()}
            className="border px-3 py-2 rounded text-sm"
          >
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mr-2">Sort by Created Date:</label>
          <select
            name="sort"
            defaultValue={currentSort}
            onChange={(e) => e.target.form.submit()}
            className="border px-3 py-2 rounded text-sm"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            name="search"
            defaultValue={currentSearch}
            placeholder="Search tickets..."
            className="border px-3 py-2 rounded text-sm"
            onChange={(e) => {
              clearTimeout(window.__searchDelay);
              window.__searchDelay = setTimeout(() => {
                e.target.form.submit();
              }, 500);
            }}
          />
        </div>
      </form>

      {/* Ticket table */}
      <div className="overflow-x-auto bg-white p-6 rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Issue</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Last Update</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className={`hover:bg-opacity-70 ${getRowBg(ticket.priority)}`}>
                <td className="px-4 py-3">{ticket.customer_name}</td>
                <td className="px-4 py-3">{ticket.issue_description}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 rounded text-white text-xs font-semibold ${
                    ticket.priority === 'high'
                      ? 'bg-red-500'
                      : ticket.priority === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 rounded text-white text-xs font-medium ${
                    ticket.status === 'closed' ? 'bg-gray-500' : 'bg-blue-500'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-3">{formatDate(ticket.updated_at)}</td>
                <td className="px-4 py-3 flex gap-2 items-center">
                  <a
                    href={`${baseUrl}/tickets/${ticket.id}/edit`}
                    className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                    title="Edit"
                  >
                    <PencilSquareIcon className="h-4 w-4" />
                  </a>
                  <form id='delete_button'
                    method="POST"
                    action={`${baseUrl}/tickets/${ticket.id}`}
                    className="inline"
                    onSubmit={(e) => {
                      if (!confirm('Are you sure you want to delete this ticket?')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="_method" value="DELETE" />
                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      title="Delete"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketList;