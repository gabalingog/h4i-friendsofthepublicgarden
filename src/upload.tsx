import { useRef, useState } from 'react'
import './styles/upload.css'
import TagChip from './components/TagChip'
import { unsplashUrl } from './data/mock_data'

// Fake in-progress uploads from the mockup. Frontend only for now.
const UPLOAD_QUEUE = [
  { id: 1, name: 'IMG_4821.jpg', size: '4.2 MB', progress: 100, tags: ['swan-boats', 'water', 'morning'], unsplash: 'photo-1500534314209-a25ddb2bd429' },
  { id: 2, name: 'IMG_4822.jpg', size: '3.8 MB', progress: 100, tags: ['lagoon', 'reflections', 'trees'], unsplash: 'photo-1441974231531-c6227db76b6e' },
  { id: 3, name: 'IMG_4823.jpg', size: '5.1 MB', progress: 78, tags: ['flowers', 'tulips'], unsplash: 'photo-1416879595882-3373a0480b5b' },
  { id: 4, name: 'IMG_4824.jpg', size: '4.6 MB', progress: 45, tags: ['analyzing…'], unsplash: 'photo-1605684437254-344f03b1e65c' },
  { id: 5, name: 'IMG_4825.jpg', size: '3.2 MB', progress: 12, tags: [], unsplash: 'photo-1473186578172-c141e6798cf4' },
  { id: 6, name: 'IMG_4826.jpg', size: '6.0 MB', progress: 0, tags: [], unsplash: 'photo-1509515837298-2c67a3933321' },
]

export default function Upload() {
  const [dragging, setDragging] = useState(false)
  const [processing, setProcessing] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="upload">
      <div className="upload-inner">
        <div className="upload-heading">
          <h1 className="upload-title">Bulk Photo Ingest</h1>
          <p className="upload-subtitle">
            Upload multiple photos at once. AI tagging runs automatically — review before publishing.
          </p>
        </div>

        {/* Drop zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => {
            e.preventDefault()
            setDragging(false)
            setProcessing(true)
          }}
          className={dragging ? 'dropzone dragging' : 'dropzone'}
        >
          <div className="dropzone-icon">⬆</div>
          <p className="dropzone-title">Drag & drop photos here</p>
          <p className="dropzone-text">or click to browse — JPG, TIFF, RAW accepted</p>
          <button type="button" className="btn-primary">Choose Files</button>
          <input ref={inputRef} type="file" multiple accept="image/*" hidden />
        </div>

        {/* Progress summary */}
        {processing && (
          <div className="upload-progress">
            <div className="upload-progress-body">
              <div className="upload-progress-row">
                <span className="upload-progress-label">Processing 6 of 6 files…</span>
                <span className="upload-progress-count">2 complete · 4 in queue</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '38%' }} />
              </div>
            </div>
            <button className="upload-cancel" onClick={() => setProcessing(false)}>
              Cancel
            </button>
          </div>
        )}

        {/* Preview grid */}
        <div className="upload-grid">
          {UPLOAD_QUEUE.map(p => (
            <div key={p.id} className="upload-card">
              <div className="upload-card-image">
                <img src={unsplashUrl(p.unsplash, 360, 270)} alt={p.name} />
                {p.progress < 100 && (
                  <div className="upload-card-overlay">
                    <div className="upload-card-progress">
                      <div className="progress-track small">
                        <div className="progress-fill light" style={{ width: `${p.progress}%` }} />
                      </div>
                      <p className="upload-card-status">
                        {p.progress > 0 ? `Analyzing… ${p.progress}%` : 'Queued'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="upload-card-body">
                <p className="upload-card-name">{p.name}</p>
                <div className="upload-card-tags">
                  {p.tags.map(t => (
                    <TagChip key={t} label={t} variant={t === 'analyzing…' ? 'ai' : 'default'} />
                  ))}
                  {p.tags.length === 0 && <span className="upload-card-pending">Pending…</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
