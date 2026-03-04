export type Language = 'en' | 'ar' | 'fr' | 'it';

export const translations = {
  en: {
    common: {
      appTitle: "Green Protein",
      version: "Synthesis v2.5",
      le: "LE",
      grams: "Grams",
      perBatch: "per optimized batch",
      netProtein: "Net Protein",
      costPer100g: "Cost per 100g Protein",
      adminMode: "Admin Mode",
      exitAdmin: "Exit Admin Mode",
      adminSettings: "Admin Settings",
      adminDefaults: "Admin Cost Defaults (LE)",
      digestibility: "Digestibility Estimate",
      estPdcaas: "Est. PDCAAS",
      interpretation: "Interpretation",
      completeness: "Completeness Level",
      understood: "I Understand",
      scientificIntegrity: "Scientific Integrity",
      plantBenefits: "Plant Protein Benefits",
      humanSoil: "Human & Soil Uses",
      projectIntegrity: "Project Integrity",
      nutritionalAccuracy: "Nutritional Accuracy",
      safetyProtocols: "Safety Protocols",
      liability: "Liability",
      environmentalImpact: "Environmental Impact",
      protocolStandards: "Protocol & Standards",
      scientificMethodology: "Scientific Methodology"
    },
    nav: {
      home: "Home",
      research: "Amino Acids Analysis",
      production: "Production Lab",
      methodology: "Methodology",
      economic: "Economic Analysis",
      getStarted: "Get Started"
    },
    home: {
      badge: "Bio-Industrial Intelligence",
      heroTitle: "Turn your leaves waste into complete protein",
      heroDesc: "Architecting the future of sustainable nutrition through advanced leaf-protein synthesis and economic modeling.",
      launchLab: "Launch Lab",
      economicModeler: "Economic Modeler",
      features: {
        research: { title: "Amino Acids Analysis", desc: "High-fidelity profiling of amino acid structures and protein density." },
        production: { title: "Production Lab", desc: "Precision blending engine for complete nutritional compliance." },
        methodology: { title: "Methodology", desc: "Validated methodologies for industrial-scale extraction efficiency." },
        economic: { title: "Economic Analysis", desc: "Dynamic feasibility modeling with real-time cost optimization." }
      },
      info: {
        integrity: { 
          title: "Scientific Integrity", 
          label: "Scientific Integrity", 
          desc: "We are committed to the highest scientific standards in protein analysis. All extracted data is based on 2013 FAO standards. The project aims to provide sustainable solutions based on documented research to ensure the quality and safety of the extracted protein for human use." 
        },
        value: { 
          title: "Plant Protein Benefits", 
          label: "Nutritional Value", 
          desc: "Protein extracted from leaves is easy to digest, cholesterol-free, and rich in essential amino acids. It contributes to reducing the carbon footprint by up to 90% compared to animal protein, making it the ideal choice for human health and the planet." 
        },
        circular: { 
          title: "Human & Soil Uses", 
          label: "Circular Economy", 
          desc: "The benefit doesn't stop at humans; the waste resulting from the extraction process acts as a high-quality organic fertilizer that restores soil vitality. This system creates a closed loop of sustainability that starts from leaf waste and ends with human nutrition and land improvement." 
        }
      },
      disclaimers: {
        projectIntegrity: "This project is based on rigorous biochemical analysis and standardized extraction protocols. The data presented reflects laboratory-scale results and is intended for research and educational optimization.",
        nutritionalAccuracy: "While amino acid profiles are derived from established databases (FAO/WHO), individual plant variations may occur based on soil quality, harvest season, and processing precision.",
        safetyProtocols: "All extraction methods (Heat Coagulation, Isoelectric Precipitation) must be performed under controlled sanitary conditions. The project assumes professional adherence to food safety standards.",
        liability: "The Bio-Research Institute provides these tools as a framework for sustainable protein production. Users are responsible for local regulatory compliance and final product testing before consumption.",
        environmentalImpact: "Soil recovery calculations are estimates based on average biomass conversion rates and should be verified through local soil analysis."
      }
    },
    economic: {
      title: "Smart Economic Optimizer",
      subtitle: "AI-driven cost and amino acid optimization for sustainable protein.",
      inputs: "Input Parameters",
      leafType: "Tree Type",
      leafQty: "Fresh Leaves Quantity (Grams)",
      complement: "Protein Complement",
      sellingPrice: "Selling Price (LE/kg) - Optional",
      sellingPricePlaceholder: "Enter target selling price",
      blendRatio: "Manual Blend Ratio",
      results: {
        ratio: "Optimal Blend Ratio",
        batchCost: "Total Batch Cost",
        cost100g: "Cost per 100g",
        marketComp: "Market Comparison",
        cheaper: "Cheaper",
        status: "Optimization Status",
        fao: "FAO Compliant",
        incomplete: "Incomplete",
        yield: "Digestible Protein Yield",
        limiting: "Limiting Amino Acid",
        none: "None - Full Profile",
        analyzing: "Analyzing...",
        profit: "Profitability Analysis",
        margin: "Profit Margin",
        net: "Net per kg",
        quote: "Green production is significantly more cost-effective than animal sources and commercial supplements for the same net protein yield.",
        chicken: "Chicken",
        meat: "Meat (Beef)",
        whey: "Whey Protein"
      },
      breakdown: {
        title: "Detailed Production Cost Breakdown",
        raw: "Raw Materials",
        processing: "Processing & Utilities",
        total: "Total Batch Cost",
        leafCost: "Leaf Biomass Collection",
        complementCost: "Complement Source",
        water: "Water",
        filter: "Filter Cloth",
        lemon: "Lemon",
        vinegar: "Vinegar",
        electricity: "Electricity",
        gas: "Gas",
        transparency: "Formula Transparency",
        optimizationConstraint: "Optimization Constraint",
        marketIndex: "Market Index",
        yieldCalc: "Protein Yield Calculation"
      }
    },
    methodology: {
      title: "Research Methodology",
      subtitle: "Our dual-track extraction process ensures maximum protein recovery from both leaf biomass and complementary legume sources, maintaining nutritional integrity through controlled physical and thermal processing.",
      trackA: "Track A: Leaf Protein Extraction",
      trackB: "Track B: Legume Protein Concentrate",
      qa: "Quality Assurance",
      standardsTitle: "Scientific Standards & Lab Protocols",
      standardsDesc: "Every batch undergoes rigorous testing to ensure the protein profile matches the FAO/WHO 2013 adult standards. Our low-temperature drying and precise heat coagulation prevent the loss of essential amino acids like Lysine and Methionine.",
      thermalLimit: "70°C Thermal Limit",
      phPoint: "pH 4.5 Isoelectric Point",
      filtration: "Double Mesh Filtration",
      natural: "Natural Extraction",
      noChemicals: "Zero Chemical Additives",
      wasteRecovery: "Waste Recovery",
      compliant: "Compliant Profile"
    },
    footer: {
      disclaimers: "Scientific Disclaimers",
      institute: "© 2026 Bio-Research Institute",
      initiative: "Zero Waste Initiative",
      standards: "FAO/WHO Standards"
    }
  },
  ar: {
    common: {
      appTitle: "بروتين أخضر",
      version: "تخليق v2.5",
      le: "جنيه",
      grams: "جرام",
      perBatch: "لكل دفعة محسنة",
      netProtein: "البروتين الصافي",
      costPer100g: "التكلفة لكل 100 جرام بروتين",
      adminMode: "وضع المسؤول",
      exitAdmin: "الخروج من وضع المسؤول",
      adminSettings: "إعدادات المسؤول",
      adminDefaults: "افتراضيات تكلفة المسؤول (جنيه)",
      digestibility: "تقدير قابلية الهضم",
      estPdcaas: "تقدير PDCAAS",
      interpretation: "التفسير",
      completeness: "مستوى الاكتمال",
      understood: "فهمت",
      scientificIntegrity: "النزاهة العلمية",
      plantBenefits: "فوائد البروتين النباتي",
      humanSoil: "استخدامات الإنسان والتربة",
      projectIntegrity: "نزاهة المشروع",
      nutritionalAccuracy: "الدقة الغذائية",
      safetyProtocols: "بروتوكولات السلامة",
      liability: "المسؤولية",
      environmentalImpact: "الأثر البيئي",
      protocolStandards: "البروتوكول والمعايير",
      scientificMethodology: "المنهجية العلمية"
    },
    nav: {
      home: "الرئيسية",
      research: "تحليل الأحماض الأمينية",
      production: "مختبر الإنتاج",
      methodology: "المنهجية",
      economic: "التحليل الاقتصادي",
      getStarted: "ابدأ الآن"
    },
    home: {
      badge: "الذكاء الحيوي الصناعي",
      heroTitle: "حول مخلفات أوراقك إلى بروتين كامل",
      heroDesc: "هندسة مستقبل التغذية المستدامة من خلال تخليق بروتين الأوراق المتقدم والنمذجة الاقتصادية.",
      launchLab: "إطلاق المختبر",
      economicModeler: "النمذجة الاقتصادية",
      features: {
        research: { title: "تحليل الأحماض الأمينية", desc: "توصيف عالي الدقة لهياكل الأحماض الأمينية وكثافة البروتين." },
        production: { title: "مختبر الإنتاج", desc: "محرك خلط دقيق للامتثال الغذائي الكامل." },
        methodology: { title: "المنهجية", desc: "منهجيات معتمدة لكفاءة الاستخلاص على نطاق صناعي." },
        economic: { title: "التحليل الاقتصادي", desc: "نمذجة الجدوى الديناميكية مع تحسين التكلفة في الوقت الفعلي." }
      },
      info: {
        integrity: { 
          title: "الأمانات العلمية", 
          label: "النزاهة العلمية", 
          desc: "نحن نلتزم بأعلى معايير الدقة العلمية في تحليل البروتينات. جميع البيانات المستخرجة تعتمد على معايير منظمة الأغذية والزراعة (FAO) لعام 2013. المشروع يهدف لتقديم حلول مستدامة مبنية على أبحاث موثقة لضمان جودة البروتين المستخلص وسلامته للاستخدام البشري." 
        },
        value: { 
          title: "فوائد البروتين النباتي", 
          label: "القيمة الغذائية", 
          desc: "البروتين المستخلص من الأوراق يتميز بكونه سهل الهضم، خالي من الكوليسترول، وغني بالأحماض الأمينية الأساسية. يساهم في تقليل البصمة الكربونية بنسبة تصل إلى 90% مقارنة بالبروتين الحيواني، مما يجعله الخيار الأمثل لصحة الإنسان والكوكب." 
        },
        circular: { 
          title: "استخدامات الإنسان والتربة", 
          label: "الاقتصاد الدائري", 
          desc: "لا تتوقف الفائدة عند الإنسان؛ فالمخلفات الناتجة عن عملية الاستخلاص تعمل كسماد عضوي فائق الجودة يعيد الحيوية للتربة. هذا النظام يخلق حلقة مغلقة من الاستدامة تبدأ من المخلفات الورقية وتنتهي بتغذية الإنسان وتحسين الأرض." 
        }
      },
      disclaimers: {
        projectIntegrity: "يعتمد هذا المشروع على تحليل كيميائي حيوي صارم وبروتوكولات استخلاص موحدة. تعكس البيانات المقدمة نتائج على مستوى المختبر وهي مخصصة للبحث والتحسين التعليمي.",
        nutritionalAccuracy: "بينما يتم اشتقاق ملفات الأحماض الأمينية من قواعد البيانات المعترف بها (FAO/WHO)، قد تحدث اختلافات فردية في النباتات بناءً على جودة التربة وموسم الحصاد ودقة المعالجة.",
        safetyProtocols: "يجب تنفيذ جميع طرق الاستخلاص (التخثر الحراري، الترسيب الكهربائي المتساوي) تحت ظروف صحية خاضعة للرقابة. يفترض المشروع الالتزام المهني بمعايير سلامة الأغذية.",
        liability: "يوفر معهد الأبحاث الحيوية هذه الأدوات كإطار لإنتاج البروتين المستدام. المستخدمون مسؤولون عن الامتثال التنظيمي المحلي واختبار المنتج النهائي قبل الاستهلاك.",
        environmentalImpact: "تعد حسابات استعادة التربة تقديرات بناءً على متوسط معدلات تحويل الكتلة الحيوية ويجب التحقق منها من خلال تحليل التربة المحلي."
      }
    },
    economic: {
      title: "التحليل الاقتصادي الذكي",
      subtitle: "تحسين التكلفة والأحماض الأمينية المدعوم بالذكاء الاصطناعي للبروتين المستدام.",
      inputs: "معايير المدخلات",
      leafType: "نوع الشجرة",
      leafQty: "كمية الأوراق الطازجة (جرام)",
      complement: "مكمل البروتين",
      sellingPrice: "سعر البيع (جنيه/كجم) - اختياري",
      sellingPricePlaceholder: "أدخل سعر البيع المستهدف",
      blendRatio: "نسبة الخليط اليدوية",
      results: {
        ratio: "نسبة الخليط المثالية",
        batchCost: "إجمالي تكلفة الدفعة",
        cost100g: "التكلفة لكل 100 جرام",
        marketComp: "مقارنة السوق",
        cheaper: "أرخص",
        status: "حالة التحسين",
        fao: "متوافق مع FAO",
        incomplete: "غير مكتمل",
        yield: "إنتاج البروتين القابل للهضم",
        limiting: "الحمض الأميني المحدود",
        none: "لا يوجد - ملف كامل",
        analyzing: "جاري التحليل...",
        profit: "تحليل الربحية",
        margin: "هامش الربح",
        net: "صافي الربح لكل كجم",
        quote: "الإنتاج الأخضر أكثر فعالية من حيث التكلفة بشكل ملحوظ من المصادر الحيوانية والمكملات التجارية لنفس إنتاج البروتين الصافي.",
        chicken: "دجاج",
        meat: "لحم (بقري)",
        whey: "بروتين الواي"
      },
      breakdown: {
        title: "تفصيل تكاليف الإنتاج",
        raw: "المواد الخام",
        processing: "المعالجة والمرافق",
        total: "إجمالي تكلفة الدفعة",
        leafCost: "جمع الكتلة الحيوية للأوراق",
        complementCost: "مصدر المكمل",
        water: "ماء",
        filter: "قماش ترشيح",
        lemon: "ليمون",
        vinegar: "خل",
        electricity: "كهرباء",
        gas: "غاز",
        transparency: "شفافية المعادلة",
        optimizationConstraint: "قيد التحسين",
        marketIndex: "مؤشر السوق",
        yieldCalc: "حساب إنتاج البروتين"
      }
    },
    methodology: {
      title: "منهجية البحث",
      subtitle: "تضمن عملية الاستخلاص مزدوجة المسار أقصى استعادة للبروتين من كل من الكتلة الحيوية للأوراق ومصادر البقوليات التكميلية، مع الحفاظ على السلامة الغذائية من خلال المعالجة الفيزيائية والحرارية الخاضعة للرقابة.",
      trackA: "المسار أ: استخلاص بروتين الأوراق",
      trackB: "المسار ب: مركز بروتين البقوليات",
      qa: "ضمان الجودة",
      standardsTitle: "المعايير العلمية وبروتوكولات المختبر",
      standardsDesc: "تخضع كل دفعة لاختبارات صارمة لضمان مطابقة ملف البروتين لمعايير منظمة الأغذية والزراعة ومنظمة الصحة العالمية لعام 2013 للبالغين. يمنع التجفيف في درجات حرارة منخفضة والتخثر الحراري الدقيق فقدان الأحماض الأمينية الأساسية مثل اللايسين والميثيونين.",
      thermalLimit: "70°C حد حراري",
      phPoint: "pH 4.5 نقطة التعادل الكهربائي",
      filtration: "ترشيح مزدوج الشبكة",
      natural: "استخلاص طبيعي",
      noChemicals: "صفر إضافات كيميائية",
      wasteRecovery: "استعادة النفايات",
      compliant: "ملف متوافق"
    },
    footer: {
      disclaimers: "إخلاء المسؤولية العلمية",
      institute: "© 2026 معهد الأبحاث الحيوية",
      initiative: "مبادرة صفر نفايات",
      standards: "معايير FAO/WHO"
    }
  },
  fr: {
    common: {
      appTitle: "Protéine Verte",
      version: "Synthèse v2.5",
      le: "LE",
      grams: "Grammes",
      perBatch: "par lot optimisé",
      netProtein: "Protéine Nette",
      costPer100g: "Coût par 100g de Protéine",
      adminMode: "Mode Admin",
      exitAdmin: "Quitter le Mode Admin",
      adminSettings: "Paramètres Admin",
      adminDefaults: "Paramètres de Coût Admin (LE)",
      digestibility: "Estimation de la Digestibilité",
      estPdcaas: "PDCAAS Est.",
      interpretation: "Interprétation",
      completeness: "Niveau de Complétude",
      understood: "Compris",
      scientificIntegrity: "Intégrité Scientifique",
      plantBenefits: "Avantages des Protéines Végétales",
      humanSoil: "Usages Humains et du Sol",
      projectIntegrity: "Intégrité du Projet",
      nutritionalAccuracy: "Précision Nutritionnelle",
      safetyProtocols: "Protocoles de Sécurité",
      liability: "Responsabilité",
      environmentalImpact: "Impact Environnemental",
      protocolStandards: "Protocole et Normes",
      scientificMethodology: "Méthodologie Scientifique"
    },
    nav: {
      home: "Accueil",
      research: "Analyse des Acides Aminés",
      production: "Labo de Production",
      methodology: "Méthodologie",
      economic: "Analyse Économique",
      getStarted: "Commencer"
    },
    home: {
      badge: "Intelligence Bio-Industrielle",
      heroTitle: "Transformez vos déchets de feuilles en protéines complètes",
      heroDesc: "Architecturer l'avenir de la nutrition durable grâce à la synthèse avancée de protéines de feuilles et à la modélisation économique.",
      launchLab: "Lancer le Labo",
      economicModeler: "Modélisateur Économique",
      features: {
        research: { title: "Analyse des Acides Aminés", desc: "Profilage haute fidélité des structures d'acides aminés et de la densité protéique." },
        production: { title: "Labo de Production", desc: "Moteur de mélange de précision pour une conformité nutritionnelle complète." },
        methodology: { title: "Méthodologie", desc: "Méthodologies validées pour l'efficacité de l'extraction à l'échelle industrielle." },
        economic: { title: "Analyse Économique", desc: "Modélisation de faisabilité dynamique avec optimisation des coûts en temps réel." }
      },
      info: {
        integrity: { 
          title: "Intégrité Scientifique", 
          label: "Intégrité Scientifique", 
          desc: "Nous nous engageons aux normes scientifiques les plus élevées en matière d'analyse des protéines. Toutes les données extraites sont basées sur les normes de la FAO de 2013. Le projet vise à fournir des solutions durables basées sur des recherches documentées pour assurer la qualité et la sécurité de la protéine extraite pour l'usage humain." 
        },
        value: { 
          title: "Avantages des Protéines Végétales", 
          label: "Valeur Nutritionnelle", 
          desc: "La protéine extraite des feuilles est facile à digérer, sans cholestérol et riche en acides aminés essentiels. Elle contribue à réduire l'empreinte carbone jusqu'à 90% par rapport à la protéine animale, ce qui en fait le choix idéal pour la santé humaine et la planète." 
        },
        circular: { 
          title: "Usages Humains et du Sol", 
          label: "Économie Circulaire", 
          desc: "Le bénéfice ne s'arrête pas aux humains ; les déchets résultant du processus d'extraction agissent comme un engrais organique de haute qualité qui restaure la vitalité du sol. Ce système crée une boucle fermée de durabilité qui commence par les déchets de feuilles et se termine par la nutrition humaine et l'amélioration des terres." 
        }
      },
      disclaimers: {
        projectIntegrity: "Ce projet est basé sur une analyse biochimique rigoureuse et des protocoles d'extraction standardisés. Les données présentées reflètent des résultats à l'échelle du laboratoire et sont destinées à la recherche et à l'optimisation pédagogique.",
        nutritionalAccuracy: "Bien que les profils d'acides aminés soient dérivés de bases de données établies (FAO/OMS), des variations individuelles des plantes peuvent survenir en fonction de la qualité du sol, de la saison de récolte et de la précision du traitement.",
        safetyProtocols: "Toutes les méthodes d'extraction (coagulation thermique, précipitation isoélectrique) doivent être effectuées dans des conditions sanitaires contrôlées. Le projet suppose une adhésion professionnelle aux normes de sécurité alimentaire.",
        liability: "L'Institut de Bio-Recherche fournit ces outils comme cadre pour une production de protéines durable. Les utilisateurs sont responsables de la conformité réglementaire locale et des tests du produit final avant consommation.",
        environmentalImpact: "Les calculs de récupération des sols sont des estimations basées sur les taux moyens de conversion de la biomasse et doivent être vérifiés par une analyse locale des sols."
      }
    },
    economic: {
      title: "Optimiseur Économique Intelligent",
      subtitle: "Optimisation des coûts et des acides aminés par l'IA pour des protéines durables.",
      inputs: "Paramètres d'Entrée",
      leafType: "Type d'Arbre",
      leafQty: "Quantité de Feuilles Fraîches (Grammes)",
      complement: "Complément Protéique",
      sellingPrice: "Prix de Vente (LE/kg) - Optionnel",
      sellingPricePlaceholder: "Entrez le prix de vente cible",
      blendRatio: "Ratio de Mélange Manuel",
      results: {
        ratio: "Ratio de Mélange Optimal",
        batchCost: "Coût Total du Lot",
        cost100g: "Coût par 100g",
        marketComp: "Comparaison du Marché",
        cheaper: "Moins Cher",
        status: "Statut d'Optimisation",
        fao: "Conforme FAO",
        incomplete: "Incomplet",
        yield: "Rendement en Protéines Digestibles",
        limiting: "Acide Aminé Limitant",
        none: "Aucun - Profil Complet",
        analyzing: "Analyse en cours...",
        profit: "Analyse de Rentabilité",
        margin: "Marge Bénéficiaire",
        net: "Net par kg",
        quote: "La production verte est nettement plus rentable que les sources animales et les suppléments commerciaux pour le même rendement net en protéines.",
        chicken: "Poulet",
        meat: "Viande (Bœuf)",
        whey: "Protéine de Lactosérum"
      },
      breakdown: {
        title: "Détail des Coûts de Production",
        raw: "Matières Premières",
        processing: "Traitement et Services",
        total: "Coût Total du Lot",
        leafCost: "Collecte de la biomasse foliaire",
        complementCost: "Source de complément",
        water: "Eau",
        filter: "Tissu filtrant",
        lemon: "Citron",
        vinegar: "Vinaigre",
        electricity: "Électricité",
        gas: "Gaz",
        transparency: "Transparence de la Formule",
        optimizationConstraint: "Contrainte d'Optimisation",
        marketIndex: "Indice du Marché",
        yieldCalc: "Calcul du Rendement Protéique"
      }
    },
    methodology: {
      title: "Méthodologie de Recherche",
      subtitle: "Notre processus d'extraction à double voie assure une récupération maximale des protéines à partir de la biomasse foliaire et des sources de légumineuses complémentaires, tout en maintenant l'intégrité nutritionnelle grâce à un traitement physique et thermique contrôlé.",
      trackA: "Voie A : Extraction de Protéines de Feuilles",
      trackB: "Voie B : Concentré de Protéines de Légumineuses",
      qa: "Assurance Qualité",
      standardsTitle: "Normes Scientifiques et Protocoles de Laboratoire",
      standardsDesc: "Chaque lot subit des tests rigoureux pour s'assurer que le profil protéique correspond aux normes adultes FAO/OMS 2013. Notre séchage à basse température et notre coagulation thermique précise empêchent la perte d'acides aminés essentiels comme la Lysine et la Méthionine.",
      thermalLimit: "Limite Thermique 70°C",
      phPoint: "Point Isoélectrique pH 4,5",
      filtration: "Filtration à Double Maille",
      natural: "Extraction Naturelle",
      noChemicals: "Zéro Additif Chimique",
      wasteRecovery: "Récupération des Déchets",
      compliant: "Profil Conforme"
    },
    footer: {
      disclaimers: "Avertissements Scientifiques",
      institute: "© 2026 Institut de Bio-Recherche",
      initiative: "Initiative Zéro Déchet",
      standards: "Normes FAO/OMS"
    }
  },
  it: {
    common: {
      appTitle: "Proteina Verde",
      version: "Sintesi v2.5",
      le: "LE",
      grams: "Grammi",
      perBatch: "per lotto ottimizzato",
      netProtein: "Proteina Netta",
      costPer100g: "Costo per 100g di Proteina",
      adminMode: "Modalità Admin",
      exitAdmin: "Esci dalla Modalità Admin",
      adminSettings: "Impostazioni Admin",
      adminDefaults: "Predefiniti Costo Admin (LE)",
      digestibility: "Stima della Digeribilità",
      estPdcaas: "PDCAAS Stimato",
      interpretation: "Interpretazione",
      completeness: "Livello di Completezza",
      understood: "Ho capito",
      scientificIntegrity: "Integrità Scientifica",
      plantBenefits: "Benefici delle Proteine Vegetali",
      humanSoil: "Usi per l'Uomo e il Suolo",
      projectIntegrity: "Integrità del Progetto",
      nutritionalAccuracy: "Accuratezza Nutrizionale",
      safetyProtocols: "Protocolli di Sicurezza",
      liability: "Responsabilità",
      environmentalImpact: "Impatto Ambientale",
      protocolStandards: "Protocollo e Standard",
      scientificMethodology: "Metodologia Scientifica"
    },
    nav: {
      home: "Casa",
      research: "Analisi Aminoacidi",
      production: "Laboratorio Produzione",
      methodology: "Metodologia",
      economic: "Analisi Economica",
      getStarted: "Inizia"
    },
    home: {
      badge: "Intelligenza Bio-Industriale",
      heroTitle: "Trasforma i tuoi scarti di foglie in proteine complete",
      heroDesc: "Architettare il futuro della nutrizione sostenibile attraverso la sintesi avanzata di proteine fogliari e la modellazione economica.",
      launchLab: "Avvia Laboratorio",
      economicModeler: "Modellatore Economico",
      features: {
        research: { title: "Analisi Aminoacidi", desc: "Profilazione ad alta fedeltà delle strutture degli aminoacidi e della densità proteica." },
        production: { title: "Laboratorio Produzione", desc: "Motore di miscelazione di precisione per la completa conformità nutrizionale." },
        methodology: { title: "Metodologia", desc: "Metodologie validate per l'efficienza dell'estrazione su scala industriale." },
        economic: { title: "Analisi Economica", desc: "Modellazione dinamica della fattibilità con ottimizzazione dei costi in tempo reale." }
      },
      info: {
        integrity: { 
          title: "Integrità Scientifica", 
          label: "Integrità Scientifica", 
          desc: "Ci impegniamo a rispettare i più alti standard scientifici nell'analisi delle proteine. Tutti i dati estratti si basano sugli standard FAO 2013. Il progetto mira a fornire soluzioni sostenibili basate su ricerche documentate per garantire la qualità e la sicurezza della proteina estratta per l'uso umano." 
        },
        value: { 
          title: "Benefici delle Proteine Vegetali", 
          label: "Valore Nutrizionale", 
          desc: "La proteina estratta dalle foglie è facile da digerire, priva di colesterolo e ricca di aminoacidi essenziali. Contribuisce a ridurre l'impronta di carbonio fino al 90% rispetto alla proteina animale, rendendola la scelta ideale per la salute umana e del pianeta." 
        },
        circular: { 
          title: "Usi per l'Uomo e il Suolo", 
          label: "Economia Circolare", 
          desc: "Il beneficio non si ferma agli esseri umani; gli scarti derivanti dal processo di estrazione fungono da fertilizzante organico di alta qualità che ripristina la vitalità del suolo. Questo sistema crea un ciclo chiuso di sostenibilità che parte dagli scarti fogliari e finisce con la nutrizione umana e il miglioramento della terra." 
        }
      },
      disclaimers: {
        projectIntegrity: "Questo progetto si basa su rigorose analisi biochimiche e protocolli di estrazione standardizzati. I dati presentati riflettono risultati su scala di laboratorio e sono destinati alla ricerca e all'ottimizzazione educativa.",
        nutritionalAccuracy: "Sebbene i profili aminoacidici siano derivati da database consolidati (FAO/OMS), possono verificarsi variazioni individuali delle piante in base alla qualità del suolo, alla stagione di raccolta e alla precisione della lavorazione.",
        safetyProtocols: "Tutti i metodi di estrazione (coagulazione termica, precipitazione isoelettrica) devono essere eseguiti in condizioni sanitarie controllate. Il progetto presuppone l'adesione professionale agli standard di sicurezza alimentare.",
        liability: "L'Istituto di Bio-Ricerca fornisce questi strumenti come quadro per una produzione proteica sostenibile. Gli utenti sono responsabili della conformità normativa locale e dei test del prodotto finale prima del consumo.",
        environmentalImpact: "I calcoli del recupero del suolo sono stime basate sui tassi medi di conversione della biomassa e dovrebbero essere verificati attraverso analisi del suolo locali."
      }
    },
    economic: {
      title: "Ottimizzatore Economico Intelligente",
      subtitle: "Ottimizzazione dei costi e degli aminoacidi guidata dall'IA per proteine sostenibili.",
      inputs: "Parametri di Input",
      leafType: "Tipo di Albero",
      leafQty: "Quantità Foglie Fresche (Grammi)",
      complement: "Complemento Proteico",
      sellingPrice: "Prezzo di Vendita (LE/kg) - Opzionale",
      sellingPricePlaceholder: "Inserisci il prezzo di vendita target",
      blendRatio: "Rapporto di Miscela Manuale",
      results: {
        ratio: "Rapporto di Miscela Ottimale",
        batchCost: "Costo Totale Lotto",
        cost100g: "Costo per 100g",
        marketComp: "Confronto Mercato",
        cheaper: "Più Economico",
        status: "Stato Ottimizzazione",
        fao: "Conforme FAO",
        incomplete: "Incompleto",
        yield: "Resa Proteica Digeribile",
        limiting: "Aminoacido Limitante",
        none: "Nessuno - Profilo Completo",
        analyzing: "Analisi in corso...",
        profit: "Analisi di Redditività",
        margin: "Margine di Profitto",
        net: "Netto per kg",
        quote: "La produzione verde è significativamente più conveniente rispetto alle fonti animali e agli integratori commerciali per la stessa resa netta di proteine.",
        chicken: "Pollo",
        meat: "Carne (Manzo)",
        whey: "Proteine del Siero"
      },
      breakdown: {
        title: "Dettaglio Costi di Produzione",
        raw: "Materie Prime",
        processing: "Lavorazione e Utenze",
        total: "Costo Totale Lotto",
        leafCost: "Raccolta biomassa fogliare",
        complementCost: "Fonte di complemento",
        water: "Acqua",
        filter: "Tessuto filtrante",
        lemon: "Limone",
        vinegar: "Aceto",
        electricity: "Elettricità",
        gas: "Gas",
        transparency: "Trasparenza della Formula",
        optimizationConstraint: "Vincolo di Ottimizzazione",
        marketIndex: "Indice di Mercato",
        yieldCalc: "Calcolo della Resa Proteica"
      }
    },
    methodology: {
      title: "Metodologia di Ricerca",
      subtitle: "Il nostro processo di estrazione a doppio binario garantisce il massimo recupero proteico sia dalla biomassa fogliare che dalle fonti di legumi complementari, mantenendo l'integrità nutrizionale attraverso una lavorazione fisica e termica controllata.",
      trackA: "Binario A: Estrazione Proteine Fogliari",
      trackB: "Binario B: Concentrato Proteico di Legumi",
      qa: "Garanzia di Qualità",
      standardsTitle: "Standard Scientifici e Protocolli di Laboratorio",
      standardsDesc: "Ogni lotto è sottoposto a rigorosi test per garantire che il profilo proteico corrisponda agli standard FAO/OMS 2013 per gli adulti. La nostra essiccazione a bassa temperatura e la precisa coagulazione termica prevengono la perdita di aminoacidi essenziali come Lisina e Metionina.",
      thermalLimit: "Limite Termico 70°C",
      phPoint: "Punto Isoelettrico pH 4,5",
      filtration: "Filtrazione a Doppia Maglia",
      natural: "Estrazione Naturale",
      noChemicals: "Zero Additivi Chimici",
      wasteRecovery: "Recupero Scarti",
      compliant: "Profilo Conforme"
    },
    footer: {
      disclaimers: "Disclaimer Scientifici",
      institute: "© 2026 Istituto di Bio-Ricerca",
      initiative: "Iniziativa Zero Rifiuti",
      standards: "Standard FAO/OMS"
    }
  }
};
