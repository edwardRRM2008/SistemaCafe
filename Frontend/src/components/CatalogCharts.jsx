import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const chartColors = ['#a15b36', '#d58b58', '#6e9a8c', '#d1a64a', '#7b6658', '#b45f55']

const CatalogCharts = ({ products }) => {
  const labels = products.map((product) => product.name)
  const stockData = {
    labels,
    datasets: [
      {
        label: 'Unidades en stock',
        data: products.map((product) => product.stock),
        backgroundColor: products.map((_, index) => chartColors[index % chartColors.length]),
        borderRadius: 4,
        maxBarThickness: 42,
      },
    ],
  }

  const priceData = {
    labels,
    datasets: [
      {
        label: 'Precio',
        data: products.map((product) => product.price),
        backgroundColor: products.map((_, index) => chartColors[index % chartColors.length]),
        borderColor: '#fffdf9',
        borderWidth: 3,
      },
    ],
  }

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true, grid: { color: '#eadbca' } },
      y: { grid: { display: false } },
    },
  }

  const stockOptions = {
    ...baseOptions,
    indexAxis: 'y',
    plugins: {
      ...baseOptions.plugins,
      tooltip: { callbacks: { label: (context) => ` ${context.formattedValue} unidades` } },
    },
    scales: {
      ...baseOptions.scales,
      x: { ...baseOptions.scales.x, title: { display: true, text: 'Unidades' }, ticks: { precision: 0 } },
    },
  }

  const priceOptions = {
    ...baseOptions,
    indexAxis: 'y',
    plugins: {
      ...baseOptions.plugins,
      tooltip: { callbacks: { label: (context) => ` $${context.parsed.x.toFixed(2)}` } },
    },
    scales: {
      ...baseOptions.scales,
      x: { ...baseOptions.scales.x, title: { display: true, text: 'Precio (USD)' }, ticks: { callback: (value) => `$${value}` } },
    },
  }

  return (
    <div className="charts-grid">
      <section className="chart-panel">
        <div className="section-heading">
          <h2>Stock por cafe</h2>
          <span>Unidades disponibles</span>
        </div>
        {products.length ? <div className="chart-container"><Bar data={stockData} options={stockOptions} /></div> : <p className="empty-state">Agrega productos para ver el grafico.</p>}
      </section>
      <section className="chart-panel">
        <div className="section-heading">
          <h2>Precios del catalogo</h2>
          <span>En USD por cafe</span>
        </div>
        {products.length ? <div className="chart-container"><Bar data={priceData} options={priceOptions} /></div> : <p className="empty-state">Agrega productos para ver el grafico.</p>}
      </section>
    </div>
  )
}

export default CatalogCharts
