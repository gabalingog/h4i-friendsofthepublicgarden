import '../styles/header.css'
import type { Navigate, View } from '../navigation'

const PUBLIC_NAV: { label: string; view: View }[] = [
  { label: 'Browse', view: 'browse' },
  { label: 'Collections', view: 'collections' },
  { label: 'Submit Photos', view: 'submit' },
  { label: 'Request a Photo', view: 'request' },
]

const STAFF_NAV: { label: string; view: View }[] = [
  { label: 'Dashboard', view: 'staff-dashboard' },
  { label: 'Bulk Upload', view: 'upload' },
  { label: 'Photo Detail', view: 'review-queue' },
  { label: 'Requests', view: 'staff-requests' },
  { label: 'Collections', view: 'staff-collections' },
]

export default function Header({
  staff,
  currentView,
  onNavigate,
}: {
  staff: boolean
  currentView: View
  onNavigate: Navigate
}) {
  const nav = staff ? STAFF_NAV : PUBLIC_NAV

  return (
    <header className="header">
      <div className="header-top">
        <div className="brand">
          <div className="brand-logo">FPG</div>
          <div>
            <div className="brand-name">Friends of the Public Garden</div>
            <div className="brand-sub">Photo Library Portal</div>
          </div>
        </div>
        <span className="header-mode">{staff ? 'Staff View' : 'Public Portal'}</span>
      </div>

      <div className="nav">
        {nav.map(({ label, view }) => (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className={currentView === view ? 'nav-pill active' : 'nav-pill'}
          >
            {label}
          </button>
        ))}
        <div className="nav-spacer">
          <button
            className="nav-pill switch"
            onClick={() => onNavigate(staff ? 'browse' : 'staff-dashboard')}
          >
            {staff ? '→ Public View' : '→ Staff Login'}
          </button>
        </div>
      </div>
    </header>
  )
}
