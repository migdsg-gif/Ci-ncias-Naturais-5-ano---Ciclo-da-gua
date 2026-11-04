import React, { useState, useEffect } from 'react';
import {
  CYCLE_STAGES,
  HERO_IMAGE,
  CLOUD_RAIN_IMAGE,
  AQUIFER_IMAGE,
} from '../data/curriculumData';
import { CycleStage } from '../types/waterCycle';
import { sounds } from '../utils/soundEffects';
import {
  Sun,
  CloudRain,
  Layers,
  Trees,
  Waves,
  Cloud,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Info,
  ThermometerSun,
  Wind,
} from 'lucide-react';

export const InteractiveWaterCycle: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<CycleStage>(CYCLE_STAGES[0]);
  const [solarIntensity, setSolarIntensity] = useState<'normal' | 'forte' | 'ameno'>('normal');
  const [precipType, setPrecipType] = useState<'chuva' | 'neve' | 'granizo'>('chuva');
  const [isPlayingTour, setIsPlayingTour] = useState<boolean>(false);

  // Auto-tour through the stages
  useEffect(() => {
    if (!isPlayingTour) return;
    const interval = setInterval(() => {
      setSelectedStage((prev) => {
        const currentIndex = CYCLE_STAGES.findIndex((s) => s.id === prev.id);
        const nextIndex = (currentIndex + 1) % CYCLE_STAGES.length;
        return CYCLE_STAGES[nextIndex];
      });
      sounds.playFlip();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlayingTour]);

  const handleSelectStage = (stage: CycleStage) => {
    setSelectedStage(stage);
    sounds.playClick();
  };

  const handleNext = () => {
    const currentIndex = CYCLE_STAGES.findIndex((s) => s.id === selectedStage.id);
    const nextIndex = (currentIndex + 1) % CYCLE_STAGES.length;
    setSelectedStage(CYCLE_STAGES[nextIndex]);
    sounds.playClick();
  };

  const handlePrev = () => {
    const currentIndex = CYCLE_STAGES.findIndex((s) => s.id === selectedStage.id);
    const prevIndex = (currentIndex - 1 + CYCLE_STAGES.length) % CYCLE_STAGES.length;
    setSelectedStage(CYCLE_STAGES[prevIndex]);
    sounds.playClick();
  };

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'Trees':
        return <Trees className="w-4 h-4 text-emerald-600" />;
      case 'Cloud':
        return <Cloud className="w-4 h-4 text-sky-500" />;
      case 'CloudRain':
        return <CloudRain className="w-4 h-4 text-blue-600" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-amber-700" />;
      case 'Waves':
        return <Waves className="w-4 h-4 text-cyan-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-sky-600" />;
    }
  };

  const getDetailImage = () => {
    if (selectedStage.id === 'infiltracao') return AQUIFER_IMAGE;
    if (selectedStage.id === 'condensacao' || selectedStage.id === 'precipitacao') return CLOUD_RAIN_IMAGE;
    return HERO_IMAGE;
  };

  return (
    <section className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs p-4 sm:p-6 my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-sky-700">
            Laboratório Interativo · Ciências Naturais 5.º Ano
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Simulador do Ciclo Hidrológico
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Clica nos pontos do diagrama ou avança passo a passo para compreender a viagem contínua da água no nosso planeta.
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsPlayingTour(!isPlayingTour)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              isPlayingTour
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isPlayingTour ? 'Pausar Viagem Automática' : 'Viagem Automática'}
          </button>
          <button
            onClick={() => {
              setSelectedStage(CYCLE_STAGES[0]);
              setSolarIntensity('normal');
              setPrecipType('chuva');
              sounds.playClick();
            }}
            className="p-1.5 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            title="Reiniciar simulador"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Two-Zone Sandbox Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Interactive Visual Stage (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner group">
            {/* Base Educational Landscape Image */}
            <img
              src={HERO_IMAGE}
              alt="Diagrama do Ciclo da Água com montanhas, rios e oceano"
              className={`w-full h-full object-cover transition-all duration-700 ${
                solarIntensity === 'forte' ? 'brightness-110 saturate-125' : solarIntensity === 'ameno' ? 'brightness-95 contrast-95' : 'brightness-100'
              }`}
            />

            {/* Weather Overlay simulation (Precipitation effect) */}
            {selectedStage.id === 'precipitacao' && (
              <div className="absolute inset-0 pointer-events-none bg-blue-900/15 backdrop-blur-[0.5px]">
                <div className="absolute top-10 left-12 right-1/2 bottom-1/2 overflow-hidden flex justify-around opacity-75">
                  {[...Array(14)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-0.5 rounded-full animate-bounce ${
                        precipType === 'chuva'
                          ? 'h-6 bg-cyan-200 animate-pulse'
                          : precipType === 'neve'
                          ? 'h-2 w-2 bg-white rounded-full'
                          : 'h-3 w-3 bg-slate-100 rounded-xs'
                      }`}
                      style={{ animationDuration: `${0.6 + (i % 5) * 0.15}s`, animationDelay: `${(i % 4) * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Evaporation rising steam simulation */}
            {(selectedStage.id === 'evaporacao' || selectedStage.id === 'transpiracao') && (
              <div className="absolute bottom-16 right-16 top-1/3 w-48 pointer-events-none overflow-hidden flex justify-around opacity-60">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-cyan-300 via-white to-transparent rounded-full animate-pulse"
                    style={{
                      height: '80px',
                      animationDuration: '2s',
                      animationDelay: `${i * 0.3}s`,
                      transform: 'translateY(-20px)',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Clickable Hotspots across the Cycle */}
            {CYCLE_STAGES.map((stage, idx) => {
              const isSelected = selectedStage.id === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleSelectStage(stage)}
                  style={{ left: `${stage.x}%`, top: `${stage.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin transition-all duration-300 flex items-center gap-1.5 p-1.5 rounded-full ${
                    isSelected
                      ? 'bg-sky-600 text-white ring-4 ring-sky-300 shadow-lg scale-110'
                      : 'bg-white/90 text-slate-800 hover:bg-white hover:scale-105 shadow-md border border-slate-300'
                  }`}
                  title={`${stage.name}: Clica para ver detalhes`}
                >
                  <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-slate-100 text-slate-900 group-hover/pin:bg-sky-100">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold px-1 hidden sm:inline-block whitespace-nowrap">
                    {stage.name}
                  </span>
                </button>
              );
            })}

            {/* Stage Indicator Badge */}
            <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>
                Fase {CYCLE_STAGES.findIndex((s) => s.id === selectedStage.id) + 1} de {CYCLE_STAGES.length}:{' '}
                <strong>{selectedStage.name}</strong>
              </span>
            </div>
          </div>

          {/* Interactive Environment Adjusters */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ThermometerSun className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-semibold text-slate-700">Calor do Sol:</span>
              <div className="flex items-center gap-1">
                {(['ameno', 'normal', 'forte'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setSolarIntensity(level);
                      sounds.playClick();
                    }}
                    className={`px-2 py-1 rounded-md capitalize transition-colors ${
                      solarIntensity === level
                        ? 'bg-amber-500 text-white font-medium'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="font-semibold text-slate-700">Tipo de Precipitação:</span>
              <div className="flex items-center gap-1">
                {(['chuva', 'neve', 'granizo'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setPrecipType(t);
                      setSelectedStage(CYCLE_STAGES[3]); // Focus precipitation
                      sounds.playClick();
                    }}
                    className={`px-2 py-1 rounded-md capitalize transition-colors ${
                      precipType === t
                        ? 'bg-sky-600 text-white font-medium'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Detail & Concept Deck (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div>
            {/* Header of Concept */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center shrink-0">
                  {getStageIcon(selectedStage.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">
                    {selectedStage.name}
                  </h3>
                  <span className="text-xs text-sky-800 font-medium">
                    Etapa {CYCLE_STAGES.findIndex((s) => s.id === selectedStage.id) + 1} do Ciclo
                  </span>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                  aria-label="Etapa anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                  aria-label="Próxima etapa"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-sm font-medium text-slate-800 my-3">
              "{selectedStage.tagline}"
            </p>

            {/* Detailed scientific explanation */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedStage.description}
            </p>

            {/* Key Curriculum Aspects for 5th grade */}
            <div className="mt-4 space-y-2.5 bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 shrink-0">Mudança de Estado:</span>
                <span className="text-sky-900 font-medium">{selectedStage.stateChange}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 shrink-0">Balanço Térmico:</span>
                <span className="text-amber-800 font-medium">{selectedStage.energyChange}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 shrink-0">No nosso dia a dia:</span>
                <span className="text-slate-600">{selectedStage.example}</span>
              </div>
            </div>

            {/* Zoom mini-graphic for Infiltration / Condensation */}
            <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
              <div className="relative aspect-16/7 bg-slate-100">
                <img
                  src={getDetailImage()}
                  alt={`Ilustração detalhada de ${selectedStage.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-2.5">
                  <span className="text-xs text-white font-medium flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-300" />
                    Pormenor científico: {selectedStage.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick navigation pill bar */}
          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-1 overflow-x-auto">
            {CYCLE_STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleSelectStage(s)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedStage.id === s.id
                    ? 'bg-sky-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}. {s.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
