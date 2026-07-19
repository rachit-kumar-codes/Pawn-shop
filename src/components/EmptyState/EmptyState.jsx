import './EmptyState.css';

export default function EmptyState({ icon, title, message, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">{icon ?? '◇'}</div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
