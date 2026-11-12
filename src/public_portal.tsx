import { useState } from 'react'
import './styles/public_portal.css'
import TagChip from './components/TagChip'
import { PHOTOS, PUBLIC_TAGS, PUBLIC_TAG_FILTERS, unsplashUrl } from './data/mock_data'
import type { Navigate } from './navigation'

// Public Browse: search + friendly filters over confirmed photos only.
export default function PublicPortal({ onNavigate }: { onNavigate: Navigate }) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const query = search.trim().toLowerCase()
  const photos = PHOTOS.filter(photo => {
    if (!photo.confirmed) return false

    const text = [photo.title, photo.uploader, photo.date, ...photo.tags]
      .join(' ')
      .replaceAll('-', ' ')
      .toLowerCase()
    const matchesSearch = !query || text.includes(query)
    const matchesFilter = !activeFilter || PUBLIC_TAG_FILTERS[activeFilter].some(t => photo.tags.includes(t))

    return matchesSearch && matchesFilter
  })

  const clearFilters = () => {
    setActiveFilter(null)
    setSearch('')
  }

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
        {PUBLIC_TAGS.map(tag => (
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
          <button onClick={clearFilters} className="clear-btn">
            Clear filters
          </button>
        )}
      </div>

      <p className="results-count">
        <strong>{photos.length}</strong> {photos.length === 1 ? 'photo' : 'photos'} found
      </p>

      {/* Masonry-style grid */}
      <div className="masonry">
        {photos.map((photo, i) => (
          <div key={photo.id} className="masonry-item" tabIndex={0}>
            <img
              src={unsplashUrl(photo.unsplash, 500, i % 3 === 0 ? 400 : 280)}
              alt={photo.title}
              className="masonry-image"
            />
            <div className="masonry-overlay">
              <p className="masonry-title">{photo.title}</p>
              <div className="masonry-footer">
                <div className="masonry-tags">
                  {photo.tags.slice(0, 2).map(t => (
                    <TagChip key={t} label={t} variant="public" />
                  ))}
                </div>
                <button className="request-btn" onClick={() => onNavigate('request')}>
                  Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 ? (
        <div className="empty-state">
          <p className="empty-text">No photos match those filters.</p>
          <button onClick={clearFilters} className="primary-btn">
            Show all photos
          </button>
        </div>
      ) : (
        <div className="load-more">
          <button className="load-more-btn">Load more photos</button>
        </div>
      )}
    </div>
  )
}
