// Vercel Serverless Function — TimeTravel Agency Chat (OpenAI)
// Pure JavaScript, no dependencies, no imports.

const DESTINATIONS_CONTEXT = `
Destinations disponibles:

1. **Paris 1889** (slug: paris-1889)
   - Période: 14 juillet 1889, Lieu: Paris, France
   - Pitch: Vivez l'Exposition universelle et l'inauguration de la Tour Eiffel.
   - Activités: Visite Exposition universelle, Tour Eiffel avec Gustave Eiffel, Dîner Belle Époque, Fiacre Champs-Élysées, Cabaret Moulin Rouge, Peinture Montmartre.
   - Avertissements: Vaccinations recommandées, ne pas mentionner le futur, vêtements d'époque obligatoires.
   - Prix: à partir de 2 450 € | Durées: 1 jour, 3 jours, 1 semaine

2. **Crétacé** (slug: cretace)
   - Période: −68 millions d'années, Lieu: futur Montana
   - Pitch: Expédition encadrée au milieu des dinosaures.
   - Activités: Safari véhicule blindé, observation Vélociraptor, survie préhistorique, photo Tricératops, survol drone.
   - Avertissements: Danger Niveau 5/5, assurance décès obligatoire, bracelet rappel obligatoire, ne pas quitter le périmètre.
   - Prix: à partir de 8 900 € | Durées: 1 jour, 3 jours

3. **Florence 1504** (slug: florence-1504)
   - Période: Printemps 1504, Lieu: Florence, Italie
   - Pitch: Renaissance italienne : art, génie et intrigues politiques.
   - Activités: Sculpture avec élève Michel-Ange, atelier Léonard de Vinci, dîner cour Médicis, dévoilement du David.
   - Avertissements: Intrigues politiques, risque empoisonnement banquets, vêtements Renaissance obligatoires.
   - Prix: à partir de 3 200 € | Durées: 1 jour, 3 jours, 1 semaine
`;

const SYSTEM_PROMPT = `Tu es un agent de voyage temporel de la "TimeTravel Agency" (Chronos Agency).

Ton rôle: conseiller les clients sur les voyages dans le temps proposés par l'agence.

Ton ton: professionnel, chaleureux, passionné d'histoire, clair et concis. Tu vouvoies toujours le client.

Règles strictes:
- Tu ne parles QUE des 3 destinations ci-dessous. Tu n'inventes JAMAIS de 4e destination.
- Les prix sont fictifs mais plausibles et cohérents avec les données ci-dessous.
- Si la destination est risquée (surtout le Crétacé), rappelle toujours au moins 1 règle de sécurité pertinente.
- Si tu n'as pas l'info exacte, dis-le honnêtement et propose une alternative.
- Ne promets jamais de faits impossibles. Reste dans l'univers de l'agence.
- Réponds en français. Sois concis: 2-4 paragraphes max.

${DESTINATIONS_CONTEXT}`;

module.exports = async function handler(req, res) {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Utilisez POST." });
    }

    const body = req.body || {};
    const message = body.message;

    if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ error: "Le champ 'message' est requis." });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error("OPENAI_API_KEY missing");
        return res.status(500).json({ error: "Service non configuré." });
    }

    let userContent = message.trim();
    if (body.destinationSlug) {
        userContent += "\n\n[Contexte: destination \"" + body.destinationSlug + "\"]";
    }
    if (body.quizResult) {
        userContent += "\n\n[Quiz: " + JSON.stringify(body.quizResult) + "]";
    }

    try {
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiKey,
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
            return res.status(500).json({ error: "Erreur IA: " + openaiRes.status });
        }

        const data = await openaiRes.json();
        const reply = data.choices && data.choices[0] && data.choices[0].message
            ? data.choices[0].message.content
            : "Désolé, je n'ai pas pu générer de réponse.";

        return res.status(200).json({ reply: reply });
    } catch (err) {
        console.error("Fetch error:", err);
        return res.status(500).json({ error: "Erreur de communication: " + String(err) });
    }
};
