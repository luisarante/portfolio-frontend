import { Link } from "react-router-dom"; 
import { FaArrowRight, FaQuestionCircle } from "react-icons/fa";
import { iconMap } from '../lib/icons.ts';

interface ProjectTechnology {
    id: number;
    name: string;
    icon: string;
    color: string;
}

interface ProjectProps {
    title: string;
    description: string;
    coverImage: string; 
    projectUrl: string; 
    technologies: ProjectTechnology[]; 
}

export function Project({ title, description, coverImage, projectUrl, technologies }: ProjectProps) {
    return (
        <div className="rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-48 w-full">
                <img 
                    src={coverImage} 
                    alt={title} 
                    className="w-full h-full object-cover"
                />
                
                <div className="absolute left-4 bottom-2 flex gap-2 z-10">
                    {technologies.slice(0, 3).map((tech) => {
                        const IconComponent = iconMap[tech.icon] || FaQuestionCircle;
                        return (
                            <div key={tech.id} className="p-2 bg-surface/70 rounded-full backdrop-blur-sm">
                                <IconComponent 
                                    size={20} 
                                    style={{ color: tech.color }} 
                                />
                            </div>
                        );
                    })}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-surface to-transparent h-1/4 w-full z-0"></div>
            </div>
            
            <div className="flex justify-between items-center px-6 py-4 bg-surface">
                <div className="flex flex-col">
                    <h3 className="text-white font-medium text-lg">{title}</h3>
                    <p className="text-[#7C7C7C] text-md">{description}</p>
                </div>
                
                <Link 
                    to={projectUrl}
                >
                    <FaArrowRight size={20} style={{ color: "#7C7C7C" }}/>
                </Link>
            </div>
        </div>
    )
}