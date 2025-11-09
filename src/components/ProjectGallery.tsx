// Em 'src/pages/ProjectGallery.tsx' (exemplo)
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Project } from '../components/Project'; // Importe seu card

// A interface DEVE BATER com a API (Project + Technologies)
interface ApiTechnology {
    id: number;
    name: string;
    icon: string;
    color: string;
}

interface ApiImage {
    id: number;
    url: string;
    altText: string | null;
}

interface ApiProject {
    id: number;
    title: string;
    description: string;
    linkRepo: string; 
    linkDemo: string;  
    
    images: ApiImage[]; // Agora é um array de imagens
    technologies: Array<{ // É um array da tabela de junção
        technology: ApiTechnology 
    }>;
}

export function ProjectGallery() {
    const [projects, setProjects] = useState<ApiProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;
        axios.get(`${API_URL}/api/projects`)
            .then(res => setProjects(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 1 }).map((_, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-lg bg-gray-800"> 
                        <div className="relative h-48 w-full bg-gray-700 animate-pulse"></div>
                        <div className="px-6 py-4">
                            <div className="space-y-3">
                                <div className="h-6 bg-gray-700 rounded w-3/4 animate-pulse"></div> 
                                <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        );
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
                <Project 
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    
                    coverImage={project.images[0]?.url || ""}
                    
                    technologies={project.technologies.map(t => t.technology)}
                    
                    id={project.id}
                />
            ))}
        </section>
    );
}