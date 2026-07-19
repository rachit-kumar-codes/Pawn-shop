import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../../utils/mockApi';
import { CATEGORIES, CONDITIONS } from '../../utils/constants';
import { useDebounce } from '../../hooks/useDebounce';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import FilterSelect from '../../components/FilterBar/FilterSelect';
import { GridSkeleton } from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';
import ErrorState from '../../components/ErrorState/ErrorState';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  // status is one of: 'loading' | 'success' | 'error'
  const [status, setStatus] = useState('loading');
  const [params, setParams] = useSearchParams();

 
  const search = params.get('q') ?? '';
  const category = params.get('category') ?? 'all';
  const condition = params.get('condition') ?? 'all';
  const sort = params.get('sort') ?? 'newest';
  const debouncedSearch = useDebounce(search, 300);

  const load = () => {
    setStatus('loading');
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(load, []);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === '' || value === 'all') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setParams(next, { replace: true });
  };

  const activeFilterCount = [category, condition].filter((v) => v !== 'all').length;

  const resetFilters = () => {
    const next = new URLSearchParams(params);
    next.delete('category');
    next.delete('condition');
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = category === 'all' || p.category === category;
      const matchesCondition = condition === 'all' || p.condition === condition;
      return matchesSearch && matchesCategory && matchesCondition;
    });

    result = [...result].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
    });

    return result;
  }, [products, debouncedSearch, category, condition, sort]);

  return (
    <div className="page container">
      <div className="page-header">
        <div>
          <span className="page-header__eyebrow">Marketplace &middot; {products.length || '—'} lots listed</span>
          <h1>Browse collectible listings</h1>
          <p>Find your next piece from verified sellers across the country.</p>
        </div>
      </div>

      <FilterBar
        searchValue={search}
        onSearchChange={(v) => updateParam('q', v)}
        searchPlaceholder="Search by title…"
        activeCount={activeFilterCount}
        onReset={resetFilters}
      >
        <FilterSelect
          label="Category"
          value={category}
          onChange={(v) => updateParam('category', v)}
          options={[{ value: 'all', label: 'All categories' }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
        />
        <FilterSelect
          label="Condition"
          value={condition}
          onChange={(v) => updateParam('condition', v)}
          options={[{ value: 'all', label: 'All conditions' }, ...CONDITIONS.map((c) => ({ value: c, label: c }))]}
        />
        <FilterSelect
          label="Sort by"
          value={sort}
          onChange={(v) => updateParam('sort', v)}
          options={[
            { value: 'newest', label: 'Newest first' },
            { value: 'price-asc', label: 'Price: Low to high' },
            { value: 'price-desc', label: 'Price: High to low' },
          ]}
        />
      </FilterBar>

      {status === 'loading' && <GridSkeleton count={8} />}

      {status === 'error' && <ErrorState message="We couldn't load marketplace listings." onRetry={load} />}

      {status === 'success' && filtered.length === 0 && (
        <EmptyState
          title="No listings match your search"
          message="Try adjusting your filters or search for a different keyword."
          action={
            (search || activeFilterCount > 0) && (
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  updateParam('q', '');
                  resetFilters();
                }}
              >
                Clear all filters
              </button>
            )
          }
        />
      )}

      {status === 'success' && filtered.length > 0 && (
        <>
          <p className="result-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
          <div className="grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
