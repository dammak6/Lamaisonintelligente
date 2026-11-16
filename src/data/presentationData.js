// presentationData.js
// Données complètes de la présentation en Français A2
// Présentateurs : Mahmoud Dammak et Louay Kouki | Assistante vocale invisible (Microsoft Julie)

export const PRESENTATION_INFO = {
  title: "LA MAISON INTELLIGENTE",
  subtitle: "Une maison qui pense, communique et agit.",
  presenters: [
    { id: "dammak", name: "Mahmoud Dammak", role: "Présentateur 1", color: "#38bdf8" },
    { id: "louay", name: "Louay Kouki", role: "Présentateur 2", color: "#818cf8" }
  ],
  assistant: {
    name: "Assistante Vocale",
    description: "Système vocal invisible et chaleureux de la maison",
    color: "#60a5fa"
  },
  duration: "5 minutes",
  level: "Français A2"
};

export const DEVICES = [
  {
    id: "speaker",
    name: "Haut-parleur intelligent",
    frenchCategory: "La voix de la maison",
    room: "Salon principal",
    icon: "Volume2",
    shortDesc: "Il écoute notre voix, répond à nos questions et met de la musique.",
    fullDesc: "On lui parle simplement. Il comprend les phrases faciles et allume les autres appareils.",
    actionName: "Mettre de la musique",
    statusTextActive: "En lecture : Ambiance relaxante",
    statusTextInactive: "En veille (écoute active)",
    badge: "Commande vocale",
    detailStat: "24/7 disponible"
  },
  {
    id: "coffee",
    name: "Machine à café",
    frenchCategory: "Le matin en douceur",
    room: "Cuisine moderne",
    icon: "Coffee",
    shortDesc: "Elle prépare un bon café chaud automatiquement le matin.",
    fullDesc: "Le café est prêt au réveil. On peut aussi la commander avec son téléphone.",
    actionName: "Faire un bon café",
    statusTextActive: "Chauffe : Expresso prêt dans 30s",
    statusTextInactive: "Éteinte (prête)",
    badge: "Automatique",
    detailStat: "85°C optimal"
  },
  {
    id: "blinds",
    name: "Rideaux électriques",
    frenchCategory: "La lumière du soleil",
    room: "Grandes fenêtres",
    icon: "Blinds",
    shortDesc: "Ils s'ouvrent le matin et se ferment le soir tout seuls.",
    fullDesc: "Des petits moteurs font bouger les rideaux. Ils gardent la chaleur en hiver et la fraîcheur en été.",
    actionName: "Ouvrir les rideaux",
    statusTextActive: "Ouverts à 100% (lumière du jour)",
    statusTextInactive: "Fermés à 100% (obscurité)",
    badge: "Confort thermique",
    detailStat: "Position : 100%"
  },
  {
    id: "lights",
    name: "Lumières intelligentes",
    frenchCategory: "L'éclairage facile",
    room: "Toute la maison",
    icon: "Lightbulb",
    shortDesc: "Des lampes qui s'allument et changent de couleur.",
    fullDesc: "Elles s'allument quand on entre dans la pièce. Elles s'éteignent seules pour économiser l'électricité.",
    actionName: "Allumer les lampes",
    statusTextActive: "Allumées (Lumière douce, 80% luminosité)",
    statusTextInactive: "Éteintes (Économie active)",
    badge: "Économie d'électricité",
    detailStat: "Consommation : 12W"
  },
  {
    id: "ac",
    name: "Climatisation",
    frenchCategory: "L'air frais et agréable",
    room: "Salon & Chambres",
    icon: "ThermometerSnowflake",
    shortDesc: "Elle règle la bonne température dans les pièces.",
    fullDesc: "Elle souffle de l'air frais en été. Elle s'arrête si une fenêtre est ouverte pour ne pas gaspiller.",
    actionName: "Régler l'air à 21°C",
    statusTextActive: "Active : Température idéale 21°C",
    statusTextInactive: "En veille (température ambiante 24°C)",
    badge: "Température idéale",
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
    summary: "La maison s'allume. L'assistante accueille Mahmoud Dammak et Louay Kouki.",
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
        title: "Accueil de l'Assistante",
        speaker: "assistant",
        dialogue: "« Bonjour Mahmoud ! Bonjour Louay ! Bienvenue chez vous. Tout est prêt ! »",
        audioKey: "assistant_bonjour",
        houseState: { lights: true, blinds: "closed", ac: false, coffee: false, speaker: false },
        cue: "L'assistante salue chaleureusement Mahmoud et Louay. Les lumières s'allument."
      },
      {
        stageIndex: 2,
        title: "Mahmoud Dammak lance la présentation",
        speaker: "dammak",
        dialogue: "« Bonjour à tous ! Merci l'assistante. Avec Louay Kouki, nous vous présentons notre maison intelligente. Alors, comment ça marche ? »",
        houseState: { lights: true, blinds: "closed", ac: false, coffee: false, speaker: false },
        cue: "Mahmoud Dammak salue la classe avec le sourire et interroge l'assistante."
      },
      {
        stageIndex: 3,
        title: "L'Assistante explique le fonctionnement",
        speaker: "assistant",
        dialogue: "« C'est très simple. Vous pouvez commander la maison avec votre téléphone ou avec votre voix. »",
        audioKey: "assistant_explication",
        houseState: { lights: true, blinds: "half", ac: false, coffee: false, speaker: false },
        cue: "L'assistante répond d'une voix douce et accueillante."
      },
      {
        stageIndex: 4,
        title: "Louay Kouki invite à la découverte",
        speaker: "louay",
        dialogue: "« Exactement ! Aujourd'hui, avec Mahmoud Dammak, nous allons tout vous montrer en direct. C'est parti ! »",
        houseState: { lights: true, blinds: "half", ac: false, coffee: false, speaker: false },
        cue: "Louay Kouki regarde la classe et lance la visite avec enthousiasme."
      }
    ]
  },
  {
    id: 2,
    number: "02",
    name: "Qu'est-ce qu'une Maison Intelligente ?",
    shortName: "Définition",
    duration: "40 secondes",
    summary: "Définition simple en français A2 : appareils, réseau sans fil, commande vocale.",
    stages: [
      {
        stageIndex: 0,
        title: "La grande question",
        speaker: "louay",
        dialogue: "« Pour commencer, posons une question simple : qu'est-ce qu'une maison intelligente ? »",
        cue: "Louay Kouki introduit la définition avec clarté."
      },
      {
        stageIndex: 1,
        title: "La définition centrale",
        speaker: "dammak",
        dialogue: "« C'est une maison avec des appareils simples qui nous aident tous les jours. »",
        highlightCard: "definition",
        cue: "Mahmoud Dammak donne la définition en parlant calmement."
      },
      {
        stageIndex: 2,
        title: "Les trois éléments importants",
        speaker: "louay",
        dialogue: "« Il y a trois éléments : des appareils dans les pièces, le Wi-Fi pour communiquer, et notre voix pour commander. »",
        highlightCard: "three_pillars",
        cue: "Louay Kouki montre les 3 piliers à l'écran."
      },
      {
        stageIndex: 3,
        title: "Commander facilement",
        speaker: "dammak",
        dialogue: "« C'est très facile : on commande tout avec son téléphone portable ou simplement en parlant ! »",
        highlightCard: "control",
        cue: "Mahmoud Dammak montre son smartphone pour illustrer le contrôle."
      }
    ]
  },
  {
    id: 3,
    number: "03",
    name: "Démonstrations des 5 Appareils",
    shortName: "Démos 3D",
    duration: "60 secondes",
    summary: "Démonstration interactive des cinq appareils avec la commande au smartphone.",
    stages: [
      {
        stageIndex: 0,
        title: "Présentation des 5 appareils",
        speaker: "dammak",
        dialogue: "« Regardons notre maison en 3D. Voici cinq appareils très pratiques pour la vie de tous les jours. »",
        activeDeviceId: null,
        cue: "Mahmoud Dammak montre la vue générale de la maison avec les appareils."
      },
      {
        stageIndex: 1,
        title: "Le Haut-parleur intelligent",
        speaker: "louay",
        dialogue: "« Premier appareil : le haut-parleur intelligent. Il écoute notre voix, donne la météo et met de la musique. »",
        activeDeviceId: "speaker",
        cue: "Louay Kouki présente le haut-parleur. Il s'illumine et diffuse une onde sonore."
      },
      {
        stageIndex: 2,
        title: "La Machine à Café",
        speaker: "dammak",
        dialogue: "« Deuxième appareil : la machine à café. Le café coule tout seul avant même de sortir du lit ! »",
        activeDeviceId: "coffee",
        cue: "Mahmoud Dammak clique : la machine chauffe et prépare un café chaud."
      },
      {
        stageIndex: 3,
        title: "Le Test au Téléphone",
        speaker: "louay",
        dialogue: "« Maintenant, le moment magique ! Mahmoud Dammak va donner un seul ordre avec son téléphone portable. »",
        activeDeviceId: null,
        phonePropReady: true,
        cue: "Louay Kouki passe la main à Mahmoud Dammak. Mahmoud sort son vrai téléphone."
      },
      {
        stageIndex: 4,
        title: "La Commande au Smartphone",
        speaker: "dammak",
        dialogue: "« Regardez mon téléphone portable. Je dis simplement à la maison : “Maison, prépare mon arrivée !” »",
        phoneCommandSent: "Maison, prépare mon arrivée !",
        cue: "Mahmoud Dammak montre l'envoi de la commande sur l'écran du smartphone."
      },
      {
        stageIndex: 5,
        title: "Réaction Coordonnée de la Maison",
        speaker: "assistant",
        dialogue: "« Bien sûr ! J'allume les lumières, j'ouvre les rideaux et je mets la climatisation. »",
        audioKey: "assistant_arrivee",
        phoneAssistantReply: "Bien sûr ! J'allume les lumières, j'ouvre les rideaux et je mets la climatisation.",
        multiDeviceTrigger: true,
        houseState: { lights: true, blinds: "open", ac: true, coffee: true, speaker: true },
        cue: "L'assistante répond et les appareils réagissent tous en direct !"
      },
      {
        stageIndex: 6,
        title: "Bilan de la Démonstration",
        speaker: "louay",
        dialogue: "« En deux secondes : les lampes s'allument, les rideaux montent et la climatisation souffle de l'air frais ! »",
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
    summary: "Schéma simple : On parle → Le réseau sans fil → L'appareil agit.",
    stages: [
      {
        stageIndex: 0,
        title: "Le mystère du sans-fil",
        speaker: "louay",
        dialogue: "« Mais comment ces appareils se parlent-ils sans aucun fil dans la maison ? »",
        activeNetworkStep: 0,
        cue: "Louay Kouki pointe le schéma à l'écran."
      },
      {
        stageIndex: 1,
        title: "Étape 1 : On donne un ordre",
        speaker: "dammak",
        dialogue: "« C'est très simple ! D'abord, on parle à l'appareil ou on appuie sur son téléphone portable. »",
        activeNetworkStep: 1,
        cue: "Mahmoud Dammak explique la première étape."
      },
      {
        stageIndex: 2,
        title: "Étape 2 : Le voyage dans l'air",
        speaker: "louay",
        dialogue: "« Ensuite, le message voyage dans l'air grâce au Wi-Fi de la maison ou avec Internet dehors. »",
        activeNetworkStep: 2,
        cue: "Louay Kouki détaille la transmission sans fil."
      },
      {
        stageIndex: 3,
        title: "Étape 3 : L'appareil agit",
        speaker: "dammak",
        dialogue: "« Enfin, l'appareil reçoit le message tout de suite et il agit : la lumière s'allume ou le café coule ! »",
        activeNetworkStep: 3,
        cue: "Mahmoud Dammak montre le résultat final."
      }
    ]
  },
  {
    id: 5,
    number: "05",
    name: "Les 5 Grands Avantages",
    shortName: "Avantages",
    duration: "45 secondes",
    summary: "Gain de temps, confort, économie d'électricité, commande avec le téléphone, sécurité.",
    stages: [
      {
        stageIndex: 0,
        title: "Pourquoi une maison intelligente ?",
        speaker: "dammak",
        dialogue: "« Quels sont les grands avantages ? Nous avons choisi cinq points importants. »",
        activeAdvantage: null,
        cue: "Mahmoud Dammak introduit les avantages avec dynamisme."
      },
      {
        stageIndex: 1,
        title: "1. Gain de temps & 2. Confort",
        speaker: "louay",
        dialogue: "« D'abord, on gagne du temps : moins de corvées répétitives. Ensuite, le confort : la maison s'adapte à nous. »",
        activeAdvantage: "comfort_time",
        cue: "Louay Kouki présente le gain de temps et le confort."
      },
      {
        stageIndex: 2,
        title: "3. Économie d'énergie & 4. Téléphone",
        speaker: "dammak",
        dialogue: "« Puis, on économise l'électricité : les lampes s'éteignent seules. Et on peut tout vérifier avec son téléphone portable ! »",
        activeAdvantage: "eco_remote",
        cue: "Mahmoud Dammak explique l'économie d'électricité et le contrôle mobile."
      },
      {
        stageIndex: 3,
        title: "5. Sécurité de la maison",
        speaker: "louay",
        dialogue: "« Enfin, la sécurité : la maison nous envoie une alerte directe sur le téléphone en cas de problème. »",
        activeAdvantage: "security",
        cue: "Louay Kouki montre la sécurité."
      },
      {
        stageIndex: 4,
        title: "Question pour la classe",
        speaker: "dammak",
        dialogue: "« Une question pour vous tous : qui aimerait vivre dans une maison comme celle-ci ? Levez la main ! »",
        showAudienceQuestion: true,
        cue: "Mahmoud Dammak regarde la classe avec le sourire et compte les mains levées."
      }
    ]
  },
  {
    id: 6,
    number: "06",
    name: "Les Inconvénients et les Risques",
    shortName: "Risques",
    duration: "55 secondes",
    summary: "Panne d'Internet, protection de la vie privée, sécurité du système, prix des appareils.",
    stages: [
      {
        stageIndex: 0,
        title: "Attention aux risques",
        speaker: "louay",
        dialogue: "« Mais attention : il y a aussi de vrais problèmes et des risques à connaître. »",
        activeRisk: null,
        cue: "Louay Kouki prend un ton sérieux et attentif."
      },
      {
        stageIndex: 1,
        title: "1. La panne d'Internet",
        speaker: "dammak",
        dialogue: "« Premier problème : la panne d'Internet. Si le Wi-Fi s'arrête ou s'il n'y a plus d'électricité, plus rien ne marche ! »",
        activeRisk: "internet",
        triggerGlitch: true,
        cue: "Mahmoud Dammak montre l'alerte sur l'écran."
      },
      {
        stageIndex: 2,
        title: "2. La vie privée",
        speaker: "louay",
        dialogue: "« Deuxième risque : la vie privée. Les micros et les caméras peuvent enregistrer nos habitudes à la maison. »",
        activeRisk: "privacy",
        cue: "Louay Kouki pose la question des données personnelles."
      },
      {
        stageIndex: 3,
        title: "3. La sécurité & 4. Le coût",
        speaker: "dammak",
        dialogue: "« Troisièmement, la sécurité : avec un mot de passe trop facile, quelqu'un peut entrer dans le système. Et quatrièmement : ces appareils coûtent cher ! »",
        activeRisk: "hack_price",
        cue: "Mahmoud Dammak explique les risques simplement."
      },
      {
        stageIndex: 4,
        title: "Le conseil pratique",
        speaker: "louay",
        dialogue: "« Notre conseil : choisissez un bon mot de passe et gardez toujours des boutons normaux sur les murs. »",
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
        title: "L'intervention de l'Assistante",
        speaker: "assistant",
        dialogue: "« Avant de terminer, j'ai une question pour vous… »",
        audioKey: "assistant_question",
        cue: "La voix douce de l'assistante résonne une dernière fois."
      },
      {
        stageIndex: 2,
        title: "La question de débat",
        speaker: "dammak",
        dialogue: "« Une maison intelligente : est-ce une bonne idée pour tout le monde ? Qu'en pensez-vous ? »",
        bigDebateQuestion: "Une maison intelligente : est-ce une bonne idée pour tout le monde ?",
        cue: "Mahmoud Dammak pose la question au public."
      },
      {
        stageIndex: 3,
        title: "Remerciements des deux présentateurs",
        speaker: "louay",
        dialogue: "« Mahmoud Dammak et moi vous remercions pour votre attention ! La parole est à vous ! »",
        showEndCard: true,
        cue: "Mahmoud Dammak et Louay Kouki saluent la classe et ouvrent le débat."
      }
    ]
  }
];

export const AUDIO_MANIFEST = {
  assistant_bonjour: {
    filename: "julie_bonjour.mp3",
    text: "Bonjour Mahmoud ! Bonjour Louay ! Bienvenue chez vous. Tout est prêt !",
    speaker: "Assistant"
  },
  assistant_explication: {
    filename: "julie_explication.mp3",
    text: "C'est très simple. Vous pouvez commander la maison avec votre téléphone ou avec votre voix.",
    speaker: "Assistant"
  },
  assistant_arrivee: {
    filename: "julie_arrivee.mp3",
    text: "Bien sûr ! J'allume les lumières, j'ouvre les rideaux et je mets la climatisation.",
    speaker: "Assistant"
  },
  assistant_question: {
    filename: "julie_question.mp3",
    text: "Avant de terminer, j'ai une question pour vous…",
    speaker: "Assistant"
  }
};
