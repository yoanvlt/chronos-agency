import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Quel budget prévoir ?",
  "Quels sont les risques ?",
  "Meilleure saison pour voyager ?",
  "Que dois-je emporter ?",
  "Parlez-moi de Paris 1889",
];

/**
 * Simulated AI response generator.
 * TODO: Replace with a real API call to OpenAI/Anthropic.
 * Expected API: POST /api/chat { message: string, context?: string }
 * Response: { reply: string }
 */
function getSimulatedResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("budget") || lower.includes("prix") || lower.includes("coût")) {
    return "Excellente question ! Nos tarifs varient selon la destination et la durée. Paris 1889 commence à 2 450 €, Florence 1504 à 3 200 €, et l'expédition au Crétacé à 8 900 € (incluant l'assurance danger extrême). Tous nos forfaits comprennent le transport temporel, les vêtements d'époque et un guide certifié. Souhaitez-vous un devis personnalisé ?";
  }
  if (lower.includes("risque") || lower.includes("danger") || lower.includes("sécurité")) {
    return "La sécurité est notre priorité absolue. Chaque voyageur est équipé d'un bracelet de rappel d'urgence permettant un retour instantané. Le Crétacé est classé Niveau 5 (danger extrême) et nécessite une assurance spécifique. Paris 1889 et Florence 1504 sont beaucoup plus sûrs, classés Niveau 2. Nos guides temporels sont formés pour toute éventualité.";
  }
  if (lower.includes("saison") || lower.includes("quand") || lower.includes("moment")) {
    return "Le timing est fixé par la destination : Paris le 14 juillet 1889 pour l'Exposition universelle, Florence au printemps 1504 pour le dévoilement du David, et le Crétacé à une période climatique stable. Nous optimisons chaque arrivée pour vous offrir les meilleurs événements de l'époque !";
  }
  if (lower.includes("emporter") || lower.includes("bagage") || lower.includes("préparer")) {
    return "Vous n'avez presque rien à emporter ! Nous fournissons les vêtements d'époque, la monnaie locale, et tout l'équipement nécessaire. Apportez simplement vos médicaments personnels et votre sens de l'aventure. Un briefing complet vous sera donné 48h avant le départ.";
  }
  if (lower.includes("paris")) {
    return "Paris 1889 est notre destination la plus populaire ! Vous vivrez l'Exposition universelle, monterez dans la Tour Eiffel fraîchement inaugurée avec Gustave Eiffel lui-même, et profiterez de la Belle Époque dans toute sa splendeur. Les cafés, les spectacles, l'art impressionniste... c'est tout simplement magique. Durées disponibles : 1 jour, 3 jours ou 1 semaine.";
  }
  if (lower.includes("florence") || lower.includes("renaissance")) {
    return "Florence 1504 est un rêve pour les amoureux d'art ! Vous pourrez assister au dévoilement du David de Michel-Ange, visiter l'atelier de Léonard de Vinci, et dîner à la cour des Médicis. Attention aux intrigues politiques cependant — nos guides vous conseilleront sur les interactions à éviter.";
  }
  if (lower.includes("crétacé") || lower.includes("dinosaure")) {
    return "Le Crétacé est notre destination la plus extrême ! Safari en véhicule blindé parmi les T-Rex, observation de nids de Vélociraptors... c'est l'aventure ultime. Classée Niveau 5, elle requiert une assurance spéciale et un excellent état de santé. Le frisson est garanti !";
  }

  return "Merci pour votre question ! Je suis votre agent temporel dédié. Je peux vous renseigner sur nos trois destinations (Paris 1889, le Crétacé, Florence 1504), les tarifs, la sécurité, ou vous aider à choisir le voyage qui vous correspond. Que souhaitez-vous savoir ?";
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "Bonjour ! Je suis votre agent temporel. 🕰️ Comment puis-je vous aider à planifier votre prochain voyage dans le temps ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const reply = getSimulatedResponse(text);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "assistant", content: reply }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  return (
    <div className="flex min-h-screen flex-col pt-16">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>Agent Temporel</h1>
            <p className="text-xs text-muted-foreground">En ligne · Prêt à vous guider</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  msg.role === "assistant" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                }`}>
                  {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "assistant"
                    ? "rounded-tl-sm bg-card border border-border/50"
                    : "rounded-tr-sm bg-primary text-primary-foreground"
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-tl-sm border border-border/50 bg-card px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="h-2 w-2 rounded-full bg-muted-foreground"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="border-t border-border/50 bg-card/30 px-4 py-3">
          <div className="mx-auto flex max-w-3xl flex-wrap gap-2">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border/50 bg-card/50 px-4 py-4">
        <form
          onSubmit={e => { e.preventDefault(); sendMessage(input); }}
          className="mx-auto flex max-w-3xl gap-2"
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button type="submit" size="icon" className="h-12 w-12 rounded-xl" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
