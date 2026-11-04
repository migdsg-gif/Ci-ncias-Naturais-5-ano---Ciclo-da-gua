import {
  CycleStage,
  StateChangeItem,
  MatchingPair,
  TrueFalseQuestion,
  MultipleChoiceQuestion,
  UnpluggedActivity,
} from '../types/waterCycle';

import heroImage from '../assets/images/hero_water_cycle_landscape_1793818416824.jpg';
import cloudRainImage from '../assets/images/cloud_condensation_rain_1793818417510.jpg';
import aquiferImage from '../assets/images/groundwater_aquifer_infiltration_1793818418550.jpg';

export const HERO_IMAGE = heroImage;
export const CLOUD_RAIN_IMAGE = cloudRainImage;
export const AQUIFER_IMAGE = aquiferImage;

export const CYCLE_STAGES: CycleStage[] = [
  {
    id: 'evaporacao',
    name: 'Evaporação',
    tagline: 'A água dos oceanos, rios e lagos sobe para a atmosfera',
    description:
      'Sob a ação do calor do Sol, a água à superfície dos oceanos, mares, rios e albufeiras passa lentamente do estado líquido para o estado gasoso (vapor de água), tornando-se invisível e subindo na atmosfera.',
    stateChange: 'Líquido → Gasoso (Vaporização lenta à temperatura ambiente)',
    energyChange: 'Absorve calor (Aquece)',
    example: 'A roupa molhada a secar no estendal ou a água de uma poça a desaparecer com o calor do sol.',
    x: 82,
    y: 58,
    icon: 'Sun',
  },
  {
    id: 'transpiracao',
    name: 'Transpiração e Evapotranspiração',
    tagline: 'Os seres vivos também libertam vapor de água',
    description:
      'As plantas absorvem água do solo pelas raízes e libertam o excesso através de pequenos orifícios nas folhas (estomas). Os animais (incluindo o ser humano) também transpiram e respiram, devolvendo vapor de água à atmosfera.',
    stateChange: 'Líquido → Gasoso',
    energyChange: 'Absorve calor (Aquece)',
    example: 'A frescura e humidade que se sente ao passear por uma floresta densa como a Serra de Sintra ou o Gerês.',
    x: 48,
    y: 62,
    icon: 'Trees',
  },
  {
    id: 'condensacao',
    name: 'Condensação',
    tagline: 'O vapor de água arrefece em altitude e forma nuvens',
    description:
      'À medida que o vapor de água sobe na atmosfera, entra em contacto com camadas de ar mais frias. O vapor arrefece e transforma-se em milhões de gotículas minúsculas de água líquida (ou cristais de gelo), formando as nuvens e o nevoeiro.',
    stateChange: 'Gasoso → Líquido',
    energyChange: 'Liberta calor (Arrefece)',
    example: 'O espelho da casa de banho a ficar embaciado depois de um duche quente.',
    x: 65,
    y: 22,
    icon: 'Cloud',
  },
  {
    id: 'precipitacao',
    name: 'Precipitação',
    tagline: 'A água regressa à superfície em forma de chuva, neve ou granizo',
    description:
      'Quando as pequenas gotículas de água nas nuvens se juntam e se tornam demasiado pesadas para flutuar no ar, caem por ação da força da gravidade. Consoante a temperatura atmosférica, cai sob a forma de chuva (líquida), neve ou granizo (sólido).',
    stateChange: 'Permanência no estado líquido ou solidificação',
    energyChange: 'Liberta calor (Arrefece)',
    example: 'Um dia chuvoso de inverno ou uma nevada na Serra da Estrela.',
    x: 22,
    y: 35,
    icon: 'CloudRain',
  },
  {
    id: 'infiltracao',
    name: 'Infiltração e Percolação',
    tagline: 'A água penetra no solo e abastece os lençóis subterrâneos',
    description:
      'Parte da água da chuva que cai sobre a terra penetra no solo através dos poros e fissuras das rochas permeáveis. Esta água forma a toalha freática e os aquíferos, que alimentam poços, nascentes e fontes naturais de água potável.',
    stateChange: 'Sem mudança de estado (Mantém-se líquida)',
    energyChange: 'Sem mudança de estado',
    example: 'A água pura que brota numa nascente de montanha ou numa fonte termal.',
    x: 28,
    y: 84,
    icon: 'Layers',
  },
  {
    id: 'escoamento',
    name: 'Escoamento Superficial e Subterrâneo',
    tagline: 'A água corre pelas encostas até aos ribeiros, rios e oceanos',
    description:
      'A água que não se infiltra no solo escorre à superfície pelas encostas das montanhas e colinas (escoamento superficial), alimentando ribeiros que desaguam em grandes rios (como o Tejo ou o Douro) e finalmente voltam a entrar no Oceano Atlântico.',
    stateChange: 'Sem mudança de estado (Líquido em movimento)',
    energyChange: 'Sem mudança de estado',
    example: 'As cascatas nas serras e os grandes rios portugueses a desaguar no mar.',
    x: 42,
    y: 74,
    icon: 'Waves',
  },
];

