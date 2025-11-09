import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';

export function App() {
  return (
    <div>

        <Header />

      <main>
        <Outlet />
      </main>

    </div>
  );
}