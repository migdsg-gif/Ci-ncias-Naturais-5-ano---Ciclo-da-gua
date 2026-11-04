import React, { useState, useEffect } from 'react';
import { sounds } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Sun,
  Cloud,
  CloudRain,
  Layers,
  Trees,
  Flame,
  Snowflake,
  ShieldAlert,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface CardItem {
  id: string;
  pairKey: string;
  type: 'title' | 'concept';
  content: string;
  iconName: string;
}

const BASE_PAIRS: { key: string; title: string; concept: string; icon: string }[] = [
  {
    key: 'evap',
    title: 'Evaporação',
    concept: 'Líquido → Gás (Calor do Sol)',
    icon: 'Sun',
  },
  {
    key: 'cond',
    title: 'Condensação',
    concept: 'Gás → Líquido (Forma nuvens)',
    icon: 'Cloud',
  },
  {
    key: 'prec',
    title: 'Precipitação',
    concept: 'Chuva, neve ou granizo',
    icon: 'CloudRain',
  },
  {
    key: 'infil',
    title: 'Infiltração',
    concept: 'Penetra no solo e rochas',
    icon: 'Layers',
  },
  {
    key: 'transp',
    title: 'Transpiração',
    concept: 'Plantas libertam vapor',
    icon: 'Trees',
  },
  {
    key: 'fusao',
    title: 'Fusão',
    concept: 'Sólido → Líquido (Gelo derrete)',
    icon: 'Flame',
  },
  {
    key: 'solid',
    title: 'Solidificação',
    concept: 'Líquido → Sólido (Água gela a 0ºC)',
    icon: 'Snowflake',
  },
  {
    key: 'aquif',
    title: 'Aquífero',
    concept: 'Reserva de água subterrânea',
    icon: 'ShieldAlert',
  },
];

export const MemoryCardGame: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedKeys, setMatchedKeys] = useState<string[]>([]);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const setupCards = () => {
    const deck: CardItem[] = [];
    BASE_PAIRS.forEach((item) => {
      deck.push({
        id: `${item.key}-title`,
        pairKey: item.key,
        type: 'title',
        content: item.title,
        iconName: item.icon,
      });
      deck.push({
        id: `${item.key}-concept`,
        pairKey: item.key,
        type: 'concept',
        content: item.concept,
        iconName: item.icon,
      });
    });

    // Shuffle deck
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedKeys([]);
    setMovesCount(0);
    setIsLocked(false);
  };

  useEffect(() => {
    setupCards();
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    if (flippedIndices.includes(index)) return;
    if (matchedKeys.includes(cards[index].pairKey)) return;

    sounds.playFlip();

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMovesCount((m) => m + 1);
      setIsLocked(true);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.pairKey === secondCard.pairKey && firstCard.type !== secondCard.type) {
        // Successful Match!
        sounds.playSuccess();
        const updatedMatched = [...matchedKeys, firstCard.pairKey];
        setMatchedKeys(updatedMatched);
        setFlippedIndices([]);
        setIsLocked(false);

        if (updatedMatched.length === BASE_PAIRS.length) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } else {
        // Not a match
        sounds.playError();
        setTimeout(() => {
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1100);
      }
    }
  };

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-sky-500" />;
      case 'CloudRain':
        return <CloudRain className="w-5 h-5 text-blue-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-700" />;
      case 'Trees':
        return <Trees className="w-5 h-5 text-emerald-600" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-rose-500" />;
      case 'Snowflake':
        return <Snowflake className="w-5 h-5 text-cyan-500" />;
      case 'ShieldAlert':
        return <Layers className="w-5 h-5 text-sky-700" />;
      default:
        return <Sparkles className="w-5 h-5 text-sky-600" />;
    }
  };

  const isCompleted = matchedKeys.length === BASE_PAIRS.length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
        <div>
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            Jogo de Virar Cartas · Memória Visual
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            Pares da Hidrosfera (8 Pares de Cartas)
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Vira duas cartas de cada vez para encontrar os pares de termos científicos e a sua explicação correspondente.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs font-semibold text-slate-600">
            Jogadas: <span className="font-mono text-sky-700 font-bold">{movesCount}</span>
          </div>
          <div className="text-xs font-semibold text-slate-600">
            Pares: <span className="font-mono text-emerald-600 font-bold">{matchedKeys.length}</span> / {BASE_PAIRS.length}
          </div>
          <button
            onClick={() => {
              setupCards();
              sounds.playClick();
            }}
            className="p-1.5 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            title="Baralhar e recomeçar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isCompleted ? (
        <div className="text-center py-8 bg-sky-50 border border-sky-200 rounded-xl p-6">
          <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-sky-950 mb-1">
            Parabéns! Encontraste todos os 8 pares!
          </h4>
          <p className="text-sm text-sky-800 max-w-md mx-auto mb-4">
            Completaste o jogo de virar cartas em apenas <strong className="font-mono">{movesCount}</strong> jogadas. Memória científica impecável!
          </p>
          <button
            onClick={setupCards}
            className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Jogar Novamente com Cartas Baralhadas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {cards.map((card, idx) => {
            const isFlipped = flippedIndices.includes(idx) || matchedKeys.includes(card.pairKey);
            const isMatched = matchedKeys.includes(card.pairKey);

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className="perspective-1000 h-28 sm:h-32 cursor-pointer select-none"
              >
                <div
                  className={`relative w-full h-full rounded-xl transition-transform duration-500 transform-style-preserve-3d shadow-xs ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Card Back (hidden state facing user initially) */}
                  <div className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-sky-700 to-sky-900 border border-sky-600 flex flex-col items-center justify-center p-3 text-white backface-hidden hover:brightness-105 transition-all">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-1">
                      <Sparkles className="w-4 h-4 text-cyan-300" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wide uppercase text-sky-200">
                      Ciências 5º
                    </span>
                  </div>

                  {/* Card Front (revealed on flip) */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-xl p-3 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 border transition-colors ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-white border-sky-200 text-slate-800'
                    }`}
                  >
                    <div className="mb-1.5">{getCardIcon(card.iconName)}</div>
                    {card.type === 'title' ? (
                      <span className="text-sm font-bold leading-tight block text-sky-950">
                        {card.content}
                      </span>
                    ) : (
                      <span className="text-xs font-medium leading-tight text-slate-700 block">
                        {card.content}
                      </span>
                    )}

                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mt-1">
                      {card.type === 'title' ? 'Conceito' : 'Definição'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
