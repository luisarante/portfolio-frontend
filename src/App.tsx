import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';


export function App() {
  const location = useLocation();

  // Inclui '/login' nas rotas sem Header/Footer
  const hideHeaderRoutes = ['/projetos', '/painel', '/login']; // 👈 ATUALIZADO

  const shouldHideHeader = hideHeaderRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // Note: A classe 'sm:max-w-xl ... mx-auto' pode precisar de ajuste
  // para o Painel/Login, que normalmente usam a largura total.
  // Você pode aplicar a classe de largura máxima apenas quando o Header/Footer aparecerem.
  
  const mainClasses = shouldHideHeader 
    ? "flex flex-col mx-auto w-full min-h-screen" // Largura total para Dashboard/Login
    : "sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl flex flex-col mx-auto";

  return (
    <div>
      <ScrollToTop />

      {!shouldHideHeader && <Header />}

      {/* Aplica as classes dinamicamente */}
      <main className={mainClasses}> 
        <Outlet />
      </main>

      {!shouldHideHeader && <Footer />}
    </div>
  );
}