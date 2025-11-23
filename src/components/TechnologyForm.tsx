import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export function TechnologyForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState(""); 
  const [showInPortfolio, setShowInPortfolio] = useState(true);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    if (!token) {
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/my-skills`, 
        {
          name,
          category,
          icon, 
          color,
          showInPortfolio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setName("");
      setCategory("");
      setIcon("");
      setColor("");
      setShowInPortfolio(true); 
      setSuccess(true);
      
    } catch (err) {
      console.error("Erro ao cadastrar tecnologia:", err);
      if (axios.isAxiosError(err) && err.response && err.response.data) {
        setError(err.response.data.error || "Erro desconhecido ao cadastrar.");
      } else {
        setError("Não foi possível conectar ao servidor ou erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg w-full flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Cadastrar Nova Tecnologia</h2>

      <input
        type="text"
        placeholder="Nome da tecnologia (ex: React, Node.js)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500"
        required
      />

      <input
        type="text"
        placeholder="Categoria (ex: Front-end, Back-end, Banco de dados)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500"
        required
      />
      
      <input
        type="text"
        placeholder="Nome do Ícone (ex: SiReact, DiPython)"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        className="border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500"
        required
      />

      <input
        type="text"
        placeholder="Cor do Ícone (ex: #61DAFB ou vazio para padrão)"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />

      <div className="flex items-center gap-2 p-1">
        <input
          type="checkbox"
          id="showInPortfolio"
          checked={showInPortfolio}
          onChange={(e) => setShowInPortfolio(e.target.checked)}
          className="w-5 h-5 text-primary rounded focus:ring-blue-500 border-gray-300 cursor-pointer"
        />
        <label htmlFor="showInPortfolio" className="text-gray-700 cursor-pointer select-none">
          Mostrar no Portfólio?
        </label>
      </div>
      
      <a href="https://react-icons.github.io/react-icons/" target="_blank" className="text-sm text-gray-500">
        https://react-icons.github.io/react-icons/
      </a>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-4 py-3 rounded-md font-semibold hover:opacity-90 cursor-pointer transition-colors disabled:opacity-50 mt-2"
      >
        {loading ? "Cadastrando..." : "Cadastrar Tecnologia"}
      </button>

      {success && <p className="text-green-600 font-medium text-center">Tecnologia cadastrada com sucesso!</p>}
      {error && <p className="text-red-600 font-medium text-center">Erro: {error}</p>}
    </form>
  );
}