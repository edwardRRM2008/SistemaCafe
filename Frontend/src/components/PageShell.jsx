const PageShell = ({ eyebrow, title, children }) => (
  <main className="page-shell">
    <p className="eyebrow">{eyebrow}</p>
    <h1>{title}</h1>
    {children}
  </main>
)

export default PageShell
