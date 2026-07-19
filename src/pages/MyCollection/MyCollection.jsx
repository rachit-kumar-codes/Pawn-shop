import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCollection } from '../../context/CollectionContext';
import { useDebounce } from '../../hooks/useDebounce';
import { CATEGORIES } from '../../utils/constants';
import CollectionTabs from '../../components/CollectionTabs/CollectionTabs';
import FilterBar from '../../components/FilterBar/FilterBar';
import FilterSelect from '../../components/FilterBar/FilterSelect';
import ItemCard from '../../components/ItemCard/ItemCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import './MyCollection.css';

const TAB_COPY = {
  owned: {
    title: 'Your Owned collection is empty',
    message: 'Items you add to your collection from the marketplace will show up here.',
  },
  wishlist: {
    title: 'Your Wishlist is empty',
    message: 'Save listings or community posts you love to keep track of them here.',
  },
  selling: {
    title: 'You have nothing listed for Selling',
    message: 'Move an owned item here once you decide to sell it on.',
  },
};

export default function MyCollection() {
  const { items, removeItem, moveItem, countFor } = useCollection();
  const [params, setParams] = useSearchParams();

  const tab = params.get('tab') ?? 'owned';
  const search = params.get('q') ?? '';
  const category = params.get('category') ?? 'all';
  const sort = params.get('sort') ?? 'date-desc';
  const debouncedSearch = useDebounce(search, 300);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === '' || value === 'all') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setParams(next, { replace: true });
  };

  const counts = {
    owned: countFor('owned'),
    wishlist: countFor('wishlist'),
    selling: countFor('selling'),
  };

  const filtered = useMemo(() => {
    const result = items
      .filter((item) => item.collection === tab)
      .filter((item) => item.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .filter((item) => category === 'all' || item.category === category);

    return [...result].sort((a, b) => {
      if (sort === 'value-desc') return b.estimatedValue - a.estimatedValue;
      if (sort === 'value-asc') return a.estimatedValue - b.estimatedValue;
      if (sort === 'date-asc') return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
  }, [items, tab, debouncedSearch, category, sort]);

  const hasAnyInTab = items.some((item) => item.collection === tab);
  const copy = TAB_COPY[tab];

  return (
    <div className="page container">
      <div className="page-header">
        <div>
          <span className="page-header__eyebrow">My Collection</span>
          <h1>Organize what you own, want, and sell</h1>
          <p>Keep track of your collectibles across three simple lists.</p>
        </div>
      </div>

      <CollectionTabs active={tab} onChange={(key) => updateParam('tab', key)} counts={counts} />

      {hasAnyInTab && (
        <FilterBar
          searchValue={search}
          onSearchChange={(v) => updateParam('q', v)}
          searchPlaceholder="Search this collection…"
          activeCount={category !== 'all' ? 1 : 0}
          onReset={() => updateParam('category', 'all')}
        >
          <FilterSelect
            label="Category"
            value={category}
            onChange={(v) => updateParam('category', v)}
            options={[{ value: 'all', label: 'All categories' }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
          />
          <FilterSelect
            label="Sort by"
            value={sort}
            onChange={(v) => updateParam('sort', v)}
            options={[
              { value: 'date-desc', label: 'Recently added' },
              { value: 'date-asc', label: 'Oldest added' },
              { value: 'value-desc', label: 'Value: High to low' },
              { value: 'value-asc', label: 'Value: Low to high' },
            ]}
          />
        </FilterBar>
      )}

      {!hasAnyInTab && (
        <EmptyState
          title={copy.title}
          message={copy.message}
          action={
            <div style={{ display: 'flex', gap: 10 }}>
              <Link to="/marketplace" className="btn btn-outline btn-sm">
                Browse marketplace
              </Link>
              <Link to="/community" className="btn btn-outline btn-sm">
                Browse community
              </Link>
            </div>
          }
        />
      )}

      {hasAnyInTab && filtered.length === 0 && (
        <EmptyState
          title="No items match your filters"
          message="Try a different search term or category."
          action={
            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                updateParam('q', '');
                updateParam('category', 'all');
              }}
            >
              Clear filters
            </button>
          }
        />
      )}

      {filtered.length > 0 && (
        <>
          <p className="result-count">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</p>
          <div className="grid">
            {filtered.map((item) => (
              <ItemCard key={item.collectionId} item={item} onRemove={removeItem} onMove={moveItem} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
