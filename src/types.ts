export interface AminoAcids {
  histidine: number;
  isoleucine: number;
  leucine: number;
  lysine: number;
  saa: number; // Sulfur Amino Acids (Methionine + Cysteine)
  aaa: number; // Aromatic Amino Acids (Phenylalanine + Tyrosine)
  threonine: number;
  tryptophan: number;
  valine: number;
}

export const FAO_2013_ADULT_STANDARD: AminoAcids = {
  histidine: 15,
  isoleucine: 30,
  leucine: 59,
  lysine: 45,
  saa: 22,
  aaa: 38,
  threonine: 23,
  tryptophan: 6,
  valine: 39
};

export interface ProteinSource {
  id: string;
  name: string;
  nameAr?: string;
  aminoAcids: AminoAcids;
  costPer100g: number;
}

export const LEAF_SOURCES: ProteinSource[] = [
  {
    id: "sycamore",
    name: "Sycamore Fig",
    nameAr: "جميز",
    costPer100g: 0,
    aminoAcids: {
      histidine: 18.2, 
      isoleucine: 43.5, 
      leucine: 76.3, 
      lysine: 127.5,
      saa: 20.3, 
      aaa: 107.2, 
      threonine: 38.7, 
      tryptophan: 10.0, 
      valine: 54.0
    }
  },
  {
    id: "fig",
    name: "Fig Leaves",
    nameAr: "تين",
    costPer100g: 0,
    aminoAcids: {
      histidine: 16.5, isoleucine: 30.2, leucine: 58.4, lysine: 35.2,
      saa: 12.8, aaa: 39.5, threonine: 26.2, tryptophan: 7.5, valine: 38.4
    }
  },
  {
    id: "mulberry",
    name: "Mulberry Leaves",
    nameAr: "توت",
    costPer100g: 0,
    aminoAcids: {
      histidine: 19.4, isoleucine: 34.2, leucine: 65.2, lysine: 42.1,
      saa: 16.2, aaa: 45.4, threonine: 30.1, tryptophan: 9.1, valine: 44.5
    }
  }
];

export const COMPLEMENTARY_SOURCES: ProteinSource[] = [
  {
    id: "chickpea",
    name: "Chickpea",
    nameAr: "حمص",
    nameFr: "Pois chiche",
    nameIt: "Ceci",
    costPer100g: 4.5,
    aminoAcids: {
      histidine: 26.5, isoleucine: 41.2, leucine: 71.4, lysine: 65.2,
      saa: 24.5, aaa: 78.2, threonine: 35.4, tryptophan: 8.5, valine: 42.1
    }
  },
  {
    id: "lentil",
    name: "Lentil",
    nameAr: "عدس",
    nameFr: "Lentille",
    nameIt: "Lenticchia",
    costPer100g: 4.5, // 13.5 / 3
    aminoAcids: {
      histidine: 28.4, 
      isoleucine: 54.0, 
      leucine: 86.2, 
      lysine: 96.0,
      saa: 31.5, 
      aaa: 115.3, 
      threonine: 46.0, 
      tryptophan: 10.0, 
      valine: 59.0
    }
  },
  {
    id: "soy",
    name: "Soy",
    nameAr: "صويا",
    nameFr: "Soja",
    nameIt: "Soia",
    costPer100g: 5.5,
    aminoAcids: {
      histidine: 25.8, isoleucine: 48.2, leucine: 82.1, lysine: 63.4,
      saa: 26.2, aaa: 80.4, threonine: 38.5, tryptophan: 12.4, valine: 48.2
    }
  },
  {
    id: "fava",
    name: "Fava Bean",
    nameAr: "فول",
    nameFr: "Fève",
    nameIt: "Fava",
    costPer100g: 4.0,
    aminoAcids: {
      histidine: 24.2, isoleucine: 38.5, leucine: 70.2, lysine: 62.1,
      saa: 15.4, aaa: 75.2, threonine: 32.1, tryptophan: 7.8, valine: 40.2
    }
  },
  {
    id: "lupin",
    name: "Lupin",
    nameAr: "ترمس",
    nameFr: "Lupin",
    nameIt: "Lupino",
    costPer100g: 4.2,
    aminoAcids: {
      histidine: 26.1, isoleucine: 40.2, leucine: 72.5, lysine: 58.4,
      saa: 28.4, aaa: 79.1, threonine: 34.2, tryptophan: 10.2, valine: 41.5
    }
  }
];

