import { useEffect, useState } from 'react';
import { Login } from './pages/Login';

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  if (!token) {
    return <Login onAuthenticated={setToken} />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Bem-vindo!</h1>
      <p>Dashboard (será implementado em M5)</p>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          setToken(null);
        }}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default App;
