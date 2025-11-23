import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface ContactMessage {
  id: number;
  nome: string;
  email: string;
  mensagem: string;
  lida: boolean;
  enviadaEm: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  const loadMessages = useCallback(async () => {
    if (!token) return;

    try {
      const res = await axios.get<ContactMessage[]>(`${API_URL}/api/contact`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessages(res.data);
      setError(null);
    } catch (e) {
      console.error("Erro ao carregar mensagens:", e);
      if (axios.isAxiosError(e)) {
        setError(`Falha ao carregar mensagens. Código: ${e.response?.status || 'Sem resposta'}`);
      } else {
        setError("Ocorreu um erro desconhecido ao carregar as mensagens.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]); 

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const markAsRead = async (messageId: number) => {
    if (!token) return;

    try {
      await axios.patch(
        `${API_URL}/api/contact/${messageId}`, 
        { lida: true }, 
        {               
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === messageId ? { ...msg, lida: true } : msg
        )
      );

      console.log(`Mensagem ${messageId} marcada como lida.`);

    } catch (e) {
      console.error(`Erro ao marcar mensagem ${messageId} como lida:`, e);
      alert("Houve um erro ao tentar marcar a mensagem como lida. Tente novamente.");
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Carregando mensagens...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">Erro: {error}</div>;
  }

  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Total de mensagens: {messages.length}</h2>
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">Nenhuma mensagem encontrada.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`p-4 rounded-lg shadow-sm border ${msg.lida ? 'bg-white border-gray-200' : 'bg-yellow-50 border-yellow-200'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-lg">{msg.nome}</p>
                  <p className="text-sm text-gray-600">E-mail: <a href={`mailto:${msg.email}`} className="text-blue-500 hover:underline">{msg.email}</a></p>
                </div>
                {!msg.lida && (
                  <button
                    onClick={() => markAsRead(msg.id)}
                    className="ml-4 px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded hover:bg-green-600 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    Marcar como Lida
                  </button>
                )}
              </div>
              
              <p className="whitespace-pre-wrap mt-2">{msg.mensagem}</p>
              
              <p className="text-xs text-right text-gray-400 mt-3">
                Recebida em: {new Date(msg.enviadaEm).toLocaleString('pt-BR')} 
                <span className={`ml-2 font-medium ${msg.lida ? 'text-green-600' : 'text-orange-600'}`}>
                  ({msg.lida ? 'Lida' : 'Não Lida'})
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}