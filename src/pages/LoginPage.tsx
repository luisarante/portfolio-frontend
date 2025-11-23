import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.tsx'; 

const API_URL = import.meta.env.VITE_API_URL;

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      
      const { token, user } = res.data;
      
      login(token, user); 
      
      navigate('/painel'); 
      
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Erro ao fazer login. Verifique as credenciais.');
      } else {
        setError('Erro de conexão com a API.');
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Acesso ao Dashboard</h2>
        
        {error && <p className="text-red-600 mb-4">{error}</p>}
        
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white p-2 w-full rounded-md cursor-pointer disabled:opacity-50 hover:opacity-90"
        >
          {loading ? 'Acessando...' : 'Entrar'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-800 hover:underline cursor-pointer"
        >
          ← Voltar ao Portfólio
        </button>
      </form>
    </div>
  );
}