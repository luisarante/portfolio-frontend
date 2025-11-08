import { iconMap } from '../lib/icons.ts';
import { FaQuestionCircle } from 'react-icons/fa'; 

export interface Skill {
    id: number;
    name: string;
    icon: string;
    color: string; 
    category: string | string[];
}

interface SkillListProps {
    loading: boolean;
    error: string | null;
    projects: Skill[];
}

export function SkillList({ loading, error, projects }: SkillListProps) {
    
    if (loading) {
        return (
            <ul className="mt-8 grid w-full grid-cols-3 gap-x-4 gap-y-6 md:grid-cols-5 lg:grid-cols-6">
                
                {Array.from({ length: 18 }).map((_, index) => (
                    
                    <li 
                        key={index} 
                        className="flex flex-col items-center justify-start gap-2"
                    >
                        <div className="size-[50px] rounded-lg bg-gray-800 animate-pulse"></div>
                        
                        <div className="h-4 w-16 rounded-md bg-gray-800 animate-pulse"></div>
                    </li>
                ))}
            </ul>
        );
    }

    if (error) {
        return <p className="mt-8 text-red-500 text-center">Erro: {error}</p>;
    }

    if (projects.length === 0) {
        return <p className="mt-8 text-surface text-center">Nenhuma habilidade encontrada.</p>;
    }

    return (
        <ul className="mt-8 grid w-full grid-cols-3 gap-x-4 gap-y-6 md:grid-cols-5 lg:grid-cols-6">
            
            {projects.map((p) => {
                const IconComponent = iconMap[p.icon] || FaQuestionCircle;

                return (
                    <li 
                        key={p.id} 
                        className="flex flex-col items-center justify-start gap-2"
                    >
                        <IconComponent 
                            size={50} 
                            style={{ color: p.color }}
                        />
                        
                        <span className="text-sm text-center text-white">
                            {p.name}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}   