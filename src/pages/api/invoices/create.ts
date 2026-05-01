import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res);
  if (!session) return res.status(401).json({ error: 'No autorizado' });

  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { clientName, clientEmail, items, subtotal, tax, total } = req.body;

  try {
    const invoice = await prisma.invoice.create({
      data: {
        userId: (session.user as any).id,
        clientName,
        clientEmail,
        items: JSON.stringify(items),
        subtotal,
        tax,
        total,
      },
    });
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear factura' });
  }
}
