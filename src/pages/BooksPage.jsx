import { useState } from "react";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";

export default function BooksPage({ books, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const list = books.filter(b => {
    const match = (b.title + b.author + b.isbn + b.genre)
      .toLowerCase()
      .includes(search.toLowerCase());
    return match && (!filter || b.status === filter);
  });

  return (
    <div>
      <div className="los-page-header">
        <div>
          <div className="los-page-title">Book Catalog</div>
          <div className="los-page-subtitle">Manage your collection</div>
        </div>
        <button className="los-btn los-btn-primary" onClick={onAdd}>
          + Add Book
        </button>
      </div>

      <div className="los-table-wrap">
        <div className="los-table-toolbar">
          <input
            className="los-search-input"
            placeholder="Search title, author, ISBN…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="los-select-filter"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Borrowed">Borrowed</option>
          </select>
        </div>

        <table className="los-table">
          <thead>
            <tr>
              <th>Title</th><th>Author</th><th>Genre</th>
              <th>ISBN</th><th>Year</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={7}><EmptyState icon="◫" text="No books found" /></td>
              </tr>
            ) : list.map(b => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600, maxWidth: 200 }}>{b.title}</td>
                <td>{b.author}</td>
                <td>
                  <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'DM Mono',monospace" }}>
                    {b.genre}
                  </span>
                </td>
                <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>{b.isbn}</td>
                <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>{b.year}</td>
                <td><Badge type={b.status} /></td>
                <td>
                  <button
                    className="los-btn los-btn-ghost los-btn-sm"
                    style={{ marginRight: 4 }}
                    onClick={() => onEdit(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="los-btn los-btn-danger los-btn-sm"
                    onClick={() => onDelete(b.id)}
                    disabled={b.status === "Borrowed"}
                    title={b.status === "Borrowed" ? "Cannot delete borrowed book" : ""}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