export interface ProteinMix {
  source: string;
  leafRatioPercent: number;
  sourceRatioPercent: number;
  sourceWeightG: number;
  sourceProteinPercent: number;
  sourceProteinConcentrateG: number;
  sourcePureProteinG: number;
  finalPureProteinG: number;
  finalProteinConcentrateG: number;
  finalProteinPercent: number;
  estimatedCostEgp: number;
  maxDailyProteinG: number;
  maxDailyConcentrateG: number;
}

export interface LeafType {
  id: string;
  nameAr: string;
  nameEn: string;
  edible: boolean;
  leafSeason: string;
  leafWeightG: number;
  leafProteinPercent: number;
  leafProteinConcentrateG: number;
  leafPureProteinG: number;
  prepNotes: string;
  wasteG: number;
  soilEnhancerMethod: string;
  soilEnhancerSteps: string[];
  soilBenefits: string[];
  mixes: ProteinMix[];
  aminoAcids: AminoAcids;
}

export interface CalculationResult {
  leafName: string;
  mixSource: string;
  leafProteinGrams: number;
  extractedProteinGrams: number;
  leafPureProteinG: number;
  sourcePureProteinG: number;
  supplementProteinGrams: number;
  totalProteinGrams: number;
  netYield: number;
  originalAminoAcids: AminoAcids;
  optimizedAminoAcids: AminoAcids;
  totalCost: number;
  wasteReductionKg: number;
  soilEnhancerKg: number;
  dailyIntakeGrams: number;
  prepNotes: string;
  soilBenefits: string[];
  soilMethod: string;
  soilSteps: string[];
  finalConcentrateG: number;
  leafConcentrateG: number;
  sourceConcentrateG: number;
  finalProteinPercent: number;
  maxDailyConcentrateG: number;
  blendAnalysis: BlendAnalysis;
}

