import { useState } from 'react'
import './styles/review_queue.css'
import TagChip from './components/TagChip'
import { PHOTOS, unsplashUrl } from './data/mock_data'

const METADATA = [
  ['Uploaded', 'May 3, 2024 — 7:14 am'],
  ['Uploader', 'Margaret Callahan'],
  ['Camera', 'Sony A7R V'],
  ['Focal length', '85mm'],
  ['Exposure', '1/500s · f/2.8 · ISO 200'],
  ['Location', '42.3541° N, 71.0695° W'],
  ['Area', 'Boston Public Garden Lagoon'],
]

const AI_TAGS = ['blue-hour', 'pedal-boat', 'tourist-attraction']
const SHARE_LINK = 'https://fpg-photos.org/share/img-2024-4821'

export default function ReviewQueue() {
  const photo = PHOTOS[0]
  const [tags, setTags] = useState(['swan-boats', 'water', 'morning-light', 'seasonal', 'lagoon', 'reflections'])
  const [accepted, setAccepted] = useState<string[]>([])
  const [confirmed, setConfirmed] = useState(false)
  const [isPublic, setIsPublic] = useState(false)

  const addTag = (t: string) => {
    setTags(prev => (prev.includes(t) ? prev : [...prev, t]))
  }

  const acceptAiTag = (t: string) => {
    addTag(t)
    setAccepted(prev => [...prev, t])
  }

  return (
    <div className="review">
      {/* Photo preview */}
      <div className="review-preview">
        <div className="review-image-wrap">
          <img src={unsplashUrl(photo.unsplash, 1200, 800)} alt={photo.title} className="review-image" />
          <span className="review-status">Pending Review</span>
        </div>
      </div>

      {/* Metadata panel */}
      <aside className="review-panel">
        <div className="review-section">
          <h2 className="review-title">{photo.title}</h2>
          <p className="review-file">IMG_2024_4821.jpg · 4.2 MB</p>
        </div>

        <div className="review-section">
          <h3 className="review-heading">Metadata</h3>
          <div className="review-meta">
            {METADATA.map(([k, v]) => (
              <div key={k} className="review-meta-row">
                <span className="review-meta-key">{k}</span>
                <span className="review-meta-value">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="review-section">
          <h3 className="review-heading">Tags</h3>
          <div className="review-tags">
            {tags.map(t => (
              <TagChip key={t} label={t} removable onRemove={() => setTags(prev => prev.filter(x => x !== t))} />
            ))}
          </div>
          <input
            type="text"
            placeholder="Add a tag…"
            className="review-tag-input"
            onKeyDown={e => {
              const value = e.currentTarget.value.trim()
              if (e.key === 'Enter' && value) {
                addTag(value)
                e.currentTarget.value = ''
              }
            }}
          />
        </div>

        <div className="review-section">
          <div className="review-ai-heading">
            <h3 className="review-heading">AI-Suggested Tags</h3>
            <span className="review-ai-badge">AI</span>
          </div>
          <div className="review-tags">
            {AI_TAGS.map(t => (
              <button
                key={t}
                onClick={() => acceptAiTag(t)}
                className={accepted.includes(t) ? 'review-ai-tag accepted' : 'review-ai-tag'}
                title={accepted.includes(t) ? 'Already added' : 'Click to add'}
              >
                <TagChip label={`+ ${t}`} variant="ai" />
              </button>
            ))}
          </div>
          <p className="review-ai-note">Confidence: 94% · Model: FPG-Vision v2</p>
        </div>

        {/* Actions */}
        <div className="review-actions">
          <button
            onClick={() => setConfirmed(true)}
            className={confirmed ? 'review-confirm confirmed' : 'review-confirm'}
          >
            {confirmed ? '✓ Tags Confirmed' : 'Confirm Tags'}
          </button>

          <div className="review-public">
            <div>
              <p className="review-public-title">Make Public</p>
              <p className="review-public-text">Generate shareable link</p>
            </div>
            <button
              onClick={() => setIsPublic(v => !v)}
              className={isPublic ? 'toggle on' : 'toggle'}
              role="switch"
              aria-checked={isPublic}
              aria-label="Make public"
            >
              <span className="toggle-knob" />
            </button>
          </div>

          {isPublic && (
            <div className="review-share">
              <span className="review-share-label">Share link</span>
              {SHARE_LINK}
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
