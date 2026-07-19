import './Loader.css';

export function CardSkeleton() {
  return (
    <div className="card skeleton-card">
      <div className="skeleton skeleton-card__image" />
      <div className="skeleton-card__body">
        <div className="skeleton skeleton-card__line skeleton-card__line--wide" />
        <div className="skeleton skeleton-card__line skeleton-card__line--narrow" />
        <div className="skeleton skeleton-card__line skeleton-card__line--medium" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8, variant = 'product' }) {
  return (
    <div className={variant === 'post' ? 'grid grid--posts' : 'grid'}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function Spinner({ label = 'Loading' }) {
  return (
    <div className="spinner-wrap" role="status" aria-live="polite">
      <span className="spinner" />
      <span>{label}&hellip;</span>
    </div>
  );
}
