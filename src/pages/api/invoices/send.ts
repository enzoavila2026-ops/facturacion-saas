import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { generateInvoicePDF } from '@/lib/pdf';
import { sendInvoiceEmail } from '@/lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res);
  if (!session) return res.status(401).json({ error: 'No autorizado' });

  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { invoiceId } = req.body;

  try {
    const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
    if (!invoice) return res.status(404).json({ error: 'Factura no encontrada' });

    const pdfBuffer = generateInvoicePDF(invoice);
    await sendInvoiceEmail(invoice.clientEmail, invoice.id, pdfBuffer);

    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: 'sent' },
    });

    res.status(200).json({ message: 'Factura enviada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar factura' });
  }
}
