import { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onAuthenticated: (token: string) => void;
}

export function Login({ onAuthenticated }: LoginProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3001'}/auth/login`, {
        email,
        senha,
      });
      localStorage.setItem('token', res.data.token);
      onAuthenticated(res.data.token);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErro(error.response?.data?.message ?? 'Erro ao fazer login');
      } else {
        setErro('Erro ao fazer login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-lg w-80 space-y-4">
        <h1 className="text-2xl font-bold">Gestão de Cobranças</h1>
        {erro && <p className="text-red-500">{erro}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
