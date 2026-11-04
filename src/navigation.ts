// Every page the app can show. App.tsx switches between these.
export type View =
  // Public portal
  | 'browse'
  | 'collections'
  | 'submit'
  | 'request'
  // Staff portal
  | 'staff-dashboard'
  | 'upload'
  | 'review-queue'
  | 'staff-collections'
  | 'staff-requests'

export type Navigate = (view: View) => void

const STAFF_VIEWS: View[] = ['staff-dashboard', 'upload', 'review-queue', 'staff-collections', 'staff-requests']

export function isStaffView(view: View) {
  return STAFF_VIEWS.includes(view)
}
