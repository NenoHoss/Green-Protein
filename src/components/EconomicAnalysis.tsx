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
import { cn } from '../utils';

interface EconomicDefaults {
  leafPricePerKg: number;
  lentilPricePerKg: number;
  chickpeaPricePerKg: number;
  lupinPricePerKg: number;
  soyPricePerKg: number;
  favaPricePerKg: number;
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
  leafPricePerKg: 0,
  lentilPricePerKg: 45,
  chickpeaPricePerKg: 55,
  lupinPricePerKg: 55,
  soyPricePerKg: 70,
  favaPricePerKg: 60,
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
    // Base batch size from the reference image
    const BASE_LEAF_BATCH = selectedLeaf.leafWeightG;
    const scaleFactor = leafQuantity / BASE_LEAF_BATCH;

    // 1. Calculate extractable leaf protein
    const leafProteinContent = selectedLeaf.leafProteinPercent / 100; 
    const extractionEfficiency = 0.65; 
    const dryMatterConversion = 0.22; 
    
    const leafProteinYield = selectedLeaf.leafPureProteinG * scaleFactor;
    
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
    
    // Yield factors (grams of raw material per gram of pure protein)
    const leafYieldFactor = 31.818181818181817; 
    const legumeYieldFactor = 6.666666666666667; 

    const rawLeafWeight = leafProteinYield * leafYieldFactor;
    const rawComplementWeight = complementProteinNeeded * legumeYieldFactor;
    
    const leafCost = (rawLeafWeight / 1000) * params.leafPricePerKg;
    
    // Get complement price from params
    let complementPrice = params.lentilPricePerKg;
    if (selectedComplement.id === 'chickpea') complementPrice = params.chickpeaPricePerKg;
    else if (selectedComplement.id === 'lupin') complementPrice = params.lupinPricePerKg;
    else if (selectedComplement.id === 'soy') complementPrice = params.soyPricePerKg;
    else if (selectedComplement.id === 'fava') complementPrice = params.favaPricePerKg;

    const complementCost = (rawComplementWeight / 1000) * complementPrice;
    
    const totalRawMaterialCost = leafCost + complementCost;

    // Scaling costs based on leaf quantity
    const isSycamore = selectedLeaf.id === 'sycamore';
    const processingCosts = {
      filterCloth: (leafQuantity / (isSycamore ? 1750 : 5000)) * params.filterClothCost,
      water: isSycamore ? params.waterCostPerL * 6 * scaleFactor : 0,
      lemon: isSycamore ? params.lemonCost * scaleFactor : 0,
      vinegar: isSycamore ? params.vinegarCost * scaleFactor : 0,
      electricity: isSycamore ? params.electricityCost * scaleFactor : 0,
      gas: isSycamore ? params.gasCost * scaleFactor : 0
    };

    const totalProductionCost = totalRawMaterialCost + Object.values(processingCosts).reduce((a, b) => a + b, 0);
    
    const costPerGram = totalProductionCost / totalProteinProduced;
    const costPer100g = costPerGram * 100;
    const costPerKg = costPerGram * 1000;
    
    const profitMargin = sellingPrice > 0 ? ((sellingPrice - costPerKg) / sellingPrice) * 100 : 0;
    const savingsVsWhey = ((params.wheyPrice - costPer100g) / params.wheyPrice) * 100;

    // Safety Constraints
    const isIllogical = costPer100g <= 0 || costPer100g < (totalRawMaterialCost / totalProteinProduced * 100 * 0.9);

