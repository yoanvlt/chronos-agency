import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, AlertTriangle, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDestinationBySlug } from "@/data/destinations";
import { useState } from "react";

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const destination = getDestinationBySlug(slug || "");
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  if (!destination) return <Navigate to="/destinations" replace />;

  return (
    <div className="min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="relative">
        <div className="gradient-mesh h-64 sm:h-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4">
          <div className="mx-auto max-w-4xl pb-8">
            <Link to="/destinations" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Retour
            </Link>
            <div className="flex items-center gap-2 text-sm text-accent mb-2">
              <MapPin className="h-3.5 w-3.5" /> {destination.location} · {destination.period}
            </div>
            <h1 className="text-glow text-4xl font-black tracking-tight sm:text-5xl">{destination.name}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {destination.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-12 px-4 pt-8">
        {/* À propos */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="mb-4 text-2xl font-bold">À propos</h2>
          <p className="leading-relaxed text-muted-foreground">{destination.longDescription}</p>
        </motion.section>

        {/* Activités */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="mb-4 text-2xl font-bold">Activités</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {destination.activities.map((act, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm">{act}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Conseils & sécurité */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="mb-4 text-2xl font-bold">Conseils & sécurité</h2>
          <div className="space-y-3">
            {destination.warnings.map((w, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <span className="text-sm">{w}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Prix & durée */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="mb-4 text-2xl font-bold">Prix & durée</h2>
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <p className="mb-1 text-sm text-muted-foreground">À partir de</p>
            <p className="mb-6 text-4xl font-black text-primary">{destination.price}</p>
            <p className="mb-3 text-sm font-medium">Durée du séjour :</p>
            <div className="flex flex-wrap gap-2">
              {destination.durationOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setSelectedDuration(opt)}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                    selectedDuration === opt
                      ? "border-primary bg-primary text-primary-foreground glow-primary"
                      : "border-border bg-secondary text-secondary-foreground hover:border-primary/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <div className="flex justify-center pt-4">
          <Button asChild size="lg" className="glow-primary gap-2 px-8">
            <Link to="/chat">
              <MessageCircle className="h-5 w-5" /> Parler à un agent
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
