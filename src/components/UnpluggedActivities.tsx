import React, { useState } from 'react';
import { UNPLUGGED_ACTIVITIES } from '../data/curriculumData';
import { sounds } from '../utils/soundEffects';
import {
  Users,
  Printer,
  Compass,
  FileText,
  Clock,
  Sparkles,
  CheckSquare,
  HelpCircle,
} from 'lucide-react';

export const UnpluggedActivities: React.FC = () => {
  const [selectedActivityId, setSelectedActivityId] = useState<string>(UNPLUGGED_ACTIVITIES[0].id);
  const currentActivity = UNPLUGGED_ACTIVITIES.find((a) => a.id === selectedActivityId) || UNPLUGGED_ACTIVITIES[0];

  const handlePrintWorksheet = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="space-y-8 my-6">
      {/* Introduction banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-amber-800" />
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Jogos Sem Recurso a Tecnologias (Unplugged)
              </span>
            </div>
            <h3 className="text-xl font-bold text-amber-950">
              Dinâmicas Presenciais & Atividades para a Sala de Aula
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 mt-1 max-w-2xl leading-relaxed">
              Propostas pedagógicas práticas, jogos de movimento e experiências com materiais do dia a dia, preparadas para serem desenvolvidas em 10 a 15 minutos dentro do bloco letivo de 45 minutos.
            </p>
          </div>

          <button
            onClick={handlePrintWorksheet}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-amber-300 hover:bg-amber-100/70 text-amber-900 rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0 print:hidden"
          >
            <Printer className="w-4 h-4 text-amber-800" />
            <span>Imprimir Ficha de Trabalho</span>
          </button>
        </div>
      </div>

      {/* Activity Selector & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Activity List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Escolher Dinâmica Sem Ecrãs:
          </span>
          {UNPLUGGED_ACTIVITIES.map((act, idx) => (
            <button
              key={act.id}
              onClick={() => {
                setSelectedActivityId(act.id);
                sounds.playClick();
              }}
              className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1 ${
                selectedActivityId === act.id
                  ? 'bg-sky-50 border-sky-600 shadow-sm ring-1 ring-sky-300'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-sky-800 bg-sky-100/70 px-2 py-0.5 rounded">
                  Dinâmica {idx + 1}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {act.duration}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-1">{act.title}</h4>
            </button>
          ))}
        </div>

        {/* Right Side: Detailed Activity Guide (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-4">
            <div>
              <span className="text-xs font-semibold text-sky-700">Guia Didático para o Professor e Alunos</span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">{currentActivity.title}</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
              {currentActivity.duration}
            </span>
          </div>

          <div className="space-y-5 text-sm">
            {/* Objective */}
            <div>
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-sky-600" /> Objetivo Pedagógico (5.º Ano)
              </span>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                {currentActivity.objective}
              </p>
            </div>

            {/* Materials */}
            <div>
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" /> Materiais Necessários (Sem Tecnologias)
              </span>
              <ul className="space-y-1.5 pl-2">
                {currentActivity.materials.map((mat, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-step Instructions */}
            <div>
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-emerald-600" /> Instruções Passo a Passo
              </span>
              <ol className="space-y-2.5">
                {currentActivity.instructions.map((inst, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-3 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-sky-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{inst}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Teacher tip */}
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-3.5 text-xs text-sky-950 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">Dica Pedagógica:</strong>
                {currentActivity.teacherTip}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Paper Worksheet (Visual Preview + Print ready) */}
      <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 print:border-none print:p-0 print:m-0">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6 print:border-b-2 print:border-black">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
              Agrupamento de Escolas · Disciplina de Ciências Naturais · 5.º Ano
            </span>
            <h3 className="text-xl font-bold text-slate-900 print:text-black">
              Ficha de Trabalho Presencial: O Ciclo da Água (45 min)
            </h3>
          </div>
          <div className="text-right text-xs text-slate-500 print:text-black space-y-1">
            <div>Nome do Aluno: ___________________________ N.º: ____</div>
            <div>Turma: 5.º ___ Data: ___ / ___ / 2026 Avaliação: ______</div>
          </div>
        </div>

        {/* Paper Exercises for 5th graders */}
        <div className="space-y-6 text-sm text-slate-800 print:text-black">
          {/* Question 1 */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 print:text-black">
              1. Estabelece a correspondência correta entre a Etapa do Ciclo (Coluna A) e o respetivo Fenómeno (Coluna B):
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 print:bg-white print:border-slate-400">
                <span className="font-bold block uppercase text-slate-700 mb-1">Coluna A (Etapas)</span>
                <div>A. Evaporação</div>
                <div>B. Condensação</div>
                <div>C. Precipitação</div>
                <div>D. Infiltração</div>
                <div>E. Transpiração</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 print:bg-white print:border-slate-400">
                <span className="font-bold block uppercase text-slate-700 mb-1">Coluna B (Fenómenos)</span>
                <div>( &nbsp;&nbsp; ) Queda de água líquida ou sólida das nuvens.</div>
                <div>( &nbsp;&nbsp; ) Água penetra no solo formando aquíferos.</div>
                <div>( &nbsp;&nbsp; ) Passagem de líquido a vapor sob o calor do Sol.</div>
                <div>( &nbsp;&nbsp; ) Formação de nuvens pelo arrefecimento do vapor.</div>
                <div>( &nbsp;&nbsp; ) Perda de vapor de água pelas folhas das árvores.</div>
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 print:text-black">
              2. Classifica cada uma das seguintes afirmações em Verdadeira (V) ou Falsa (F):
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-10 border border-slate-400 text-center py-1 rounded print:border-black font-mono">
                  [ &nbsp; ]
                </span>
                <span>a) As nuvens são constituídas exclusivamente por vapor de água no estado gasoso invisível.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 border border-slate-400 text-center py-1 rounded print:border-black font-mono">
                  [ &nbsp; ]
                </span>
                <span>b) A água pura muda do estado líquido para o sólido (solidificação) à temperatura de 0 ºC.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 border border-slate-400 text-center py-1 rounded print:border-black font-mono">
                  [ &nbsp; ]
                </span>
                <span>c) Mais de 97% de toda a água existente na Terra é salgada e localiza-se nos mares e oceanos.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 border border-slate-400 text-center py-1 rounded print:border-black font-mono">
                  [ &nbsp; ]
                </span>
                <span>d) As rochas impermeáveis permitem que a água se infiltre facilmente no subsolo.</span>
              </div>
            </div>
          </div>

          {/* Question 3 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 print:text-black">
              3. Resposta curta: Explica porque é que a água doce potável é considerada um recurso escasso no nosso planeta, apesar de a Terra ser conhecida como o "Planeta Azul".
            </h4>
            <div className="space-y-3 pt-2">
              <div className="border-b border-dotted border-slate-400 h-6 print:border-black" />
              <div className="border-b border-dotted border-slate-400 h-6 print:border-black" />
              <div className="border-b border-dotted border-slate-400 h-6 print:border-black" />
            </div>
          </div>
        </div>

        {/* Action to print */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end print:hidden">
          <button
            onClick={handlePrintWorksheet}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Ficha de Trabalho em Papel</span>
          </button>
        </div>
      </div>
    </div>
  );
};
