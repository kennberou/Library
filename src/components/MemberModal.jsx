import { useState, useEffect } from "react";

export default function MemberModal({ open, onSave, onClose }) {
  const [form, setForm] = useState({
    fname: "", lname: "", email: "", phone: "", type: "Student",
  });

  useEffect(() => {
    if (open) setForm({ fname: "", lname: "", email: "", phone: "", type: "Student" });
  }, [open]);

  if (!open) return null;

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function handleSave() {
    if (!form.fname.trim() || !form.lname.trim() || !form.email.trim()) {
      alert("Name and email are required.");
      return;
    }
    onSave(form);
  }

  return (
    <div
      className="los-modal-backdrop"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="los-modal">
        <div className="los-modal-title">Add New Member</div>

        <div className="los-modal-grid">
          <div className="los-field-group">
            <label>First Name</label>
            <input
              value={form.fname}
              onChange={e => set("fname", e.target.value)}
              placeholder="Juan"
            />
          </div>

          <div className="los-field-group">
            <label>Last Name</label>
            <input
              value={form.lname}
              onChange={e => set("lname", e.target.value)}
              placeholder="Dela Cruz"
            />
          </div>

          <div className="los-field-group los-span-full">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => set("email", e.target.value)}
              placeholder="juan@email.com"
            />
          </div>

          <div className="los-field-group">
            <label>Phone</label>
            <input
              value={form.phone}
              onChange={e => set("phone", e.target.value)}
              placeholder="+63 9XX XXX XXXX"
            />
          </div>

          <div className="los-field-group">
            <label>Membership Type</label>
            <select value={form.type} onChange={e => set("type", e.target.value)}>
              <option>Student</option>
              <option>Faculty</option>
              <option>Staff</option>
              <option>Public</option>
            </select>
          </div>
        </div>

        <div className="los-modal-actions">
          <button className="los-btn los-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="los-btn los-btn-primary" onClick={handleSave}>
            Save Member
          </button>
        </div>
      </div>
    </div>
  );
}
