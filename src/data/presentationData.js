// presentationData.js
// Données complètes de la présentation en Français A2
// Présentateurs : Mahmoud Dammak et Louay Kouki | Assistante vocale invisible

export const PRESENTATION_INFO = {
  title: "LA MAISON INTELLIGENTE",
  subtitle: "Une maison qui pense, communique et agit.",
  presenters: [
    { id: "dammak", name: "Mahmoud Dammak", role: "Présentateur 1", color: "#38bdf8" },
    { id: "louay", name: "Louay Kouki", role: "Présentateur 2", color: "#818cf8" }
  ],
  assistant: {
    name: "Assistant Domotique",
    description: "Système vocal invisible de la maison",
    color: "#60a5fa"
  },
  duration: "5 minutes",
  level: "Français A2"
};

export const DEVICES = [
  {
    id: "speaker",
    name: "Enceinte connectée",
    frenchCategory: "Le cerveau vocal",
    room: "Salon principal",
    icon: "Volume2",
    shortDesc: "Elle écoute notre voix et répond. Elle met aussi de la musique.",
    fullDesc: "Elle possède un micro et le Wi-Fi. Elle comprend nos phrases simples et contrôle les autres objets.",
    actionName: "Lancer la musique",
    statusTextActive: "En lecture : Ambiance relaxante",
    statusTextInactive: "En veille (écoute active)",
    badge: "Commande vocale",
    detailStat: "24/7 disponible"
  },
  {
    id: "coffee",
    name: "Machine à café connectée",
    frenchCategory: "Le confort du matin",
    room: "Cuisine moderne",
    icon: "Coffee",
    shortDesc: "Elle prépare un bon café chaud automatiquement le matin.",
    fullDesc: "On peut la programmer ou la lancer avec le téléphone. Le café est prêt sans attendre.",
    actionName: "Préparer un expresso",
    statusTextActive: "Chauffe : Expresso prêt dans 30s",
    statusTextInactive: "Éteinte (prête)",
    badge: "Automatisation",
    detailStat: "85°C optimal"
  },
  {
    id: "blinds",
    name: "Stores électriques connectés",
    frenchCategory: "La gestion de la lumière",
    room: "Grandes baies vitrées",
    icon: "Blinds",
    shortDesc: "Ils montent et descendent tout seuls avec le soleil.",
    fullDesc: "Des petits moteurs font bouger les stores. Ils gardent la chaleur en hiver et la fraîcheur en été.",
    actionName: "Ouvrir les stores",
    statusTextActive: "Ouverts à 100% (lumière naturelle)",
    statusTextInactive: "Fermés à 100% (obscurité)",
    badge: "Isolation thermique",
    detailStat: "Position : 100%"
  },
  {
    id: "lights",
    name: "Lumières connectées",
    frenchCategory: "L'éclairage intelligent",
    room: "Toute la maison",
    icon: "Lightbulb",
    shortDesc: "Des ampoules LED qui s'allument et changent de couleur.",
    fullDesc: "Elles s'allument quand on entre dans la pièce. Elles s'éteignent seules pour économiser l'énergie.",
    actionName: "Allumer les lumières",
    statusTextActive: "Allumées (Blanc chaud, 80% luminosité)",
    statusTextInactive: "Éteintes (Économie active)",
    badge: "Énergie LED",
    detailStat: "Consommation : 12W"
  },
  {
    id: "ac",
    name: "Climatisation connectée",
    frenchCategory: "Le climat idéal",
    room: "Salon & Chambres",
    icon: "ThermometerSnowflake",
    shortDesc: "Elle règle la bonne température dans les pièces.",
    fullDesc: "Un thermostat mesure la chaleur. Il coupe l'air si une fenêtre est ouverte pour ne pas gaspiller.",
    actionName: "Régler à 21°C",
    statusTextActive: "Active : Température idéale 21°C",
    statusTextInactive: "En veille (température ambiante 24°C)",
    badge: "Éco-climat",
    detailStat: "Cible : 21.0°C"
  }
];

