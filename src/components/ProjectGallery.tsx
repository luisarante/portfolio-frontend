// Em 'src/pages/ProjectGallery.tsx' (exemplo)
import { useEffect, useState, type TouchEvent} from 'react';
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
    
    images: ApiImage[];
    technologies: Array<{
        technology: ApiTechnology 
    }>;
}

export function ProjectGallery() {
    const [projects, setProjects] = useState<ApiProject[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth >= 1024 ? 2 : 1);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;
        axios.get(`${API_URL}/api/projects`)
            .then(res => setProjects(res.data))
            .finally(() => setLoading(false));
    }, []);

    const totalSlides = projects.length;

    const nextSlide = () => {
        if (currentIndex < totalSlides - itemsPerPage) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setCurrentIndex(0); 
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else {
            setCurrentIndex(totalSlides - itemsPerPage); 
        }
    };

    const onTouchStart = (e: TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
    };

    if (loading) {
        return (
            <section className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 2 }).map((_, index) => (
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
        <section className="relative w-full mx-auto group">

            <div 
                className="overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Mudança Principal aqui: 
                   Adicionamos 'items-stretch' para garantir que todos tenham a mesma altura na linha 
                */}
                <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ 
                        transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` 
                    }}
                >
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            // CORREÇÃO CRÍTICA:
                            // 1. flex-shrink-0: Impede que o card encolha ou fique menor que o outro.
                            // 2. w-full (mobile) ou w-1/2 (PC): Garante a largura correta.
                            className={`flex-shrink-0 lg:px-3  ${itemsPerPage === 2 ? 'w-1/2' : 'w-full'}`}
                        >
                            {/* Wrapper do Card:
                                h-full: Força o card a ocupar toda a altura disponível da linha (iguala as alturas).
                            */}
                            <div className="h-full w-full">
                                <Project 
                                    key={project.id}
                                    title={project.title}
                                    description={project.description}
                                    
                                    coverImage={project.images[0]?.url || ""}
                                    
                                    technologies={project.technologies.map(t => t.technology)}
                                    
                                    id={project.id}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Setas (Apenas Desktop) */}
            <button 
                onClick={prevSlide}
                className="hidden lg:block absolute top-1/2 -left-12 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg z-10 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <button 
                onClick={nextSlide}
                className="hidden lg:block absolute top-1/2 -right-12 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg z-10 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: Math.ceil(totalSlides - (itemsPerPage - 1)) }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`p-2 focus:outline-none`}
                    >
                        <div className={`h-2 rounded-full transition-all ${
                            currentIndex === idx ? "bg-blue-500 w-8" : "bg-gray-600 w-2"
                        }`}></div>
                    </button>
                ))}
            </div>
        </section>
    );
}