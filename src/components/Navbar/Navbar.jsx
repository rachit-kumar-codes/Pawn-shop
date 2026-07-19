import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCollection } from '../../context/CollectionContext';
import './Navbar.css';

const links = [
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/community', label: 'Community' },
  { to: '/collection', label: 'My Collection' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { countFor } = useCollection();
  const totalSaved = countFor('owned') + countFor('wishlist') + countFor('selling');

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/marketplace" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__mark">CH</span>
          <span className="navbar__wordmark">Collector&rsquo;s Hub</span>
        </NavLink>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
              {link.to === '/collection' && totalSaved > 0 && (
                <span className="navbar__count">{totalSaved}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          className="navbar__toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
