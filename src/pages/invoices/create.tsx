import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateInvoice() {
  const router = useRouter();
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: 1, unitPrice: 0 }]);
  const [tax, setTax] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const total = subtotal + tax;

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/invoices/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientName, clientEmail, items, subtotal, tax, total }),
    });
    if (res.ok) {
      const invoice = await res.json();
      router.push(`/invoices/${invoice.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Nueva Factura</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre del Cliente</label>
            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Email del Cliente</label>
            <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700" required />
          </div>
          <div>
            <h3 className="font-medium mb-2">Items</h3>
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                <input type="text" placeholder="Descripción" value={item.description}
                  onChange={(e) => { const newItems = [...items]; newItems[index].description = e.target.value; setItems(newItems); }}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700" />
                <input type="number" placeholder="Cantidad" value={item.quantity}
                  onChange={(e) => { const newItems = [...items]; newItems[index].quantity = Number(e.target.value); setItems(newItems); }}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700" />
                <input type="number" placeholder="Precio Unitario" value={item.unitPrice}
                  onChange={(e) => { const newItems = [...items]; newItems[index].unitPrice = Number(e.target.value); setItems(newItems); }}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700" />
              </div>
            ))}
            <button type="button" onClick={addItem} className="text-blue-600 hover:underline text-sm">+ Agregar Item</button>
          </div>
          <div>
            <label className="block text-sm font-medium">Impuesto</label>
            <input type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700" />
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Crear Factura</button>
        </form>
      </div>
    </div>
  );
}