export const STATE_CHANGES: StateChangeItem[] = [
  {
    name: 'Vaporização (Evaporação / Ebulição)',
    from: 'Líquido',
    to: 'Gasoso',
    thermalProcess: 'Aquecimento (ganho de calor)',
    example: 'Secagem de roupa ou a evaporação contínua da superfície do mar sob o Sol.',
    curiosity: 'A evaporação é um processo lento e à superfície; a ebulição ocorre a 100 ºC em toda a massa de água.',
  },
  {
    name: 'Condensação (ou Liquefação)',
    from: 'Gasoso',
    to: 'Líquido',
    thermalProcess: 'Arrefecimento (perda de calor)',
    example: 'Formação de nuvens no céu, orvalho na relva pela manhã e vidros embaciados.',
    curiosity: 'As nuvens não são vapor de água invisível: são compostas por água líquida visível ou pequenos cristais de gelo!',
  },
  {
    name: 'Solidificação',
    from: 'Líquido',
    to: 'Sólido',
    thermalProcess: 'Arrefecimento (perda de calor)',
    example: 'Formação de gelo no congelador, neve na montanha ou geada nas noites frias.',
    curiosity: 'A água pura solidifica aos 0 ºC ao nível do mar e expande o seu volume quando gela.',
  },
  {
    name: 'Fusão',
    from: 'Sólido',
    to: 'Líquido',
    thermalProcess: 'Aquecimento (ganho de calor)',
    example: 'O derretimento dos glaciares no verão ou o degelo das neves nas serras.',
    curiosity: 'O ponto de fusão do gelo pura é 0 ºC, exatamente a mesma temperatura da solidificação.',
  },
];

export const WATER_DISTRIBUTION = [
  {
    label: 'Água Salgada (Oceanos e Mares)',
    percentage: 97.5,
    color: 'bg-sky-600',
    description: 'Encontra-se nos oceanos e mares. É rica em sais minerais dissolvidos e não é própria para consumo humano direto nem para a agricultura tradicional.',
  },
  {
    label: 'Glaciares e Calotes Polares (Água Doce Congelada)',
    percentage: 1.74,
    color: 'bg-cyan-400',
    description: 'Quase 70% de toda a água doce do planeta encontra-se retida sob a forma de gelo na Antártida, no Ártico e nas altas montanhas.',
  },
  {
    label: 'Águas Subterrâneas e Aquíferos (Água Doce)',
    percentage: 0.74,
    color: 'bg-emerald-600',
    description: 'Armazenada nos poros e fissuras do subsolo. É uma reserva crucial que alimenta poços, nascentes e a agricultura.',
  },
  {
    label: 'Rios, Lagos e Atmosfera (Água Doce Acessível)',
    percentage: 0.02,
    color: 'bg-amber-500',
    description: 'Uma fração minúscula de toda a água do planeta! É dela que depende grande parte da vida terrestre diária e das populações humanas.',
  },
];

