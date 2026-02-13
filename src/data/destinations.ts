export interface Destination {
  slug: string;
  name: string;
  period: string;
  location: string;
  shortPitch: string;
  longDescription: string;
  activities: string[];
  warnings: string[];
  price: string;
  durationOptions: string[];
  image: string;
  tags: string[];
}

export const destinations: Destination[] = [
  {
    slug: "paris-1889",
    name: "Paris 1889",
    period: "14 juillet 1889",
    location: "Paris, France",
    shortPitch: "Vivez l'Exposition universelle et l'inauguration de la Tour Eiffel en pleine Belle Époque.",
    longDescription: "Plongez au cœur du Paris de 1889, une ville en pleine effervescence culturelle et technologique. L'Exposition universelle bat son plein, la Tour Eiffel vient d'être inaugurée, et les boulevards haussmanniens vibrent au rythme des fiacres et des cafés littéraires. Rencontrez Gustave Eiffel, goûtez la cuisine de l'époque, et assistez aux spectacles du Moulin Rouge naissant. Une immersion inoubliable dans la Ville Lumière à son apogée.",
    activities: [
      "Visite guidée de l'Exposition universelle",
      "Montée privée de la Tour Eiffel avec Gustave Eiffel",
      "Dîner gastronomique dans un restaurant Belle Époque",
      "Balade en fiacre sur les Champs-Élysées",
      "Soirée cabaret au Moulin Rouge originel",
      "Atelier de peinture impressionniste à Montmartre"
    ],
    warnings: [
      "Risque sanitaire modéré — vaccinations recommandées",
      "Ne pas mentionner les événements futurs (guerres mondiales, etc.)",
      "Vêtements d'époque obligatoires fournis à l'arrivée",
      "Pas de photographie visible — appareil dissimulé fourni"
    ],
    price: "2 450 €",
    durationOptions: ["1 jour", "3 jours", "1 semaine"],
    image: "/placeholder.svg",
    tags: ["Culture", "Gastronomie", "Art", "Histoire"]
  },
  {
    slug: "cretace",
    name: "Crétacé",
    period: "−68 millions d'années",
    location: "Amérique du Nord (futur Montana)",
    shortPitch: "Expédition encadrée au milieu des dinosaures. Sensations fortes garanties.",
    longDescription: "Embarquez pour l'aventure la plus extrême jamais proposée : une expédition au Crétacé supérieur, 68 millions d'années avant notre ère. Observez des T-Rex, Triceratops et Ptéranodons dans leur habitat naturel depuis notre base sécurisée. Chaque sortie est encadrée par des paléontologues armés et des guides temporels expérimentés. Attention : cette destination est classée Niveau 5 — Danger Extrême. Réservée aux voyageurs audacieux.",
    activities: [
      "Safari dinosaures en véhicule blindé",
      "Observation d'un nid de Vélociraptor (à distance sécurisée)",
      "Cours de survie en milieu préhistorique",
      "Collecte d'échantillons botaniques du Crétacé",
      "Session photo avec Tricératops (encadrée)",
      "Survol en drone des plaines du Crétacé"
    ],
    warnings: [
      "Danger extrême — Niveau 5/5. Assurance décès obligatoire",
      "Port du bracelet de rappel d'urgence obligatoire en permanence",
      "Interdiction formelle de quitter le périmètre sécurisé sans guide",
      "Aucun objet moderne ne doit être abandonné sur place",
      "Risque allergique élevé — flore inconnue"
    ],
    price: "8 900 €",
    durationOptions: ["1 jour", "3 jours"],
    image: "/placeholder.svg",
    tags: ["Aventure", "Danger", "Nature", "Science"]
  },
  {
    slug: "florence-1504",
    name: "Florence 1504",
    period: "Printemps 1504",
    location: "Florence, Italie",
    shortPitch: "Plongez dans la Renaissance italienne : art, génie et intrigues politiques.",
    longDescription: "Bienvenue dans la Florence de 1504, berceau de la Renaissance. Michel-Ange achève son David, Léonard de Vinci perfectionne ses inventions, et Machiavel tisse ses intrigues à la cour des Médicis. Participez à des ateliers d'art dans les botteghe florentines, assistez au dévoilement du David, et naviguez les eaux troubles de la politique italienne. Une destination pour les amoureux d'art, de culture et de mystère.",
    activities: [
      "Atelier de sculpture avec un élève de Michel-Ange",
      "Visite de l'atelier de Léonard de Vinci",
      "Dîner à la cour des Médicis",
      "Cours de fresque dans une bottega florentine",
      "Promenade guidée dans le Florence de la Renaissance",
      "Observation du dévoilement du David"
    ],
    warnings: [
      "Intrigues politiques fréquentes — éviter de prendre parti",
      "Risque d'empoisonnement lors des banquets — suivre les consignes du guide",
      "Vêtements Renaissance obligatoires fournis",
      "Ne pas révéler les connaissances scientifiques modernes"
    ],
    price: "3 200 €",
    durationOptions: ["1 jour", "3 jours", "1 semaine"],
    image: "/placeholder.svg",
    tags: ["Art", "Culture", "Histoire", "Intrigue"]
  }
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(d => d.slug === slug);
}
