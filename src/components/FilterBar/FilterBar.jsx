import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './FilterBar.css';

export default function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  children,
  activeCount = 0,
  onReset,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="filter-bar">
      <div className="filter-bar__row">
        <SearchBar value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} />
        <button className="btn btn-outline filter-bar__toggle" onClick={() => setOpen((v) => !v)}>
          Filters {activeCount > 0 && <span className="filter-bar__badge">{activeCount}</span>}
        </button>
      </div>
      <div className={`filter-bar__controls ${open ? 'is-open' : ''}`}>
        {children}
        {activeCount > 0 && onReset && (
          <button className="btn btn-ghost btn-sm filter-bar__reset" onClick={onReset}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