    return {
      leafProteinYield,
      complementProteinNeeded,
      totalProteinProduced,
      complementRatio,
      isComplete,
      limitingAA,
      totalProductionCost,
      totalRawMaterialCost,
      costPerGram,
      costPer100g,
      costPerKg,
      profitMargin,
      savingsVsWhey,
      isIllogical,
      debug: {
        leafCost,
        complementCost,
        rawLeafWeight,
        rawComplementWeight,
        totalProteinProduced,
        formula: `((${rawLeafWeight.toFixed(0)}g * ${params.leafPricePerKg}) + (${rawComplementWeight.toFixed(0)}g * ${complementPrice})) / ${totalProteinProduced.toFixed(1)}g * 100`
      },
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
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 btn-polished ${isAdmin ? 'bg-emerald-900 text-white shadow-emerald-900/20' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
        >
          <Settings2 size={14} />
          {isAdmin ? t.common.exitAdmin : t.common.adminSettings}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 space-y-6">
          <div className="glass-card rounded-[2.5rem] border border-stone-200 shadow-xl shadow-stone-200/10 overflow-hidden transition-all duration-500 hover:shadow-emerald-900/5">
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
                        {language === 'ar' ? comp.nameAr : 
                         language === 'fr' ? comp.nameFr :
                         language === 'it' ? comp.nameIt :
                         comp.nameEn}
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
                    placeholder={t.lab.enterSellingPrice}
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.economic.blendRatio}</label>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold text-stone-600">
                      <span>
                        {language === 'ar' ? selectedLeaf.nameAr : 
                         language === 'fr' ? selectedLeaf.nameFr :
                         language === 'it' ? selectedLeaf.nameIt :
                         selectedLeaf.nameEn}
                      </span>
                      <span>
                        {language === 'ar' ? selectedComplement.nameAr : 
                         language === 'fr' ? selectedComplement.nameFr :
                         language === 'it' ? selectedComplement.nameIt :
                         selectedComplement.nameEn}
                      </span>
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
                  <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{t.economic.adminCostDefaults}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <AdminInput label="Leaf Price (EGP/kg)" value={params.leafPricePerKg} onChange={(v) => setParams(p => ({...p, leafPricePerKg: v}))} />
                    <AdminInput label="Lentil (EGP/kg)" value={params.lentilPricePerKg} onChange={(v) => setParams(p => ({...p, lentilPricePerKg: v}))} />
                    <AdminInput label="Chickpea (EGP/kg)" value={params.chickpeaPricePerKg} onChange={(v) => setParams(p => ({...p, chickpeaPricePerKg: v}))} />
                    <AdminInput label="Lupin (EGP/kg)" value={params.lupinPricePerKg} onChange={(v) => setParams(p => ({...p, lupinPricePerKg: v}))} />
                    <AdminInput label="Soy (EGP/kg)" value={params.soyPricePerKg} onChange={(v) => setParams(p => ({...p, soyPricePerKg: v}))} />
                    <AdminInput label="Fava (EGP/kg)" value={params.favaPricePerKg} onChange={(v) => setParams(p => ({...p, favaPricePerKg: v}))} />
                    <AdminInput label={t.economic.filterCloth} value={params.filterClothCost} onChange={(v) => setParams(p => ({...p, filterClothCost: v}))} />
                    <AdminInput label={t.economic.lemon} value={params.lemonCost} onChange={(v) => setParams(p => ({...p, lemonCost: v}))} />
                    <AdminInput label={t.economic.vinegar} value={params.vinegarCost} onChange={(v) => setParams(p => ({...p, vinegarCost: v}))} />
                    <AdminInput label={t.economic.electricity} value={params.electricityCost} onChange={(v) => setParams(p => ({...p, electricityCost: v}))} />
                    <AdminInput label={t.economic.gas} value={params.gasCost} onChange={(v) => setParams(p => ({...p, gasCost: v}))} />
                    <AdminInput label={t.economic.whey100g} value={params.wheyPrice} onChange={(v) => setParams(p => ({...p, wheyPrice: v}))} />
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
              className={results.isIllogical ? "ring-2 ring-rose-500/50" : ""}
            />
          </div>

          {results.isIllogical && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3 text-rose-700 text-sm">
              <AlertCircle size={18} />
              <p><strong>Recalculation Alert:</strong> The calculated cost deviates from realistic raw material floors. Please check input parameters.</p>
            </div>
          )}

