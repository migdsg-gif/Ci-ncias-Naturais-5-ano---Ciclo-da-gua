import React, { useState } from 'react';
import {
  STATE_CHANGES,
  WATER_DISTRIBUTION,
  CYCLE_STAGES,
  CLOUD_RAIN_IMAGE,
  AQUIFER_IMAGE,
} from '../data/curriculumData';
import {
  Droplets,
  Thermometer,
  Globe2,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const ContentSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'etapas' | 'estados' | 'distribuicao' | 'glossario'>('etapas');

  return (
    <section className="my-8">
      {/* Sub-navigation tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6 overflow-x-auto">
        <button
          onClick={() => {
            setActiveSubTab('etapas');
            sounds.playClick();
          }}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeSubTab === 'etapas'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>1. As 6 Etapas do Ciclo</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('estados');
            sounds.playClick();
          }}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeSubTab === 'estados'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Thermometer className="w-4 h-4" />
          <span>2. Mudanças de Estado Físico</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('distribuicao');
            sounds.playClick();
          }}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeSubTab === 'distribuicao'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Globe2 className="w-4 h-4" />
          <span>3. Distribuição no Planeta</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('glossario');
            sounds.playClick();
          }}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeSubTab === 'glossario'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>4. Ficha & Glossário 5.º Ano</span>
        </button>
      </div>

      {/* Tab 1: As 6 Etapas do Ciclo */}
      {activeSubTab === 'etapas' && (
        <div className="space-y-6">
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 sm:p-5">
            <h3 className="text-lg font-bold text-sky-950 mb-1">
              O Que é o Ciclo da Água? (Ciclo Hidrológico)
            </h3>
            <p className="text-sm text-sky-900 leading-relaxed">
              O ciclo da água é o movimento contínuo e infinito da água entre a Terra (hidrosfera e litosfera) e a atmosfera. Graças à energia do <strong>Sol</strong> e à força da gravidade, a mesma água que os dinossauros beberam há milhões de anos continua hoje a circular na Terra, purificando-se naturalmente!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CYCLE_STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                      Etapa 0{idx + 1}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{stage.energyChange}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{stage.name}</h4>
                  <p className="text-xs font-medium text-slate-700 italic mb-3">"{stage.tagline}"</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{stage.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Exemplo real:</span> {stage.example}
                </div>
              </div>
            ))}
          </div>

          {/* Visual Pair Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
              <img
                src={CLOUD_RAIN_IMAGE}
                alt="Condensação e precipitação da água"
                className="w-full aspect-16/9 object-cover"
              />
              <div className="p-4">
                <h4 className="text-base font-bold text-slate-900">
                  O Segredo das Nuvens e da Precipitação
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Ao contrário do que muitas pessoas pensam, as nuvens não são gás invisível: são aglomerados de triliões de gotículas líquidas microscópicas suspensas no ar frio. Quando colidem e aumentam de tamanho, a gravidade puxa-as para a Terra: é a chuva!
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
              <img
                src={AQUIFER_IMAGE}
                alt="Infiltração da água e formação de aquíferos"
                className="w-full aspect-16/9 object-cover"
              />
              <div className="p-4">
                <h4 className="text-base font-bold text-slate-900">
                  A Infiltração e o Tesouro dos Aquíferos
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  As rochas permeáveis (como o calcário e as areias) funcionam como gigantescos filtros naturais. A água desce pela gravidade até encontrar uma camada de rocha impermeável (como a argila), formando o lençol freático e os aquíferos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Mudanças de Estado Físico */}
      {activeSubTab === 'estados' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Os Três Estados Físicos da Água na Natureza
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-6">
              A água é a única substância natural abundante que existe simultaneamente na Terra nos três estados da matéria. Para mudar de estado, a água precisa de ganhar energia térmica (aquecer) ou perder energia térmica (arrefecer).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-cyan-200 bg-cyan-50/50 rounded-xl p-4">
                <div className="text-sm font-bold text-cyan-900 flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  Estado Sólido
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  Forma e volume bem definidos. As moléculas estão muito unidas e com pouco movimento.
                </p>
                <div className="text-xs text-cyan-800 font-medium">
                  Exemplos: Neve na Serra da Estrela, granizo, geada e gelo nos polos.
                </div>
              </div>

              <div className="border border-sky-200 bg-sky-50/50 rounded-xl p-4">
                <div className="text-sm font-bold text-sky-900 flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                  Estado Líquido
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  Volume constante, mas adapta a sua forma ao recipiente. As moléculas deslizam umas pelas outras.
                </p>
                <div className="text-xs text-sky-800 font-medium">
                  Exemplos: Chuva, orvalho, oceanos, rios, toalha freática e sangue.
                </div>
              </div>

              <div className="border border-amber-200 bg-amber-50/50 rounded-xl p-4">
                <div className="text-sm font-bold text-amber-900 flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Estado Gasoso (Vapor)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  Invisível, sem forma nem volume próprios. As moléculas estão muito afastadas e movem-se velozmente.
                </p>
                <div className="text-xs text-amber-800 font-medium">
                  Exemplos: Vapor de água presente no ar atmosférico e na respiração.
                </div>
              </div>
            </div>

            {/* Scheme of transitions */}
            <h4 className="text-base font-bold text-slate-900 mb-3">
              Quadro de Mudanças de Estado Físico (Aprendizagens Essenciais 5.º Ano)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Mudança de Estado</th>
                    <th className="p-3">Passagem</th>
                    <th className="p-3">Processo Térmico</th>
                    <th className="p-3">Exemplo na Natureza</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {STATE_CHANGES.map((sc, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{sc.name}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 font-semibold text-sky-800">
                          {sc.from} <ArrowRight className="w-3 h-3" /> {sc.to}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-semibold ${
                            sc.thermalProcess.includes('Aquecimento') ? 'text-amber-800' : 'text-cyan-800'
                          }`}
                        >
                          {sc.thermalProcess}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{sc.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Atenção ao detalhe:</strong> A água pura ferve (ebulição) a <strong>100 ºC</strong> e solidifica (congela) a <strong>0 ºC</strong> à pressão normal ao nível do mar.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Distribuição no Planeta */}
      {activeSubTab === 'distribuicao' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              O "Planeta Azul": Quanta Água Temos Realmente para Beber?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-6">
              Cerca de 71% da superfície da Terra está coberta por água, razão pela qual o nosso planeta é conhecido por "Planeta Azul". No entanto, nem toda a água está disponível para os seres vivos terrestres.
            </p>

            {/* Visual Bar Distribution */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Água Salgada (Oceanos e Mares): 97,5%</span>
                <span>Água Doce Global: 2,5%</span>
              </div>
              <div className="h-6 w-full rounded-full overflow-hidden flex bg-slate-200 border border-slate-300">
                <div style={{ width: '97.5%' }} className="bg-sky-700 flex items-center justify-center text-[10px] text-white font-bold" title="97,5% Salgada">
                  97,5% Salgada
                </div>
                <div style={{ width: '2.5%' }} className="bg-amber-400 flex items-center justify-center text-[10px] text-slate-900 font-bold" title="2,5% Doce">
                  2,5%
                </div>
              </div>
            </div>

            {/* Detailed Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WATER_DISTRIBUTION.map((item, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-sm text-slate-900">{item.label}</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800">
                      ~{item.percentage}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Conservation Note */}
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 leading-relaxed">
                <strong className="text-sm block text-emerald-950 mb-1">
                  Mensagem de Cidadania Ambiental (5.º Ano):
                </strong>
                Como menos de 1% de toda a água doce do planeta está acessível em rios e lagos, a água potável é um recurso escasso e precioso. Não devemos poluir os solos com químicos (que contaminam os aquíferos) nem desperdiçar água na torneira durante os dentes ou banhos prolongados!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Glossário do 5.º Ano */}
      {activeSubTab === 'glossario' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-sky-700" />
            <h3 className="text-xl font-bold text-slate-900">
              Glossário Científico das Aprendizagens Essenciais
            </h3>
          </div>
          <p className="text-sm text-slate-600">
            Vocabulário indispensável para responderes aos testes e fichas de avaliação de Ciências Naturais:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
              <span className="font-bold text-sm text-sky-900 block mb-1">Aquífero</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Formação rochosa subterrânea porosa e permeável capaz de armazenar e fornecer água doce através de poços e nascentes.
              </p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
              <span className="font-bold text-sm text-sky-900 block mb-1">Toalha Freática</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nível superior da zona do solo e rocha que se encontra completamente saturada com água subterrânea.
              </p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
              <span className="font-bold text-sm text-sky-900 block mb-1">Evapotranspiração</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conjunto da água evaporada do solo e das superfícies aquáticas juntamente com a água transpirada pelas plantas e animais.
              </p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
              <span className="font-bold text-sm text-sky-900 block mb-1">Estomas</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Minúsculos orifícios situados nas folhas das plantas por onde entram e saem os gases e por onde se dá a perda de água na transpiração.
              </p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
              <span className="font-bold text-sm text-sky-900 block mb-1">Rocha Permeável</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rocha com poros ou fendas interligadas que permite a passagem fácil da água da chuva em direção aos reservatórios subterrâneos.
              </p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
              <span className="font-bold text-sm text-sky-900 block mb-1">Precipitação</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Queda de água líquida (chuva) ou sólida (neve e granizo) das nuvens para a superfície terrestre devido ao peso das partículas.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
