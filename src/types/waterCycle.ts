export interface CycleStage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stateChange?: string;
  energyChange: 'Absorve calor (Aquece)' | 'Liberta calor (Arrefece)' | 'Sem mudança de estado';
  example: string;
  x: number; // percentage in diagram
  y: number; // percentage in diagram
  icon: string;
}

export interface StateChangeItem {
  name: string;
  from: string;
  to: string;
  thermalProcess: 'Aquecimento (ganho de calor)' | 'Arrefecimento (perda de calor)';
  example: string;
  curiosity: string;
}

export interface MatchingPair {
  id: string;
  stageName: string;
  definition: string;
  iconName: string;
}

export interface TrueFalseQuestion {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MemoryCard {
  id: string;
  matchKey: string;
  title: string;
  category: 'nome' | 'definicao';
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface UnpluggedActivity {
  id: string;
  title: string;
  duration: string;
  materials: string[];
  objective: string;
  instructions: string[];
  teacherTip: string;
}
