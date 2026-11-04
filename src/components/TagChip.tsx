import '../styles/tag_chip.css'

export default function TagChip({
  label,
  removable,
  onRemove,
  variant = 'default',
}: {
  label: string
  removable?: boolean
  onRemove?: () => void
  variant?: 'default' | 'ai' | 'public'
}) {
  return (
    <span className={`tag-chip ${variant}`}>
      {label}
      {removable && (
        <button type="button" className="tag-chip-remove" onClick={onRemove} aria-label={`Remove ${label}`}>
          ×
        </button>
      )}
    </span>
  )
}
