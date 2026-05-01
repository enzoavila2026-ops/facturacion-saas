import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function InvoiceDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/invoices/list`)
        .then(res => res.json())
        .then(data => {
          const found = data.find((inv: any) => inv.id === id);
          setInvoice(found);
        });
    }
  }, [id]);

  const handleSendEmail = async () => {
    const res = await fetch('/api/invoices/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId: id }),
    });
    if (res.ok) alert('Factura enviada por email');
  };

  if (!invoice) return <div className="p-8">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Factura #{invoice.id.slice(0, 8)}</h1>
        <div className="space-y-2 mb-4">
          <p><strong>Cliente:</strong> {invoice.clientName}</p>
          <p><strong>Email:</strong> {invoice.clientEmail}</p>
          <p><strong>Estado:</strong> {invoice.status === 'paid' ? 'Pagada' : invoice.status === 'sent' ? 'Enviada' : 'Pendiente'}</p>
          <p><strong>Total:</strong> ${invoice.total.toFixed(2)}</p>
        </div>
        <button onClick={handleSendEmail} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mr-2">Enviar por Email</button>
        <button onClick={() => router.push('/dashboard')} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Volver al Dashboard</button>
      </div>
    </div>
  );
}
