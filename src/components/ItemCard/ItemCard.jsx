import { useState } from 'react';
import SmartImage from '../SmartImage/SmartImage';
import Badge from '../Badge/Badge';
import './ItemCard.css';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });


const OTHER_COLLECTIONS = {
  owned: [
    { key: 'wishlist', label: 'Wishlist' },
    { key: 'selling', label: 'Selling' },
  ],
  wishlist: [
    { key: 'owned', label: 'Owned' },
    { key: 'selling', label: 'Selling' },
  ],
  selling: [
    { key: 'owned', label: 'Owned' },
    { key: 'wishlist', label: 'Wishlist' },
  ],
};

export default function ItemCard({ item, onRemove, onMove }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="card item-card">
      <div className="item-card__image">
        <SmartImage src={item.image} alt={item.title} />
      </div>
      <div className="item-card__body">
        <Badge tone="brass">{item.category}</Badge>
        <h3 className="item-card__title">{item.title}</h3>
        <p className="item-card__meta">Added {formatDate(item.dateAdded)}</p>
        <p className="item-card__value">{formatPrice(item.estimatedValue)}</p>

        <div className="item-card__actions">
          <div className="item-card__move">
            <button className="btn btn-outline btn-sm btn-block" onClick={() => setMenuOpen((v) => !v)}>
              Move to…
            </button>
            {menuOpen && (
              <div className="item-card__menu">
                {OTHER_COLLECTIONS[item.collection].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      onMove(item.collectionId, opt.key);
                      setMenuOpen(false);
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="btn btn-danger-ghost btn-sm"
            onClick={() => onRemove(item.collectionId)}
            aria-label={`Remove ${item.title}`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