export const MATCHING_DATA: MatchingPair[] = [
  {
    id: 'm1',
    stageName: 'Evaporação',
    definition: 'Passagem da água líquida à superfície dos oceanos e rios para o estado gasoso, por ação do calor solar.',
    iconName: 'Sun',
  },
  {
    id: 'm2',
    stageName: 'Condensação',
    definition: 'Passagem do vapor de água para o estado líquido em altitude, originando as nuvens e nevoeiros.',
    iconName: 'Cloud',
  },
  {
    id: 'm3',
    stageName: 'Precipitação',
    definition: 'Queda de água das nuvens para a superfície terrestre sob a forma de chuva, neve ou granizo.',
    iconName: 'CloudRain',
  },
  {
    id: 'm4',
    stageName: 'Infiltração',
    definition: 'Penetração da água da chuva através do solo e rochas permeáveis, abastecendo os lençóis freáticos.',
    iconName: 'Layers',
  },
  {
    id: 'm5',
    stageName: 'Transpiração',
    definition: 'Libertação contínua de vapor de água para a atmosfera através dos estomas das plantas e da respiração animal.',
    iconName: 'Trees',
  },
  {
    id: 'm6',
    stageName: 'Escoamento',
    definition: 'Movimento da água à superfície da Terra ao longo dos terrenos inclinados em direção aos ribeiros e rios.',
    iconName: 'Waves',
  },
];

export const TRUE_FALSE_DATA: TrueFalseQuestion[] = [
  {
    id: 'tf1',
    statement: 'As nuvens no céu são formadas por vapor de água invisível.',
    isTrue: false,
    explanation:
      'Falso! O vapor de água é um gás completamente invisível. As nuvens são formadas por milhões de minúsculas gotículas de água líquida (ou cristais de gelo) resultantes da condensação.',
  },
  {
    id: 'tf2',
    statement: 'A evaporação da água é um processo que necessita de absorção de calor fornecido pelo Sol.',
    isTrue: true,
    explanation:
      'Verdadeiro! Para passar do estado líquido ao estado gasoso, a água ganha calor (energia térmica), que na natureza provém da radiação solar.',
  },
  {
    id: 'tf3',
    statement: 'A maior parte da água existente no planeta Terra é água doce própria para beber.',
    isTrue: false,
    explanation:
      'Falso! Cerca de 97,5% da água da Terra é salgada (oceanos e mares). Apenas cerca de 2,5% é água doce, e a maior parte desta está congelada nos polos!',
  },
  {
    id: 'tf4',
    statement: 'A passagem da água do estado gasoso ao estado líquido chama-se condensação.',
    isTrue: true,
    explanation:
      'Verdadeiro! Quando o vapor de água sobe e arrefece, condensa-se e transforma-se em gotículas de água líquida.',
  },
  {
    id: 'tf5',
    statement: 'As plantas participam ativamente no ciclo da água através do processo de transpiração.',
    isTrue: true,
    explanation:
      'Verdadeiro! As raízes captam água do solo e as folhas libertam vapor de água para o ar pelos estomas (evapotranspiração).',
  },
  {
    id: 'tf6',
    statement: 'A água do ciclo hidrológico desaparece no espaço após evaporar.',
    isTrue: false,
    explanation:
      'Falso! A Terra é um sistema praticamente fechado. A quantidade total de água mantém-se constante, circulando sem cessar há milhares de milhões de anos.',
  },
  {
    id: 'tf7',
    statement: 'A água subterrânea armazenada em aquíferos é renovada através da infiltração da água da chuva.',
    isTrue: true,
    explanation:
      'Verdadeiro! A chuva infiltra-se no solo poroso e vai recarregando lentamente as toalhas freáticas e os aquíferos.',
  },
  {
    id: 'tf8',
    statement: 'A neve e o granizo são formas sólidas de precipitação atmosférica.',
    isTrue: true,
    explanation:
      'Verdadeiro! Quando a temperatura na nuvem ou no trajeto até ao solo é muito baixa, a água precipita em estado sólido.',
  },
];

