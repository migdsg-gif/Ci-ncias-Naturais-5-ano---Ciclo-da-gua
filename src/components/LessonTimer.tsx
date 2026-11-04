import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Award,
  Volume2,
  VolumeX,
  X,
  Clock,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonTimerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDiploma: (minutesSpent: number) => void;
  secondsElapsed: number;
  setSecondsElapsed: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const TOTAL_LESSON_SECONDS = 45 * 60; // 45 minutes = 2700s

interface PhaseInfo {
  name: string;
  startMin: number;
  endMin: number;
  description: string;
}

const PHASES: PhaseInfo[] = [
  {
    name: '1. Descoberta & Conteúdos',
    startMin: 0,
    endMin: 15,
    description: 'Exploração do simulador interativo, das 6 etapas e das mudanças de estado físico.',
  },
  {
    name: '2. Jogos Didáticos Digitais',
    startMin: 15,
    endMin: 30,
    description: 'Exercícios de correspondência, teste verdadeiro/falso, escolha múltipla e cartas da memória.',
  },
  {
    name: '3. Atividade Sem Tecnologia',
    startMin: 30,
    endMin: 40,
    description: 'Dinâmica de movimento na sala ("A Gota Viajante") ou experiência da "Nuvem no Frasco".',
  },
  {
    name: '4. Síntese & Autoavaliação',
    startMin: 40,
    endMin: 45,
    description: 'Registo no caderno diário, balanço com a turma e emissão do Diploma de Guardião da Água.',
  },
];

export const LessonTimer: React.FC<LessonTimerProps> = ({
  isOpen,
  onClose,
  onOpenDiploma,
  secondsElapsed,
  setSecondsElapsed,
  isRunning,
  setIsRunning,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(sounds.getMuted());

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsElapsed < TOTAL_LESSON_SECONDS) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => {
          const next = prev + 1;
          // Check phase transition points (15m, 30m, 40m, 45m)
          if (next === 15 * 60 || next === 30 * 60 || next === 40 * 60) {
            sounds.playTimerAlert();
          }
          if (next >= TOTAL_LESSON_SECONDS) {
            setIsRunning(false);
            sounds.playSuccess();
            confetti({ particleCount: 100, spread: 80 });
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsElapsed, setIsRunning, setSecondsElapsed]);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sounds.setMuted(nextState);
  };

  const currentMinutes = Math.floor(secondsElapsed / 60);
  const currentSecondsInMin = secondsElapsed % 60;
  const remainingSeconds = Math.max(0, TOTAL_LESSON_SECONDS - secondsElapsed);
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingSecondsRem = remainingSeconds % 60;

  // Determine current phase
  const currentPhaseIndex = PHASES.findIndex(
    (p) => currentMinutes >= p.startMin && currentMinutes < p.endMin
  );
  const activePhase = PHASES[currentPhaseIndex !== -1 ? currentPhaseIndex : PHASES.length - 1];

  const handleJumpToNextPhase = () => {
    sounds.playClick();
    if (currentPhaseIndex < PHASES.length - 1) {
      const nextPhase = PHASES[currentPhaseIndex + 1];
      setSecondsElapsed(nextPhase.startMin * 60);
    } else {
      setSecondsElapsed(TOTAL_LESSON_SECONDS);
    }
  };

  const handleResetTimer = () => {
    sounds.playClick();
    setIsRunning(false);
    setSecondsElapsed(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Clock className="w-5 h-5 text-sky-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
            Gestão da Aula de 45 Minutos · Ciências Naturais 5.º Ano
          </span>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Cronómetro Curricular de Aula
        </h3>

        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          Estruturado de acordo com a duração padrão das aulas do 5.º ano em Portugal, organizando o tempo entre aprendizagem teórica, desafios práticos e dinâmicas de consolidação.
        </p>

        {/* Big Digital Display */}
        <div className="bg-slate-900 text-white rounded-xl p-5 text-center mb-6 shadow-inner">
          <div className="text-xs uppercase tracking-widest text-sky-300 font-semibold mb-1">
            Tempo Restante da Aula
          </div>
          <div className="text-5xl sm:text-6xl font-mono font-bold tracking-tight text-white">
            {String(remainingMinutes).padStart(2, '0')}:{String(remainingSecondsRem).padStart(2, '0')}
          </div>
          <div className="text-xs text-slate-400 mt-2 font-mono">
            Tempo decorrido: {String(currentMinutes).padStart(2, '0')}:{String(currentSecondsInMin).padStart(2, '0')} / 45:00 min
          </div>

          {/* Progress bar inside */}
          <div className="w-full bg-slate-800 h-2.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-sky-500 h-full transition-all duration-300"
              style={{ width: `${(secondsElapsed / TOTAL_LESSON_SECONDS) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Phase Highlight */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold text-sky-900 uppercase tracking-wide">
              Fase Atual da Aula:
            </span>
            <span className="text-xs font-mono font-bold text-sky-700">
              Minutos {activePhase.startMin} a {activePhase.endMin}
            </span>
          </div>
          <h4 className="text-base font-bold text-sky-950 mb-1">{activePhase.name}</h4>
          <p className="text-xs text-sky-800 leading-relaxed">{activePhase.description}</p>
        </div>

        {/* 4 Phases Map */}
        <div className="space-y-2 mb-6">
          {PHASES.map((phase, idx) => {
            const isCurrent = currentPhaseIndex === idx;
            const isDone = currentMinutes >= phase.endMin;

            return (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                  isCurrent
                    ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
                    : isDone
                    ? 'bg-slate-50 border-slate-200 text-slate-400'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isCurrent ? 'bg-amber-500 animate-ping' : isDone ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  />
                  <span>{phase.name}</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">
                  {phase.startMin}' - {phase.endMin}' min
                </span>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsRunning(!isRunning);
                sounds.playClick();
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white transition-colors ${
                isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-sky-700 hover:bg-sky-800'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>{secondsElapsed === 0 ? 'Iniciar Aula (45 min)' : 'Continuar'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleResetTimer}
              className="p-2 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              title="Reiniciar cronómetro"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleJumpToNextPhase}
              className="p-2 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              title="Avançar para a próxima fase da aula"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={toggleSound}
              className="p-2 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              title={isMuted ? 'Ativar avisos sonoros' : 'Silenciar sons'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky-700" />}
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenDiploma(currentMinutes);
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <Award className="w-4 h-4" />
            <span>Emitir Diploma</span>
          </button>
        </div>
      </div>
    </div>
  );
};
