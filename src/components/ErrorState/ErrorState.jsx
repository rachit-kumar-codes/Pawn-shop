import './ErrorState.css';

export default function ErrorState({ message = "We couldn't load this right now.", onRetry }) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state__icon">!</div>
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-outline btn-sm" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
