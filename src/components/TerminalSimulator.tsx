import React, { useRef, useEffect } from 'react';
import Typewriter from 'typewriter-effect';

const Cursor = () => <span className="text-gray-600 font-bold cursor-piscando">█</span>;

const TerminalSimulator: React.FC = () => {
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = terminalBodyRef.current;
    if (!element) return;

    const observer = new MutationObserver(() => {
      element.scrollTop = element.scrollHeight;
    });

    observer.observe(element, { 
      childList: true, 
      subtree: true, 
      characterData: true 
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="hidden lg:flex flex-col w-full max-w-2xl h-[300px] bg-gray-900 border border-gray-700 shadow-2xl rounded-lg overflow-hidden font-mono text-sm"
    >
      <div className="flex items-center space-x-2 px-4 py-3 border-b border-gray-800 bg-gray-800/50 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="flex-1 text-center text-xs text-gray-400 font-semibold tracking-wide">zsh — luis@portfolio</div>
      </div>

      <div 
        ref={terminalBodyRef}
        className="
          flex-1 p-6 text-green-400 overflow-y-auto 
          
          /* === A MÁGICA DA BARRA DE ROLAGEM COMEÇA AQUI === */
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-gray-700/30
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-gray-700/80
          transition-colors
          /* ================================================ */
        "
      >
        <Typewriter
          options={{
            delay: 30, 
            loop: true,
            cursor: '',
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString('<span class="text-blue-400">luis@portfolio</span>:<span class="text-blue-300">~/projetos</span>$ npm run dev')
              .pauseFor(500)
              .typeString('<br/>')
              
              .typeString('<span class="text-gray-400"> portfolio@1.0.0 dev</span><br/>')
              .typeString('<span class="text-gray-400"> ready started server on 0.0.0.0:3000, url: http://localhost:3000</span><br/>')
              .pauseFor(500)
              
              .typeString('<span class="text-green-500">✔ Compiled successfully in 1.2s</span><br/><br/>')
              .pauseFor(500)

              .typeString('<span class="text-white">Aplicação rodando em:</span> <span class="text-blue-400 underline">https://www.luisarantes.com.br</span><br/>')
              .pauseFor(1000)
              
              .typeString('<br/><span class="text-blue-400">luis@portfolio</span>:<span class="text-blue-300">~/projetos</span>$ ')
              .typeString('<span class="text-yellow-300">console.log("React + Node: arquitetando soluções funcionais e limpas.")</span>')
              .pauseFor(4000)

              .deleteAll()
              .start();
          }}
        />
        <Cursor /> 
      </div>
    </div>
  );
};

export default TerminalSimulator;