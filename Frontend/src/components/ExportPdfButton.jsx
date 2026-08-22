import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import Button from './Button'

const ExportPdfButton = ({ products }) => {
  const exportCatalog = () => {
    const document = new jsPDF()
    const date = new Date().toLocaleDateString('es-ES')

    document.setProperties({
      title: 'Catalogo de cafes CafeAndino',
      subject: 'Listado de cafes registrados',
    })
    document.setFontSize(18)
    document.text('Catalogo de cafes - CafeAndino', 14, 18)
    document.setFontSize(10)
    document.setTextColor(100, 75, 58)
    document.text(`Generado el ${date}`, 14, 25)

    autoTable(document, {
      startY: 34,
      head: [['ID', 'Nombre del cafe', 'Stock', 'Precio']],
      body: products.map((product) => [
        product.id,
        product.name,
        product.stock,
        `$${product.price.toFixed(2)}`,
      ]),
      headStyles: { fillColor: [161, 91, 54] },
      alternateRowStyles: { fillColor: [248, 241, 231] },
      styles: { fontSize: 10, cellPadding: 3 },
    })

    document.save('catalogo-cafeandino.pdf')
  }

  return (
    <Button variant="secondary" onClick={exportCatalog} disabled={!products.length}>
      <i className="bi bi-file-earmark-pdf" aria-hidden="true" />
      Exportar catalogo PDF
    </Button>
  )
}

export default ExportPdfButton
