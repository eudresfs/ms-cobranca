import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import { authenticate } from '../services/auth'
import { useAuth } from '../hooks/useAuth'

const FEATURE_HIGHLIGHTS = [
  {
    title: 'Cobrança Inteligente',
    description: 'Automatize o envio de notificações e reduza a inadimplência com fluxos configuráveis.',
  },
  {
    title: 'Visão Unificada',
    description: 'Centralize clientes, boletos e contratos em um painel intuitivo e fácil de navegar.',
  },
  {
    title: 'Relatórios em Tempo Real',
    description: 'Acompanhe métricas financeiras e de performance com dashboards atualizados ao vivo.',
  },
] as const

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const redirectPath = useMemo(() => {
    const fromState = location.state as { from?: Location } | undefined
    return fromState?.from?.pathname ?? '/dashboard'
  }, [location.state])

  const { mutateAsync, isPending, error, reset } = useMutation({
    mutationFn: authenticate,
    onSuccess: (response) => {
      login(response.token)
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true })
    }
  }, [isAuthenticated, navigate, redirectPath])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email || !password) {
      return
    }

    try {
      await mutateAsync({ email, password })
    } catch (err) {
      console.error('Falha ao autenticar', err)
    }
  }

  const handleFocus = () => {
    if (error) {
      reset()
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-950">
      <aside className="relative hidden flex-1 flex-col justify-between overflow-hidden border-r border-slate-900 bg-gradient-to-br from-primary-900 via-surface to-slate-950 px-14 py-16 text-slate-100 xl:flex">
        <div>
          <span className="rounded-full border border-primary-500/40 bg-primary-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary-200">
            MS Cobrança
          </span>
          <h2 className="mt-8 text-4xl font-semibold leading-snug text-white">
            A forma moderna de gerenciar sua operação de cobrança.
          </h2>
          <p className="mt-4 max-w-xl text-base text-slate-300">
            Simplifique o cadastro de clientes, acompanhe os boletos emitidos e tenha indicadores confiáveis para tomar
            decisões ágeis. Tudo em uma única plataforma.
          </p>
        </div>
        <ul className="grid gap-6">
          {FEATURE_HIGHLIGHTS.map((item) => (
            <li key={item.title} className="rounded-2xl border border-primary-500/10 bg-slate-900/40 p-6">
              <h3 className="text-lg font-semibold text-primary-100">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </li>
          ))}
        </ul>
        <div className="rounded-2xl border border-primary-500/10 bg-slate-900/40 p-6 text-sm text-slate-300">
          <p>
            Precisa de ajuda com sua conta? Entre em contato pelo{' '}
            <a href="mailto:suporte@mscobranca.com.br" className="font-medium text-primary-200">
              suporte@mscobranca.com.br
            </a>
          </p>
        </div>
      </aside>

      <main className="flex min-h-screen flex-1 items-center justify-center px-6 py-10 sm:px-12 lg:px-20">
        <div className="w-full max-w-md rounded-3xl border border-slate-900 bg-slate-950/80 p-10 shadow-card">
          <div className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10">
              <span className="text-lg font-semibold text-primary-200">MS</span>
            </div>
            <h1 className="text-2xl font-semibold text-white">Acesse sua conta</h1>
            <p className="text-sm text-slate-400">
              Informe suas credenciais corporativas para entrar na plataforma MS Cobrança.
            </p>
          </div>

          <form onSubmit={handleSubmit} onFocus={handleFocus} className="mt-10 space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">
                E-mail corporativo
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                placeholder="nome@empresa.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-300">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                Não foi possível autenticar. Verifique suas credenciais e tente novamente.
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? 'Entrando...' : 'Entrar na plataforma'}
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-slate-500">
            Ao acessar você concorda com os termos de uso e políticas de privacidade da MS Cobrança.
          </p>
        </div>
      </main>
    </div>
  )
}
