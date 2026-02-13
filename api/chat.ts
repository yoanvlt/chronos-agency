import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

// Compact destination context embedded directly to avoid import issues with Vite's src/ structure
const DESTINATIONS_CONTEXT = `
Destinations disponibles:

1. **Paris 1889** (slug: paris-1889)
   - Période: 14 juillet 1889
   - Lieu: Paris, France
   - Pitch: Vivez l'Exposition universelle et l'inauguration de la Tour Eiffel en pleine Belle Époque.
   - Activités: Visite guidée de l'Exposition universelle, Montée privée de la Tour Eiffel avec Gustave Eiffel, Dîner gastronomique Belle Époque, Balade en fiacre sur les Champs-Élysées, Soirée cabaret au Moulin Rouge originel, Atelier de peinture impressionniste à Montmartre.
   - Avertissements: Risque sanitaire modéré (vaccinations recommandées), Ne pas mentionner les événements futurs, Vêtements d'époque obligatoires, Pas de photographie visible.
   - Prix: à partir de 2 450 €
   - Durées: 1 jour, 3 jours, 1 semaine

2. **Crétacé** (slug: cretace)
   - Période: −68 millions d'années
   - Lieu: Amérique du Nord (futur Montana)
   - Pitch: Expédition encadrée au milieu des dinosaures. Sensations fortes garanties.
   - Activités: Safari dinosaures en véhicule blindé, Observation d'un nid de Vélociraptor, Cours de survie préhistorique, Collecte d'échantillons botaniques, Session photo avec Tricératops, Survol en drone des plaines.
   - Avertissements: Danger extrême Niveau 5/5 — assurance décès obligatoire, Bracelet de rappel d'urgence obligatoire, Interdiction de quitter le périmètre sans guide, Aucun objet moderne abandonné sur place, Risque allergique élevé.
   - Prix: à partir de 8 900 €
   - Durées: 1 jour, 3 jours

3. **Florence 1504** (slug: florence-1504)
   - Période: Printemps 1504
   - Lieu: Florence, Italie
   - Pitch: Plongez dans la Renaissance italienne : art, génie et intrigues politiques.
   - Activités: Atelier de sculpture avec un élève de Michel-Ange, Visite de l'atelier de Léonard de Vinci, Dîner à la cour des Médicis, Cours de fresque dans une bottega, Promenade guidée Florence Renaissance, Observation du dévoilement du David.
   - Avertissements: Intrigues politiques — éviter de prendre parti, Risque d'empoisonnement lors des banquets, Vêtements Renaissance obligatoires, Ne pas révéler les connaissances scientifiques modernes.
   - Prix: à partir de 3 200 €
   - Durées: 1 jour, 3 jours, 1 semaine
`;

const SYSTEM_PROMPT = `Tu es un agent de voyage temporel de la "TimeTravel Agency" (Chronos Agency).

Ton rôle: conseiller les clients sur les voyages dans le temps proposés par l'agence.

Ton ton: professionnel, chaleureux, passionné d'histoire, clair et concis. Tu tutoies jamais le client, tu le vouvoies.

Règles strictes:
- Tu ne parles QUE des 3 destinations ci-dessous. Tu n'inventes JAMAIS de 4e destination.
- Les prix sont fictifs mais plausibles et cohérents avec les données ci-dessous.
- Si la destination est risquée (surtout le Crétacé), rappelle toujours au moins 1 règle de sécurité pertinente.
- Si tu n'as pas l'information exacte, dis-le honnêtement et propose une alternative ou une question de clarification.
- Ne promets jamais de faits impossibles. Reste dans l'univers de l'agence.
- Réponds en français.
- Sois concis: 2-4 paragraphes maximum.

${DESTINATIONS_CONTEXT}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée. Utilisez POST." });
  }

  const { message, destinationSlug, quizResult } = req.body || {};

  // Validate input
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Le champ 'message' est requis et ne peut pas être vide." });
  }

  // Check API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("OPENAI_API_KEY is not configured");
    return res.status(500).json({ error: "Le service de chat n'est pas configuré. Contactez l'administrateur." });
  }

  // Build user message with optional context
  let userContent = message.trim();
  if (destinationSlug) {
    userContent += `\n\n[Contexte: le client consulte actuellement la destination avec le slug "${destinationSlug}"]`;
  }
  if (quizResult) {
    userContent += `\n\n[Résultat du quiz du client: ${JSON.stringify(quizResult)}]`;
  }

  try {
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 450,
      temperature: 0.7,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content ?? "Désolé, je n'ai pas pu générer de réponse. Veuillez réessayer.";

    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error("OpenAI API error:", error?.message || error);
    return res.status(500).json({
      error: "Une erreur est survenue lors de la communication avec l'assistant. Veuillez réessayer dans quelques instants.",
    });
  }
}
