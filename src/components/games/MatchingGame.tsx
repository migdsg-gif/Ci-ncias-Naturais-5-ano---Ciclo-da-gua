import React, { useState, useEffect } from 'react';
import { MATCHING_DATA } from '../../data/curriculumData';
import { MatchingPair } from '../../types/waterCycle';
import { sounds } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

export const MatchingGame: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDef, setSelectedDef] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [shuffledDefs, setShuffledDefs] = useState<MatchingPair[]>([]);
  const [wrongPair, setWrongPair] = useState<{ term: string; def: string } | null>(null);

  // Shuffle right side definitions on mount or reset
  const initGame = () => {
    setSelectedTerm(null);
    setSelectedDef(null);
    setMatchedIds([]);
    setWrongPair(null);
    const shuffled = [...MATCHING_DATA].sort(() => Math.random() - 0.5);
    setShuffledDefs(shuffled);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleSelectTerm = (id: string) => {
    if (matchedIds.includes(id)) return;
    sounds.playClick();
    setSelectedTerm(id);
    setWrongPair(null);

    // If a definition is already selected, check match
    if (selectedDef) {
      checkMatch(id, selectedDef);
    }
  };

  const handleSelectDef = (id: string) => {
    if (matchedIds.includes(id)) return;
    sounds.playClick();
    setSelectedDef(id);
    setWrongPair(null);

    // If a term is already selected, check match
    if (selectedTerm) {
      checkMatch(selectedTerm, id);
    }
  };

  const checkMatch = (termId: string, defId: string) => {
    if (termId === defId) {
      // Correct match!
      sounds.playSuccess();
      const newMatched = [...matchedIds, termId];
      setMatchedIds(newMatched);
      setSelectedTerm(null);
      setSelectedDef(null);

      if (newMatched.length === MATCHING_DATA.length) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      // Wrong match
      sounds.playError();
      setWrongPair({ term: termId, def: defId });
      setTimeout(() => {
        setSelectedTerm(null);
        setSelectedDef(null);
        setWrongPair(null);
      }, 900);
    }
  };

  const isCompleted = matchedIds.length === MATCHING_DATA.length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
        <div>
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            Jogo de Correspondência
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            Liga Cada Etapa à sua Definição Científica
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Clica num conceito da coluna esquerda e depois clica na sua definição correspondente à direita.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-slate-600">
            Pares corretos: <span className="font-mono text-sky-700 font-bold">{matchedIds.length}</span> / {MATCHING_DATA.length}
          </div>
          <button
            onClick={() => {
              initGame();
              sounds.playClick();
            }}
            className="p-1.5 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            title="Recomeçar exercício"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isCompleted ? (
        <div className="text-center py-8 bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-emerald-950 mb-1">
            Fantástico! Acertaste em todas as correspondências!
          </h4>
          <p className="text-sm text-emerald-800 max-w-md mx-auto mb-4">
            Compreendeste com precisão todas as etapas do ciclo hidrológico de acordo com as metas do 5.º ano.
          </p>
          <button
            onClick={initGame}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Jogar Novamente
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left Column: Terms */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Etapas do Ciclo (Conceito)
            </h4>
            {MATCHING_DATA.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedTerm === item.id;
              const isWrong = wrongPair?.term === item.id;

              return (
                <button
                  key={item.id}
                  disabled={isMatched}
                  onClick={() => handleSelectTerm(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 cursor-default opacity-85'
                      : isWrong
                      ? 'bg-rose-50 border-rose-400 text-rose-900 animate-shake'
                      : isSelected
                      ? 'bg-sky-50 border-sky-600 text-sky-900 shadow-sm ring-2 ring-sky-200'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    <span>{item.stageName}</span>
                  </div>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: Definitions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Definição Científica
            </h4>
            {shuffledDefs.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedDef === item.id;
              const isWrong = wrongPair?.def === item.id;

              return (
                <button
                  key={item.id}
                  disabled={isMatched}
                  onClick={() => handleSelectDef(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-start justify-between gap-2 ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 cursor-default opacity-85'
                      : isWrong
                      ? 'bg-rose-50 border-rose-400 text-rose-900'
                      : isSelected
                      ? 'bg-sky-50 border-sky-600 text-sky-900 shadow-sm ring-2 ring-sky-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <span>{item.definition}</span>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
