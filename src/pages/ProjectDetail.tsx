import { useEffect, useState, type MouseEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { iconMap, DefaultIcon } from '../lib/icons';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ApiImage {
    id: number;
    url: string;
    altText: string | null;
}

interface ApiTechnology {
    id: number;
    name: string;
    icon: string;
    color: string;
}

interface ApiTechOnProject {
    technology: ApiTechnology;
}

interface ApiProject {
    id: number;
    title: string;
    description: string;
    proposito: string | null;
    aprendizados: string[];
    media_principal_url: string | null;
    status: "EM_DESENVOLVIMENTO" | "CONCLUIDO" | "ARQUIVADO";
    linkRepo: string;
    linkDemo: string;
    projectDate: string;
    images: ApiImage[];
    technologies: ApiTechOnProject[];
}

const statusMap = {
    CONCLUIDO: { text: "Concluído", class: "bg-green-500" },
    EM_DESENVOLVIMENTO: { text: "Em Desenvolvimento", class: "bg-blue-500" },
    ARQUIVADO: { text: "Arquivado", class: "bg-gray-600" }
};

function getYouTubeEmbedUrl(url: string): string | null {
    try {
        const videoUrl = new URL(url);
        const videoId = videoUrl.searchParams.get("v"); 
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
    } catch (e) {
        return null; 
    }
    return null;
}


export function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState<ApiProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [selectedImage, setSelectedImage] = useState<ApiImage | null>(null);

    const displayStatus = project ? statusMap[project.status] : statusMap.ARQUIVADO;
    
    const embedUrl = project?.media_principal_url 
        ? getYouTubeEmbedUrl(project.media_principal_url) 
        : null;

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        
        axios.get(`${API_URL}/api/projects/${id}`)
            .then(res => {
                setProject(res.data);
            })
            .catch(err => {
                setError("Não foi possível carregar o projeto.");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]); 

    if (loading) {
        return (
            <main className="text-white p-4 md:p-8 max-w-6xl mx-auto">
                <header className="flex gap-4 items-center mb-4">
                    <div className="w-14 h-14 p-4 rounded-full bg-gray-700 animate-pulse" />
                    <div className="h-12 w-3/4 bg-gray-700 rounded-lg animate-pulse" />
                </header>

                <div className="space-y-2 mt-2 mb-8">
                    <div className="h-4 w-full bg-gray-700 rounded-lg animate-pulse" />
                    <div className="h-4 w-full bg-gray-700 rounded-lg animate-pulse" />
                    <div className="h-4 w-5/6 bg-gray-700 rounded-lg animate-pulse" />
                </div>

                <div className="flex justify-end mb-2">
                    <div className="w-24 h-6 bg-gray-700 rounded-full animate-pulse" />
                </div>

                <section className="mb-4">
                    <div className="aspect-video w-full bg-gray-700 rounded-lg animate-pulse" />
                </section>

                <section className='mb-8'>
                    <div className="flex gap-2">
                    <div className="w-32 h-10 bg-gray-700 rounded-lg animate-pulse" />
                    <div className="w-32 h-10 bg-gray-700 rounded-lg animate-pulse" />
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="md:col-span-2 space-y-8">
                        <section>
                            <div className="h-8 w-1/3 bg-gray-700 rounded-lg animate-pulse mb-4" />
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-gray-700 rounded-lg animate-pulse" />
                                <div className="h-4 w-full bg-gray-700 rounded-lg animate-pulse" />
                                <div className="h-4 w-4/5 bg-gray-700 rounded-lg animate-pulse" />
                            </div>
                        </section>

                        <section>
                            <div className="h-8 w-1/2 bg-gray-700 rounded-lg animate-pulse mb-4" />
                            <div className="space-y-3">
                                <div className="h-5 w-full bg-gray-700 rounded-lg animate-pulse" />
                                <div className="h-5 w-5/6 bg-gray-700 rounded-lg animate-pulse" />
                                <div className="h-5 w-full bg-gray-700 rounded-lg animate-pulse" />
                            </div>
                        </section>
                    </div>

                    <aside className="md:col-span-1 space-y-8">
                        <section>
                            <div className="h-8 w-3/4 bg-gray-700 rounded-lg animate-pulse mb-4" />
                            <ul className="flex flex-wrap gap-4">
                            {[...Array(6)].map((_, i) => (
                                <li key={i} className="flex flex-col items-center gap-2 w-16">
                                <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
                                <div className="w-12 h-4 bg-gray-700 rounded-lg animate-pulse" />
                                </li>
                            ))}
                            </ul>
                        </section>
                    </aside>
                </div>
                
                <section className="mt-12">
                    <div className="h-8 w-1/4 bg-gray-700 rounded-lg animate-pulse mb-4" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="aspect-square w-full bg-gray-700 rounded-lg animate-pulse" />
                        ))}
                    </div>
                </section>
            </main>
        )
    }

    if (error || !project) {
        return <div className="text-red-500 min-h-screen p-8">{error}</div>;
    }

    return (
        <main className="text-white p-4 md:p-8 max-w-6xl mx-auto">
            <header className="flex gap-4 items-center mt-4">
                <Link to="/" aria-label="Voltar para o início" className="p-4 rounded-full text-[#7C7C7C] bg-primary hover:text-white transition-colors">
                    <FaArrowLeft size={25} />
                </Link>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary">{project.title}</h1>
            </header>
            
            <p className="text-md text-content mt-2 mb-4 pb-4 border-b border-gray-300">{project.description}</p>
            <div className="flex justify-end mb-2">
                <span className={`text-sm px-2 py-1 rounded-full ${displayStatus.class}`}>
                    {displayStatus.text}
                </span>
            </div>

            <section className="mb-4">
                {embedUrl ? (
                    <div className="aspect-video w-full">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={embedUrl} 
                            title={`Vídeo principal de ${project.title}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="rounded-lg"
                        ></iframe>
                    </div>
                ) : project.images.length > 0 && (
                    <img 
                    src={project.images[0].url} 
                    alt={project.images[0].altText || project.title}
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                )}
            </section>

            <section className='mb-8'>
                <div className="flex gap-2">
                    <a href={project.linkRepo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white px-4 py-2 bg-github rounded-lg hover:bg-gray-800 transition-colors">
                        <FaGithub size={20} /> Repositório
                    </a>
                    <a href={project.linkDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <FaExternalLinkAlt size={20} /> Preview
                    </a>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {project.proposito && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">Propósito do Projeto</h2>
                            <p className="text-content whitespace-pre-line">{project.proposito}</p>
                        </section>
                    )}

                    {project.aprendizados.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">Principais Aprendizados</h2>
                            <ul className="list-disc list-inside space-y-2">
                                {project.aprendizados.map((item, index) => (
                                    <li key={index} className="text-content">{item}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                <aside className="md:col-span-1 space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">Tecnologias utilizadas</h2>
                        <ul className="flex flex-wrap gap-4">
                            {project.technologies.map(({ technology }) => {
                                const IconComponent = iconMap[technology.icon] || DefaultIcon;
                                return (
                                    <li key={technology.id} className="flex flex-col items-center gap-2 w-16">
                                        <IconComponent 
                                            size={32}
                                            style={{ 
                                                color: technology.color === "#FFFFFF" ? "#000000" : technology.color 
                                            }}
                                        />
                                        <span className="text-xs text-center text-content">{technology.name}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </aside>
            </div>

            {project.images.length > 1 && (
                <section className="mt-8 mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-primary">Galeria</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        
                        {project.images.slice(embedUrl ? 0 : 1).map(image => (
                            <img 
                                key={image.id}
                                src={image.url}
                                alt={image.altText || project.title}
                                className="w-full h-auto object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => setSelectedImage(image)}
                            />
                        ))}
                    </div>
                </section>
            )}

            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={() => setSelectedImage(null)} 
                >
                    <img
                        src={selectedImage.url}
                        alt={selectedImage.altText || project.title}
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                        onClick={(e: MouseEvent) => e.stopPropagation()} 
                    />
                </div>
            )}
        </main>
    );
}