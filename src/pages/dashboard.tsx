import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
    if (status === 'authenticated') {
      fetch('/api/invoices/list')
        .then(res => res.json())
        .then(data => {
          setInvoices(data);
          const revenue = data
            .filter((inv: any) => inv.status === 'paid')
            .reduce((sum: number, inv: any) => sum + inv.total, 0);
          setTotalRevenue(revenue);
        });
    }
  }, [status]);

  if (status === 'loading') return <div className="p-8">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard de Facturación</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-gray-500">Total Facturado (mes)</p>
            <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-gray-500">Facturas Pendientes</p>
            <p className="text-2xl font-bold">{invoices.filter((i: any) => i.status === 'pending' || i.status === 'sent').length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-gray-500">Total Pagadas</p>
            <p className="text-2xl font-bold">{invoices.filter((i: any) => i.status === 'paid').length}</p>
          </div>
        </div>
        <button
          onClick={() => router.push('/invoices/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-6"
        >
          + Nueva Factura
        </button>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Cliente</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv: any) => (
                <tr key={inv.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3">{inv.clientName}</td>
                  <td className="p-3">${inv.total.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      inv.status === 'paid' ? 'bg-green-100 text-green-800' :
                      inv.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {inv.status === 'paid' ? 'Pagada' : inv.status === 'sent' ? 'Enviada' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="p-3">{new Date(inv.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
