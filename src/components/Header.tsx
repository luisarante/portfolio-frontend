import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFullName, setShowFullName] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        if (!isScrolled) { 
          setShowFullName(false); 
          setTimeout(() => {
            setIsScrolled(true); 
          }, 100); 
        }
      } 
      else {
        if (isScrolled) { 
          setIsScrolled(false); 
          
          setTimeout(() => {
            setShowFullName(true);
          }, 300);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-primary/90 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
          <div
            className={`
              bg-primary text-white rounded-full flex items-center justify-center
              overflow-hidden relative transition-all duration-700 ease-in-out
              ${isScrolled ? "w-[60px] h-[60px]" : "w-[180px] h-[60px]"}
            `}
          >
            <span
              className={`
                absolute text-2xl font-medium transition-all duration-300 ease-in-out
                ${isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-90"}
              `}
            >
              L
            </span>

            <span
              className={`
                absolute text-2xl font-medium transition-all duration-300
                ${
                  showFullName
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90 -translate-x-[50px]"
                }
              `}
            >
              Luis Arantes
            </span>
          </div>

          <button
            className={`md:hidden z-20 ${isScrolled || isMenuOpen ? 'text-white' : 'text-primary'}`}
            onClick={toggleMenu}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>

          <nav className="hidden md:flex space-x-4 text-white">
            <Link to="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
            <Link
              to="/#projetos"
              className="hover:text-secondary transition-colors"
            >
              Projetos
            </Link>
            <Link to="/#sobre" className="hover:text-secondary transition-colors">
              Sobre
            </Link>
          </nav>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 w-full min-h-screen bg-surface
          flex flex-col items-center justify-center space-y-6
          transition-all duration-300 ease-in-out z-10
          md:hidden
          ${
            isMenuOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full pointer-events-none"
          }`}
      >
        <Link
          to="/"
          className="text-2xl text-white hover:text-primary"
          onClick={toggleMenu}
        >
          Home
        </Link>
        <Link
          to="/#sobre"
          className="text-2xl text-white hover:text-primary"
          onClick={toggleMenu}
        >
          Sobre
        </Link>
        <Link
          to="/#projetos"
          className="text-2xl text-white hover:text-primary"
          onClick={toggleMenu}
        >
          Projetos
        </Link>
      </div>
    </>
  );
}