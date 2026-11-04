import React, { useState } from 'react';
import { TRUE_FALSE_DATA } from '../../data/curriculumData';
import { sounds } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Check, X, RotateCcw, AlertCircle, Award } from 'lucide-react';

export const TrueFalseGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, boolean | null>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQuestion = TRUE_FALSE_DATA[currentIndex];

  const handleAnswer = (chosenValue: boolean) => {
    if (userAnswers[currentQuestion.id] !== undefined) return;

    const isCorrect = chosenValue === currentQuestion.isTrue;
    if (isCorrect) {
      sounds.playSuccess();
    } else {
      sounds.playError();
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: chosenValue,
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    sounds.playClick();
    setShowExplanation(false);
    if (currentIndex + 1 < TRUE_FALSE_DATA.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setCurrentIndex(0);
    setUserAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
  };

  const calculateScore = () => {
    let score = 0;
    TRUE_FALSE_DATA.forEach((q) => {
      if (userAnswers[q.id] === q.isTrue) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
        <div>
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            Desafio Científico
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            Verdadeiro ou Falso: Mitos e Factos da Água
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Analisa com atenção cada afirmação e decide se é cientificamente Verdadeira ou Falsa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-slate-600">
            Pergunta: <span className="font-mono text-sky-700 font-bold">{currentIndex + 1}</span> / {TRUE_FALSE_DATA.length}
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            title="Recomeçar jogo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isCompleted ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-sky-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / TRUE_FALSE_DATA.length) * 100}%` }}
            />
          </div>

          {/* Statement Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Afirmação #{currentIndex + 1}
            </span>
            <p className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
              "{currentQuestion.statement}"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              disabled={showExplanation}
              className={`py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border ${
                showExplanation
                  ? currentQuestion.isTrue
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : userAnswers[currentQuestion.id] === true
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-slate-50 text-slate-400 border-slate-200 opacity-60'
                  : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border-emerald-300 hover:border-emerald-600 shadow-xs'
              }`}
            >
              <Check className="w-5 h-5" />
              <span>Verdadeiro</span>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              disabled={showExplanation}
              className={`py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border ${
                showExplanation
                  ? !currentQuestion.isTrue
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : userAnswers[currentQuestion.id] === false
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-slate-50 text-slate-400 border-slate-200 opacity-60'
                  : 'bg-rose-50 hover:bg-rose-600 text-rose-800 hover:text-white border-rose-300 hover:border-rose-600 shadow-xs'
              }`}
            >
              <X className="w-5 h-5" />
              <span>Falso</span>
            </button>
          </div>

          {/* Explanation reveal */}
          {showExplanation && (
            <div
              className={`p-4 rounded-xl border transition-all ${
                userAnswers[currentQuestion.id] === currentQuestion.isTrue
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-sky-700" />
                <div className="space-y-1">
                  <span className="font-bold text-xs uppercase tracking-wider block">
                    {userAnswers[currentQuestion.id] === currentQuestion.isTrue
                      ? 'Parabéns, resposta certa!'
                      : 'Ops, não era essa a resposta! Repara na justificação científica:'}
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed">{currentQuestion.explanation}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  {currentIndex + 1 < TRUE_FALSE_DATA.length ? 'Próxima Afirmação →' : 'Ver Resultado Final'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results screen */
        <div className="text-center py-8 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-3">
            <Award className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mb-1">Resultado do Desafio</h4>
          <p className="text-sm text-slate-600 mb-4">
            Acertaste em <strong className="text-sky-700">{calculateScore()}</strong> de{' '}
            <strong>{TRUE_FALSE_DATA.length}</strong> afirmações!
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 mb-6 leading-relaxed">
            {calculateScore() >= 6
              ? 'Excelente aproveitamento! DemonstColumnsaste um domínio notável dos conceitos de Ciências Naturais do 5.º ano.'
              : 'Bom esforço! Podes rever a secção de Conteúdos e tentar novamente para consolidar as tuas aprendizagens.'}
          </div>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      )}
    </div>
  );
};
