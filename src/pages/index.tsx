import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') router.push('/dashboard');
  }, [status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md">
        <h1 className="text-3xl font-bold mb-4">Facturación SaaS</h1>
        <p className="text-gray-500 mb-6">Gestiona tus facturas de forma profesional</p>
        <button onClick={() => signIn('google')} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-2">
          Iniciar sesión con Google
        </button>
        <p className="text-sm text-gray-500">o regístrate con email</p>
      </div>
    </div>
  );
}
