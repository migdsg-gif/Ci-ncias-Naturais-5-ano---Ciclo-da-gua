import React, { useState } from 'react';
import { Award, Printer, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface DiplomaModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeSpentMinutes: number;
}

export const DiplomaModal: React.FC<DiplomaModalProps> = ({
  isOpen,
  onClose,
  timeSpentMinutes,
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('5.º A');

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors print:hidden"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Configuration inputs prior to print */}
        <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-xl print:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-800 block mb-2">
            Personaliza o teu Certificado Oficial de Aula (45 min):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">O teu Nome:</label>
              <input
                type="text"
                placeholder="Ex.: Maria Francisca Silva"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Turma:</label>
              <input
                type="text"
                placeholder="Ex.: 5.º B"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div className="border-4 border-double border-sky-800 p-6 sm:p-8 text-center bg-radial from-white via-sky-50/20 to-sky-100/30 rounded-xl relative">
          <div className="w-16 h-16 rounded-full bg-sky-700 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Award className="w-9 h-9" />
          </div>

          <span className="text-xs font-bold tracking-widest uppercase text-sky-800 block">
            República Portuguesa · Ministério da Educação
          </span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Ciências Naturais · 5.º Ano de Escolaridade
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-sky-950 font-display mb-3">
            DIPLOMA DE GUARDIÃO DO CICLO DA ÁGUA
          </h2>

          <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed mb-4">
            Certifica-se com distinção que o(a) aluno(a)
          </p>

          <div className="text-xl sm:text-2xl font-bold text-sky-900 border-b-2 border-sky-800 pb-1 max-w-md mx-auto mb-2 font-display">
            {studentName.trim() || 'Aluno(a) de Ciências Naturais'}
          </div>

          <div className="text-xs text-slate-600 mb-6 font-medium">
            Turma <strong className="text-slate-900">{studentClass}</strong> · Concluiu com sucesso o plano de aula curricular de <strong>45 minutos</strong> sobre o Ciclo Hidrológico, dominando as mudanças de estado físico, as etapas de circulação e os princípios de preservação sustentável dos aquíferos.
          </div>

          <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 border-t border-slate-200 pt-4 max-w-md mx-auto">
            <div>
              <span className="block font-bold text-slate-900">Duração:</span>
              <span>{Math.min(45, Math.max(1, timeSpentMinutes))} min de aula</span>
            </div>
            <div>
              <span className="block font-bold text-slate-900">Data:</span>
              <span>{new Date().toLocaleDateString('pt-PT')}</span>
            </div>
            <div>
              <span className="block font-bold text-slate-900">Assinatura:</span>
              <span className="italic font-serif">Professor(a) de C.N.</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Diploma</span>
          </button>
        </div>
      </div>
    </div>
  );
};
