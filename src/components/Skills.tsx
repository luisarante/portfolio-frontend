import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { SkillList } from "../components/SkillList"; 
import type { Skill } from "../components/SkillList"; 


export function Skills() {
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [projects, setProjects] = useState<Skill[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    type FilterOption = {
        label: string; 
        value: string; 
    }

    const filters: FilterOption[] = [
        { label: "Todos", value: "Todos" },
        { label: "Front-end", value: "Front-end" },
        { label: "Back-end", value: "Back-end" },
        { label: "Banco de dados", value: "BD" }, 
        { label: "Ferramentas", value: "Ferramentas" },
    ];

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

        axios.get<Skill[]>(`${API_URL}/api/my-skills`)
            .then(res => setProjects(res.data))
            .catch(err => {
                if (axios.isAxiosError(err)) {
                    setError(err.message);
                } else {
                    setError("Ocorreu um erro inesperado.");
                }
            })
            .finally(() => setLoading(false));
    }, []); 

    const filteredProjects = projects.filter(project => {
        if (activeFilter === "Todos") return true;

        if (Array.isArray(project.category)) {
            return project.category.includes(activeFilter);
        }
        return project.category === activeFilter;
    });

    return(
        <section className="py-8 px-4 bg-surface rounded-3xl flex flex-col items-center w-full">
            <h2 className="text-white font-medium text-3xl mb-4">Habilidades Técnicas</h2>
            
            <div className="w-full rounded-full mt-4 bg-white flex overflow-x-auto px-4 gap-2 whitespace-nowrap py-2 no-scrollbar">
                {filters.map((filter) => (
                    <Link 
                        key={filter.value} 
                        to="#" 
                        onClick={() => setActiveFilter(filter.value)} 
                        className={`py-2 px-4 rounded-full ...
                            ${activeFilter === filter.value ? "bg-primary text-white" : "text-primary hover:bg-primary/10"}`}
                    >
                        {filter.label} 
                    </Link>
                ))}
            </div>

            <SkillList
                loading={loading}
                error={error}
                projects={filteredProjects} 
            />
        </section>
    );
}