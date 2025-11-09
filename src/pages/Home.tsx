import { SiLinkedin, SiGithub } from "react-icons/si";
import { Skills } from "../components/Skills";
import { ProjectGallery } from "../components/ProjectGallery";
import { Footer } from "../components/Footer";

export function Home() {
    return (
        <>
            <section className="mt-38 px-4" id="hero">
                <div className="border-b pb-12 border-gray-300">
                    <h1 className="font-semibold text-[3.3rem]/14 text-primary">Desenvolvedor Full Stack</h1>
                    <p className="text-primary text-lg mt-6">Focado em transformar ideias em código limpo e funcional.</p>
                    <div className="mt-8 flex gap-4">
                        <a 
                            href="https://www.linkedin.com/in/luis-fernando-arantes" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white bg-linkedin px-6 py-2 rounded-md flex items-center gap-2"
                        >
                            <SiLinkedin />Linkedin
                        </a>
                        <a 
                            href="https://github.com/luisarante" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white bg-github px-6 py-2 rounded-md flex items-center gap-2"
                        >
                            <SiGithub />Github
                        </a>
                    </div>
                    <a 
                        href="../public/meu-cv.pdf" 
                        download="meu-cv.pdf"
                        className="text-white bg-primary px-4 py-4 mt-6 rounded-md shadow-xl inline-block"
                    >
                        Download CV
                    </a>
                </div>
            </section>

            <section className="py-12 flex flex-col gap-4 px-4" id="mais">
                <h2 className="text-primary font-medium text-3xl">Sobre mim</h2>
                <p>Eu sou o tipo de pessoa que gosta de construir coisas e ver o resultado completo. Por isso escolhi o caminho full-stack. O que me atrai é a capacidade de ter uma ideia e trabalhar nela de ponta a ponta, desde o design da tela até a lógica no servidor.</p>
                <p>Como estudante, meu foco principal é absorver e aplicar. Cada projeto que eu faço é uma chance de solidificar o que aprendi e de me desafiar a ir um pouco mais fundo, seja em uma nova tecnologia de front-end ou em uma forma melhor de organizar um banco de dados.</p>
            </section>

            <Skills/>

            <section className="px-4">
                <div className="border-b border-gray-300 py-12" id="projetos">
                    <h2 className="text-primary font-medium text-3xl mb-4">Projetos</h2>
                    <ProjectGallery/>
                </div>
            </section>

            <Footer/>
        </>
    )
}