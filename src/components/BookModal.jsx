import { useState, useEffect } from "react";

export default function BookModal({ open, editing, onSave, onClose }) {
  const [form, setForm] = useState({
    title: "", author: "", genre: "", isbn: "", year: "", desc: "",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        title:  editing.title,
        author: editing.author,
        genre:  editing.genre,
        isbn:   editing.isbn,
        year:   editing.year,
        desc:   editing.desc || "",
      });
    } else {
      setForm({ title: "", author: "", genre: "", isbn: "", year: "", desc: "" });
    }
  }, [editing, open]);

  if (!open) return null;

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function handleSave() {
    if (!form.title.trim() || !form.author.trim()) {
      alert("Title and author are required.");
      return;
    }
    onSave({
      ...form,
      year:  parseInt(form.year) || new Date().getFullYear(),
      genre: form.genre.trim() || "Uncategorized",
      isbn:  form.isbn.trim()  || "—",
    });
  }

  return (
    <div
      className="los-modal-backdrop"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="los-modal">
        <div className="los-modal-title">
          {editing ? "Edit Book" : "Add New Book"}
        </div>

        <div className="los-modal-grid">
          <div className="los-field-group los-span-full">
            <label>Title</label>
            <input
              value={form.title}
              onChange={e => set("title", e.target.value)}
              placeholder="Book title"
            />
          </div>

          <div className="los-field-group">
            <label>Author</label>
            <input
              value={form.author}
              onChange={e => set("author", e.target.value)}
              placeholder="Author name"
            />
          </div>

          <div className="los-field-group">
            <label>Genre</label>
            <input
              value={form.genre}
              onChange={e => set("genre", e.target.value)}
              placeholder="Fiction, Science…"
            />
          </div>

          <div className="los-field-group">
            <label>ISBN</label>
            <input
              value={form.isbn}
              onChange={e => set("isbn", e.target.value)}
              placeholder="978-…"
            />
          </div>

          <div className="los-field-group">
            <label>Year Published</label>
            <input
              type="number"
              value={form.year}
              onChange={e => set("year", e.target.value)}
              placeholder="2024"
              min="1000"
              max="2099"
            />
          </div>

          <div className="los-field-group los-span-full">
            <label>Description (optional)</label>
            <textarea
              value={form.desc}
              onChange={e => set("desc", e.target.value)}
              placeholder="Brief description…"
            />
          </div>
        </div>

        <div className="los-modal-actions">
          <button className="los-btn los-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="los-btn los-btn-primary" onClick={handleSave}>
            Save Book
          </button>
        </div>
      </div>
    </div>
  );
}
