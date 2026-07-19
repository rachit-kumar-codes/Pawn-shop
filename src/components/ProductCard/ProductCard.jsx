import { Link } from 'react-router-dom';
import { useCollection } from '../../context/CollectionContext';
import SmartImage from '../SmartImage/SmartImage';
import Badge from '../Badge/Badge';
import './ProductCard.css';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

export default function ProductCard({ product }) {
  const { addToCollection, isInCollection } = useCollection();

  const inOwned = isInCollection(product.id, 'owned');
  const inWishlist = isInCollection(product.id, 'wishlist');

  const handleAdd = (e, target) => {
    e.preventDefault();
    e.stopPropagation();
    addToCollection(
      {
        sourceId: product.id,
        sourceType: 'product',
        title: product.title,
        category: product.category,
        image: product.image,
        estimatedValue: product.price,
      },
      target,
    );
  };

  return (
    <Link to={`/marketplace/${product.id}`} className="card product-card">
      <div className="product-card__image">
        <SmartImage src={product.image} alt={product.title} />
        <span className="product-card__lot lot-number">
          LOT-{product.id.replace(/\D/g, '').padStart(4, '0')}
        </span>
        <button
          className={`product-card__wishlist ${inWishlist ? 'is-active' : ''}`}
          aria-label={inWishlist ? 'In wishlist' : 'Add to wishlist'}
          aria-pressed={inWishlist}
          onClick={(e) => handleAdd(e, 'wishlist')}
        >
          {inWishlist ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-card__body">
        <div className="product-card__tags">
          <Badge tone="brass">{product.category}</Badge>
          <Badge>{product.condition}</Badge>
        </div>
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__meta">
          {product.seller} &middot; {product.location}
        </p>
        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <button
            className="btn btn-outline btn-sm"
            disabled={inOwned}
            onClick={(e) => handleAdd(e, 'owned')}
          >
            {inOwned ? 'In collection' : 'Add to collection'}
          </button>
        </div>
      </div>
    </Link>
  );
}
