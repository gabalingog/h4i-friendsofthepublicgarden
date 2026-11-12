import { useState } from 'react'
import './styles/app.css'
import Header from './components/Header'
import StaffSidebar from './components/StaffSidebar'
import PublicPortal from './public_portal'
import Collections from './collections'
import Upload from './upload'
import ReviewQueue from './review_queue'
import ComingSoon from './coming_soon'
import { isStaffView, type View } from './navigation'

// App shell: shared header, staff sidebar on staff pages, and simple state-based page switching.
export default function App() {
  const [view, setView] = useState<View>('browse')
  const staff = isStaffView(view)

  return (
    <div className="app">
      <Header staff={staff} currentView={view} onNavigate={setView} />

      <div className="app-body">
        {staff && <StaffSidebar active={view} onNavigate={setView} />}

        <main className="app-main">
          {/* Public portal */}
          {view === 'browse' && <PublicPortal />}
          {view === 'collections' && <Collections onNavigate={setView} />}
          {view === 'submit' && <ComingSoon title="Submit Photos" />}
          {view === 'request' && <ComingSoon title="Request a Photo" />}

          {/* Staff portal */}
          {view === 'staff-dashboard' && <ComingSoon title="Staff Dashboard" />}
          {view === 'upload' && <Upload />}
          {view === 'review-queue' && <ReviewQueue />}
          {view === 'staff-collections' && <Collections onNavigate={setView} />}
          {view === 'staff-requests' && <ComingSoon title="Photo Requests" />}
        </main>
      </div>
    </div>
  )
}
