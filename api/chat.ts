// Vercel Serverless Function — TimeTravel Agency Chat (OpenAI)
// Uses only built-in Node.js fetch, no external imports needed.

const DESTINATIONS_CONTEXT = `
Destinations disponibles:

1. **Paris 1889** (slug: paris-1889)
   - Période: 14 juillet 1889, Lieu: Paris, France
   - Pitch: Vivez l'Exposition universelle et l'inauguration de la Tour Eiffel en pleine Belle Époque.
   - Activités: Visite de l'Exposition universelle, Tour Eiffel avec Gustave Eiffel, Dîner Belle Époque, Fiacre Champs-Élysées, Cabaret Moulin Rouge, Peinture à Montmartre.
   - Avertissements: Vaccinations recommandées, ne pas mentionner le futur, vêtements d'époque obligatoires, pas de photos visibles.
   - Prix: à partir de 2 450 € | Durées: 1 jour, 3 jours, 1 semaine

2. **Crétacé** (slug: cretace)
   - Période: −68 millions d'années, Lieu: futur Montana, Amérique du Nord
   - Pitch: Expédition encadrée au milieu des dinosaures. Sensations fortes garanties.
   - Activités: Safari en véhicule blindé, observation Vélociraptor, survie préhistorique, collecte botanique, photo Tricératops, survol drone.
   - Avertissements: Danger Niveau 5/5 — assurance décès obligatoire, bracelet de rappel obligatoire, ne pas quitter le périmètre, aucun objet moderne abandonné, risque allergique élevé.
   - Prix: à partir de 8 900 € | Durées: 1 jour, 3 jours

3. **Florence 1504** (slug: florence-1504)
   - Période: Printemps 1504, Lieu: Florence, Italie
   - Pitch: Renaissance italienne : art, génie et intrigues politiques.
   - Activités: Sculpture avec élève de Michel-Ange, atelier Léonard de Vinci, dîner cour des Médicis, fresque bottega, promenade Renaissance, dévoilement du David.
   - Avertissements: Intrigues politiques, risque empoisonnement banquets, vêtements Renaissance obligatoires, ne pas révéler science moderne.
   - Prix: à partir de 3 200 € | Durées: 1 jour, 3 jours, 1 semaine
`;

const SYSTEM_PROMPT = `Tu es un agent de voyage temporel de la "TimeTravel Agency" (Chronos Agency).

Ton rôle: conseiller les clients sur les voyages dans le temps proposés par l'agence.

Ton ton: professionnel, chaleureux, passionné d'histoire, clair et concis. Tu vouvoies toujours le client.

Règles strictes:
- Tu ne parles QUE des 3 destinations ci-dessous. Tu n'inventes JAMAIS de 4e destination.
- Les prix sont fictifs mais plausibles et cohérents avec les données ci-dessous.
- Si la destination est risquée (surtout le Crétacé), rappelle toujours au moins 1 règle de sécurité pertinente.
- Si tu n'as pas l'information exacte, dis-le honnêtement et propose une alternative ou une question de clarification.
- Ne promets jamais de faits impossibles. Reste dans l'univers de l'agence.
- Réponds en français.
- Sois concis: 2-4 paragraphes maximum.

${DESTINATIONS_CONTEXT}`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only accept POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée. Utilisez POST." });
  }

  const { message, destinationSlug, quizResult } = req.body || {};

  // Validate input
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Le champ 'message' est requis." });
  }

  // Check API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("OPENAI_API_KEY is not configured");
    return res.status(500).json({ error: "Service non configuré." });
  }

  // Build user message with optional context
  let userContent = message.trim();
  if (destinationSlug) {
    userContent += `\n\n[Contexte: destination "${destinationSlug}"]`;
  }
  if (quizResult) {
    userContent += `\n\n[Quiz: ${JSON.stringify(quizResult)}]`;
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 450,
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      console.error("OpenAI error:", openaiRes.status, errText);
      return res.status(500).json({ error: "Erreur de l'assistant IA." });
    }

    const data = await openaiRes.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "Désolé, je n'ai pas pu générer de réponse.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ error: "Erreur de communication." });
  }
}
