# 🕰️ Chronos Agency — TimeTravel Agency

> **Agence de voyages temporels** — Explorez les époques les plus fascinantes de l'humanité.

🔗 **Démo en ligne** : [chronos-agency.vercel.app](https://chronos-agency.vercel.app)

---

## ✨ Fonctionnalités

- **Landing page immersive** — Animations particules, gradient animé, présentation premium
- **3 destinations temporelles** — Paris 1889, Crétacé (−68M d'années), Florence 1504
- **Pages détail** — Activités, avertissements, tarifs, durées par destination
- **Quiz de recommandation** — 5 questions pour trouver sa destination idéale + itinéraire suggéré
- **Chat IA** — Agent temporel conversationnel (Groq / Llama 3.3 70B) avec contexte destination et quiz
- **Design responsive** — Mobile-first, dark mode, micro-animations

---

## 🛠️ Stack technique

| Catégorie | Technologie |
|-----------|------------|
| Framework | [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript |
| UI | [shadcn/ui](https://ui.shadcn.com/) + Tailwind CSS |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Routing | React Router v6 |
| IA | [Groq](https://groq.com/) (Llama 3.3 70B) via API REST |
| Hébergement | [Vercel](https://vercel.com/) (frontend + serverless function) |

---

## 🚀 Installation locale

```sh
# Cloner le repository
git clone https://github.com/yoanvlt/chronos-agency.git
cd chronos-agency

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env et renseigner votre clé Groq (voir section ci-dessous)

# Lancer le serveur de développement
npm run dev
```

### Build & preview

```sh
npm run build      # Build de production
npm run preview    # Prévisualisation du build
```

---

## 🔑 Variables d'environnement

| Variable | Obligatoire | Description |
|----------|:-----------:|-------------|
| `GROQ_API_KEY` | ✅ | Clé API Groq — obtenir gratuitement sur [console.groq.com](https://console.groq.com) |

### Configuration

1. Copier `.env.example` → `.env`
2. Remplir `GROQ_API_KEY` avec votre clé (commence par `gsk_...`)
3. Le fichier `.env` est ignoré par Git (jamais commité)

> [!CAUTION]
> **Sécurité** : Ne commitez **jamais** votre clé API. Le fichier `.env` est dans le `.gitignore`.
> La clé est utilisée uniquement côté serveur (serverless function Vercel) et n'est jamais exposée au client.

---

## ☁️ Déploiement Vercel

1. Connecter le repository GitHub sur [vercel.com](https://vercel.com)
2. Aller dans **Settings → Environment Variables**
3. Ajouter `GROQ_API_KEY` avec votre clé
4. **Pousser du code** (commit + push) pour déclencher un nouveau déploiement qui prendra en compte la variable

---

## 🤖 IA — Comment ça marche

### Architecture

```
Client (Chat.tsx) → POST /api/chat → Vercel Serverless Function → Groq API → Réponse
```

### Route `/api/chat`

- **Fichier** : `api/chat.js` (serverless function Vercel)
- **Modèle** : `llama-3.3-70b-versatile` via Groq (gratuit)
- **Entrée** : `{ message, destinationSlug?, quizResult? }`
- **Sortie** : `{ reply }` (texte en français)

### Prompt système & garde-fous

L'agent IA suit un prompt système strict :
- Ne parle **que** des 3 destinations du catalogue
- N'invente **jamais** de 4e destination
- Vouvoie toujours le client
- Rappelle les règles de sécurité pour les destinations risquées (Crétacé)
- Répond en français, 2-4 paragraphes max
- Admet honnêtement quand il n'a pas l'information

Le contexte est enrichi automatiquement :
- **Destination consultée** : la dernière page détail visitée est transmise
- **Résultat du quiz** : si un quiz a été complété, le résultat est transmis

---

## 📝 Crédits & licences

| Élément | Source | Licence |
|---------|--------|---------|
| UI Components | [shadcn/ui](https://ui.shadcn.com/) | MIT |
| Animations | [Framer Motion](https://www.framer.com/motion/) | MIT |
| IA | [Groq](https://groq.com/) + Meta Llama 3.3 70B | Groq ToS / Llama Community License |
| Outils de dev | [Lovable](https://lovable.dev/), Claude (Anthropic) | — |
| Images destinations | [Unsplash](https://unsplash.com/) | [Unsplash License](https://unsplash.com/license) (libre d'utilisation) |
| Icônes | [Lucide](https://lucide.dev/) | ISC |
