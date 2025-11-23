import { Skills } from "../components/Skills";
import { ProjectGallery } from "../components/ProjectGallery";
import { Contact } from "../components/Contact";
import { Sobre } from "../components/Sobre"
import { Hero } from "../components/Hero"



export function Home() {
    return (
        <>
            <div className="absolute top-0" id="hero"></div>
            <Hero/>

            <Sobre/>

            <Skills/>

            <section className="px-4">
                <div className="border-b border-gray-300 py-12" id="projetos">
                    <h2 className="text-primary font-medium text-3xl mb-4">Projetos</h2>
                    <ProjectGallery/>
                </div>
            </section>

            <Contact/>
        </>
    )
}