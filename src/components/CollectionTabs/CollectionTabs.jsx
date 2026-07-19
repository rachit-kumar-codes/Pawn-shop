import './CollectionTabs.css';

const TABS = [
  { key: 'owned', label: 'Owned' },
  { key: 'wishlist', label: 'Wishlist' },
  { key: 'selling', label: 'Selling' },
];


export default function CollectionTabs({ active, onChange, counts }) {
  return (
    <div className="collection-tabs" role="tablist">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          aria-selected={active === tab.key}
          className={`collection-tabs__tab ${active === tab.key ? 'is-active' : ''}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
          <span className="collection-tabs__count">{counts[tab.key]}</span>
        </button>
      ))}
    </div>
  );
}
