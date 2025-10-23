import { useAuth } from '../hooks/useAuth'

export function Dashboard() {
  const { logout } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/50">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold text-primary-200">MS Cobrança</span>
          <button
            onClick={logout}
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-primary-500 hover:text-primary-200"
          >
            Sair
          </button>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10 shadow-card">
          <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-400">
            Esta é uma área protegida pronta para receber futuras telas do sistema de cobrança. Utilize esta base para
            conectar os módulos de clientes, boletos e relatórios.
          </p>
        </div>
      </main>
    </div>
  )
}
