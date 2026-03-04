import React from 'react';
import { motion } from 'motion/react';
import { 
  Leaf, 
  Droplets, 
  Flame, 
  Filter, 
  Sun, 
  Scissors, 
  Wind, 
  Beaker,
  Scale,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Language } from '../translations';

interface MethodologyProps {
  language: Language;
  t: any;
}

const LeafSteps = [
  {
    icon: <Scissors className="text-emerald-600" />,
    en: { title: "Collection & Preparation", desc: "Fresh leaves are carefully collected from Sycamore trees, cut into small pieces, and soaked in a mild vinegar solution to reduce microbial contamination and ensure cleanliness." },
    ar: { title: "الجمع والتحضير", desc: "يتم جمع الأوراق الطازجة بعناية من أشجار الجميز، وتقطيعها إلى قطع صغيرة، ونقعها في محلول خل مخفف لتقليل التلوث الميكروبي وضمان النظافة." },
    fr: { title: "Collecte et Préparation", desc: "Les feuilles fraîches sont soigneusement collectées sur les sycomores, coupées en petits morceaux et trempées dans une solution de vinaigre doux pour réduire la contamination microbienne et assurer la propreté." },
    it: { title: "Raccolta e Preparazione", desc: "Le foglie fresche vengono raccolte con cura dai sicomori, tagliate in piccoli pezzi e immerse in una soluzione di aceto delicato per ridurre la contaminazione microbica e garantire la pulizia." }
  },
  {
    icon: <Droplets className="text-blue-400" />,
    en: { title: "Washing", desc: "The collected leaves are washed thoroughly with distilled water to remove any remaining impurities or vinegar residues." },
    ar: { title: "الغسيل", desc: "يتم غسل الأوراق المجموعة جيداً بالماء المقطر لإزالة أي شوائب متبقية أو بقايا الخل." },
    fr: { title: "Lavage", desc: "Les feuilles collectées sont lavées abondamment à l'eau distillée pour éliminer toutes les impuretés restantes ou les résidus de vinaigre." },
    it: { title: "Lavaggio", desc: "Le foglie raccolte vengono lavate accuratamente con acqua distillata per rimuovere eventuali impurità residue o residui di aceto." }
  },
  {
    icon: <Sun className="text-amber-500" />,
    en: { title: "Drying", desc: "The leaves are spread under sunlight to dry. This step reduces moisture content, making the leaves easier to grind and process." },
    ar: { title: "التجفيف", desc: "تُفرد الأوراق تحت أشعة الشمس لتجف. تقلل هذه الخطوة من محتوى الرطوبة، مما يجعل الأوراق أسهل في الطحن والمعالجة." },
    fr: { title: "Séchage", desc: "Les feuilles sont étalées au soleil pour sécher. Cette étape réduit la teneur en humidité, ce qui facilite le broyage et le traitement des feuilles." },
    it: { title: "Essiccazione", desc: "Le foglie vengono stese al sole per asciugare. Questo passaggio riduce il contenuto di umidità, rendendo le foglie più facili da macinare e lavorare." }
  },
  {
    icon: <Wind className="text-blue-500" />,
    en: { title: "Grinding", desc: "Dried leaves are ground with a small amount of distilled water. This breaks cell walls, releasing proteins into the water and forming a liquid protein juice." },
    ar: { title: "الطحن", desc: "يتم طحن الأوراق المجففة مع كمية صغيرة من الماء المقطر. يؤدي ذلك إلى تكسير جدران الخلايا، مما يؤدي إلى إطلاق البروتينات في الماء وتكوين عصير بروتين سائل." },
    fr: { title: "Broyage", desc: "Les feuilles séchées sont broyées avec une petite quantité d'eau distillée. Cela brise les parois cellulaires, libérant les protéines dans l'eau et formant un jus de protéine liquide." },
    it: { title: "Macinazione", desc: "Le foglie essiccate vengono macinate con una piccola quantità di acqua distillata. Questo rompe le pareti cellulari, rilasciando le proteine nell'acqua e formando un succo proteico liquido." }
  },
  {
    icon: <Filter className="text-stone-500" />,
    en: { title: "Filtration", desc: "The mixture is filtered using a sieve to separate the liquid protein extract from the fibers and any other impurities, ensuring a smooth solution." },
    ar: { title: "الترشيح", desc: "يتم تصفية الخليط باستخدام منخل لفصل مستخلص البروتين السائل عن الألياف وأي شوائب أخرى، مما يضمن الحصول على محلول ناعم." },
    fr: { title: "Filtration", desc: "Le mélange est filtré à l'aide d'un tamis pour séparer l'extrait de protéine liquide des fibres et de toute autre impureté, assurant une solution lisse." },
    it: { title: "Filtrazione", desc: "La miscela viene filtrata utilizzando un setaccio per separare l'estratto proteico liquido dalle fibre e da ogni altra impurità, garantendo una soluzione omogenea." }
  },
  {
    icon: <Flame className="text-orange-600" />,
    en: { title: "Heat Treatment", desc: "The filtered extract is gently heated to 70°C. This helps inactivate remaining microbes while preserving protein content and preventing denaturation." },
    ar: { title: "المعالجة الحرارية", desc: "يتم تسخين المستخلص المصفى بلطف إلى درجة حرارة 70 مئوية. يساعد ذلك في تثبيط الميكروبات المتبقية مع الحفاظ على محتوى البروتين ومنع تلفه." },
    fr: { title: "Traitement Thermique", desc: "L'extrait filtré est chauffé doucement à 70°C. Cela aide à inactiver les microbes restants tout en préservant la teneur en protéines et en empêchant la dénaturation." },
    it: { title: "Trattamento Termico", desc: "L'estratto filtrato viene riscaldato delicatamente a 70°C. Ciò aiuta a inattivare i microbi rimanenti preservando il contenuto proteico e prevenendo la denaturazione." }
  },
  {
    icon: <Droplets className="text-cyan-500" />,
    en: { title: "Cooling & Second Filtration", desc: "After heating, the protein extract is allowed to cool and filtered again using a fine mesh to remove any remaining solids, producing a more concentrated solution." },
    ar: { title: "التبريد والترشيح الثاني", desc: "بعد التسخين، يُترك مستخلص البروتين ليبرد ويُصفى مرة أخرى باستخدام شبكة ناعمة لإزالة أي مواد صلبة متبقية، مما ينتج عنه محلول أكثر تركيزاً." },
    fr: { title: "Refroidissement et Deuxième Filtration", desc: "Après chauffage, l'extrait de protéine est laissé refroidir et filtré à nouveau à l'aide d'une maille fine pour éliminer tous les solides restants, produisant une solution plus concentrée." },
    it: { title: "Raffreddamento e Seconda Filtrazione", desc: "Dopo il riscaldamento, l'estratto proteico viene lasciato raffreddare e filtrato nuovamente utilizzando una maglia fine per rimuovere eventuali solidi rimanenti, producendo una soluzione più concentrata." }
  },
  {
    icon: <Sun className="text-yellow-600" />,
    en: { title: "Drying the Concentrate", desc: "Finally, the concentrated protein solution is spread out and dried under sunlight, yielding a protein powder/concentrate suitable for further mixing." },
    ar: { title: "تجفيف المركز", desc: "أخيرًا، يتم فرد محلول البروتين المركز وتجفيفه تحت أشعة الشمس، مما ينتج عنه مسحوق/مركز بروتين مناسب لمزيد من الخلط." },
    fr: { title: "Séchage du Concentré", desc: "Enfin, la solution de protéine concentrée est étalée et séchée au soleil, produisant une poudre/un concentré de protéine adapté à un mélange ultérieur." },
    it: { title: "Essiccazione del Concentrato", desc: "Infine, la soluzione proteica concentrata viene stesa e asciugata al sole, ottenendo una polvere/concentrato proteico adatto a un'ulteriore miscelazione." }
  }
];

