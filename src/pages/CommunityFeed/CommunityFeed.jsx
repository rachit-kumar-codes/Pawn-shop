import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchPosts } from '../../utils/mockApi';
import { CATEGORIES } from '../../utils/constants';
import { useDebounce } from '../../hooks/useDebounce';
import PostCard from '../../components/PostCard/PostCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import FilterSelect from '../../components/FilterBar/FilterSelect';
import { GridSkeleton } from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';
import ErrorState from '../../components/ErrorState/ErrorState';

export default function CommunityFeed() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [params, setParams] = useSearchParams();

  const search = params.get('q') ?? '';
  const category = params.get('category') ?? 'all';
  const debouncedSearch = useDebounce(search, 300);

  const load = () => {
    setStatus('loading');
    fetchPosts()
      .then((data) => {
        setPosts(data);
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

  const filtered = useMemo(() => {
    return posts
      .filter((p) => p.caption.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .filter((p) => category === 'all' || p.category === category)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [posts, debouncedSearch, category]);

  return (
    <div className="page container">
      <div className="page-header">
        <div>
          <span className="page-header__eyebrow">Community &middot; {posts.length || '—'} shared finds</span>
          <h1>See what collectors are sharing</h1>
          <p>Discover recent pickups, restorations, and hauls from the community.</p>
        </div>
      </div>

      <FilterBar
        searchValue={search}
        onSearchChange={(v) => updateParam('q', v)}
        searchPlaceholder="Search posts…"
        activeCount={category !== 'all' ? 1 : 0}
        onReset={() => updateParam('category', 'all')}
      >
        <FilterSelect
          label="Category"
          value={category}
          onChange={(v) => updateParam('category', v)}
          options={[{ value: 'all', label: 'All categories' }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
        />
      </FilterBar>

      {status === 'loading' && <GridSkeleton count={8} variant="post" />}

      {status === 'error' && <ErrorState message="We couldn't load the community feed." onRetry={load} />}

      {status === 'success' && filtered.length === 0 && (
        <EmptyState
          title="No posts match your search"
          message="Try a different keyword or category."
          action={
            (search || category !== 'all') && (
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  updateParam('q', '');
                  updateParam('category', 'all');
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
          <p className="result-count">{filtered.length} post{filtered.length !== 1 ? 's' : ''}</p>
          <div className="grid grid--posts">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
