const StatCard = ({ label, value, detail }) => (
  <article className="stat-card">
    <span>{label}</span>
    <strong>{value}</strong>
    <small>{detail}</small>
  </article>
)

export default StatCard