const LegumeSteps = [
  {
    icon: <Beaker className="text-indigo-600" />,
    en: { title: "Initial Preparation", desc: "Dry lentils are cleaned and blended with water to break the cell walls of the lentil tissues, allowing proteins to move into the water." },
    ar: { title: "التحضير الأولي", desc: "يتم تنظيف العدس الجاف وخلطه بالماء لتكسير جدران الخلايا في أنسجة العدس، مما يسمح للبروتينات بالانتقال إلى الماء." },
    fr: { title: "Préparation Initiale", desc: "Les lentilles sèches sont nettoyées et mélangées avec de l'eau pour briser les parois cellulaires des tissus de lentilles, permettant aux protéines de passer dans l'eau." },
    it: { title: "Preparazione Iniziale", desc: "Le lenticchie secche vengono pulite e mescolate con acqua per rompere le pareti cellulari dei tessuti delle lenticchie, permettendo alle proteine di passare nell'acqua." }
  },
  {
    icon: <Filter className="text-stone-400" />,
    en: { title: "Filtration of the Extract", desc: "The blended mixture is poured through a cloth to remove solid particles and starch, producing a clearer liquid containing dissolved proteins." },
    ar: { title: "ترشيح المستخلص", desc: "يتم صب الخليط المخلوط من خلال قطعة قماش لإزالة الجزيئات الصلبة والنشا، مما ينتج عنه سائل أكثر صفاءً يحتوي على البروتينات الذائبة." },
    fr: { title: "Filtration de l'Extrait", desc: "Le mélange mixé est versé à travers un tissu pour éliminer les particules solides et l'amidon, produisant un liquide plus clair contenant des protéines dissoutes." },
    it: { title: "Filtrazione dell'Estratto", desc: "La miscela frullata viene versata attraverso un panno per rimuovere le particelle solide e l'amido, producendo un liquido più limpido contenente proteine disciolte." }
  },
  {
    icon: <Droplets className="text-lime-600" />,
    en: { title: "Acid-Induced Precipitation", desc: "Lemon juice is added to the filtrate. Lowering the pH encourages the proteins to lose their solubility and begin forming visible precipitates." },
    ar: { title: "الترسيب المحفز بالحمض", desc: "يتم إضافة عصير الليمون إلى الرشاحة. يؤدي خفض درجة الحموضة (pH) إلى تشجيع البروتينات على فقدان قابليتها للذوبان والبدء في تكوين رواسب مرئية." },
    fr: { title: "Précipitation Induite par l'Acide", desc: "Du jus de citron est ajouté au filtrat. L'abaissement du pH encourage les protéines à perdre leur solubilité et à commencer à former des précipités visibles." },
    it: { title: "Precipitazione Indotta da Acido", desc: "Il succo di limone viene aggiunto al filtrato. L'abbassamento del pH incoraggia le proteine a perdere la loro solubilità e a iniziare a formare precipitati visibili." }
  },
  {
    icon: <Flame className="text-red-500" />,
    en: { title: "Heat Coagulation", desc: "The acidified mixture is heated. Increasing the temperature accelerates protein denaturation and coagulation, making protein clumps larger." },
    ar: { title: "التخثر الحراري", desc: "يتم تسخين الخليط المحمض. يؤدي رفع درجة الحرارة إلى تسريع تخثر البروتين، مما يجعل كتل البروتين أكبر وأسهل في الانفصال." },
    fr: { title: "Coagulation Thermique", desc: "Le mélange acidifié est chauffé. L'augmentation de la température accélère la dénaturation et la coagulation des protéines, ce qui rend les amas de protéines plus gros." },
    it: { title: "Coagulazione Termica", desc: "La miscela acidificata viene riscaldata. L'aumento della temperatura accelera la denaturazione e la coagulazione delle proteine, rendendo i grumi proteici più grandi." }
  },
  {
    icon: <CheckCircle2 className="text-emerald-500" />,
    en: { title: "Final Separation", desc: "After heating, the mixture is filtered again to collect the coagulated proteins, representing the final lentil protein concentrate." },
    ar: { title: "الفصل النهائي", desc: "بعد التسخين، يتم تصفية الخليط مرة أخرى لجمع البروتينات المتخثرة، والتي تمثل مركز بروتين العدس النهائي." },
    fr: { title: "Séparation Finale", desc: "Après chauffage, le mélange est à nouveau filtré pour collecter les protéines coagulées, représentant le concentré final de protéines de lentilles." },
    it: { title: "Separazione Finale", desc: "Dopo il riscaldamento, la miscela viene filtrata nuovamente per raccogliere le proteine coagulate, che rappresentano il concentrato proteico finale di lenticchie." }
  }
];

