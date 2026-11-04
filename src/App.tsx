/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { InteractiveWaterCycle } from './components/InteractiveWaterCycle';
import { ContentSection } from './components/ContentSection';
import { GamesHub } from './components/GamesHub';
import { UnpluggedActivities } from './components/UnpluggedActivities';
import { LessonTimer } from './components/LessonTimer';
import { DiplomaModal } from './components/DiplomaModal';
import { HERO_IMAGE } from './data/curriculumData';
import { sounds } from './utils/soundEffects';
import {
  Compass,
  Sparkles,
  BookOpen,
  Gamepad2,
  Clock,
  Printer,
  Award,
  Droplets,
  Trees,
  CloudSun,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [isTimerModalOpen, setIsTimerModalOpen] = useState<boolean>(false);
  const [isDiplomaModalOpen, setIsDiplomaModalOpen] = useState<boolean>(false);
  const [diplomaTimeSpent, setDiplomaTimeSpent] = useState<number>(45);

  // 45-Minute Lesson Timer State
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const remainingSeconds = Math.max(0, 45 * 60 - secondsElapsed);
  const timerMinutesRemaining = Math.ceil(remainingSeconds / 60);

  const handleOpenDiploma = (timeSpent: number) => {
    setDiplomaTimeSpent(timeSpent || 45);
    setIsDiplomaModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-sky-200">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTimerModal={() => {
          sounds.playClick();
          setIsTimerModalOpen(true);
        }}
        timerMinutesRemaining={timerMinutesRemaining}
      />

      {/* Floating Lesson Progress Dock (Fixed Bottom Right on desktop, easy access) */}
      <div className="fixed bottom-4 right-4 z-30 print:hidden flex items-center gap-2">
        <button
          onClick={() => {
            sounds.playClick();
            setIsTimerModalOpen(true);
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/90 hover:bg-slate-900 text-white rounded-full shadow-lg backdrop-blur-md border border-slate-700 text-xs font-semibold transition-all hover:scale-105"
        >
          <Clock className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: isRunning ? '3s' : '0s' }} />
          <span>Aula CN (45 min): <strong className="font-mono text-cyan-300">{timerMinutesRemaining}m</strong> restantes</span>
        </button>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-10">
        {/* Hero Section */}
        {activeTab === 'inicio' && (
          <>
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Hero Copy (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-sky-800 mb-3">
                      <span>Ciências Naturais · 5.º Ano</span>
                      <span aria-hidden="true">·</span>
                      <span>Aprendizagens Essenciais</span>
                      <span aria-hidden="true">·</span>
                      <span>Duração Máxima: 45 Minutos</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                      A Incrível Viagem do <span className="text-sky-700">Ciclo da Água</span>
                    </h1>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-6">
                      Sabias que a água que bebes hoje é a mesmíssima que existia no tempo dos dinossauros? Descobre como a água circula sem parar entre a Terra e a atmosfera através da <strong>evaporação</strong>, <strong>condensação</strong>, <strong>precipitação</strong> e <strong>infiltração</strong>.
                    </p>

                    {/* Quick navigation highlights */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          setActiveTab('diagrama');
                          sounds.playClick();
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                      >
                        <Compass className="w-4 h-4" />
                        <span>Abrir Simulador do Ciclo</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('jogos');
                          sounds.playClick();
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold shadow-xs transition-colors"
                      >
                        <Gamepad2 className="w-4 h-4 text-sky-700" />
                        <span>Jogos Didáticos</span>
                      </button>

                      <button
                        onClick={() => {
                          sounds.playClick();
                          setIsTimerModalOpen(true);
                          if (!isRunning) setIsRunning(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-300 hover:bg-amber-100/70 text-amber-900 rounded-xl text-xs font-semibold shadow-xs transition-colors"
                      >
                        <Clock className="w-4 h-4 text-amber-700" />
                        <span>Começar Aula (45 min)</span>
                      </button>
                    </div>
                  </div>

                  {/* Curricular Key Badges without static pills */}
                  <div className="pt-8 border-t border-slate-100 mt-6 grid grid-cols-3 gap-4 text-xs text-slate-600">
                    <div>
                      <span className="block font-bold text-slate-900">4 Jogos Didáticos</span>
                      <span>Correspondência, V/F, Quiz e Memória</span>
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Atividades Sem Ecrã</span>
                      <span>Dinâmicas práticas e ficha em papel</span>
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Gestor de Aula</span>
                      <span>Ritmo letivo ajustado a 45 minutos</span>
                    </div>
                  </div>
                </div>

                {/* Hero Graphic Card (5 cols) */}
                <div className="lg:col-span-5 relative bg-slate-900 overflow-hidden min-h-[260px] lg:min-h-full">
                  <img
                    src={HERO_IMAGE}
                    alt="Paisagem ilustrada do ciclo da água com montanhas, rios e oceano"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                    <span className="text-cyan-300 font-semibold text-xs mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Ciências Naturais 5.º Ano
                    </span>
                    <h3 className="text-white text-lg font-bold">
                      Do Oceano às Nuvens e ao Subsolo
                    </h3>
                    <p className="text-slate-300 text-xs mt-1">
                      As 6 etapas essenciais do ciclo hidrológico explicadas para crianças dos 10 aos 12 anos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 45-Minute Lesson Route Plan (Roadmap) */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-4">
                <div>
                  <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                    Plano de Aula de 45 Minutos
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Como Organizar Esta Aula de Ciências Naturais
                  </h3>
                </div>
                <button
                  onClick={() => setIsTimerModalOpen(true)}
                  className="text-xs text-sky-700 font-semibold hover:underline flex items-center gap-1"
                >
                  Abrir Cronómetro Curricular <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div
                  onClick={() => setActiveTab('diagrama')}
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-sky-800">00 - 15 min</span>
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                  </div>
                  <strong className="block text-slate-900 font-bold mb-1">1. Descoberta & Conteúdos</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Exploração do simulador interativo, das 6 etapas e das mudanças de estado da água.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('jogos')}
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-emerald-800">15 - 30 min</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <strong className="block text-slate-900 font-bold mb-1">2. Jogos Didáticos Digitais</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Correspondência, Verdadeiro/Falso, Escolha Múltipla e jogo de virar cartas.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('sem-tecnologia')}
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-amber-800">30 - 40 min</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                  </div>
                  <strong className="block text-slate-900 font-bold mb-1">3. Atividade Sem Ecrãs</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Dinâmica de grupo "A Gota Viajante", "Nuvem no Frasco" ou ficha em papel.
                  </p>
                </div>

                <div
                  onClick={() => handleOpenDiploma(45)}
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-purple-800">40 - 45 min</span>
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                  </div>
                  <strong className="block text-slate-900 font-bold mb-1">4. Síntese e Diploma</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Autoavaliação, registo no caderno diário e emissão do certificado de mérito.
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded interactive simulator directly on the home page for immediate engagement */}
            <InteractiveWaterCycle />

            {/* Embedded Theoretical content */}
            <ContentSection />

            {/* Embedded Didactic Games Hub */}
            <GamesHub />

            {/* Embedded Unplugged activities */}
            <UnpluggedActivities />
          </>
        )}

        {/* Dedicated Tab Views */}
        {activeTab === 'conteudos' && <ContentSection />}

        {activeTab === 'diagrama' && <InteractiveWaterCycle />}

        {activeTab === 'jogos' && <GamesHub />}

        {activeTab === 'sem-tecnologia' && <UnpluggedActivities />}

        {activeTab === 'ficha' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Ficha de Avaliação & Diploma</h2>
                <p className="text-xs text-slate-600 mt-1">
                  Avaliação formativa das Aprendizagens Essenciais do 5.º ano e impressão de certificado.
                </p>
              </div>
              <button
                onClick={() => handleOpenDiploma(Math.floor(secondsElapsed / 60) || 45)}
                className="flex items-center gap-2 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <Award className="w-4 h-4" />
                <span>Emitir Diploma do Aluno</span>
              </button>
            </div>
            <UnpluggedActivities />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-slate-800">
              O Ciclo da Água · Ciências Naturais 5.º Ano de Escolaridade
            </p>
            <p>
              Elaborado de acordo com as Aprendizagens Essenciais do Ministério da Educação (Portugal).
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-600">
            <button
              onClick={() => {
                setActiveTab('inicio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-sky-700 transition-colors"
            >
              Início
            </button>
            <span>·</span>
            <button
              onClick={() => setIsTimerModalOpen(true)}
              className="hover:text-sky-700 transition-colors font-medium text-sky-700"
            >
              Cronómetro de 45 Minutos
            </button>
            <span>·</span>
            <button
              onClick={() => handleOpenDiploma(45)}
              className="hover:text-sky-700 transition-colors font-medium text-emerald-700"
            >
              Diploma do Aluno
            </button>
          </div>
        </div>
      </footer>

      {/* 45-Minute Lesson Timer Modal */}
      <LessonTimer
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
        onOpenDiploma={handleOpenDiploma}
        secondsElapsed={secondsElapsed}
        setSecondsElapsed={setSecondsElapsed}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />

      {/* Student Merit Certificate Modal */}
      <DiplomaModal
        isOpen={isDiplomaModalOpen}
        onClose={() => setIsDiplomaModalOpen(false)}
        timeSpentMinutes={diplomaTimeSpent}
      />
    </div>
  );
}
