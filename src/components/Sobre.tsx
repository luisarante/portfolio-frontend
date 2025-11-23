import TimelineItem from "./TimelineItem"

export function Sobre() {
    return(
        <section className="py-12 px-4" id="sobre">
                <div className="lg:grid lg:grid-cols-2 gap-16">
                    <div className="w-full">
                    <h2 className="text-primary font-medium text-3xl mb-4">Experiência Profissional</h2>
                    <div className="pl-4 lg:max-h-120 lg:overflow-y-auto lg:pl-8 timeline-scroll-subtle">
                       <ol className="relative border-l border-gray-700">
                           <TimelineItem
                                ano="2024"
                                titulo="Início da Graduação em Análise e Desenvolvimento de Sistemas"
                                local="FATEC - São Sebastião SP"
                                descricao="Primeiro contato com os fundamentos da programação, focando em lógica algorítmica e estruturas de dados. Aquisição da base teórica essencial para resolução de problemas complexos."
                            />
                            <TimelineItem
                                ano="Fevereiro/2025"
                                titulo="Estágio em Suporte e Gestão de TI"
                                local="Prefeitura de Caraguatatuba"
                                descricao="Desenvolvimento de forte comunicação técnica com usuários e resolução lógica de problemas (troubleshooting). Experiência em ambientes de produção de TI, aprimorando a visão sistêmica e a documentação de procedimentos."
                            />
                            
                            <TimelineItem
                                ano="Atualmente"
                                titulo="Foco em Desenvolvimento Full Stack"
                                local="Em Busca de Oportunidade Júnior/Estágio"
                                descricao="Dedicação integral ao aprofundamento em React e Node.js e a projetos práticos. Busco uma oportunidade para aplicar os conhecimentos adquiridos e desenvolver minha carreira em uma equipe focada em código limpo e funcional."
                            />
                        </ol>
                    </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-primary font-medium text-3xl">Sobre mim</h2>
                        <p className="text-justify">Eu sou o tipo de profissional que se move pela necessidade de construir coisas e ver o resultado completo. Por isso, escolhi o caminho Full Stack. O que me atrai é a capacidade de ter uma ideia e trabalhar nela de ponta a ponta: desde a experiência fluida no Frontend até a lógica robusta e segura no servidor.</p>
                        <p className="text-justify">Minha busca é sempre por código limpo, funcional e sustentável. Meu foco técnico está solidificado em React para interfaces dinâmicas e Node.js/Express para APIs eficientes, com um investimento ativo em TypeScript para garantir a manutenabilidade do código em ambas as pontas.</p>
                        <p className="text-justify">A experiência em TI, embora não fosse desenvolvimento, me deu uma base crucial em raciocínio lógico e análise de problemas. Essa vivência me ensinou a abordar falhas de forma metódica, identificando a causa raiz dos erros e aplicando correções lógicas. Essa habilidade é essencial para o desenvolvimento, pois me permite depurar e solucionar bugs de maneira eficiente.</p>
                        <p className="text-justify">Estou em um momento de transição e crescimento, buscando ativamente uma oportunidade Júnior ou de Estágio em Desenvolvimento. Meu objetivo é aplicar o conhecimento prático em um ambiente profissional focado em código de qualidade, onde eu possa evoluir e contribuir diariamente com a minha proatividade e foco em me desenvolver.</p>
                    </div>
                </div>
            </section>
    )
}