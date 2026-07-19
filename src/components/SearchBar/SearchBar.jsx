import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        ⌕
      </span>
      <input
        type="search"
        className="search-bar__input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
      />
      {value && (
        <button className="search-bar__clear" onClick={() => onChange('')} aria-label="Clear search">
          &times;
        </button>
      )}
    </div>
  );
}
