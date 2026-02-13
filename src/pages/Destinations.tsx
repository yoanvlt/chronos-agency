import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { destinations } from "@/data/destinations";

const Destinations = () => {
  return (
    <div className="min-h-screen px-4 pb-20 pt-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-glow mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Destinations
          </h1>
          <p className="text-lg text-muted-foreground">
            Choisissez votre époque. Chaque voyage est unique.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <Link
                to={`/destinations/${dest.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/50 hover:glow-primary"
              >
                <div className="relative aspect-[4/3] bg-secondary/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {dest.location}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{dest.period}</p>
                  <h2 className="mb-3 text-2xl font-bold transition-colors group-hover:text-primary">{dest.name}</h2>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{dest.shortPitch}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {dest.tags.map(tag => (
                      <span key={tag} className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-border/50 pt-4">
                    <span className="text-lg font-bold text-primary">{dest.price}</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
                      Explorer <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
