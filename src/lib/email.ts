import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInvoiceEmail(toEmail: string, invoiceId: string, pdfBuffer: ArrayBuffer) {
  const base64 = Buffer.from(pdfBuffer).toString('base64');

  await resend.emails.send({
    from: 'Facturación <facturas@tudominio.com>',
    to: toEmail,
    subject: `Factura #${invoiceId}`,
    html: `<p>Adjunto encontrarás tu factura.</p>`,
    attachments: [
      {
        filename: `factura-${invoiceId}.pdf`,
        content: base64,
      },
    ],
  });
}
