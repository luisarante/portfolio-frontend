import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext"; 
import { ProjectForm } from "../components/ProjectForm";
import { TechnologyForm } from "../components/TechnologyForm";
import { ContactMessages } from "../components/ContactMessages";

type ActiveTab = "projects" | "technologies" | "contact";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("projects");
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout(); 
    navigate("/"); 
  }

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 mt-4">
        <h1 className="text-3xl font-bold text-gray-800">Painel de Controle</h1>
        
        <button
          onClick={handleLogout}
          className="flex items-center cursor-pointer gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors shadow-sm font-medium"
        >
          Sair
        </button>
      </div>

      <div className="flex justify-center px-6 gap-4 mb-8 bg-white py-3 rounded-full shadow-md">
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-6 py-2 rounded-full transition-all duration-200 ${
            activeTab === "projects" 
              ? "bg-primary text-white shadow-md font-medium" 
              : "bg-transparent text-gray-600 hover:bg-gray-100"
          }`}
        >
          Projetos
        </button>
        <button
          onClick={() => setActiveTab("technologies")}
          className={`px-6 py-2 rounded-full transition-all duration-200 ${
            activeTab === "technologies" 
              ? "bg-primary text-white shadow-md font-medium" 
              : "bg-transparent text-gray-600 hover:bg-gray-100"
          }`}
        >
          Tecnologias
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`px-6 py-2 rounded-full transition-all duration-200 ${
            activeTab === "contact" 
              ? "bg-primary text-white shadow-md font-medium" 
              : "bg-transparent text-gray-600 hover:bg-gray-100"
          }`}
        >
          Contato
        </button>
      </div>

      <div className="w-full flex justify-center">
        {activeTab === "projects" && <ProjectForm />}
        {activeTab === "technologies" && <TechnologyForm />}
        {activeTab === "contact" && <ContactMessages />}
      </div>
    </div>
  );
}