export const LEAF_TYPES: LeafType[] = [
  {
    id: "sycamore",
    nameAr: "ورق الجميز",
    nameEn: "Sycamore fig",
    edible: true,
    leafSeason: "Autumn",
    leafWeightG: 1750,
    leafProteinPercent: 25,
    leafProteinConcentrateG: 220,
    leafPureProteinG: 55,
    prepNotes: "Wash leaves, grind, extract with water, filter, heat coagulation at 70°C, wash and dry protein concentrate",
    wasteG: 305,
    soilEnhancerMethod: "Anaerobic Decomposition",
    soilEnhancerSteps: ["Dry residual leaves", "Grind lightly", "Anaerobic decomposition 30-45 days"],
    soilBenefits: ["Improves water retention", "Enhances microbial activity", "Adds organic matter", "Reduces chemical fertilizer dependency"],
    aminoAcids: LEAF_SOURCES[0].aminoAcids,
    mixes: [
      {
        source: "Lentils / عدس",
        leafRatioPercent: 55,
        sourceRatioPercent: 45,
        sourceWeightG: 300,
        sourceProteinPercent: 60,
        sourceProteinConcentrateG: 75,
        sourcePureProteinG: 45,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 295,
        finalProteinPercent: 33.9,
        estimatedCostEgp: 19.35,
        maxDailyProteinG: 225,
        maxDailyConcentrateG: 618.75
      },
      {
        source: "Fava beans / فول",
        leafRatioPercent: 50,
        sourceRatioPercent: 50,
        sourceWeightG: 300,
        sourceProteinPercent: 55,
        sourceProteinConcentrateG: 70,
        sourcePureProteinG: 35,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 300,
        finalProteinPercent: 33.33,
        estimatedCostEgp: 21.50,
        maxDailyProteinG: 247.5,
        maxDailyConcentrateG: 742.5
      },
      {
        source: "Chickpeas / حمص",
        leafRatioPercent: 50,
        sourceRatioPercent: 50,
        sourceWeightG: 300,
        sourceProteinPercent: 50,
        sourceProteinConcentrateG: 60,
        sourcePureProteinG: 25,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 244.38,
        finalProteinPercent: 33.33,
        estimatedCostEgp: 20.00,
        maxDailyProteinG: 247.5,
        maxDailyConcentrateG: 742.5
      },
      {
        source: "Soy / صويا",
        leafRatioPercent: 55,
        sourceRatioPercent: 45,
        sourceWeightG: 250,
        sourceProteinPercent: 70,
        sourceProteinConcentrateG: 75,
        sourcePureProteinG: 52.5,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 295,
        finalProteinPercent: 34,
        estimatedCostEgp: 22.50,
        maxDailyProteinG: 225,
        maxDailyConcentrateG: 610
      },
      {
        source: "Bitter lupin / ترمس",
        leafRatioPercent: 60,
        sourceRatioPercent: 40,
        sourceWeightG: 200,
        sourceProteinPercent: 50,
        sourceProteinConcentrateG: 50,
        sourcePureProteinG: 25,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 297.25,
        finalProteinPercent: 33.56,
        estimatedCostEgp: 21.00,
        maxDailyProteinG: 206.25,
        maxDailyConcentrateG: 614.25
      }
    ]
  },
  {
    id: "fig",
    nameAr: "ورق التين",
    nameEn: "Fig leaves",
    edible: true,
    leafSeason: "Autumn",
    leafWeightG: 1500,
    leafProteinPercent: 22,
    leafProteinConcentrateG: 200,
    leafPureProteinG: 50,
    prepNotes: "Wash leaves, grind, extract with water, filter, heat coagulation at 70°C, wash and dry protein concentrate",
    wasteG: 280,
    soilEnhancerMethod: "Anaerobic Decomposition",
    soilEnhancerSteps: ["Dry residual leaves", "Grind lightly", "Anaerobic decomposition 30-45 days"],
    soilBenefits: ["Improves water retention", "Enhances microbial activity", "Adds organic matter", "Reduces chemical fertilizer dependency"],
    aminoAcids: LEAF_SOURCES[1].aminoAcids,
    mixes: [
      {
        source: "Lentils / عدس",
        leafRatioPercent: 55,
        sourceRatioPercent: 45,
        sourceWeightG: 300,
        sourceProteinPercent: 60,
        sourceProteinConcentrateG: 75,
        sourcePureProteinG: 45,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 295,
        finalProteinPercent: 34,
        estimatedCostEgp: 18.50,
        maxDailyProteinG: 225,
        maxDailyConcentrateG: 618.75
      },
      {
        source: "Fava beans / فول",
        leafRatioPercent: 50,
        sourceRatioPercent: 50,
        sourceWeightG: 300,
        sourceProteinPercent: 55,
        sourceProteinConcentrateG: 70,
        sourcePureProteinG: 35,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 300,
        finalProteinPercent: 33.33,
        estimatedCostEgp: 21.00,
        maxDailyProteinG: 247.5,
        maxDailyConcentrateG: 742.5
      },
      {
        source: "Chickpeas / حمص",
        leafRatioPercent: 50,
        sourceRatioPercent: 50,
        sourceWeightG: 300,
        sourceProteinPercent: 50,
        sourceProteinConcentrateG: 60,
        sourcePureProteinG: 25,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 244.38,
        finalProteinPercent: 33.33,
        estimatedCostEgp: 20.00,
        maxDailyProteinG: 247.5,
        maxDailyConcentrateG: 742.5
      },
      {
        source: "Soy / صويا",
        leafRatioPercent: 55,
        sourceRatioPercent: 45,
        sourceWeightG: 250,
        sourceProteinPercent: 70,
        sourceProteinConcentrateG: 75,
        sourcePureProteinG: 52.5,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 295,
        finalProteinPercent: 34,
        estimatedCostEgp: 22.50,
        maxDailyProteinG: 225,
        maxDailyConcentrateG: 610
      },
      {
        source: "Bitter lupin / ترمس",
        leafRatioPercent: 60,
        sourceRatioPercent: 40,
        sourceWeightG: 200,
        sourceProteinPercent: 50,
        sourceProteinConcentrateG: 50,
        sourcePureProteinG: 25,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 297.25,
        finalProteinPercent: 33.56,
        estimatedCostEgp: 21.00,
        maxDailyProteinG: 206.25,
        maxDailyConcentrateG: 614.25
      }
    ]
  },
  {
    id: "mulberry",
    nameAr: "ورق التوت",
    nameEn: "Mulberry leaves",
    edible: true,
    leafSeason: "Autumn",
    leafWeightG: 1600,
    leafProteinPercent: 23,
    leafProteinConcentrateG: 210,
    leafPureProteinG: 52,
    prepNotes: "Wash leaves, grind, extract with water, filter, heat coagulation at 70°C, wash and dry protein concentrate",
    wasteG: 290,
    soilEnhancerMethod: "Anaerobic Decomposition",
    soilEnhancerSteps: ["Dry residual leaves", "Grind lightly", "Anaerobic decomposition 30-45 days"],
    soilBenefits: ["Improves water retention", "Enhances microbial activity", "Adds organic matter", "Reduces chemical fertilizer dependency"],
    aminoAcids: LEAF_SOURCES[2].aminoAcids,
    mixes: [
      {
        source: "Lentils / عدس",
        leafRatioPercent: 55,
        sourceRatioPercent: 45,
        sourceWeightG: 300,
        sourceProteinPercent: 60,
        sourceProteinConcentrateG: 75,
        sourcePureProteinG: 45,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 295,
        finalProteinPercent: 34,
        estimatedCostEgp: 18.75,
        maxDailyProteinG: 225,
        maxDailyConcentrateG: 618.75
      },
      {
        source: "Fava beans / فول",
        leafRatioPercent: 50,
        sourceRatioPercent: 50,
        sourceWeightG: 300,
        sourceProteinPercent: 55,
        sourceProteinConcentrateG: 70,
        sourcePureProteinG: 35,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 300,
        finalProteinPercent: 33.33,
        estimatedCostEgp: 21.50,
        maxDailyProteinG: 247.5,
        maxDailyConcentrateG: 742.5
      },
      {
        source: "Chickpeas / حمص",
        leafRatioPercent: 50,
        sourceRatioPercent: 50,
        sourceWeightG: 300,
        sourceProteinPercent: 50,
        sourceProteinConcentrateG: 60,
        sourcePureProteinG: 25,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 244.38,
        finalProteinPercent: 33.33,
        estimatedCostEgp: 20.00,
        maxDailyProteinG: 247.5,
        maxDailyConcentrateG: 742.5
      },
      {
        source: "Soy / صويا",
        leafRatioPercent: 55,
        sourceRatioPercent: 45,
        sourceWeightG: 250,
        sourceProteinPercent: 70,
        sourceProteinConcentrateG: 75,
        sourcePureProteinG: 52.5,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 295,
        finalProteinPercent: 34,
        estimatedCostEgp: 22.50,
        maxDailyProteinG: 225,
        maxDailyConcentrateG: 610
      },
      {
        source: "Bitter lupin / ترمس",
        leafRatioPercent: 60,
        sourceRatioPercent: 40,
        sourceWeightG: 200,
        sourceProteinPercent: 50,
        sourceProteinConcentrateG: 50,
        sourcePureProteinG: 25,
        finalPureProteinG: 100,
        finalProteinConcentrateG: 297.25,
        finalProteinPercent: 33.56,
        estimatedCostEgp: 21.00,
        maxDailyProteinG: 206.25,
        maxDailyConcentrateG: 614.25
      }
    ]
  }
];

export interface BlendAnalysis {
  leaf: ProteinSource;
  complement: ProteinSource;
  aminoAcids: {
    name: string;
    key: keyof AminoAcids;
    fao: number;
    blend: number;
    score: number;
    isLimiting: boolean;
  }[];
  limitingAA: string;
  chemicalScore: number;
  pdcaas: number;
  completeness: "Low" | "Moderate" | "High";
  interpretation: string;
}
