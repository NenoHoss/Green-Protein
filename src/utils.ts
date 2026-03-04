import { 
  AminoAcids, 
  FAO_2013_ADULT_STANDARD, 
  ProteinSource, 
  BlendAnalysis,
  LeafType,
  ProteinMix,
  CalculationResult,
  COMPLEMENTARY_SOURCES,
  LEAF_SOURCES
} from './types';

export function calculateProduction(
  leaf: LeafType, 
  quantityGrams: number, 
  mix: ProteinMix
): CalculationResult {
  const scaleFactor = quantityGrams / leaf.leafWeightG;
  const leafProteinTotal = leaf.leafPureProteinG * scaleFactor;
  const extractedProtein = leaf.leafPureProteinG * scaleFactor;
  const supplementProtein = mix.sourcePureProteinG * scaleFactor;
  const totalProtein = leafProteinTotal + supplementProtein;
  const totalCost = mix.estimatedCostEgp * scaleFactor;
  const wasteReductionKg = (leaf.wasteG * scaleFactor) / 1000;
  const soilEnhancerKg = wasteReductionKg;

  // Find the complementary source for amino acid analysis
  const sourceName = mix.source.split(' / ')[0].toLowerCase();
  const complement = COMPLEMENTARY_SOURCES.find(s => 
    s.name.toLowerCase().includes(sourceName) || 
    sourceName.includes(s.name.toLowerCase())
  ) || COMPLEMENTARY_SOURCES[0];

  // Find the leaf source for amino acid analysis
  const leafSource = LEAF_SOURCES.find(s => s.id === leaf.id) || LEAF_SOURCES[0];

  // Calculate blend analysis using the specific ratios from the mix
  const leafRatio = mix.leafRatioPercent / 100;
  const blendAnalysis = calculateBlendAnalysis(leafSource, complement, leafRatio);

  // Map blend analysis back to AminoAcids interface for optimizedAminoAcids
  const optimizedAminoAcids: AminoAcids = {
    histidine: blendAnalysis.aminoAcids.find(aa => aa.key === 'histidine')?.blend || 0,
    isoleucine: blendAnalysis.aminoAcids.find(aa => aa.key === 'isoleucine')?.blend || 0,
    leucine: blendAnalysis.aminoAcids.find(aa => aa.key === 'leucine')?.blend || 0,
    lysine: blendAnalysis.aminoAcids.find(aa => aa.key === 'lysine')?.blend || 0,
    saa: blendAnalysis.aminoAcids.find(aa => aa.key === 'saa')?.blend || 0,
    aaa: blendAnalysis.aminoAcids.find(aa => aa.key === 'aaa')?.blend || 0,
    threonine: blendAnalysis.aminoAcids.find(aa => aa.key === 'threonine')?.blend || 0,
    tryptophan: blendAnalysis.aminoAcids.find(aa => aa.key === 'tryptophan')?.blend || 0,
    valine: blendAnalysis.aminoAcids.find(aa => aa.key === 'valine')?.blend || 0,
  };

  return {
    leafName: leaf.nameEn,
    mixSource: mix.source,
    leafProteinGrams: leafProteinTotal,
    extractedProteinGrams: extractedProtein,
    leafPureProteinG: leaf.leafPureProteinG * scaleFactor,
    sourcePureProteinG: mix.sourcePureProteinG * scaleFactor,
    supplementProteinGrams: supplementProtein,
    totalProteinGrams: totalProtein,
    netYield: mix.finalProteinPercent,
    originalAminoAcids: leaf.aminoAcids,
    optimizedAminoAcids,
    totalCost,
    wasteReductionKg,
    soilEnhancerKg,
    dailyIntakeGrams: mix.maxDailyProteinG,
    prepNotes: leaf.prepNotes,
    soilBenefits: leaf.soilBenefits,
    soilMethod: leaf.soilEnhancerMethod,
    soilSteps: leaf.soilEnhancerSteps,
    finalConcentrateG: mix.finalProteinConcentrateG * scaleFactor,
    leafConcentrateG: leaf.leafProteinConcentrateG * scaleFactor,
    sourceConcentrateG: mix.sourceProteinConcentrateG * scaleFactor,
    finalProteinPercent: mix.finalProteinPercent,
    maxDailyConcentrateG: mix.maxDailyConcentrateG,
    blendAnalysis
  };
}

export function calculateBlendAnalysis(
  leaf: ProteinSource, 
  complement: ProteinSource,
  leafRatio: number = 0.5 // Default 50/50 blend
): BlendAnalysis {
  const complementRatio = 1 - leafRatio;
  
  const aaKeys: (keyof AminoAcids)[] = [
    'histidine', 'isoleucine', 'leucine', 'lysine', 
    'saa', 'aaa', 'threonine', 'tryptophan', 'valine'
  ];

  const aaDisplayNames: Record<keyof AminoAcids, string> = {
    histidine: "Histidine",
    isoleucine: "Isoleucine",
    leucine: "Leucine",
    lysine: "Lysine",
    saa: "SAA (Met+Cys)",
    aaa: "AAA (Phe+Tyr)",
    threonine: "Threonine",
    tryptophan: "Tryptophan",
    valine: "Valine"
  };

  const blendAAs = aaKeys.map(key => {
    const leafVal = leaf.aminoAcids[key];
    const compVal = complement.aminoAcids[key];
    const blendVal = (leafVal * leafRatio) + (compVal * complementRatio);
    const faoVal = FAO_2013_ADULT_STANDARD[key];
    const score = (blendVal / faoVal) * 100;
    
    return {
      name: aaDisplayNames[key],
      key,
      fao: faoVal,
      blend: blendVal,
      score: score,
      isLimiting: false
    };
  });

  // Find limiting amino acid (lowest score)
  let limitingIndex = 0;
  let minScore = blendAAs[0].score;
  
  blendAAs.forEach((aa, index) => {
    if (aa.score < minScore) {
      minScore = aa.score;
      limitingIndex = index;
    }
  });

  // Mark limiting AA if score < 100
  if (minScore < 100) {
    blendAAs[limitingIndex].isLimiting = true;
  }

  const chemicalScore = minScore;
  const pdcaas = Math.min(1.0, (chemicalScore / 100) * 0.9) * 100; // Simplified estimation

  let completeness: "Low" | "Moderate" | "High" = "Low";
  if (chemicalScore >= 90) completeness = "High";
  else if (chemicalScore >= 70) completeness = "Moderate";

  const interpretation = minScore >= 100 
    ? `This blend provides a complete amino acid profile exceeding FAO/WHO 2013 adult requirements. No limiting amino acids detected.`
    : `This blend is limited by ${blendAAs[limitingIndex].name}. Supplementation or ratio adjustment may be required to reach 100% chemical score.`;

  return {
    leaf,
    complement,
    aminoAcids: blendAAs,
    limitingAA: minScore < 100 ? blendAAs[limitingIndex].name : "None",
    chemicalScore: minScore,
    pdcaas,
    completeness,
    interpretation
  };
}
