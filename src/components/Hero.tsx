import { SiLinkedin, SiGithub } from "react-icons/si";
import TerminalSimulator from "../components/TerminalSimulator";


export function Hero() {
    return (
        <section className="mt-38 px-4">
            <div className="border-b pb-12 border-gray-300 flex justify-between gap-16">
                <div>
                    <h1 className="font-semibold text-[3.3rem]/14 text-primary">Desenvolvedor Full Stack</h1>
                    <p className="text-primary text-lg mt-6">Focado em transformar ideias em código limpo e funcional.</p>
                    <div className="mt-8 flex gap-4">
                        <a 
                            href="https://www.linkedin.com/in/luis-fernando-arantes" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white bg-linkedin px-6 py-2 rounded-md flex items-center gap-2 hover:shadow-2xl transition duration-400"
                        >
                            <SiLinkedin />Linkedin
                        </a>
                        <a 
                            href="https://github.com/luisarante" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white bg-github px-6 py-2 rounded-md flex items-center gap-2 hover:shadow-2xl transition duration-400"
                        >
                            <SiGithub />Github
                        </a>
                    </div>
                    <a 
                        href="/Luis_Arantes_CV.pdf" 
                        download="Luis_Arantes_CV.pdf"
                        className="text-white bg-primary px-4 py-4 mt-6 rounded-md shadow-xl inline-block"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Download CV
                    </a>
                </div>
                    
                <div className="flex-1 min-h-[300px] w-full md:w-1/2 flex justify-center items-center">
                    <TerminalSimulator />        
                </div>
            </div>
        </section>
    )
}