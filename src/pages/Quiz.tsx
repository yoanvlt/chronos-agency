import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { destinations } from "@/data/destinations";

interface Question {
  question: string;
  options: { label: string; value: string }[];
}

const questions: Question[] = [
  {
    question: "Quel niveau de danger acceptez-vous ?",
    options: [
      { label: "🧘 Tranquille — Aucun risque", value: "low" },
      { label: "⚡ Modéré — Un peu de piquant", value: "medium" },
      { label: "🔥 Extrême — Je veux frissonner", value: "high" },
    ],
  },
  {
    question: "Quel est votre intérêt principal ?",
    options: [
      { label: "🎨 Art et culture", value: "art" },
      { label: "🏛️ Histoire et politique", value: "history" },
      { label: "🦖 Aventure et nature", value: "adventure" },
    ],
  },
  {
    question: "Durée souhaitée du voyage ?",
    options: [
      { label: "⚡ 1 jour — Aperçu express", value: "1day" },
      { label: "📅 3 jours — Exploration", value: "3days" },
      { label: "🗓️ 1 semaine — Immersion totale", value: "1week" },
    ],
  },
  {
    question: "Quel budget êtes-vous prêt à investir ?",
    options: [
      { label: "💰 Jusqu'à 3 000 €", value: "budget" },
      { label: "💎 3 000 – 6 000 €", value: "mid" },
      { label: "👑 Plus de 6 000 €", value: "premium" },
    ],
  },
  {
    question: "Quel cadre vous attire le plus ?",
    options: [
      { label: "🏙️ Grande ville animée", value: "city" },
      { label: "🌿 Nature sauvage", value: "nature" },
      { label: "🏰 Cour et palais", value: "court" },
    ],
  },
];

function computeResult(answers: string[]): string {
  const scores: Record<string, number> = { "paris-1889": 0, "cretace": 0, "florence-1504": 0 };

  // Danger
  if (answers[0] === "low") { scores["paris-1889"] += 2; scores["florence-1504"] += 2; }
  if (answers[0] === "medium") { scores["florence-1504"] += 2; scores["paris-1889"] += 1; }
  if (answers[0] === "high") { scores["cretace"] += 3; }

  // Interest
  if (answers[1] === "art") { scores["florence-1504"] += 3; scores["paris-1889"] += 1; }
  if (answers[1] === "history") { scores["paris-1889"] += 2; scores["florence-1504"] += 2; }
  if (answers[1] === "adventure") { scores["cretace"] += 3; }

  // Duration
  if (answers[2] === "1week") { scores["paris-1889"] += 1; scores["florence-1504"] += 1; }
  if (answers[2] === "1day") { scores["cretace"] += 1; }

  // Budget
  if (answers[3] === "budget") { scores["paris-1889"] += 2; }
  if (answers[3] === "mid") { scores["florence-1504"] += 2; }
  if (answers[3] === "premium") { scores["cretace"] += 2; }

  // Setting
  if (answers[4] === "city") { scores["paris-1889"] += 2; }
  if (answers[4] === "nature") { scores["cretace"] += 2; }
  if (answers[4] === "court") { scores["florence-1504"] += 2; }

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

const itineraries: Record<string, string[]> = {
  "paris-1889": [
    "Arrivée à Paris et visite de l'Exposition universelle",
    "Montée privée de la Tour Eiffel avec Gustave Eiffel, suivi d'un dîner Belle Époque",
    "Balade à Montmartre, atelier impressionniste et soirée cabaret",
  ],
  "cretace": [
    "Briefing sécurité et installation dans la base blindée du Crétacé",
    "Safari dinosaures en véhicule blindé et observation de Tricératops",
    "Survol en drone des plaines, collecte de spécimens botaniques et retour",
  ],
  "florence-1504": [
    "Arrivée à Florence, habillage Renaissance et promenade guidée",
    "Atelier de sculpture, visite de l'atelier de Léonard de Vinci",
    "Dîner à la cour des Médicis et observation du dévoilement du David",
  ],
};

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult(computeResult(newAnswers));
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnswers(prev => prev.slice(0, -1));
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  const dest = result ? destinations.find(d => d.slug === result) : null;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-16">
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 text-center">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Question {step + 1} / {questions.length}
                </p>
                <Progress value={((step + 1) / questions.length) * 100} className="mx-auto mb-6 h-1.5 max-w-xs" />
                <h2 className="text-2xl font-bold sm:text-3xl">{questions[step].question}</h2>
              </div>

              <div className="space-y-3">
                {questions[step].options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="group w-full rounded-xl border border-border/50 bg-card p-5 text-left text-base font-medium transition-all hover:border-primary/50 hover:bg-primary/5 hover:glow-primary"
                  >
                    <span className="transition-colors group-hover:text-primary">{opt.label}</span>
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button onClick={goBack} className="mt-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" /> Question précédente
                </button>
              )}
            </motion.div>
          ) : dest ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h2 className="text-glow mb-2 text-3xl font-black sm:text-4xl">Votre destination idéale</h2>
              <p className="mb-8 text-muted-foreground">Basé sur vos préférences, nous vous recommandons :</p>

              <div className="mx-auto mb-8 max-w-md rounded-2xl border border-primary/30 bg-card p-6 glow-primary">
                <div className="mb-1 flex items-center justify-center gap-1.5 text-xs text-accent">
                  <MapPin className="h-3 w-3" /> {dest.location} · {dest.period}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-primary">{dest.name}</h3>
                <p className="text-sm text-muted-foreground">{dest.shortPitch}</p>
              </div>

              {/* Mini itinerary */}
              <div className="mx-auto mb-8 max-w-md text-left">
                <h4 className="mb-4 text-center text-sm font-bold uppercase tracking-wider">Mini-itinéraire suggéré</h4>
                <div className="space-y-3">
                  {itineraries[dest.slug]?.map((step, i) => (
                    <div key={i} className="flex gap-3 rounded-lg border border-border/50 bg-card p-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="glow-primary gap-2">
                  <Link to={`/destinations/${dest.slug}`}>
                    Voir la destination <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link to="/chat">
                    <MessageCircle className="h-4 w-4" /> Parler à un agent
                  </Link>
                </Button>
              </div>

              <button onClick={restart} className="mt-6 text-sm text-muted-foreground hover:text-foreground">
                Refaire le quiz
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
