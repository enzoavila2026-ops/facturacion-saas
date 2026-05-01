# Sistema de Facturación SaaS

Plataforma profesional de facturación con Next.js, Stripe y PostgreSQL. Crea facturas, genera PDFs automáticos, envíalas por email y gestiona pagos por suscripción. Desplegado en Vercel con API Routes y Prisma ORM.

## 🚀 Demo en vivo
👉 [https://facturacion-saas.vercel.app](https://facturacion-saas.vercel.app)

## 📂 Repositorio
👉 [https://github.com/enzoavila2026-ops/facturacion-saas](https://github.com/enzoavila2026-ops/facturacion-saas)

## ⚙️ Funcionalidades Principales
- **Autenticación segura**: registro e inicio de sesión con Google y credenciales (NextAuth.js + bcrypt).
- **Dashboard de métricas**: ingresos totales, facturas pendientes y pagadas en tiempo real.
- **Creación de facturas**: formulario dinámico con items, impuestos y total automático.
- **PDF descargable**: generación de facturas en PDF con `jsPDF` y `jspdf-autotable`.
- **Envío por email**: envío automático de la factura al cliente con Resend.
- **Pagos por suscripción**: integración con Stripe Checkout para gestionar planes de pago recurrentes.
- **Webhooks de Stripe**: actualización automática del estado de suscripción al completar un pago.

## 🛠️ Stack Tecnológico
| Capa | Tecnología |
|------|------------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS |
| **Backend** | API Routes de Next.js, Node.js |
| **Base de Datos** | PostgreSQL + Prisma ORM |
| **Autenticación** | NextAuth.js (Google + Credentials) |
| **Pagos** | Stripe (Checkout + Webhooks) |
| **PDF** | jsPDF + jspdf-autotable |
| **Email** | Resend |
| **Despliegue** | Vercel |

## 🔧 Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto con estos valores:

```env
DATABASE_URL=postgresql://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