          {isAdmin && (
            <div className="bg-stone-900 text-emerald-400 p-6 rounded-[2rem] font-mono text-[10px] space-y-2 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2 text-white border-b border-white/10 pb-2">
                <FlaskConical size={14} />
                <span className="uppercase font-bold tracking-widest">Debug Transparency Mode</span>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <div>Leaf Cost: {results.debug.leafCost.toFixed(2)} LE</div>
                <div>Legume Cost: {results.debug.complementCost.toFixed(2)} LE</div>
                <div>Raw Leaf: {results.debug.rawLeafWeight.toFixed(0)}g</div>
                <div>Raw Legume: {results.debug.rawComplementWeight.toFixed(0)}g</div>
                <div>Net Protein: {results.debug.totalProteinProduced.toFixed(1)}g</div>
                <div>Total RM Cost: {results.totalRawMaterialCost.toFixed(2)} LE</div>
              </div>
              <div className="mt-2 pt-2 border-t border-white/10 text-stone-400 italic">
                Formula: {results.debug.formula}
              </div>
            </div>
          )}

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
                  <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.economic.optimizationStatus}</h3>
                  {results.isComplete ? (
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 size={14} /> {t.economic.faoCompliant}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                      <AlertCircle size={14} /> {t.economic.incomplete}
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-stone-400">{t.economic.digestibleYield}</span>
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
                    <p className="text-[10px] text-stone-400 uppercase font-bold mb-2">{t.economic.limitingAA}</p>
                    <p className="text-lg font-bold text-emerald-400">
                      {results.isComplete ? t.economic.noneFullProfile : results.limitingAA || t.economic.analyzing}
                    </p>
                  </div>
                </div>
              </div>

              {sellingPrice > 0 && (
                <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
                  <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">{t.economic.profitabilityAnalysis}</h3>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-stone-400 text-xs mb-1">{t.economic.profitMargin}</p>
                      <p className={`text-3xl font-display font-bold ${results.profitMargin > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {results.profitMargin.toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-stone-400 text-xs mb-1">{t.economic.netPerKg}</p>
                      <p className="text-xl font-bold text-stone-900">
                        {t.common.le} {(sellingPrice - results.costPerKg).toFixed(2)}
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
                  <CostRow label={language === 'ar' ? selectedLeaf.nameAr : 
                                  language === 'fr' ? selectedLeaf.nameFr :
                                  language === 'it' ? selectedLeaf.nameIt :
                                  selectedLeaf.nameEn} value={results.breakdown.leafCost} t={t} />
                  <CostRow label={language === 'ar' ? selectedComplement.nameAr || '' :
                                  language === 'fr' ? selectedComplement.nameFr || '' :
                                  language === 'it' ? selectedComplement.nameIt || '' :
                                  selectedComplement.nameEn} value={results.breakdown.complementCost} t={t} />
                  <CostRow label={t.economic.breakdown.water} value={results.breakdown.water} t={t} />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">{t.economic.breakdown.processing}</h4>
                <div className="space-y-3">
                  <CostRow label={t.economic.breakdown.filter} value={results.breakdown.filterCloth} t={t} />
                  <CostRow label={t.economic.breakdown.lemon} value={results.breakdown.lemon} t={t} />
                  <CostRow label={t.economic.breakdown.vinegar} value={results.breakdown.vinegar} t={t} />
                  <CostRow label={t.economic.breakdown.electricity} value={results.breakdown.electricity} t={t} />
                  <CostRow label={t.economic.breakdown.gas} value={results.breakdown.gas} t={t} />
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-stone-100 flex justify-between items-center">
              <p className="text-sm font-bold text-stone-900 uppercase">{t.economic.breakdown.total}</p>
              <p className="text-2xl font-display font-bold text-emerald-600">{results.totalProductionCost.toFixed(2)} {t.common.le}</p>
            </div>
          </div>

          <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-200/60">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6">{t.economic.formulaTransparency}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-stone-600 leading-relaxed">
              <div className="space-y-3">
                <p className="font-bold text-stone-900 flex items-center gap-2"><ArrowRight size={12} /> {t.lab.formulaMaterials}</p>
                <p>{t.lab.formulaMaterials} = {results.totalProductionCost.toFixed(2)} LE</p>
                <p className="font-bold text-stone-900 flex items-center gap-2"><ArrowRight size={12} /> {t.lab.formulaYield}</p>
                <p>{t.lab.formulaYield}</p>
              </div>
              <div className="space-y-3">
                <p className="font-bold text-stone-900 flex items-center gap-2"><ArrowRight size={12} /> {t.lab.formulaOptimization}</p>
                <p>{t.lab.formulaOptimization}</p>
                <p className="font-bold text-stone-900 flex items-center gap-2"><ArrowRight size={12} /> {t.lab.formulaMarketIndex}</p>
                <p>{t.lab.formulaMarketIndex}</p>
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

function CostRow({ label, value, t }: { label: string, value: number, t: any }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-stone-500">{label}</span>
      <span className="font-bold text-stone-900">{value.toFixed(2)} {t.common.le}</span>
    </div>
  );
}

function ResultCard({ label, value, sub, icon, className }: { label: string, value: string, sub: string, icon: React.ReactNode, className?: string }) {
  return (
    <div className={cn("bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-xl shadow-stone-200/5 relative overflow-hidden group", className)}>
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        {icon}
      </div>
      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">{label}</p>
      <p className="text-3xl font-display font-bold text-stone-900 mb-1">{value}</p>
      <p className="text-xs text-stone-500 font-medium">{sub}</p>
    </div>
  );
}
