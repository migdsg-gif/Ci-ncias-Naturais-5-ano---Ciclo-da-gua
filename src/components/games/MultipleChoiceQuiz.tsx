import React, { useState } from 'react';
import { MULTIPLE_CHOICE_DATA } from '../../data/curriculumData';
import { sounds } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle, Trophy } from 'lucide-react';

export const MultipleChoiceQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const question = MULTIPLE_CHOICE_DATA[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    sounds.playClick();
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === question.correctIndex;

    if (isCorrect) {
      sounds.playSuccess();
      setUserScore((prev) => prev + 1);
    } else {
      sounds.playError();
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (currentIndex + 1 < MULTIPLE_CHOICE_DATA.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserScore(0);
    setIsQuizCompleted(false);
  };

  const getEvaluationMessage = (score: number) => {
    const total = MULTIPLE_CHOICE_DATA.length;
    const ratio = score / total;
    if (ratio === 1) return 'Nota Máxima: Excelente! És um verdadeiro cientista da hidrosfera!';
    if (ratio >= 0.8) return 'Muito Bom! Demonstraste um conhecimento muito sólido das Aprendizagens Essenciais.';
    if (ratio >= 0.5) return 'Bom trabalho! Já conheces as ideias principais, revê os pormenores na secção de Conteúdos.';
    return 'Precisas de rever a matéria com atenção antes do teste! Experimenta voltar a explorar o simulador.';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
        <div>
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            Quiz de Avaliação Formativa
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            Perguntas de Escolha Múltipla
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Escolhe a opção correta para cada uma das questões retiradas das metas curriculares do 5.º ano.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-slate-600">
            Questão: <span className="font-mono text-sky-700 font-bold">{currentIndex + 1}</span> / {MULTIPLE_CHOICE_DATA.length}
          </div>
          <button
            onClick={handleRestart}
            className="p-1.5 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            title="Recomeçar teste"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isQuizCompleted ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-sky-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / MULTIPLE_CHOICE_DATA.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {currentIndex + 1}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {question.question}
              </h4>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctIndex;

              let style = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-50 border-rose-400 text-rose-950';
                } else {
                  style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                style = 'bg-sky-50 border-sky-600 text-sky-950 font-semibold ring-2 ring-sky-200';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-300 text-slate-600 font-mono text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submit / Next Button */}
          {!isAnswerSubmitted ? (
            <div className="flex justify-end">
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedOption !== null
                    ? 'bg-sky-700 hover:bg-sky-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Confirmar Resposta
              </button>
            </div>
          ) : (
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
              <div className="flex items-start gap-2.5 mb-3">
                <HelpCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <div className="text-xs text-sky-950 leading-relaxed">
                  <span className="font-bold block mb-0.5">Explicação Científica:</span>
                  {question.explanation}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  {currentIndex + 1 < MULTIPLE_CHOICE_DATA.length ? 'Próxima Questão →' : 'Ver Nota Final'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Screen */
        <div className="text-center py-8 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mb-1">Pontuação do Questionário</h4>
          <p className="text-sm text-slate-600 mb-2">
            Obtiveste <strong className="text-sky-700 text-lg font-mono">{userScore}</strong> de{' '}
            <strong className="text-slate-900 font-mono">{MULTIPLE_CHOICE_DATA.length}</strong> respostas certas!
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 mb-6 leading-relaxed">
            {getEvaluationMessage(userScore)}
          </div>
          <button
            onClick={handleRestart}
            className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Repetir Quiz
          </button>
        </div>
      )}
    </div>
  );
};
