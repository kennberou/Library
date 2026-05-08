export default function Toast({ message, visible }) {
  return (
    <div className={`los-toast${visible ? " show" : ""}`}>
      {message}
    </div>
  );
}