export const MULTIPLE_CHOICE_DATA: MultipleChoiceQuestion[] = [
  {
    id: 'mc1',
    question: 'Qual é o motor de energia principal que faz funcionar todo o ciclo da água na Terra?',
    options: [
      'A força do vento',
      'O calor e a radiação do Sol',
      'A atração da Lua (marés)',
      'A rotação diária da Terra',
    ],
    correctIndex: 1,
    explanation:
      'O Sol aquece a superfície terrestre e os oceanos, fornecendo a energia térmica indispensável para a evaporação e circulação das massas de ar.',
  },
  {
    id: 'mc2',
    question: 'Que mudança de estado físico ocorre quando a água passa do estado líquido para o estado gasoso à temperatura ambiente?',
    options: ['Condensação', 'Solidificação', 'Fusão', 'Evaporação'],
    correctIndex: 3,
    explanation:
      'A evaporação é a vaporização lenta e gradual que decorre à superfície dos líquidos sem necessidade de atingir o ponto de ebulição.',
  },
  {
    id: 'mc3',
    question: 'Quando o vapor de água sobe na atmosfera e arrefece, transforma-se em gotículas líquidas que formam:',
    options: ['Nuvens e nevoeiros', 'Rochas impermeáveis', 'Arco-íris permanentes', 'Granizo imediato'],
    correctIndex: 0,
    explanation:
      'Ao arrefecer nas camadas altas da atmosfera, o vapor condensa-se sobre minúsculas partículas de pó, formando as nuvens ou o nevoeiro.',
  },
  {
    id: 'mc4',
    question: 'Onde se encontra a maior reserva de água doce não congelada do nosso planeta?',
    options: [
      'Nos grandes rios e albufeiras',
      'Nos aquíferos e lençóis subterrâneos',
      'Na atmosfera em forma de vapor',
      'Nas piscinas e redes públicas',
    ],
    correctIndex: 1,
    explanation:
      'Excluindo as calotes polares e glaciares, cerca de 30% da água doce do mundo está no subsolo (aquíferos e toalhas freáticas), muito superior ao volume dos rios e lagos combinados.',
  },
  {
    id: 'mc5',
    question: 'Como se designa a água da chuva que se move pelas encostas até aos ribeiros sem se infiltrar?',
    options: ['Precipitação interna', 'Sublimação', 'Escoamento superficial', 'Solidificação pluvial'],
    correctIndex: 2,
    explanation:
      'O escoamento superficial ocorre quando o solo está saturado ou o terreno é muito inclinado, fluindo a água pela superfície em direção às linhas de água.',
  },
  {
    id: 'mc6',
    question: 'Qual das seguintes afirmações sobre os estados físicos da água no 5.º ano está cientificamente correta?',
    options: [
      'A água pura ferve a 50 ºC ao nível do mar',
      'A água no estado gasoso chama-se gelo',
      'A passagem do estado sólido para líquido chama-se fusão',
      'O orvalho matinal surge através da solidificação da chuva',
    ],
    correctIndex: 2,
    explanation:
      'A fusão é a mudança de estado físico do sólido para o líquido, como quando o gelo derrete a temperaturas superiores a 0 ºC.',
  },
];

