import { Link } from "react-router-dom";

export function NotFound() {
    return(
        <div className="h-screen flex items-center justify-center bg-background text-center">
            <div className="content">
                <h1 className="text-7xl font-semibold text-primary">404</h1>
                <h2 className="text-2xl text-[#555] mb-2">Ops! Página não encontrada.</h2>
                <p className="text-[#777] mb-6">A página que você está procurando pode ter sido removida ou o link está incorreto.</p>
                
                <Link to="/" className="bg-primary text-white px-6 py-3 rounded-xl font-bold transition duration-300 hover:opacity-85 hover:shadow-xl">
                Voltar para o Início
                </Link>
            </div>
        </div>
    )
}