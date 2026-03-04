import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Settings2, 
  Zap, 
  Scale,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Leaf,
  Factory,
  ChevronRight,
  Flame,
  Wind,
  ShieldCheck,
  RefreshCw,
  Sprout,
  Calculator,
  FlaskConical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { LEAF_TYPES, COMPLEMENTARY_SOURCES, FAO_2013_ADULT_STANDARD } from '../types';

interface EconomicDefaults {
  leafCollectionCost: number;
  filterClothCost: number;
  waterCostPerL: number;
  lemonCost: number;
  vinegarCost: number;
  electricityCost: number;
  gasCost: number;
  laborRate: number;
  wheyPrice: number;
}

const DEFAULT_PARAMS: EconomicDefaults = {
  leafCollectionCost: 0,
  filterClothCost: 4,
  waterCostPerL: 0.0039 / 6,
  lemonCost: 0.75,
  vinegarCost: 0.60,
  electricityCost: 0.30,
  gasCost: 0.20,
  laborRate: 15,
  wheyPrice: 150
};

import { translations } from '../translations';

export const EconomicAnalysis = ({ language = 'en', t = translations.en }: { language?: string, t?: any }) => {
  const [leafId, setLeafId] = useState(LEAF_TYPES[0].id);
  const [leafQuantity, setLeafQuantity] = useState(1750);
  const [complementId, setComplementId] = useState(COMPLEMENTARY_SOURCES[1].id); // Default to Lentils
  const [isAdmin, setIsAdmin] = useState(false);
  const [params, setParams] = useState<EconomicDefaults>(DEFAULT_PARAMS);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [complementRatio, setComplementRatio] = useState(0.45); // 45% complement

  const selectedLeaf = useMemo(() => LEAF_TYPES.find(l => l.id === leafId)!, [leafId]);
  const selectedComplement = useMemo(() => COMPLEMENTARY_SOURCES.find(c => c.id === complementId)!, [complementId]);

  const results = useMemo(() => {
    // Base batch size from the reference image (1750g leaves)
    const BASE_LEAF_BATCH = 1750;
    const scaleFactor = leafQuantity / BASE_LEAF_BATCH;

    // 1. Calculate extractable leaf protein
    const leafProteinContent = selectedLeaf.leafProteinPercent / 100; 
    const extractionEfficiency = 0.65; 
    const dryMatterConversion = 0.22; 
    
    const leafProteinYield = (leafQuantity * dryMatterConversion * leafProteinContent * extractionEfficiency);
    
    // 2. Blend Analysis (Manual Ratio)
    const blendAA = Object.keys(FAO_2013_ADULT_STANDARD).map(aa => {
      const leafAA = selectedLeaf.aminoAcids[aa as keyof typeof selectedLeaf.aminoAcids] || 0;
      const compAA = selectedComplement.aminoAcids[aa as keyof typeof selectedComplement.aminoAcids] || 0;
      const blendValue = (leafAA * (1 - complementRatio)) + (compAA * complementRatio);
      const target = FAO_2013_ADULT_STANDARD[aa as keyof typeof FAO_2013_ADULT_STANDARD];
      return { aa, score: (blendValue / target) * 100 };
    });

    const minScore = Math.min(...blendAA.map(a => a.score));
    const isComplete = minScore >= 100;
    const limitingAA = isComplete ? "" : blendAA.reduce((prev, curr) => prev.score < curr.score ? prev : curr).aa;

    // 3. Economic Engine
    const totalProteinProduced = leafProteinYield / (1 - complementRatio || 1);
    const complementProteinNeeded = totalProteinProduced * complementRatio;
    
    // Convert complement protein back to raw weight (approx 25% protein for legumes)
    const rawComplementWeight = complementProteinNeeded / 0.25; 
    
    const leafCost = (leafQuantity / 1000) * params.leafCollectionCost;
    // Use selected complement's cost per 100g
    const complementCost = (rawComplementWeight / 100) * selectedComplement.costPer100g; 
    
    // Scaling costs based on leaf quantity
    const processingCosts = {
      // Filter cloth: 1 per 5kg leaves, calculated as a ratio
      filterCloth: (leafQuantity / 5000) * params.filterClothCost,
      water: params.waterCostPerL * 6 * scaleFactor,
      lemon: params.lemonCost * scaleFactor,
      vinegar: params.vinegarCost * scaleFactor,
      electricity: params.electricityCost * scaleFactor,
      gas: params.gasCost * scaleFactor
    };

    const totalProductionCost = leafCost + complementCost + Object.values(processingCosts).reduce((a, b) => a + b, 0);
    
    const costPerGram = totalProductionCost / totalProteinProduced;
    const costPer100g = costPerGram * 100;
    const costPerKg = costPerGram * 1000;
    
    const profitMargin = sellingPrice > 0 ? ((sellingPrice - costPerKg) / sellingPrice) * 100 : 0;
    const savingsVsWhey = ((params.wheyPrice - costPer100g) / params.wheyPrice) * 100;

    return {
      leafProteinYield,
      complementProteinNeeded,
      totalProteinProduced,
      complementRatio,
      isComplete,
      limitingAA,
      totalProductionCost,
      costPerGram,
      costPer100g,
      costPerKg,
      profitMargin,
      savingsVsWhey,
      breakdown: {
        leafCost,
        complementCost,
        ...processingCosts
      }
    };
  }, [leafId, leafQuantity, complementId, params, sellingPrice, selectedLeaf, selectedComplement, complementRatio]);

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-display font-bold text-stone-900 tracking-tight">{t.economic.title}</h2>
          <p className="text-stone-500 mt-2">{t.economic.subtitle}</p>
        </div>
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${isAdmin ? 'bg-emerald-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
        >
          <Settings2 size={14} />
          {isAdmin ? t.common.exitAdmin : t.common.adminSettings}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-xl shadow-stone-200/10 overflow-hidden">
            <div className="p-8 border-b border-stone-100 bg-stone-50/50">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Zap size={20} className="text-emerald-600" />
                {t.economic.inputs}
              </h3>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.economic.leafType}</label>
                  <select 
                    value={leafId}
                    onChange={(e) => setLeafId(e.target.value)}
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  >
                    {LEAF_TYPES.map(leaf => (
                      <option key={leaf.id} value={leaf.id}>
                        {language === 'ar' ? leaf.nameAr : leaf.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.economic.leafQty}</label>
                  <input 
                    type="number"
                    value={leafQuantity}
                    onChange={(e) => setLeafQuantity(parseFloat(e.target.value) || 0)}
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.economic.complement}</label>
                  <select 
                    value={complementId}
                    onChange={(e) => setComplementId(e.target.value)}
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  >
                    {COMPLEMENTARY_SOURCES.map(comp => (
                      <option key={comp.id} value={comp.id}>
                        {language === 'ar' ? comp.nameAr : language === 'fr' ? comp.nameFr : language === 'it' ? comp.nameIt : comp.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.economic.sellingPrice}</label>
                  <input 
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                    placeholder={t.economic.sellingPricePlaceholder}
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.economic.blendRatio}</label>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold text-stone-600">
                      <span>{language === 'ar' ? selectedLeaf.nameAr : selectedLeaf.nameEn}</span>
                      <span>{language === 'ar' ? selectedComplement.nameAr : language === 'fr' ? selectedComplement.nameFr : language === 'it' ? selectedComplement.nameIt : selectedComplement.name}</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={complementRatio}
                      onChange={(e) => setComplementRatio(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-stone-400">
                      <span>{((1 - complementRatio) * 100).toFixed(0)}%</span>
                      <span>{(complementRatio * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {isAdmin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-8 border-t border-stone-100 space-y-4"
                >
                  <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{t.common.adminDefaults}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <AdminInput label={t.economic.breakdown.filter} value={params.filterClothCost} onChange={(v) => setParams(p => ({...p, filterClothCost: v}))} />
                    <AdminInput label={t.economic.breakdown.lemon} value={params.lemonCost} onChange={(v) => setParams(p => ({...p, lemonCost: v}))} />
                    <AdminInput label={t.economic.breakdown.vinegar} value={params.vinegarCost} onChange={(v) => setParams(p => ({...p, vinegarCost: v}))} />
                    <AdminInput label={t.economic.breakdown.electricity} value={params.electricityCost} onChange={(v) => setParams(p => ({...p, electricityCost: v}))} />
                    <AdminInput label={t.economic.breakdown.gas} value={params.gasCost} onChange={(v) => setParams(p => ({...p, gasCost: v}))} />
                    <AdminInput label={`${t.economic.results.whey} (100g)`} value={params.wheyPrice} onChange={(v) => setParams(p => ({...p, wheyPrice: v}))} />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="xl:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultCard 
              label={t.economic.results.batchCost}
              value={`${results.totalProductionCost.toFixed(2)} LE`}
              sub={t.common.perBatch}
              icon={<DollarSign className="text-blue-600" />}
            />
            <ResultCard 
              label={t.economic.results.cost100g}
              value={`${results.costPer100g.toFixed(2)} LE`}
              sub={t.economic.results.fao}
              icon={<TrendingUp className="text-amber-600" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest">{t.economic.results.marketComp}</h3>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold">
                  {results.savingsVsWhey.toFixed(0)}% {t.economic.results.cheaper}
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: t.common.appTitle, value: results.costPer100g, color: '#059669' },
                    { name: t.economic.results.chicken, value: 120, color: '#f59e0b' },
                    { name: t.economic.results.meat, value: 250, color: '#ef4444' },
                    { name: t.economic.results.whey, value: params.wheyPrice, color: '#94a3b8' }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 600, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }} 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => [`${value.toFixed(2)} ${t.common.le}`, t.common.costPer100g]}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      { [
                        { name: t.common.appTitle, value: results.costPer100g, color: '#059669' },
                        { name: t.economic.results.chicken, value: 120, color: '#f59e0b' },
                        { name: t.economic.results.meat, value: 250, color: '#ef4444' },
                        { name: t.economic.results.whey, value: params.wheyPrice, color: '#94a3b8' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-6 text-[11px] text-stone-500 leading-relaxed text-center italic">
                "{t.economic.results.quote}"
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-stone-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-stone-900/20">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.economic.results.status}</h3>
                  {results.isComplete ? (
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 size={14} /> {t.economic.results.fao}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                      <AlertCircle size={14} /> {t.economic.results.incomplete}
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-stone-400">{t.economic.results.yield}</span>
                      <span className="font-bold">{results.totalProteinProduced.toFixed(1)}g</span>
                    </div>
                    <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="bg-emerald-500 h-full"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] text-stone-400 uppercase font-bold mb-2">{t.economic.results.limiting}</p>
                    <p className="text-lg font-bold text-emerald-400">
                      {results.isComplete ? t.economic.results.none : results.limitingAA || t.economic.results.analyzing}
                    </p>
                  </div>
                </div>
              </div>

              {sellingPrice > 0 && (
                <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
                  <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">{t.economic.results.profit}</h3>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-stone-400 text-xs mb-1">{t.economic.results.margin}</p>
                      <p className={`text-3xl font-display font-bold ${results.profitMargin > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {results.profitMargin.toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-stone-400 text-xs mb-1">{t.economic.results.net}</p>
                      <p className="text-xl font-bold text-stone-900">
                        LE {(sellingPrice - results.costPerKg).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 mb-8 flex items-center gap-2">
              <Calculator size={18} className="text-emerald-600" />
              {t.economic.breakdown.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">{t.economic.breakdown.raw}</h4>
                <div className="space-y-3">
                  <CostRow label={language === 'ar' ? selectedLeaf.nameAr : selectedLeaf.nameEn} value={results.breakdown.leafCost} />
                  <CostRow label={language === 'ar' ? selectedComplement.nameAr : language === 'fr' ? selectedComplement.nameFr : language === 'it' ? selectedComplement.nameIt : selectedComplement.name} value={results.breakdown.complementCost} />
                  <CostRow label={t.economic.breakdown.water} value={results.breakdown.water} />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">{t.economic.breakdown.processing}</h4>
                <div className="space-y-3">
                  <CostRow label={t.economic.breakdown.filter} value={results.breakdown.filterCloth} />
                  <CostRow label={t.economic.breakdown.lemon} value={results.breakdown.lemon} />
                  <CostRow label={t.economic.breakdown.vinegar} value={results.breakdown.vinegar} />
                  <CostRow label={t.economic.breakdown.electricity} value={results.breakdown.electricity} />
                  <CostRow label={t.economic.breakdown.gas} value={results.breakdown.gas} />
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-stone-100 flex justify-between items-center">
              <p className="text-sm font-bold text-stone-900 uppercase">{t.economic.breakdown.total}</p>
              <p className="text-2xl font-display font-bold text-emerald-600">{results.totalProductionCost.toFixed(2)} LE</p>
            </div>
          </div>

          <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-200/60">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6">{t.economic.breakdown.transparency}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-stone-600 leading-relaxed">
              <div className="space-y-3">
                <p className="font-bold text-stone-900 flex items-center gap-2"><ArrowRight size={12} /> {t.economic.breakdown.total}</p>
                <p>Σ (Materials + Process + Utilities + Labor) = {results.totalProductionCost.toFixed(2)} LE</p>
                <p className="font-bold text-stone-900 flex items-center gap-2"><ArrowRight size={12} /> {t.economic.breakdown.yieldCalc}</p>
                <p>Yield = Biomass * DM% * Protein% * Efficiency%</p>
              </div>
              <div className="space-y-3">
                <p className="font-bold text-stone-900 flex items-center gap-2"><ArrowRight size={12} /> {t.economic.breakdown.optimizationConstraint}</p>
                <p>Minimize Cost s.t. Blend_AA[i] ≥ FAO_Ref[i] ∀ i ∈ EAA</p>
                <p className="font-bold text-stone-900 flex items-center gap-2"><ArrowRight size={12} /> {t.economic.breakdown.marketIndex}</p>
                <p>Index = Commercial_Price / Green_Production_Cost</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function AdminInput({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-bold text-stone-500 uppercase">{label}</label>
      <input 
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500/20"
      />
    </div>
  );
}

function CostRow({ label, value }: { label: string, value: number }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-stone-500">{label}</span>
      <span className="font-bold text-stone-900">{value.toFixed(2)} LE</span>
    </div>
  );
}

function ResultCard({ label, value, sub, icon }: { label: string, value: string, sub: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-xl shadow-stone-200/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        {icon}
      </div>
      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">{label}</p>
      <p className="text-3xl font-display font-bold text-stone-900 mb-1">{value}</p>
      <p className="text-xs text-stone-500 font-medium">{sub}</p>
    </div>
  );
}
