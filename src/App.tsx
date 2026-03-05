import React, { useState, useMemo } from 'react';
import { 
  FlaskConical, 
  FileText, 
  Download, 
  ArrowRight,
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Beaker,
  Bot,
  Table as TableIcon,
  LayoutDashboard,
  Search,
  Leaf,
  Zap,
  TrendingUp,
  Droplets,
  Sprout,
  DollarSign,
  Calculator,
  BarChart3,
  Recycle,
  Globe,
  Scale,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  LEAF_SOURCES, 
  COMPLEMENTARY_SOURCES, 
  BlendAnalysis,
  ProteinSource,
  LEAF_TYPES,
  CalculationResult,
  FAO_2013_ADULT_STANDARD
} from './types';
import { calculateBlendAnalysis, calculateProduction, cn } from './utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function FeatureCard({ title, desc, btnText, icon, onClick }: { title: string, desc: string, btnText: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-stone-200/60 shadow-xl shadow-stone-200/10 p-10 flex flex-col group cursor-pointer transition-all hover:border-emerald-500/30"
      onClick={onClick}
    >
      <div className="flex items-center gap-5 mb-8">
        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner">
          {icon}
        </div>
        <h3 className="text-2xl font-display font-bold text-stone-900 tracking-tight">{title}</h3>
      </div>
      <p className="text-stone-500 leading-relaxed mb-10 flex-1 font-medium">{desc}</p>
      <div className="flex items-center justify-between group/btn">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 group-hover:translate-x-2 transition-transform duration-300">{btnText}</span>
        <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center group-hover/btn:bg-emerald-900 group-hover/btn:text-white transition-colors">
          <ChevronRight size={18} />
        </div>
      </div>
    </motion.div>
  );
}

