import './styles/collections.css'
import { COLLECTIONS, unsplashUrl } from './data/mock_data'
import type { Navigate } from './navigation'

// Used by both the public portal and the staff portal (App.tsx decides which shell wraps it).
export default function Collections({ onNavigate }: { onNavigate: Navigate }) {
  return (
    <div className="collections">
      <div className="collections-header">
        <h1 className="collections-title">Curated Collections</h1>
        <p className="collections-subtitle">
          Themed selections from the Friends of the Public Garden archive, assembled by our curatorial team.
        </p>
      </div>

      <div className="collections-grid">
        {COLLECTIONS.map(col => (
          <button key={col.id} className="collection-card" onClick={() => onNavigate('browse')}>
            <div className="collection-cover">
              <img src={unsplashUrl(col.cover, 600, 400)} alt={col.name} />
              <div className="collection-cover-shade" />
              <span className="collection-count">{col.count} photos</span>
            </div>
            <div className="collection-body">
              <h3 className="collection-name">{col.name}</h3>
              <p className="collection-description">{col.description}</p>
              <div className="collection-link">
                Browse collection <span className="collection-arrow">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Featured photo */}
      <div className="featured-wrap">
        <div className="featured">
          <img
            src={unsplashUrl('photo-1558618666-fcd25c85cd64', 1400, 680)}
            alt="Boston Public Garden aerial panorama"
          />
          <div className="featured-overlay">
            <div>
              <p className="featured-label">Staff Pick</p>
              <h2 className="featured-title">"The Garden in Full Bloom"</h2>
              <p className="featured-text">
                An aerial view of the Garden taken during peak tulip season, May 2024. Available for press use upon
                request.
              </p>
              <button className="featured-btn" onClick={() => onNavigate('request')}>
                Request this photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
