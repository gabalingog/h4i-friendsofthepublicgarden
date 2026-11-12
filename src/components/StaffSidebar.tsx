import '../styles/staff_sidebar.css'
import type { Navigate, View } from '../navigation'

// Badge counts are hardcoded to match the mockup until there's real data.
const ITEMS: { label: string; view: View; icon: string; badge?: number }[] = [
  { label: 'Browse', view: 'staff-dashboard', icon: '⊞' },
  { label: 'Upload', view: 'upload', icon: '↑' },
  { label: 'Review Queue', view: 'review-queue', icon: '◎', badge: 3 },
  { label: 'Collections', view: 'staff-collections', icon: '⊟' },
  { label: 'Requests', view: 'staff-requests', icon: '✉', badge: 7 },
]

export default function StaffSidebar({ active, onNavigate }: { active: View; onNavigate: Navigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-user">
        <p className="sidebar-label">Staff Portal</p>
        <div className="sidebar-user-row">
          <div className="sidebar-avatar">MC</div>
          <span className="sidebar-user-name">M. Callahan</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {ITEMS.map(({ label, view, icon, badge }) => (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className={active === view ? 'sidebar-item active' : 'sidebar-item'}
          >
            <span className="sidebar-item-label">
              <span className="sidebar-item-icon">{icon}</span>
              {label}
            </span>
            {badge !== undefined && <span className="sidebar-badge">{badge}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-footer-btn">
          <span>⚙</span> Settings
        </button>
        <button className="sidebar-footer-btn">
          <span>↪</span> Sign Out
        </button>
      </div>
    </aside>
  )
}
