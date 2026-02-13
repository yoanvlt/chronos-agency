import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Shield, Zap, Scale, Eye, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/destinations";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-mesh relative flex min-h-screen items-center justify-center overflow-hidden px-4">
        {/* Animated particles */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Agence de voyages temporels
            </p>
            <h1 className="text-glow mb-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Voyagez dans le temps.
              <br />
              <span className="text-primary">Vivez l'histoire.</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Explorez les époques les plus fascinantes de l'humanité. Trois destinations extraordinaires vous attendent.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button asChild size="lg" className="glow-primary gap-2 px-8 text-base">
              <Link to="/destinations">
                Choisir une destination <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 px-8 text-base">
              <Link to="/quiz">
                <Sparkles className="h-4 w-4" /> Passer le quiz
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pourquoi nous ? */}
      <section className="border-t border-border/50 bg-card/30 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Pourquoi <span className="text-primary">Chronos Agency</span> ?
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icon: Clock, title: "Précision temporelle", desc: "Arrivée à la seconde près dans l'époque choisie grâce à notre technologie de calibration quantique." },
              { icon: Shield, title: "Sécurité maximale", desc: "Guides certifiés, protocoles de retour d'urgence et bracelet de rappel inclus dans chaque voyage." },
              { icon: Sparkles, title: "Immersion totale", desc: "Vêtements d'époque, cours de langue, monnaie locale — chaque détail est préparé pour vous." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-xl border border-border/50 bg-card p-6 text-center"
              >
                <f.icon className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination teasers */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Nos <span className="text-primary">destinations</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/destinations/${dest.slug}`}
                  className="group block overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-primary/50 hover:glow-primary"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="mb-1 text-xs font-medium uppercase tracking-widest text-accent">{dest.period}</p>
                    <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">{dest.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{dest.shortPitch}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {dest.tags.map(tag => (
                        <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sécurité & éthique du voyage temporel */}
      <section className="border-t border-border/50 bg-card/30 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Sécurité & <span className="text-primary">éthique</span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-muted-foreground">
              Le voyage temporel est une responsabilité. Voici nos engagements.
            </p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Lock, title: "Non-interférence", desc: "Aucune action susceptible de modifier le cours de l'histoire n'est autorisée. Politique de zéro impact." },
              { icon: Eye, title: "Observation éthique", desc: "Nos voyageurs n'interagissent qu'avec des acteurs informés ou dans un cadre strictement encadré." },
              { icon: Scale, title: "Responsabilité temporelle", desc: "Chaque mission est auditée. Tout objet amené est inventorié et ramené. Rien n'est laissé derrière." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-xl border border-primary/20 bg-card p-6 text-center"
              >
                <item.icon className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
