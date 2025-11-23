import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Technology {
  id: number;
  name: string;
  icon: string | null;
  color: string | null;
  category: string | null;
  showInPortfolio: boolean;
}

export function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkRepo, setLinkRepo] = useState("");
  const [linkDemo, setLinkDemo] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [mediaPrincipalUrl, setMediaPrincipalUrl] = useState("");
  const [proposito, setProposito] = useState("");

  const [status, setStatus] = useState<
    "EM_DESENVOLVIMENTO" | "CONCLUIDO" | "ARQUIVADO"
  >("EM_DESENVOLVIMENTO");

  const [aprendizadoInput, setAprendizadoInput] = useState("");
  const [aprendizados, setAprendizados] = useState<string[]>([]);

  const [imageInput, setImageInput] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]); 

  const [allTechnologies, setAllTechnologies] = useState<Technology[]>([]);
  const [selectedTechnologyNames, setSelectedTechnologyNames] = useState<string[]>([]); 

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  useEffect(() => {
    async function loadTechs() {
      if (!token) return;

      try {
        const res = await axios.get<Technology[]>(
          `${import.meta.env.VITE_API_URL}/api/skills`,
          {
            headers: {
                Authorization: `Bearer ${token}`
            }
          }
        );
        setAllTechnologies(res.data);
      } catch (error) {
        console.error("Erro ao carregar tecnologias:", error);
        setError("Não foi possível carregar as tecnologias existentes.");
      }
    }
    loadTechs();
  }, [token]);

  function addAprendizado() {
    if (!aprendizadoInput.trim()) return;
    setAprendizados([...aprendizados, aprendizadoInput.trim()]);
    setAprendizadoInput("");
  }

  function addImage() {
    if (!imageInput.trim()) return;
    setImages([...images, imageInput.trim()]);
    setImageInput("");
  }

  function addTechManual() {
    if (!techInput.trim()) return;
    setTechnologies([...technologies, techInput.trim()]);
    setTechInput("");
  }

  function removeAprendizado(i: number) {
    setAprendizados(aprendizados.filter((_, index) => index !== i));
  }

  function removeImage(i: number) {
    setImages(images.filter((_, index) => index !== i));
  }

  function removeTechManual(i: number) {
    setTechnologies(technologies.filter((_, index) => index !== i));
  }

  function toggleTech(techName: string) {
    if (selectedTechnologyNames.includes(techName)) {
      setSelectedTechnologyNames(selectedTechnologyNames.filter((t) => t !== techName));
    } else {
      setSelectedTechnologyNames([...selectedTechnologyNames, techName]);
    }
  }

  async function handleSubmit(e: FormEvent) {
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
      const existingTechnologyIds = allTechnologies
        .filter(tech => selectedTechnologyNames.includes(tech.name))
        .map(tech => tech.id);

      const projectData = {
        title,
        description,
        linkRepo,
        linkDemo,
        projectDate,
        status,
        proposito,
        media_principal_url: mediaPrincipalUrl,
        aprendizados,
        technologies: {
          existingIds: existingTechnologyIds, 
          newNames: technologies, 
        },
        images: images,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        projectData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
      );

      setSuccess(true);
      
    } catch (error) {
      console.error("Erro ao enviar o projeto:", error);
      const axiosError = axios.isAxiosError(error) ? error.response?.data?.error || error.response?.data?.message : null;
      setError(`Erro ao cadastrar o projeto: ${axiosError || "Verifique o console para detalhes."}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">✨ Novo Projeto</h2>

      <div className="flex flex-col">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">Título</label>
        <input
          id="title"
          type="text"
          className="border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          id="description"
          rows={3}
          className="border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col col-span-1">
          <label htmlFor="repo" className="text-sm font-medium text-gray-700">Link Repositório</label>
          <input
            id="repo"
            type="url"
            className="border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={linkRepo}
            onChange={(e) => setLinkRepo(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label htmlFor="demo" className="text-sm font-medium text-gray-700">Link Demo</label>
          <input
            id="demo"
            type="url"
            className="border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={linkDemo}
            onChange={(e) => setLinkDemo(e.target.value)}
            required
          />
        </div>
         <div className="flex flex-col col-span-1">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">Data do Projeto</label>
          <input
            id="date"
            type="date"
            className="border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={projectDate}
            onChange={(e) => setProjectDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="proposito" className="text-sm font-medium text-gray-700">Propósito</label>
        <textarea
          id="proposito"
          rows={2}
          className="border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={proposito}
          onChange={(e) => setProposito(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="mediaUrl" className="text-sm font-medium text-gray-700">Media Principal (URL da Imagem/Vídeo)</label>
        <input
          id="mediaUrl"
          type="url"
          className="border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={mediaPrincipalUrl}
          onChange={(e) => setMediaPrincipalUrl(e.target.value)}
        />
      </div>
      
      ---
      
      <div className="flex flex-col border p-4 rounded-lg bg-gray-50">
        <label className="text-sm font-medium text-gray-700 mb-2">Aprendizados Chave</label>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ex: Integração com Stripe"
            value={aprendizadoInput}
            onChange={(e) => setAprendizadoInput(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg flex-1"
          />
          <button type="button" onClick={addAprendizado} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150">
            Adicionar
          </button>
        </div>

        <ul className="list-inside mt-3 space-y-1">
          {aprendizados.map((a, i) => (
            <li key={i} className="flex justify-between items-center text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">
              {a}
              <button type="button" onClick={() => removeAprendizado(i)} className="text-red-500 hover:text-red-700 ml-4 font-bold">
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col border p-4 rounded-lg bg-gray-50">
        <label className="text-sm font-medium text-gray-700 mb-2">Imagens Secundárias (URLs)</label>

        <div className="flex gap-2">
          <input
            type="url"
            placeholder="URL da imagem..."
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg flex-1"
          />
          <button type="button" onClick={addImage} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150">
            Adicionar
          </button>
        </div>

        <ul className="list-inside mt-3 space-y-1">
          {images.map((img, i) => (
            <li key={i} className="flex justify-between items-center text-sm text-gray-700 bg-white p-2 rounded border border-gray-200 truncate">
              {img}
              <button type="button" onClick={() => removeImage(i)} className="text-red-500 hover:text-red-700 ml-4 font-bold shrink-0">
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      ---
      
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">Tecnologias Existentes</label>
        {loading && <p className="text-gray-500">Carregando tecnologias...</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="flex flex-wrap gap-2 border p-3 rounded-lg bg-gray-50 max-h-48 overflow-y-auto">
          {allTechnologies.map((tech) => {
            const isSelected = selectedTechnologyNames.includes(tech.name);
            
            return (
              <label
                key={tech.id}
                onClick={() => toggleTech(tech.name)}
                className={`
                  px-4 py-2 rounded-full cursor-pointer transition-colors duration-200
                  font-medium text-xs shadow-sm
                  ${isSelected
                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  className="hidden" 
                />
                {tech.name}
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col border p-4 rounded-lg bg-gray-50">
        <label className="text-sm font-medium text-gray-700 mb-2">Adicionar Nova Tecnologia (Manual)</label>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ex: SvelteKit"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg flex-1"
          />
          <button type="button" onClick={addTechManual} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150">
            Adicionar
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {technologies.map((t, i) => (
            <div key={i} className="flex items-center bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-300">
              {t} (Novo)
              <button type="button" onClick={() => removeTechManual(i)} className="text-red-500 hover:text-red-700 ml-2 font-bold text-sm leading-none">
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
      
      ---

      <div className="flex flex-col">
        <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="EM_DESENVOLVIMENTO">Em desenvolvimento</option>
          <option value="CONCLUIDO">Concluído</option>
          <option value="ARQUIVADO">Arquivado</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-primary cursor-pointer text-white py-3 rounded-lg text-lg font-semibold hover:opacity-80 disabled:opacity-50 transition duration-150"
      >
        {loading ? "Salvando..." : "Cadastrar Projeto"}
      </button>

      {success && <p className="text-center text-green-600 mt-2">✅ Projeto criado com sucesso!</p>}
      {error && <p className="text-center text-red-600 mt-2">❌ {error}</p>}
    </form>
  );
}