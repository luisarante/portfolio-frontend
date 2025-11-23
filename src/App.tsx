import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';


export function App() {
  const location = useLocation();

  const hideHeaderRoutes = ['/projetos', '/painel', '/login']; 

  const shouldHideHeader = hideHeaderRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  
  const mainClasses = shouldHideHeader 
    ? "flex flex-col mx-auto w-full min-h-screen" 
    : "sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl flex flex-col mx-auto";

  return (
    <div>
      <ScrollToTop />

      {!shouldHideHeader && <Header />}

      <main className={mainClasses}> 
        <Outlet />
      </main>

      {!shouldHideHeader && <Footer />}
    </div>
  );
}