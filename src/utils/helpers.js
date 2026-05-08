export function today() {
  return new Date().toISOString().split("T")[0];
}

export function defaultDue() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().split("T")[0];
}

export function isOverdue(due) {
  return new Date(due) < new Date();
}

export function getInitials(fname, lname) {
  return (fname?.[0] ?? "") + (lname?.[0] ?? "");
}
