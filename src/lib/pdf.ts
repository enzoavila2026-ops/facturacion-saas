import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export function generateInvoicePDF(invoice: any) {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text('Factura', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Factura #: ${invoice.id.slice(0, 8)}`, 14, 40);
  doc.text(`Cliente: ${invoice.clientName}`, 14, 50);
  doc.text(`Email: ${invoice.clientEmail}`, 14, 60);
  doc.text(`Fecha: ${new Date(invoice.createdAt).toLocaleDateString()}`, 14, 70);

  const items = typeof invoice.items === 'string' ? JSON.parse(invoice.items) : invoice.items;
  const tableData = items.map((item: any) => [
    item.description,
    item.quantity,
    `$${item.unitPrice.toFixed(2)}`,
    `$${(item.quantity * item.unitPrice).toFixed(2)}`,
  ]);

  (doc as any).autoTable({
    startY: 80,
    head: [['Descripción', 'Cantidad', 'Precio Unitario', 'Total']],
    body: tableData,
  });

  const finalY = (doc as any).lastAutoTable.finalY + 20;
  doc.text(`Subtotal: $${invoice.subtotal.toFixed(2)}`, 14, finalY);
  doc.text(`Impuestos: $${invoice.tax.toFixed(2)}`, 14, finalY + 10);
  doc.text(`Total: $${invoice.total.toFixed(2)}`, 14, finalY + 20);

  return doc.output('arraybuffer');
}
