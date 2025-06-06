import React, { useState } from 'react';

const EditTicketForm = () => {
  const root = document.getElementById('edit-ticket-app');
  const ticket = JSON.parse(root.dataset.ticket);
  const action = root.dataset.action;
  const initialErrors = root?.dataset?.errors ? JSON.parse(root.dataset.errors) : [];

  const [formData, setFormData] = useState({
    customer_name: ticket.customer_name,
    issue_description: ticket.issue_description,
    priority: ticket.priority,
    status: ticket.status,
  });

  const [errors] = useState(initialErrors);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form method="POST" action={action} className="space-y-4 bg-white p-6 rounded shadow max-w-xl mx-auto">
      {/* Laravel needs PUT for updates */}
      <input type="hidden" name="_method" value="PUT" />
      <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />

      {/* Laravel Validation Errors */}
      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded text-sm">
          <ul className="list-disc ml-5 space-y-1">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Customer Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Customer Name</label>
        <input
          name="customer_name"
          value={formData.customer_name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      {/* Issue Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Issue Description</label>
        <textarea
          name="issue_description"
          value={formData.issue_description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      {/* Priority */}
      <div>
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      {/* status */}
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      {/* Submit Button */}
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Update Ticket
      </button>
    </form>
  );
};

export default EditTicketForm;