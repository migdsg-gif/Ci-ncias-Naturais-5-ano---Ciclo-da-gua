import React, { useState } from 'react';
import { MatchingGame } from './games/MatchingGame';
import { TrueFalseGame } from './games/TrueFalseGame';
import { MultipleChoiceQuiz } from './games/MultipleChoiceQuiz';
import { MemoryCardGame } from './games/MemoryCardGame';
import { sounds } from '../utils/soundEffects';
import {
  Link2,
  CheckCircle,
  ListOrdered,
  Layers,
  Gamepad2,
  Sparkles,
} from 'lucide-react';

export const GamesHub: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'matching' | 'tf' | 'quiz' | 'memory'>('matching');

  return (
    <div className="my-8 space-y-6">
      {/* Title & Introduction */}
      <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Gamepad2 className="w-5 h-5 text-sky-700" />
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                Área de Jogos Didáticos · Ciências Naturais 5.º Ano
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-sky-950">
              Desafios Interativos de Fixação
            </h3>
            <p className="text-xs sm:text-sm text-sky-900 mt-1 max-w-2xl leading-relaxed">
              Testa e consolida o que aprendeste com 4 modalidades didáticas diferentes. Todos os jogos foram desenhados especificamente para alunos dos 10 aos 12 anos.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              4 Modalidades Disponíveis
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Control Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        <button
          onClick={() => {
            setActiveGame('matching');
            sounds.playClick();
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            activeGame === 'matching'
              ? 'bg-white text-sky-900 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <Link2 className="w-3.5 h-3.5 text-sky-600" />
          <span className="truncate">1. Correspondência</span>
        </button>

        <button
          onClick={() => {
            setActiveGame('tf');
            sounds.playClick();
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            activeGame === 'tf'
              ? 'bg-white text-sky-900 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span className="truncate">2. Verdadeiro / Falso</span>
        </button>

        <button
          onClick={() => {
            setActiveGame('quiz');
            sounds.playClick();
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            activeGame === 'quiz'
              ? 'bg-white text-sky-900 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5 text-amber-600" />
          <span className="truncate">3. Escolha Múltipla</span>
        </button>

        <button
          onClick={() => {
            setActiveGame('memory');
            sounds.playClick();
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            activeGame === 'memory'
              ? 'bg-white text-sky-900 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-purple-600" />
          <span className="truncate">4. Virar Cartas</span>
        </button>
      </div>

      {/* Render Selected Game */}
      <div className="transition-all duration-200">
        {activeGame === 'matching' && <MatchingGame />}
        {activeGame === 'tf' && <TrueFalseGame />}
        {activeGame === 'quiz' && <MultipleChoiceQuiz />}
        {activeGame === 'memory' && <MemoryCardGame />}
      </div>
    </div>
  );
};
