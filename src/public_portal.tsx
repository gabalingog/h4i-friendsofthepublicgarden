import { useState } from 'react'
import './styles/public_portal.css'

const FILTERS = [
  'People',
  'Animals & Wildlife',
  'Plants & Flowers',
  'Park Scenes',
  'Statues & Monuments',
  'Birds',
  'Water & Lagoon',
  'Seasonal',
]

export default function PublicPortal() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  return (
    <div className="portal">
      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">
          Boston Public Garden
          <br />
          <em>Photo Archive</em>
        </h1>
        <p className="hero-text">
          Over 1,200 photographs spanning a century of the Garden's history — free to browse, available for press and educational use.
        </p>
        <div className="search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search photos — try 'swan boats' or 'tulips'…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </section>

      {/* Filters */}
      <div className="filters">
        <span className="filters-label">Filter:</span>
        {FILTERS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
            aria-pressed={activeFilter === tag}
            className={activeFilter === tag ? 'chip active' : 'chip'}
          >
            {tag}
          </button>
        ))}
        {(activeFilter || search) && (
          <button
            onClick={() => {
              setActiveFilter(null)
              setSearch('')
            }}
            className="clear-btn"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}