export const Methodology = ({ language, t }: MethodologyProps) => {
  return (
    <div className="space-y-16 pb-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-display font-bold text-stone-900">{t.methodology.title}</h2>
        <p className="text-emerald-700 font-bold uppercase tracking-widest text-[10px]">{language === 'ar' ? 'منهجية البحث العلمي' : language === 'it' ? 'Metodologia della ricerca scientifica' : language === 'fr' ? 'Méthodologie de recherche scientifique' : 'Scientific Research Methodology'}</p>
        <div className="max-w-2xl mx-auto text-sm text-stone-500 leading-relaxed">
          {t.methodology.subtitle}
        </div>
      </div>

      {/* Leaf Extraction Track */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-stone-100 pb-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
            <Leaf size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900">{t.methodology.trackA}</h3>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{language === 'ar' ? 'المسار أ: استخلاص بروتين الأوراق' : language === 'it' ? 'Binario A: Estrazione proteine fogliari' : language === 'fr' ? 'Voie A : Extraction de protéines de feuilles' : 'Track A: Leaf Protein Extraction'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LeafSteps.map((step, index) => {
            const content = step[language] || step.en;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-[2rem] border border-stone-200/60 shadow-sm hover:shadow-md transition-all group relative"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center text-xs font-bold z-10">
                  {index + 1}
                </div>
                <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h4 className="font-bold text-stone-900 mb-1 text-sm">{content.title}</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed">{content.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Legume Extraction Track */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-stone-100 pb-4">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shadow-sm">
            <Scale size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900">{t.methodology.trackB}</h3>
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{language === 'ar' ? 'المسار ب: مركز بروتين البقوليات' : language === 'it' ? 'Binario B: Concentrato proteico di legumi' : language === 'fr' ? 'Voie B : Concentré de protéines de légumineuses' : 'Track B: Legume Protein Concentrate'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LegumeSteps.map((step, index) => {
            const content = step[language] || step.en;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-[2rem] border border-stone-200/60 shadow-sm hover:shadow-md transition-all group relative"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-amber-900 text-white rounded-full flex items-center justify-center text-xs font-bold z-10">
                  {index + 1}
                </div>
                <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h4 className="font-bold text-stone-900 mb-1 text-sm">{content.title}</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed">{content.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Scientific Standards */}
      <section className="bg-stone-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-stone-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30">
              <CheckCircle2 size={12} /> {t.methodology.qa}
            </div>
            <h3 className="text-3xl font-display font-bold">{t.methodology.standardsTitle}</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              {t.methodology.standardsDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ArrowRight size={14} /> {t.methodology.thermalLimit}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ArrowRight size={14} /> {t.methodology.phPoint}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ArrowRight size={14} /> {t.methodology.filtration}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-display font-bold text-emerald-400 mb-1">100%</div>
              <div className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">{t.methodology.natural}</div>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-display font-bold text-emerald-400 mb-1">Zero</div>
              <div className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">{t.methodology.noChemicals}</div>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-display font-bold text-emerald-400 mb-1">45 Days</div>
              <div className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">{t.methodology.wasteRecovery}</div>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-display font-bold text-emerald-400 mb-1">FAO</div>
              <div className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">{t.methodology.compliant}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