export const SCENES = [
  {
    id: 1,
    number: "01",
    name: "Ouverture & Éveil de la Maison",
    shortName: "Ouverture",
    duration: "30 secondes",
    summary: "La maison s'allume doucement. L'assistante accueille Mahmoud Dammak et Louay Kouki.",
    stages: [
      {
        stageIndex: 0,
        title: "La maison endormie",
        speaker: "system",
        audioKey: "scene1_subtle_chime",
        houseState: { lights: false, blinds: "closed", ac: false, coffee: false, speaker: false },
        cue: "Cliquez pour réveiller la maison et démarrer la présentation."
      },
      {
        stageIndex: 1,
        title: "Éveil progressif de la maison",
        speaker: "assistant",
        dialogue: "« Bonjour ! Votre maison est prête. »",
        audioKey: "assistant_bonjour",
        houseState: { lights: true, blinds: "closed", ac: false, coffee: false, speaker: false },
        cue: "L'assistante salue la classe. Les lumières s'allument une par une."
      },
      {
        stageIndex: 2,
        title: "Introduction par Mahmoud Dammak",
        speaker: "dammak",
        dialogue: "« Bonjour à tous ! Avec Louay Kouki, nous vous présentons notre projet : La Maison Intelligente. »",
        houseState: { lights: true, blinds: "closed", ac: false, coffee: false, speaker: false },
        cue: "Mahmoud Dammak prend la parole avec le sourire et regarde la classe."
      },
      {
        stageIndex: 3,
        title: "Accroche par Louay Kouki",
        speaker: "louay",
        dialogue: "« Imaginez une maison qui pense et qui agit toute seule. C'est pratique ou dangereux ? Découvrons-le ensemble ! »",
        houseState: { lights: true, blinds: "half", ac: false, coffee: false, speaker: false },
        cue: "Louay Kouki pose la question captivante pour engager la classe."
      }
    ]
  },
  {
    id: 2,
    number: "02",
    name: "Qu'est-ce qu'une Maison Intelligente ?",
    shortName: "Définition",
    duration: "40 secondes",
    summary: "Définition simple en français A2 : capteurs, réseau, contrôle.",
    stages: [
      {
        stageIndex: 0,
        title: "La grande question",
        speaker: "louay",
        dialogue: "« Tout d'abord, une question simple : qu'est-ce qu'une maison intelligente, exactement ? »",
        cue: "Louay Kouki introduit la définition avec clarté."
      },
      {
        stageIndex: 1,
        title: "La définition centrale",
        speaker: "dammak",
        dialogue: "« Une maison intelligente utilise des objets connectés. Ils facilitent notre vie de tous les jours. »",
        highlightCard: "definition",
        cue: "Mahmoud Dammak donne la définition en insistant sur les mots simples."
      },
      {
        stageIndex: 2,
        title: "Les 3 éléments clés",
        speaker: "louay",
        dialogue: "« Elle a trois éléments : des capteurs pour observer, un réseau pour communiquer, et des appareils pour agir. »",
        highlightCard: "three_pillars",
        cue: "Louay Kouki montre les 3 piliers à l'écran."
      },
      {
        stageIndex: 3,
        title: "Le contrôle facile",
        speaker: "dammak",
        dialogue: "« On contrôle tout facilement : avec son téléphone à distance, ou simplement avec sa voix ! »",
        highlightCard: "control",
        cue: "Mahmoud Dammak montre son smartphone comme accessoire scénique."
      }
    ]
  },
  {
    id: 3,
    number: "03",
    name: "Démonstrations des 5 Appareils",
    shortName: "Démos 3D",
    duration: "60 secondes",
    summary: "Démonstration interactive des cinq appareils, avec la commande groupée au smartphone.",
    stages: [
      {
        stageIndex: 0,
        title: "Présentation des 5 appareils",
        speaker: "dammak",
        dialogue: "« Regardons notre maison en 3D. Voici cinq appareils connectés très utiles. »",
        activeDeviceId: null,
        cue: "Mahmoud Dammak montre la vue générale de la maison avec les appareils."
      },
      {
        stageIndex: 1,
        title: "L'Enceinte Connectée",
        speaker: "louay",
        dialogue: "« Premier appareil : l'enceinte connectée. C'est le cerveau vocal. Elle écoute nos ordres et répond aussitôt. »",
        activeDeviceId: "speaker",
        cue: "Louay Kouki présente l'enceinte. Elle s'illumine et diffuse une onde sonore."
      },
      {
        stageIndex: 2,
        title: "La Machine à Café Connectée",
        speaker: "dammak",
        dialogue: "« Deuxième appareil : la machine à café. Le café coule tout seul avant même de sortir du lit ! »",
        activeDeviceId: "coffee",
        cue: "Mahmoud Dammak clique : la machine chauffe et fait couler un café fumant."
      },
      {
        stageIndex: 3,
        title: "Le Test au Téléphone",
        speaker: "louay",
        dialogue: "« Le plus fort, c'est de donner un seul ordre pour toute la maison. Mahmoud Dammak, montre-nous ! »",
        activeDeviceId: null,
        phonePropReady: true,
        cue: "Louay Kouki passe la main à Mahmoud Dammak. Mahmoud sort son vrai téléphone."
      },
      {
        stageIndex: 4,
        title: "La Commande Vocale au Smartphone",
        speaker: "dammak",
        dialogue: "« Regardez mon téléphone. Je dis simplement à ma maison : “Maison, prépare mon arrivée !” »",
        phoneCommandSent: "Maison, prépare mon arrivée !",
        cue: "Mahmoud Dammak fait semblant d'envoyer le message vocal. La bulle bleue glisse à droite."
      },
      {
        stageIndex: 5,
        title: "Réaction Coordonnée de la Maison",
        speaker: "assistant",
        dialogue: "« Bien sûr ! J'allume les lumières, j'ouvre les stores et je règle la climatisation. »",
        audioKey: "assistant_arrivee",
        phoneAssistantReply: "Bien sûr ! J'allume les lumières, j'ouvre les stores et je règle la climatisation.",
        multiDeviceTrigger: true,
        houseState: { lights: true, blinds: "open", ac: true, coffee: true, speaker: true },
        cue: "La bulle assistante arrive. Les appareils réagissent tous en direct !"
      },
      {
        stageIndex: 6,
        title: "Bilan de la Démonstration",
        speaker: "louay",
        dialogue: "« En deux secondes : les lumières éclairent le salon, les stores montent et la clim souffle de l'air frais à 21 degrés ! »",
        houseState: { lights: true, blinds: "open", ac: true, coffee: false, speaker: true },
        cue: "Louay Kouki conclut la démonstration avec le sourire."
      }
    ]
  },
  {
    id: 4,
    number: "04",
    name: "Comment Communiquent les Appareils ?",
    shortName: "Réseau",
    duration: "45 secondes",
    summary: "Schéma réseau pédagogique : Utilisateur → Assistant → Réseau → Appareils connectés.",
    stages: [
      {
        stageIndex: 0,
        title: "Le mystère du sans-fil",
        speaker: "louay",
        dialogue: "« Mais comment ces appareils se parlent-ils sans aucun fil dans les murs ? »",
        activeNetworkStep: 0,
        cue: "Louay Kouki pointe le schéma réseau à l'écran."
      },
      {
        stageIndex: 1,
        title: "Étape 1 : De l'Utilisateur à l'Assistant",
        speaker: "dammak",
        dialogue: "« Première étape : nous donnons un ordre. L'assistant transforme notre voix en message numérique. »",
        activeNetworkStep: 1,
        cue: "Mahmoud Dammak explique la première flèche : Utilisateur → Assistant."
      },
      {
        stageIndex: 2,
        title: "Étape 2 : Le Réseau sans fil",
        speaker: "louay",
        dialogue: "« Deuxième étape : le message voyage dans le réseau, avec le Wi-Fi dans la maison, le Bluetooth tout près, ou Internet dehors ! »",
        activeNetworkStep: 2,
        cue: "Louay Kouki détaille le Wi-Fi, le Bluetooth et Internet."
      },
      {
        stageIndex: 3,
        title: "Étape 3 : L'action des Appareils",
        speaker: "dammak",
        dialogue: "« Troisième étape : l'appareil reçoit le message très vite et fait l'action demandée : allumer, ouvrir, chauffer ! »",
        activeNetworkStep: 3,
        cue: "Mahmoud Dammak montre l'action finale concrète."
      }
    ]
  },
  {
    id: 5,
    number: "05",
    name: "Les 5 Grands Avantages",
    shortName: "Avantages",
    duration: "45 secondes",
    summary: "Gain de temps, confort, économie d'énergie, contrôle à distance, sécurité.",
    stages: [
      {
        stageIndex: 0,
        title: "Pourquoi adopter la maison intelligente ?",
        speaker: "dammak",
        dialogue: "« Quels sont les grands avantages ? Nous avons choisi cinq points importants. »",
        activeAdvantage: null,
        cue: "Mahmoud Dammak introduit les avantages avec enthousiasme."
      },
      {
        stageIndex: 1,
        title: "1. Gain de temps & 2. Confort",
        speaker: "louay",
        dialogue: "« D'abord, le gain de temps : finies les corvées répétitives. Ensuite, le confort : la maison s'adapte à nous. »",
        activeAdvantage: "comfort_time",
        cue: "Louay Kouki présente le gain de temps et le confort."
      },
      {
        stageIndex: 2,
        title: "3. Économie d'énergie & 4. Contrôle à distance",
        speaker: "dammak",
        dialogue: "« Puis, l'économie d'énergie : les lampes s'éteignent seules dans les pièces vides. Et on peut tout vérifier avec son téléphone ! »",
        activeAdvantage: "eco_remote",
        cue: "Mahmoud Dammak explique la baisse de facture et le contrôle mobile."
      },
      {
        stageIndex: 3,
        title: "5. Sécurité renforcée",
        speaker: "louay",
        dialogue: "« Enfin, la sécurité : nous recevons une alerte immédiate sur notre téléphone en cas de problème. »",
        activeAdvantage: "security",
        cue: "Louay Kouki montre l'icône de sécurité."
      },
      {
        stageIndex: 4,
        title: "Question interactive à la classe",
        speaker: "dammak",
        dialogue: "« Une question pour vous tous dans la classe : qui aimerait vivre dans une maison comme celle-ci ? Levez la main ! »",
        showAudienceQuestion: true,
        cue: "Mahmoud Dammak regarde la classe, sourit et compte les mains levées."
      }
    ]
  },
  {
    id: 6,
    number: "06",
    name: "Les Inconvénients et les Risques",
    shortName: "Risques",
    duration: "55 secondes",
    summary: "Dépendance à Internet, vie privée, piratage, prix. Démonstration de coupure réseau.",
    stages: [
      {
        stageIndex: 0,
        title: "Le revers de la médaille",
        speaker: "louay",
        dialogue: "« Mais attention : il y a aussi de vrais inconvénients et des risques à connaître. »",
        activeRisk: null,
        cue: "Louay Kouki adopte un ton sérieux pour les risques."
      },
      {
        stageIndex: 1,
        title: "1. La dépendance à Internet",
        speaker: "dammak",
        dialogue: "« Premier problème : la panne d'Internet. Si le Wi-Fi s'arrête ou s'il y a une coupure de courant, plus rien ne répond ! »",
        activeRisk: "internet",
        triggerGlitch: true,
        cue: "Mahmoud Dammak montre le voyant Wi-Fi rouge clignotant en alerte."
      },
      {
        stageIndex: 2,
        title: "2. La protection de la vie privée",
        speaker: "louay",
        dialogue: "« Deuxième risque : la vie privée. Les micros et les caméras enregistrent des données sur nos habitudes. »",
        activeRisk: "privacy",
        cue: "Louay Kouki pose la question importante des données personnelles."
      },
      {
        stageIndex: 3,
        title: "3. Le piratage & 4. Le prix élevé",
        speaker: "dammak",
        dialogue: "« Troisièmement, le piratage : des personnes malveillantes peuvent attaquer le réseau. Et quatrièmement : ces objets coûtent cher ! »",
        activeRisk: "hack_price",
        cue: "Mahmoud Dammak explique le piratage et le coût avec des mots simples."
      },
      {
        stageIndex: 4,
        title: "Le conseil des présentateurs",
        speaker: "louay",
        dialogue: "« Notre règle d'or : choisissez des mots de passe solides et gardez toujours des boutons manuels. »",
        activeRisk: "advice",
        cue: "Louay Kouki donne le conseil pratique et rassurant."
      }
    ]
  },
  {
    id: 7,
    number: "07",
    name: "Conclusion & Grand Débat",
    shortName: "Débat",
    duration: "25 secondes",
    summary: "Les lumières s'éteignent. L'assistante lance la question de débat à la classe.",
    stages: [
      {
        stageIndex: 0,
        title: "La maison s'endort",
        speaker: "system",
        houseState: { lights: false, blinds: "closed", ac: false, coffee: false, speaker: false },
        cue: "Les lumières s'éteignent doucement une à une dans la maison."
      },
      {
        stageIndex: 1,
        title: "L'intervention finale de l'Assistante",
        speaker: "assistant",
        dialogue: "« Avant de terminer, j'ai une question pour vous… »",
        audioKey: "assistant_question",
        cue: "La voix de l'assistante résonne une dernière fois."
      },
      {
        stageIndex: 2,
        title: "La Grande Question de Débat",
        speaker: "dammak",
        dialogue: "« Une maison intelligente est-elle vraiment une bonne idée ? Est-ce un grand progrès ou un danger pour notre liberté ? »",
        bigDebateQuestion: "Une maison intelligente est-elle vraiment une bonne idée ?",
        cue: "Mahmoud Dammak pose la grande question du débat."
      },
      {
        stageIndex: 3,
        title: "Remerciements et débat ouvert",
        speaker: "louay",
        dialogue: "« Mahmoud Dammak et moi vous remercions pour votre attention ! La parole est à vous : qu'en pensez-vous ? »",
        showEndCard: true,
        cue: "Mahmoud Dammak et Louay Kouki saluent la classe et ouvrent le débat."
      }
    ]
  }
];

export const AUDIO_MANIFEST = {
  assistant_bonjour: {
    filename: "assistant_bonjour.mp3",
    text: "Bonjour ! Votre maison est prête.",
    speaker: "Assistant"
  },
  assistant_arrivee: {
    filename: "assistant_arrivee.mp3",
    text: "Bien sûr ! J'allume les lumières, j'ouvre les stores et je règle la climatisation.",
    speaker: "Assistant"
  },
  assistant_question: {
    filename: "assistant_question.mp3",
    text: "Avant de terminer, j'ai une question pour vous…",
    speaker: "Assistant"
  }
};