export const UNPLUGGED_ACTIVITIES: UnpluggedActivity[] = [
  {
    id: 'u1',
    title: 'Dinâmica de Papel e Movimento: A Gota Viajante',
    duration: '15 minutos',
    objective:
      'Compreender que o ciclo da água não é um círculo linear mas sim uma rede de viagens dinâmicas entre reservatórios.',
    materials: [
      '6 folhas A4 com os nomes das "Estações": Oceano, Nuvem, Rio, Solo, Planta, Aquífero Subterrâneo',
      '1 dado comum de 6 faces para cada estação',
      'Cartão ou caderno para cada aluno registar o seu itinerário',
    ],
    instructions: [
      'Coloque as 6 placas com as estações espalhadas pelos cantos da sala de aula.',
      'Cada aluno começa como uma "Gota de Água" no Oceano com o seu caderno na mão.',
      'O aluno lança o dado da estação onde está. Exemplo na estação Oceano: se sair 1, 2 ou 3 evapora e vai para a Nuvem; se sair 4, 5 ou 6 permanece no Oceano.',
      'Na Nuvem: se sair 1 ou 2 chove para o Oceano; 3 ou 4 cai sobre a Montanha/Rio; 5 ou 6 cai sobre o Solo.',
      'Ao fim de 8 rondas, cada aluno partilha a sua rota: "Fui do oceano para a nuvem, chovi no solo, fui absorvido por uma planta, transpirei para a atmosfera..."',
    ],
    teacherTip:
      'Excelente dinâmica ativa sem qualquer ecrã! Mostra aos alunos que uma gota pode passar milhares de anos no oceano ou horas numa nuvem.',
  },
  {
    id: 'u2',
    title: 'Desafio Prático: A Nuvem no Frasco de Vidro',
    duration: '10 minutos',
    objective:
      'Observar em tempo real a condensação do vapor de água e o papel dos núcleos de condensação na formação de nuvens.',
    materials: [
      '1 Frasco de vidro transparente largo (ex.: frasco de compota)',
      'Água morna/quente (manipulada com cuidado pelo professor)',
      '1 Pratinho de metal ou tampa virada com cubos de gelo',
      '1 Fósforo aceso ou um pequeno spray de desodorizante/fumo para núcleos de condensação',
    ],
    instructions: [
      'Deite cerca de 2 cm de água morna no fundo do frasco de vidro e rode para aquecer as paredes.',
      'Coloque o prato com cubos de gelo por cima da abertura do frasco durante 30 segundos (simula o ar frio da alta atmosfera).',
      'O professor retira o prato rapidamente, acende e apaga um fósforo deitando uma ponta de fumo para dentro do frasco, voltando a tapar imediatamente com o gelo.',
      'Em segundos, forma-se uma densa nuvem branca dentro do frasco! Quando o professor levanta a tampa de gelo, a nuvem liberta-se.',
    ],
    teacherTip:
      'Explique que o fumo fornece as partículas microscópicas (núcleos de condensação) indispensáveis para que as gotículas se agarrem no céu.',
  },
  {
    id: 'u3',
    title: 'Jogo Cinestésico: A Dança das Moléculas de Água',
    duration: '10 minutos',
    objective:
      'Experimentar corporalmente como a energia térmica altera a agitação das moléculas nos estados sólido, líquido e gasoso.',
    materials: ['Apenas espaço livre no centro da sala de aula ou no recreio'],
    instructions: [
      'O professor atua como "Termómetro Solar" anunciando a temperatura do ambiente.',
      'Estado Sólido (Gelo a 0 ºC ou menos): Os alunos dão os braços com firmeza, formam uma estrutura rígida e apenas vibram ligeiramente no mesmo sítio.',
      'Estado Líquido (Água à temperatura ambiente): O Sol aquece! Os alunos largam os braços mas tocam com as pontas dos dedos, deslizando e fluindo suavemente uns pelos outros.',
      'Estado Gasoso (Vapor de água a subir): O Sol aquece muito! As moléculas ganham imensa energia, afastam-se com os braços abertos e movem-se livremente por toda a sala.',
    ],
    teacherTip:
      'Reforça o conceito chave de que as moléculas continuam a ser H2O em todos os estados, mudando apenas a sua velocidade e distância mútua.',
  },
];
