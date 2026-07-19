import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState/EmptyState';

export default function NotFound() {
  return (
    <div className="page container">
      <EmptyState
        icon="404"
        title="Page not found"
        message="The page you're looking for doesn't exist or may have moved."
        action={
          <Link to="/marketplace" className="btn btn-primary btn-sm">
            Go to Marketplace
          </Link>
        }
      />
    </div>
  );
}
