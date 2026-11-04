// Stand-in for pages that haven't been built yet, so every nav link goes somewhere.
export default function ComingSoon({ title }: { title: string }) {
  return (
    <div style={{ flex: 1, padding: 48, textAlign: 'center', color: 'var(--ink-muted)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--ink)', marginBottom: 8 }}>
        {title}
      </h1>
      <p style={{ fontSize: 14 }}>This page hasn't been built yet.</p>
    </div>
  )
}
