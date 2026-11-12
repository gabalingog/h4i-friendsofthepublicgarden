import { useState } from 'react'
import './styles/staff_browse.css'
import TagChip from './components/TagChip'
import { ALL_TAGS, PHOTOS, unsplashUrl } from './data/mock_data'
import type { Navigate } from './navigation'

type StatusFilter = 'all' | 'confirmed' | 'unreviewed'

// Staff Browse: every photo (confirmed or not), with status + multi-tag filters.
export default function StaffBrowse({ onNavigate }: { onNavigate: Navigate }) {
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [status, setStatus] = useState<StatusFilter>('all')

  const toggleTag = (t: string) =>
    setSelectedTags(prev => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]))

  const query = search.trim().toLowerCase()
  const photos = PHOTOS.filter(p => {
    const text = [p.title, p.uploader, ...p.tags].join(' ').replaceAll('-', ' ').toLowerCase()
    const matchesSearch = !query || text.includes(query)
    const matchesTags = selectedTags.length === 0 || selectedTags.some(t => p.tags.includes(t))
    const matchesStatus = status === 'all' || (status === 'confirmed' ? p.confirmed : !p.confirmed)
    return matchesSearch && matchesTags && matchesStatus
  })

  const awaitingReview = PHOTOS.filter(p => !p.confirmed).length

  return (
    <div className="staff-browse">
      {/* Toolbar */}
      <div className="sb-toolbar">
        <div className="sb-toolbar-row">
          <div className="sb-search">
            <span className="sb-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by title, tag, or uploader…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="sb-search-input"
            />
          </div>

          <div className="sb-status">
            {(['all', 'confirmed', 'unreviewed'] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                aria-pressed={status === s}
                className={status === s ? 'sb-status-btn active' : 'sb-status-btn'}
              >
                {s}
              </button>
            ))}
          </div>

          <button className="sb-upload-btn" onClick={() => onNavigate('upload')}>
            <span>↑</span> Bulk Upload
          </button>
        </div>

        {/* Tag filter row */}
        <div className="sb-tags">
          {ALL_TAGS.slice(0, 12).map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              aria-pressed={selectedTags.includes(tag)}
              className={selectedTags.includes(tag) ? 'sb-tag active' : 'sb-tag'}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar (archive total and sync time are placeholders) */}
      <div className="sb-stats">
        <span><strong>{photos.length}</strong> photos shown</span>
        <span><strong>{awaitingReview}</strong> awaiting review</span>
        <span><strong>1,284</strong> total in archive</span>
        <span className="sb-stats-sync">Last synced: today at 9:41 am</span>
      </div>

      {/* Photo grid */}
      <div className="sb-grid">
        {photos.map(photo => (
          <button key={photo.id} className="sb-card" onClick={() => onNavigate('review-queue')}>
            <div className="sb-card-image-wrap">
              <img src={unsplashUrl(photo.unsplash, 400, 300)} alt={photo.title} className="sb-card-image" />
              {!photo.confirmed && <span className="sb-badge">Needs Review</span>}
              <div className="sb-card-shade" />
            </div>
            <div className="sb-card-body">
              <p className="sb-card-title">{photo.title}</p>
              <div className="sb-card-tags">
                {photo.tags.slice(0, 2).map(t => (
                  <TagChip key={t} label={t} />
                ))}
                {photo.tags.length > 2 && <span className="sb-card-more">+{photo.tags.length - 2}</span>}
              </div>
              <p className="sb-card-meta">
                {photo.uploader} · {photo.date}
              </p>
            </div>
          </button>
        ))}
      </div>

      {photos.length === 0 && <p className="sb-empty">No photos match those filters.</p>}
    </div>
  )
}