import { Methodology } from './components/Methodology';
import { EconomicAnalysis } from './components/EconomicAnalysis';
import { ChatAssistant } from './components/ChatAssistant';
import { AminoAcidComparison } from './components/AminoAcidComparison';
import { translations, Language } from './translations';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'production' | 'research' | 'methodology' | 'economic' | 'ai-assistant'>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [showDisclaimers, setShowDisclaimers] = useState(false);
  
  const t = translations[language];
  // Production State
  const [leafId, setLeafId] = useState(LEAF_TYPES[0].id);
  const [quantity, setQuantity] = useState<number>(LEAF_TYPES[0].leafWeightG);
  const [mixIndex, setMixIndex] = useState<number>(0);
  const [prodResult, setProdResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [prodViewMode, setProdViewMode] = useState<'chart' | 'table'>('chart');
  const [showMethods, setShowMethods] = useState(false);

  // Research State
  const [selectedLeafId, setSelectedLeafId] = useState<string>(LEAF_SOURCES[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [researchViewMode, setResearchViewMode] = useState<'standard' | 'comparison'>('standard');
  const [customRatio, setCustomRatio] = useState<number>(0.55);

  const selectedLeaf = useMemo(() => LEAF_TYPES.find(l => l.id === leafId)!, [leafId]);

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const mix = selectedLeaf.mixes[mixIndex];
      const res = calculateProduction(selectedLeaf, quantity, mix);
      setProdResult(res);
      setIsCalculating(false);
    }, 800);
  };

  const aaData = useMemo(() => {
    if (!prodResult) return [];
    return prodResult.blendAnalysis.aminoAcids.map(aa => ({
      name: aa.name,
      optimized: aa.blend,
      fao: aa.fao,
      fullMark: 10
    }));
  }, [prodResult]);

  const allBlends = useMemo(() => {
    const blends: BlendAnalysis[] = [];
    LEAF_SOURCES.forEach(leaf => {
      COMPLEMENTARY_SOURCES.forEach(comp => {
        blends.push(calculateBlendAnalysis(leaf, comp, customRatio));
      });
    });
    return blends;
  }, [customRatio]);

  const filteredBlends = useMemo(() => {
    return allBlends.filter(blend => {
      const matchLeaf = blend.leaf.id === selectedLeafId;
      const matchSearch = (blend.complement.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (blend.complement.nameAr?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           (blend.complement.nameFr?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           (blend.complement.nameIt?.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchLeaf && matchSearch;
    });
  }, [allBlends, selectedLeafId, searchQuery]);

  const exportToPDF = (blend: BlendAnalysis) => {
    const doc = new jsPDF();
    const title = `Amino Balance Analysis: ${language === 'ar' ? blend.leaf.nameAr : 
                                            language === 'fr' ? blend.leaf.nameFr :
                                            language === 'it' ? blend.leaf.nameIt :
                                            blend.leaf.nameEn} + ${language === 'ar' ? blend.complement.nameAr :
                                            language === 'fr' ? blend.complement.nameFr :
                                            language === 'it' ? blend.complement.nameIt :
                                            blend.complement.nameEn}`;
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Standard: FAO/WHO 2013 Adult Reference Pattern`, 14, 35);
    autoTable(doc, {
      startY: 45,
      head: [['Amino Acid', 'FAO Standard (mg/g)', 'Blend Value (mg/g)', 'Chemical Score (%)', 'Limiting AA']],
      body: blend.aminoAcids.map(aa => [
        aa.name,
        aa.fao.toFixed(2),
        aa.blend.toFixed(2),
        aa.score.toFixed(2) + '%',
        aa.isLimiting ? 'YES' : 'NO'
      ]),
      headStyles: { fillColor: [5, 150, 105] },
      columnStyles: { 3: { fontStyle: 'bold' } }
    });
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Scientific Summary', 14, finalY);
    doc.setFontSize(10);
    doc.text(`Limiting Amino Acid: ${blend.limitingAA}`, 14, finalY + 10);
    doc.text(`Overall Chemical Score: ${blend.chemicalScore.toFixed(2)}%`, 14, finalY + 17);
    doc.text(`Completeness Level: ${blend.completeness}`, 14, finalY + 24);
    const splitText = doc.splitTextToSize(`Interpretation: ${blend.interpretation}`, 180);
    doc.text(splitText, 14, finalY + 34);
    doc.save(`${blend.leaf.nameEn}_${blend.complement.nameEn}_Analysis.pdf`);
  };

  return (
    <div className="min-h-screen text-stone-800 font-sans selection:bg-emerald-100 relative overflow-x-hidden">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-grain z-50" />
      
      {/* Header */}
      <header className="border-b border-stone-200/40 bg-white/60 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveTab('home')}>
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-12 h-12 bg-emerald-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-900/20 transition-all duration-500"
              >
                <Sprout size={26} />
              </motion.div>
              <div>
                <h1 className="text-2xl font-display font-bold tracking-tight text-stone-900 group-hover:text-emerald-900 transition-colors">{t.common.appTitle}</h1>
              </div>
            </div>

            {/* Language Selector */}
            <div className="hidden lg:flex items-center gap-1 bg-stone-100/50 p-1 rounded-xl border border-stone-200/50">
              <div className="px-2 text-stone-400">
                <Globe size={14} />
              </div>
              {(['en', 'ar', 'fr', 'it'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    "px-4 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all duration-300",
                    language === lang 
                      ? "bg-white text-emerald-700 shadow-sm ring-1 ring-stone-200/50" 
                      : "text-stone-400 hover:text-stone-600 hover:bg-stone-200/30"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
                    <nav className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              <button onClick={() => setActiveTab('home')} className={cn("text-sm font-semibold transition-all duration-300 hover:scale-105", activeTab === 'home' ? "text-emerald-700" : "text-stone-500 hover:text-emerald-600")}>{t.nav.home}</button>
              <button onClick={() => setActiveTab('production')} className={cn("text-sm font-semibold transition-all duration-300 hover:scale-105", activeTab === 'production' ? "text-emerald-700" : "text-stone-500 hover:text-emerald-600")}>{t.nav.production}</button>
              <button onClick={() => setActiveTab('research')} className={cn("text-sm font-semibold transition-all duration-300 hover:scale-105", activeTab === 'research' ? "text-emerald-700" : "text-stone-500 hover:text-emerald-600")}>{t.nav.research}</button>
              <button onClick={() => setActiveTab('methodology')} className={cn("text-sm font-semibold transition-all duration-300 hover:scale-105", activeTab === 'methodology' ? "text-emerald-700" : "text-stone-500 hover:text-emerald-600")}>{t.nav.methodology}</button>
              <button onClick={() => setActiveTab('economic')} className={cn("text-sm font-semibold transition-all duration-300 hover:scale-105", activeTab === 'economic' ? "text-emerald-700" : "text-stone-500 hover:text-emerald-600")}>{t.nav.economic}</button>
              <button onClick={() => setActiveTab('ai-assistant')} className={cn("text-sm font-semibold transition-all duration-300 hover:scale-105", activeTab === 'ai-assistant' ? "text-emerald-700" : "text-stone-500 hover:text-emerald-600")}>{t.nav.aiAssistant}</button>
            </div>
            
            <button 
              onClick={() => setActiveTab('production')}
              className="px-6 py-2.5 bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/20 hover:bg-emerald-950 hover:shadow-emerald-900/40 transition-all duration-300 active:scale-95 uppercase tracking-widest"
            >
              {t.nav.getStarted}
            </button>
          </nav>
        </div>
      </header>

      <main className={cn(activeTab === 'home' ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16")}>
        <AnimatePresence mode="wait">
          {activeTab === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              {/* Hero Section */}
              <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#FDFCF8] py-20">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/20 rounded-full blur-[120px] animate-pulse" />
                  <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-stone-100/40 rounded-full blur-[120px] animate-pulse delay-700" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]" 
                    style={{ backgroundImage: 'radial-gradient(#065f46 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
                  />
                </div>
                
                <div className="relative z-10 text-center max-w-6xl px-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-flex items-center gap-3 px-5 py-2 bg-white border border-stone-200 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-12 shadow-sm backdrop-blur-sm"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {t.home.badge}
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={cn(
                      "font-display font-bold text-stone-900 leading-[0.9] tracking-tighter mb-16",
                      language === 'ar' ? "text-6xl md:text-8xl" : "text-5xl md:text-7xl"
                    )}
                  >
                    {t.home.heroTitle.split(t.home.heroTitleHighlight).map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="text-emerald-600 relative">
                            {t.home.heroTitleHighlight}
                            <svg className="absolute -bottom-4 left-0 w-full h-4 text-emerald-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                              <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl text-stone-500 font-medium max-w-3xl mx-auto leading-relaxed mb-20"
                  >
                    {t.home.heroDesc}
                  </motion.p>
                  
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-6"
                  >
                    <button 
                      onClick={() => setActiveTab('production')}
                      className="px-12 py-5 bg-stone-900 hover:bg-black text-white font-bold rounded-2xl transition-all text-sm flex items-center gap-4 group shadow-2xl shadow-stone-900/30"
                    >
                      {t.home.launchLab}
                      <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                    <button 
                      onClick={() => setActiveTab('economic')}
                      className="px-12 py-5 bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-stone-900 font-bold rounded-2xl transition-all text-sm backdrop-blur-sm"
                    >
                      {t.home.economicModeler}
                    </button>
                  </motion.div>
                </div>
              </section>

              {/* Feature Grid */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-40 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <FeatureCard 
                    title={t.home.features.research.title}
                    desc={t.home.features.research.desc}
                    btnText={t.nav.research}
                    icon={<FlaskConical size={24} />}
                    onClick={() => setActiveTab('research')}
                  />
                  <FeatureCard 
                    title={t.home.features.production.title}
                    desc={t.home.features.production.desc}
                    btnText={t.nav.production}
                    icon={<Calculator size={24} />}
                    onClick={() => setActiveTab('production')}
                  />
                  <FeatureCard 
                    title={t.home.features.methodology.title}
                    desc={t.home.features.methodology.desc}
                    btnText={t.nav.methodology}
                    icon={<Sprout size={24} />}
                    onClick={() => setActiveTab('methodology')}
                  />
                  <FeatureCard 
                    title={t.home.features.economic.title}
                    desc={t.home.features.economic.desc}
                    btnText={t.nav.economic}
                    icon={<DollarSign size={24} />}
                    onClick={() => setActiveTab('economic')}
                  />
                  <FeatureCard 
                    title={t.home.features.aiAssistant.title}
                    desc={t.home.features.aiAssistant.desc}
                    btnText={t.nav.aiAssistant}
                    icon={<Bot size={24} />}
                    onClick={() => setActiveTab('ai-assistant')}
                  />
                </div>
              </section>

              {/* Information Sections */}
              <section className="bg-stone-900 text-white py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    <div className="space-y-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                        {t.home.info.integrity.label}
                      </div>
                      <h3 className="text-4xl font-display font-bold leading-tight">{t.home.info.integrity.title}</h3>
                      <p className="text-stone-400 leading-relaxed text-sm">
                        {t.home.info.integrity.desc}
                      </p>
                    </div>

                    <div className="space-y-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-400">
                        {t.home.info.value.label}
                      </div>
                      <h3 className="text-4xl font-display font-bold leading-tight">{t.home.info.value.title}</h3>
                      <p className="text-stone-400 leading-relaxed text-sm">
                        {t.home.info.value.desc}
                      </p>
                    </div>

                    <div className="space-y-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-amber-400">
                        {t.home.info.circular.label}
                      </div>
                      <h3 className="text-4xl font-display font-bold leading-tight">{t.home.info.circular.title}</h3>
                      <p className="text-stone-400 leading-relaxed text-sm">
                        {t.home.info.circular.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : activeTab === 'production' ? (
            <motion.div 
              key="production"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Input Section */}
              <div className="lg:col-span-4 space-y-8">
                <section className="bg-white rounded-[2.5rem] border border-stone-200/60 p-10 shadow-xl shadow-stone-200/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-10">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <FlaskConical size={20} />
                      </div>
                      <h2 className="text-xl font-display font-bold text-stone-900">{t.common.parameters}</h2>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.15em]">{t.common.treeLeafType}</label>
                        <select 
                          value={leafId}
                          onChange={(e) => {
                            setLeafId(e.target.value);
                            setMixIndex(0);
                          }}
                          className="w-full bg-stone-50/50 border border-stone-200/60 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
                        >
                          {LEAF_TYPES.map(leaf => (
                            <option key={leaf.id} value={leaf.id}>{leaf.nameAr} / {leaf.nameEn}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.15em]">{t.common.leafQuantityGrams}</label>
                        <div className="relative">
                          <input 
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full bg-stone-50/50 border border-stone-200/60 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                          />
                          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-stone-400 uppercase">g</span>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-stone-100">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.15em]">{t.common.complementaryMix}</label>
                          <select 
                            value={mixIndex}
                            onChange={(e) => setMixIndex(Number(e.target.value))}
                            className="w-full bg-stone-50/50 border border-stone-200/60 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
                          >
                            {selectedLeaf.mixes.map((mix, index) => (
                              <option key={index} value={index}>{mix.source}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <button 
                          onClick={handleCalculate}
                          disabled={isCalculating}
                          className="w-full bg-emerald-900 hover:bg-emerald-950 disabled:bg-stone-200 text-white font-display font-bold py-5 rounded-2xl shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/40 transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.98]"
                        >
                        {isCalculating ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                            <FlaskConical size={20} />
                          </motion.div>
                        ) : (
                          <>
                            <Zap size={20} className="text-emerald-400" />
                            <span>{t.common.optimizeProduction}</span>
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform opacity-50" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  {prodResult ? (
                    <motion.div 
                      key="prod-results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                    >
                      {/* Protein Composition Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Leaf size={80} />
                          </div>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                              <Leaf size={20} />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-stone-900">{t.common.leafProteinAnalysis}</h3>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-between items-end">
                              <span className="text-xs text-stone-500">{t.common.pureProtein}</span>
                              <span className="text-xl font-bold text-stone-900">{prodResult.leafPureProteinG.toFixed(1)}g</span>
                            </div>
                            <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(prodResult.leafPureProteinG / prodResult.totalProteinGrams) * 100}%` }}
                                className="bg-emerald-500 h-full"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap size={80} />
                          </div>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                              <Zap size={20} />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-stone-900">{t.common.sourceProteinAnalysis}</h3>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-between items-end">
                              <span className="text-xs text-stone-500">{t.common.pureProtein}</span>
                              <span className="text-xl font-bold text-stone-900">{prodResult.sourcePureProteinG.toFixed(1)}g</span>
                            </div>
                            <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(prodResult.sourcePureProteinG / prodResult.totalProteinGrams) * 100}%` }}
                                className="bg-amber-500 h-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Summary Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-emerald-900 text-white p-7 rounded-[2rem] shadow-2xl shadow-emerald-900/20 relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                          <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-[0.2em] mb-2">{t.common.totalPureProtein}</p>
                          <h3 className="text-3xl font-display font-bold">{prodResult.totalProteinGrams.toFixed(1)}g</h3>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-white p-7 rounded-[2rem] border border-stone-200/60 shadow-xl shadow-stone-200/10"
                        >
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.15em] mb-2">{t.lab.leafConcentrate}</p>
                          <h3 className="text-2xl font-display font-bold text-stone-900">{prodResult.leafConcentrateG.toFixed(1)}g</h3>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-white p-7 rounded-[2rem] border border-stone-200/60 shadow-xl shadow-stone-200/10"
                        >
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.15em] mb-2">{t.lab.legumeConcentrate}</p>
                          <h3 className="text-2xl font-display font-bold text-stone-900">{prodResult.sourceConcentrateG.toFixed(1)}g</h3>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-white p-7 rounded-[2rem] border border-stone-200/60 shadow-xl shadow-stone-200/10"
                        >
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.15em] mb-2">{t.lab.blendRatio}</p>
                          <h3 className="text-2xl font-display font-bold text-emerald-600">{selectedLeaf.mixes[mixIndex].leafRatioPercent}:{selectedLeaf.mixes[mixIndex].sourceRatioPercent}</h3>
                          <p className="text-[10px] text-stone-500 mt-3">{language === 'ar' ? "نسبة الدمج (ورق:بقوليات)" : t.lab.blendRatio}</p>
                        </motion.div>
                      </div>

                      <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm">
                            <Scale size={20} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-amber-900">{t.lab.legumeRequirement}</h4>
                            <p className="text-xs text-amber-700">
                              {t.lab.needText
                                .replace('{amount}', (selectedLeaf.mixes[mixIndex].sourceWeightG * (quantity / selectedLeaf.leafWeightG)).toFixed(0))
                                .replace('{source}', prodResult.mixSource.split('/')[0].trim())}
                            </p>
                          </div>
                        </div>
                        <div className="h-12 w-px bg-amber-200 hidden md:block" />
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                            <TrendingUp size={20} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-emerald-900">{t.lab.maxDailyIntake}</h4>
                            <p className="text-xs text-emerald-700">
                              {t.lab.recommendedLimit.replace('{amount}', prodResult.maxDailyConcentrateG.toFixed(1))}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Preparation Notes */}
                      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                          <AlertCircle className="text-emerald-600" size={20} />
                          <h2 className="text-lg font-semibold">{t.lab.prepProtocol}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            {prodResult.prepNotes.split(',').map((step, i) => {
                              const stepKey = step.trim().toLowerCase().includes('wash leaves') ? 'washLeaves' :
                                             step.trim().toLowerCase().includes('grind') ? 'grind' :
                                             step.trim().toLowerCase().includes('extract with water') ? 'extractWater' :
                                             step.trim().toLowerCase().includes('filter') ? 'filter' :
                                             step.trim().toLowerCase().includes('heat coagulation') ? 'heatCoagulation' :
                                             step.trim().toLowerCase().includes('wash and dry') ? 'washDry' : null;
                              
                              return (
                                <div key={i} className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
                                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">{i+1}</span>
                                  <span className="text-xs text-stone-600 leading-relaxed">
                                    {stepKey ? (t.lab as any)[stepKey] : step.trim()}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                            <h4 className="text-sm font-bold text-emerald-900 mb-4">{t.lab.labStandards}</h4>
                            <ul className="space-y-2 text-[10px] text-emerald-700">
                              <li className="flex items-center gap-2"><CheckCircle2 size={12} /> {t.lab.heatCoagulation}</li>
                              <li className="flex items-center gap-2"><CheckCircle2 size={12} /> {t.lab.doubleFiltration}</li>
                              <li className="flex items-center gap-2"><CheckCircle2 size={12} /> {t.lab.controlledDrying}</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Amino Acid Chart/Table */}
                      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                          <div className="flex items-center gap-2">
                            <Droplets className="text-emerald-600" size={20} />
                            <h2 className="text-lg font-semibold">{t.lab.aminoAcidOptimization}</h2>
                          </div>
                          <div className="flex items-center bg-stone-100 p-1 rounded-xl">
                            <button onClick={() => setProdViewMode('chart')} className={cn("px-4 py-2 rounded-lg text-xs font-bold", prodViewMode === 'chart' ? "bg-white text-emerald-600 shadow-sm" : "text-stone-400")}>{t.lab.chart}</button>
                            <button onClick={() => setProdViewMode('table')} className={cn("px-4 py-2 rounded-lg text-xs font-bold", prodViewMode === 'table' ? "bg-white text-emerald-600 shadow-sm" : "text-stone-400")}>{t.lab.table}</button>
                          </div>
                        </div>
                        <AnimatePresence mode="wait">
                          {prodViewMode === 'chart' ? (
                            <motion.div key="chart" className="h-[400px] w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={aaData}>
                                  <PolarGrid stroke="#e5e7eb" />
                                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 600, fill: '#9ca3af' }} />
                                  <Radar name={t.lab.optimizedMix} dataKey="optimized" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                                  <Radar name={t.lab.faoStandard} dataKey="fao" stroke="#3b82f6" fill="none" strokeDasharray="4 4" />
                                  <Tooltip />
                                </RadarChart>
                              </ResponsiveContainer>
                            </motion.div>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-xs">
                                <thead>
                                  <tr className="border-b border-stone-100">
                                    <th className="py-4 font-bold text-stone-400 uppercase tracking-widest text-[10px]">{t.lab.aminoAcid}</th>
                                    <th className="py-4 font-bold text-stone-400 uppercase tracking-widest text-[10px]">{t.lab.faoStd}</th>
                                    <th className="py-4 font-bold text-stone-400 uppercase tracking-widest text-[10px]">{t.lab.blendVal}</th>
                                    <th className="py-4 font-bold text-stone-400 uppercase tracking-widest text-[10px]">{t.lab.score}</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-50">
                                  {prodResult.blendAnalysis.aminoAcids.map((aa, i) => (
                                    <tr key={i} className="hover:bg-stone-50/50 transition-colors">
                                      <td className="py-4 font-semibold text-stone-900">{(t.aminoAcids as any)[aa.key] || aa.name}</td>
                                      <td className="py-4 text-stone-500">{aa.fao.toFixed(2)}</td>
                                      <td className="py-4 font-bold text-emerald-600">{aa.blend.toFixed(2)}</td>
                                      <td className="py-4">
                                        <span className={cn(
                                          "font-bold",
                                          aa.score >= 100 ? "text-emerald-600" : aa.isLimiting ? "text-rose-600" : "text-amber-600"
                                        )}>
                                          {aa.score.toFixed(1)}%
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Zero Waste Impact */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="bg-stone-900 text-white p-10 rounded-[2.5rem] shadow-2xl shadow-stone-900/20 relative overflow-hidden">
                          <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12"><Recycle size={200} /></div>
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center"><Recycle size={20} /></div>
                            <div>
                              <h2 className="text-xl font-display font-bold">{t.lab.circularEconomy}</h2>
                            </div>
                          </div>
                          <div className="space-y-6 relative z-10">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-colors">
                              <span className="text-xs text-stone-400 font-bold uppercase tracking-widest">{t.lab.soilEnhancer}</span>
                              <span className="text-2xl font-display font-bold text-emerald-400">{prodResult.soilEnhancerKg.toFixed(3)} kg</span>
                            </div>
                            <div className="text-xs text-stone-300 space-y-3 leading-relaxed">
                              <p className="font-bold text-emerald-400 uppercase tracking-widest text-[10px]">{t.lab.deepMethod}: {t.lab.anaerobicDecomposition}</p>
                              <p className="opacity-80">
                                {t.lab.circularEconomyDesc}
                              </p>
                            </div>
                          </div>
                        </section>

                        <section className="bg-white p-10 rounded-[2.5rem] border border-stone-200/60 shadow-xl shadow-stone-200/20">
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Globe size={20} /></div>
                            <h2 className="text-xl font-display font-bold text-stone-900">{t.lab.ecologicalBenefits}</h2>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {prodResult.soilBenefits.map((benefit, i) => {
                              const benefitKey = benefit.toLowerCase().includes('water retention') ? 'waterRetention' :
                                                benefit.toLowerCase().includes('microbial activity') ? 'microbialActivity' :
                                                benefit.toLowerCase().includes('organic matter') ? 'organicMatter' :
                                                benefit.toLowerCase().includes('chemical fertilizer') ? 'chemicalDependency' : null;
                              
                              return (
                                <motion.div 
                                  key={i} 
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="px-4 py-3 bg-stone-50 rounded-2xl border border-stone-100 text-xs text-stone-600 font-medium flex items-center gap-3 hover:bg-emerald-50 hover:border-emerald-100 transition-all cursor-default"
                                >
                                  <CheckCircle2 size={14} className="text-emerald-500" /> {benefitKey ? (t.lab as any)[benefitKey] : benefit}
                                </motion.div>
                              );
                            })}
                          </div>
                        </section>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-stone-200 border-dashed">
                      <FlaskConical size={40} className="text-stone-300 mb-6" />
                      <h2 className="text-xl font-bold text-stone-900 mb-2">{t.common.productionLabReady}</h2>
                      <p className="text-sm text-stone-500 max-w-sm mx-auto">{t.common.selectParams}</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : activeTab === 'research' ? (
            <motion.div 
              key="research"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              {/* Research Tab Sub-Navigation */}
              <div className="flex justify-center">
                <div className="bg-stone-100 p-1 rounded-2xl border border-stone-200 flex gap-1">
                  <button 
                    onClick={() => setResearchViewMode('standard')}
                    className={cn(
                      "px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                      researchViewMode === 'standard' ? "bg-white text-emerald-900 shadow-sm" : "text-stone-400 hover:text-stone-600"
                    )}
                  >
                    <TableIcon size={14} />
                    {t.lab.table}
                  </button>
                  <button 
                    onClick={() => setResearchViewMode('comparison')}
                    className={cn(
                      "px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                      researchViewMode === 'comparison' ? "bg-white text-emerald-900 shadow-sm" : "text-stone-400 hover:text-stone-600"
                    )}
                  >
                    <Scale size={14} />
                    {t.comparison.title}
                  </button>
                </div>
              </div>

              {researchViewMode === 'standard' ? (
                <>
                  {/* Research Lab Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-4xl font-display font-bold text-stone-900 mb-4 tracking-tight">{t.common.aminoAcidsAnalysis}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {t.common.analyzingBlend} <span className="font-bold text-emerald-900 underline decoration-emerald-200">{t.common.faoWhoStandards}</span>.
                  </p>
                  
                  {/* Custom Ratio Slider */}
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.common.blendRatioOptimization}</label>
                      <span className="text-xs font-bold text-emerald-600">{(customRatio * 100).toFixed(0)}% {t.common.leaf} : {((1 - customRatio) * 100).toFixed(0)}% {t.common.complement}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={customRatio}
                      onChange={(e) => setCustomRatio(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between mt-2 text-[9px] text-stone-400 font-bold uppercase">
                      <span>{t.common.pureComplement}</span>
                      <span>{t.common.pureLeaf}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text"
                      placeholder={t.lab.filterComplements}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                      <div className="flex bg-stone-100/50 p-1.5 rounded-2xl border border-stone-200/50 backdrop-blur-sm shadow-inner">
                        {LEAF_SOURCES.map(leaf => (
                          <button
                            key={leaf.id}
                            onClick={() => setSelectedLeafId(leaf.id)}
                            className={cn(
                              "px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300",
                              selectedLeafId === leaf.id 
                                ? "bg-white text-emerald-900 shadow-md ring-1 ring-stone-200/20" 
                                : "text-stone-400 hover:text-stone-600 hover:bg-white/50"
                            )}
                          >
                            {language === 'ar' ? leaf.nameAr : 
                             language === 'fr' ? leaf.nameFr :
                             language === 'it' ? leaf.nameIt :
                             leaf.nameEn}
                          </button>
                        ))}
                  </div>
                </div>
              </div>

              {/* Blends Grid */}
              <div className="grid grid-cols-1 gap-16">
                {filteredBlends.map((blend, index) => (
                  <motion.section 
                    key={`${blend.leaf.id}-${blend.complement.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-[3rem] border border-stone-200/60 shadow-2xl shadow-stone-200/20 overflow-hidden"
                  >
                    <div className="px-10 py-8 border-b border-stone-100 bg-stone-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white border border-stone-200 rounded-[1.25rem] flex items-center justify-center text-emerald-900 shadow-sm"><LayoutDashboard size={28} /></div>
                        <div>
                          <h3 className="text-xl font-display font-bold text-stone-900">
                            {language === 'ar' ? blend.leaf.nameAr : 
                             language === 'fr' ? blend.leaf.nameFr :
                             language === 'it' ? blend.leaf.nameIt :
                             blend.leaf.nameEn} + {language === 'ar' ? blend.complement.nameAr :
                             language === 'fr' ? blend.complement.nameFr :
                             language === 'it' ? blend.complement.nameIt :
                             blend.complement.nameEn}
                          </h3>
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">{language === 'ar' ? "تحليل المزيج العلمي" : "Scientific Blend Analysis"}</p>
                        </div>
                      </div>
                      <button onClick={() => exportToPDF(blend)} className="flex items-center gap-2 px-6 py-3 bg-emerald-900 text-white text-xs font-bold rounded-2xl shadow-xl shadow-emerald-900/20 transition-all hover:bg-emerald-950 active:scale-95">
                        <Download size={14} /> {t.lab.exportPdf}
                      </button>
                    </div>
                    <div className="p-8">
                      <div className="overflow-x-auto mb-8">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="border-b border-stone-100">
                              <th className="py-4 px-4 font-bold text-stone-400 uppercase tracking-[0.2em] text-[10px]">{t.lab.aminoAcid}</th>
                              <th className="py-4 px-4 font-bold text-stone-400 uppercase tracking-[0.2em] text-[10px]">{t.lab.faoStd} (mg/g)</th>
                              <th className="py-4 px-4 font-bold text-stone-400 uppercase tracking-[0.2em] text-[10px]">{t.lab.blendVal} (mg/g)</th>
                              <th className="py-4 px-4 font-bold text-stone-400 uppercase tracking-[0.2em] text-[10px]">{t.lab.chemicalScore}</th>
                              <th className="py-4 px-4 font-bold text-stone-400 uppercase tracking-[0.2em] text-[10px]">{t.economic.limitingAA}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-50">
                            {blend.aminoAcids.map((aa, i) => (
                              <tr key={i} className="hover:bg-stone-50/50 transition-colors">
                                <td className="py-4 px-4 font-semibold text-stone-900">{(t.aminoAcids as any)[aa.key] || aa.name}</td>
                                <td className="py-4 px-4 text-stone-500 font-mono">{aa.fao.toFixed(2)}</td>
                                <td className="py-4 px-4 text-stone-700 font-mono font-bold">{aa.blend.toFixed(2)}</td>
                                <td className="py-4 px-4">
                                  <span className={cn("font-bold font-mono", aa.score >= 100 ? "text-emerald-600" : aa.isLimiting ? "text-rose-600" : "text-amber-600")}>
                                    {aa.score.toFixed(1)}%
                                  </span>
                                </td>
                                <td className="py-4 px-4">
                                  {aa.isLimiting && <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-bold border border-rose-100 uppercase tracking-widest"><AlertCircle size={10} /> {t.common.limiting}</span>}
                                  {!aa.isLimiting && aa.score >= 100 && <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100 uppercase tracking-widest"><CheckCircle2 size={10} /> {t.common.optimal}</span>}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 p-8 bg-stone-50 rounded-[2rem] border border-stone-100 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                          <h4 className="text-sm font-display font-bold text-stone-900 mb-6 flex items-center gap-2 relative z-10"><FileText size={18} className="text-emerald-600" /> {t.lab.scientificInterpretation}</h4>
                          <p className="text-sm text-stone-600 italic leading-relaxed relative z-10">
                            {blend.chemicalScore >= 100 
                              ? t.lab.completeProfile 
                              : t.lab.limitedBy.replace('{aa}', (t.aminoAcids as any)[blend.limitingAA.toLowerCase()] || blend.limitingAA)}
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div className="p-6 bg-white border border-stone-200/60 rounded-[2rem] shadow-xl shadow-stone-200/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                              <TrendingUp size={60} />
                            </div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">{t.lab.proteinEfficiency}</span>
                            <div className="flex justify-between items-end mb-4">
                              <span className="text-xs font-bold text-stone-500">{t.lab.chemicalScore}</span>
                              <span className="text-2xl font-display font-bold text-emerald-600">{blend.chemicalScore.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, blend.chemicalScore)}%` }}
                                className="bg-emerald-500 h-full"
                              />
                            </div>
                          </div>
                          
                          <div className="p-6 bg-white border border-stone-200/60 rounded-[2rem] shadow-xl shadow-stone-200/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                              <CheckCircle2 size={60} />
                            </div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">{t.common.digestibility}</span>
                            <div className="flex justify-between items-end mb-4">
                              <span className="text-xs font-bold text-stone-500">{t.common.estPdcaas}</span>
                              <span className="text-2xl font-display font-bold text-blue-600">{blend.pdcaas.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${blend.pdcaas}%` }}
                                className="bg-blue-500 h-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                ))}
              </div>
            </>
          ) : (
            <AminoAcidComparison language={language} translations={t} />
          )}
        </motion.div>
      ) : activeTab === 'economic' ? (
            <motion.div 
              key="economic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EconomicAnalysis language={language} t={t} />
            </motion.div>
          ) : activeTab === 'ai-assistant' ? (
            <motion.div 
              key="ai-assistant"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ChatAssistant 
                language={language} 
                t={t} 
                contextData={{
                  leafType: LEAF_TYPES.find(l => l.id === leafId),
                  quantity,
                  productionResults: prodResult,
                  availableBlends: allBlends,
                  customRatio
                }} 
              />
            </motion.div>
          ) : (
            <motion.div 
              key="methodology"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Methodology language={language} t={t} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-stone-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">{t.common.appTitle} {t.common.version}</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-xs text-stone-500">
            <button 
              onClick={() => setShowDisclaimers(true)}
              className="font-bold text-stone-400 hover:text-emerald-600 transition-colors uppercase tracking-widest flex items-center gap-2"
            >
              <Scale size={14} />
              {t.footer.disclaimers}
            </button>
            <div className="flex gap-8">
              <span>{t.footer.institute}</span>
              <span>{t.footer.initiative}</span>
              <span>{t.footer.standards}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Disclaimers Modal */}
      <AnimatePresence>
        {showDisclaimers && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setShowDisclaimers(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-stone-900/20">
                    <Scale size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-stone-900">{t.footer.disclaimers}</h2>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDisclaimers(false)}
                  className="w-10 h-10 rounded-full hover:bg-stone-200 flex items-center justify-center transition-all"
                >
                  <X size={20} className="text-stone-400" />
                </button>
              </div>
              
              <div className="p-8 space-y-6 text-sm text-stone-600 leading-relaxed">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <p className="font-bold text-emerald-900 mb-2">{t.common.projectIntegrity}</p>
                  <p>{t.home.disclaimers.projectIntegrity}</p>
                </div>

                <div className="space-y-4">
                  <p><strong>1. {t.common.nutritionalAccuracy}:</strong> {t.home.disclaimers.nutritionalAccuracy}</p>
                  <p><strong>2. {t.common.safetyProtocols}:</strong> {t.home.disclaimers.safetyProtocols}</p>
                  <p><strong>3. {t.common.liability}:</strong> {t.home.disclaimers.liability}</p>
                  <p><strong>4. {t.common.environmentalImpact}:</strong> {t.home.disclaimers.environmentalImpact}</p>
                </div>

                <div className="pt-6 border-t border-stone-100 flex justify-end">
                  <button 
                    onClick={() => setShowDisclaimers(false)}
                    className="px-8 py-3 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors"
                  >
                    {t.common.understood}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Methodology Modal */}
      <AnimatePresence>
        {showMethods && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setShowMethods(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-10 border-b border-stone-100 flex items-center justify-between bg-stone-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-900/20">
                    <FlaskConical size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-stone-900">{t.common.scientificMethodology}</h2>
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">{t.common.protocolStandards}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMethods(false)}
                  className="w-12 h-12 rounded-full hover:bg-stone-200 flex items-center justify-center transition-all hover:rotate-90 active:scale-90"
                >
                  <X size={24} className="text-stone-400" />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto">
                <Methodology language={language} t={t} />
              </div>
              
              <div className="p-6 bg-stone-50 border-t border-stone-100 text-center">
                <button 
                  onClick={() => setShowMethods(false)}
                  className="px-8 py-3 bg-emerald-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 hover:bg-emerald-950 transition-all"
                >
                  Got it, close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
