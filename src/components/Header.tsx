import React from 'react';
import { Clock } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenTimerModal: () => void;
  timerMinutesRemaining: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenTimerModal,
  timerMinutesRemaining,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand title, one line wordmark */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('inicio');
          }}
          className="text-lg sm:text-xl font-bold tracking-tight text-sky-900 whitespace-nowrap shrink-0 hover:text-sky-700 transition-colors"
        >
          O Ciclo da Água
        </a>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('conteudos')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-sky-700 ${
              activeTab === 'conteudos' ? 'text-sky-700 font-semibold border-b-2 border-sky-600' : ''
            }`}
          >
            Conteúdos
          </button>
          <button
            onClick={() => setActiveTab('diagrama')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-sky-700 ${
              activeTab === 'diagrama' ? 'text-sky-700 font-semibold border-b-2 border-sky-600' : ''
            }`}
          >
            Simulador
          </button>
          <button
            onClick={() => setActiveTab('jogos')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-sky-700 ${
              activeTab === 'jogos' ? 'text-sky-700 font-semibold border-b-2 border-sky-600' : ''
            }`}
          >
            Jogos Didáticos
          </button>
          <button
            onClick={() => setActiveTab('sem-tecnologia')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-sky-700 ${
              activeTab === 'sem-tecnologia' ? 'text-sky-700 font-semibold border-b-2 border-sky-600' : ''
            }`}
          >
            Jogos na Sala
          </button>
          <button
            onClick={() => setActiveTab('ficha')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-sky-700 ${
              activeTab === 'ficha' ? 'text-sky-700 font-semibold border-b-2 border-sky-600' : ''
            }`}
          >
            Ficha de Avaliação
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenTimerModal}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
            title="Gestor dos 45 minutos da aula de Ciências Naturais"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Aula: {timerMinutesRemaining} min</span>
          </button>
        </div>
      </div>
    </header>
  );
};
