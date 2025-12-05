import { SiGithub, SiLinkedin} from "react-icons/si";
import { FaArrowUp } from "react-icons/fa";


export function Footer() {
    return(
        <footer className="bg-surface text-white py-6 mt-12 relative px-4 md:px-8">
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <a href="https://github.com/luisarante" target="_blank" rel="noopener noreferrer" aria-label="Visite meu perfil no GitHub"><SiGithub size={25}/></a>
                    <a href="https://www.linkedin.com/in/luis-fernando-arantes" target="_blank" rel="noopener noreferrer" aria-label="Visite meu perfil no Linkedin"><SiLinkedin size={25}/></a>
                </div>
                <p className="text-sm align-text-bottom text-gray-400">Luis Fernando Arantes</p>
                <a href="#hero" aria-label="Voltar ao topo da página" className="rounded-full bg-background text-content p-4"><FaArrowUp size={20}/></a>
            </div>
        </footer>
    )
}