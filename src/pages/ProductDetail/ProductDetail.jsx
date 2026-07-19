import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProductById } from '../../utils/mockApi';
import { useCollection } from '../../context/CollectionContext';
import SmartImage from '../../components/SmartImage/SmartImage';
import Badge from '../../components/Badge/Badge';
import { Spinner } from '../../components/Loader/Loader';
import ErrorState from '../../components/ErrorState/ErrorState';
import './ProductDetail.css';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  // status is one of: 'loading' | 'success' | 'error' | 'not-found'
  const [status, setStatus] = useState('loading');
  const { addToCollection, isInCollection } = useCollection();

  const load = () => {
    if (!id) return;
    setStatus('loading');
    fetchProductById(id)
      .then((data) => {
        if (!data) {
          setStatus('not-found');
          return;
        }
        setProduct(data);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(load, [id]);

  if (status === 'loading') {
    return (
      <div className="page container">
        <Spinner label="Loading lot details" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="page container">
        <ErrorState message="We couldn't load this listing." onRetry={load} />
      </div>
    );
  }

  if (status === 'not-found' || !product) {
    return (
      <div className="page container">
        <ErrorState message="This listing no longer exists or the link is incorrect." />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link to="/marketplace" className="btn btn-outline btn-sm">
            Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const inOwned = isInCollection(product.id, 'owned');
  const inWishlist = isInCollection(product.id, 'wishlist');

  return (
    <div className="page container">
      <Link to="/marketplace" className="detail-back">
        &larr; Back to marketplace
      </Link>

      <div className="product-detail">
        <div className="product-detail__image">
          <SmartImage src={product.image} alt={product.title} />
          <span className="lot-number product-detail__lot">
            LOT-{product.id.replace(/\D/g, '').padStart(4, '0')}
          </span>
        </div>

        <div className="product-detail__info">
          <div className="product-detail__tags">
            <Badge tone="brass">{product.category}</Badge>
            <Badge>{product.condition}</Badge>
          </div>
          <h1>{product.title}</h1>
          <p className="product-detail__price">{formatPrice(product.price)}</p>

          <dl className="product-detail__meta">
            <div>
              <dt>Seller</dt>
              <dd>{product.seller}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{product.location}</dd>
            </div>
            <div>
              <dt>Listed</dt>
              <dd>{formatDate(product.dateListed)}</dd>
            </div>
          </dl>

          <p className="product-detail__description">{product.description}</p>

          <div className="product-detail__actions">
            <button
              className="btn btn-primary btn-block"
              disabled={inOwned}
              onClick={() =>
                addToCollection(
                  {
                    sourceId: product.id,
                    sourceType: 'product',
                    title: product.title,
                    category: product.category,
                    image: product.image,
                    estimatedValue: product.price,
                  },
                  'owned',
                )
              }
            >
              {inOwned ? 'Already in your collection' : 'Add to collection'}
            </button>
            <button
              className={`btn btn-outline btn-block ${inWishlist ? 'is-active' : ''}`}
              disabled={inWishlist}
              onClick={() =>
                addToCollection(
                  {
                    sourceId: product.id,
                    sourceType: 'product',
                    title: product.title,
                    category: product.category,
                    image: product.image,
                    estimatedValue: product.price,
                  },
                  'wishlist',
                )
              }
            >
              {inWishlist ? 'In your wishlist' : 'Add to wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
