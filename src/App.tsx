import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';

export function App() {
  return (
    <div>

      <header>
        <Header />
      </header>

      <main>
        <Outlet />
      </main>

    </div>
  );
}