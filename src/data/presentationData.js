// presentationData.js
// Données complètes de la présentation en Français A2
// Présentateurs : Dammak et Louay | Assistante vocale invisible

export const PRESENTATION_INFO = {
  title: "LA MAISON INTELLIGENTE",
  subtitle: "Une maison qui pense, communique et agit.",
  presenters: [
    { id: "dammak", name: "Dammak", role: "Présentateur 1", color: "#38bdf8" },
    { id: "louay", name: "Louay", role: "Présentateur 2", color: "#818cf8" }
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
    shortDesc: "Écoute nos ordres vocaux et diffuse des réponses ou de la musique.",
    fullDesc: "Elle possède un microphone et se connecte au Wi-Fi. Elle comprend le langage naturel et contrôle les autres objets de la maison.",
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
    shortDesc: "Prépare un bon café chaud automatiquement sans quitter son lit.",
    fullDesc: "Programmable avec le réveil ou déclenchée depuis le smartphone. Elle ajuste la température et la quantité d'eau.",
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
    shortDesc: "S'ouvrent et se ferment automatiquement selon le soleil ou nos souhaits.",
    fullDesc: "Des petits moteurs électriques font monter ou descendre les stores. Ils protègent du soleil l'été et gardent la chaleur l'hiver.",
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
    shortDesc: "Des ampoules LED qui changent de couleur et d'intensité selon le moment.",
    fullDesc: "Elles s'allument quand vous entrez et s'éteignent seules pour économiser l'électricité. Contrôle par pièces ou ensemble.",
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
    shortDesc: "Règle la température parfaite dans chaque pièce avant votre retour.",
    fullDesc: "Un thermostat intelligent mesure la chaleur. Il coupe l'air si une fenêtre est ouverte pour éviter le gaspillage.",
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
    summary: "La maison s'allume progressivement. L'assistante accueille les présentateurs.",
    stages: [
      {
        stageIndex: 0,
        title: "La maison endormie",
        speaker: "system",
        audioKey: "scene1_subtle_chime",
        houseState: { lights: false, blinds: "closed", ac: false, coffee: false, speaker: false },
        cue: "Cliquez pour démarrer la présentation et réveiller la maison."
      },
      {
        stageIndex: 1,
        title: "Éveil progressif de la maison",
        speaker: "assistant",
        dialogue: "« Bonjour ! Votre maison est prête. »",
        audioKey: "assistant_bonjour",
        houseState: { lights: true, blinds: "closed", ac: false, coffee: false, speaker: false },
        cue: "L'assistante invisible salue la classe. Les lumières s'allument une par une."
      },
      {
        stageIndex: 2,
        title: "Introduction par Dammak",
        speaker: "dammak",
        dialogue: "« Bonjour à tous ! Aujourd'hui, avec Louay, nous vous présentons notre projet : La Maison Intelligente. »",
        houseState: { lights: true, blinds: "closed", ac: false, coffee: false, speaker: false },
        cue: "Dammak prend la parole avec le sourire et regarde la classe."
      },
      {
        stageIndex: 3,
        title: "Accroche par Louay",
        speaker: "louay",
        dialogue: "« Une maison qui pense, qui communique et qui agit toute seule. Est-ce un simple gadget ou le futur de nos vies ? Découvrons-le ensemble ! »",
        houseState: { lights: true, blinds: "half", ac: false, coffee: false, speaker: false },
        cue: "Louay pose la question captivante pour engager l'auditoire."
      }
    ]
  },
  {
    id: 2,
    number: "02",
    name: "Qu'est-ce qu'une Maison Intelligente ?",
    shortName: "Définition",
    duration: "40 secondes",
    summary: "Définition simple en français A2 : capteurs, réseau, automatisation.",
    stages: [
      {
        stageIndex: 0,
        title: "La grande question",
        speaker: "louay",
        dialogue: "« Tout d'abord, une question simple : qu'est-ce qu'une maison intelligente, exactement ? »",
        cue: "Louay introduit la définition pédagogique."
      },
      {
        stageIndex: 1,
        title: "La définition centrale",
        speaker: "dammak",
        dialogue: "« Une maison intelligente utilise des objets connectés pour faciliter notre vie quotidienne. »",
        highlightCard: "definition",
        cue: "Dammak insiste sur les mots-clés : objets connectés et faciliter la vie."
      },
      {
        stageIndex: 2,
        title: "Les 3 éléments clés",
        speaker: "louay",
        dialogue: "« Pour fonctionner, la maison a besoin de trois choses : des capteurs qui observent, un réseau qui transporte les ordres, et des appareils qui agissent. »",
        highlightCard: "three_pillars",
        cue: "Louay pointe les 3 piliers visuels à l'écran."
      },
      {
        stageIndex: 3,
        title: "Le contrôle facile",
        speaker: "dammak",
        dialogue: "« On peut tout diriger avec son smartphone à distance, ou simplement en parlant avec sa voix ! »",
        highlightCard: "control",
        cue: "Dammak montre son smartphone éteint comme accessoire."
      }
    ]
  },
  {
    id: 3,
    number: "03",
    name: "Démonstrations en Direct des 5 Appareils",
    shortName: "Démos 3D",
    duration: "60 secondes",
    summary: "Démonstration interactive des cinq appareils, avec la commande groupée théâtrale.",
    stages: [
      {
        stageIndex: 0,
        title: "Présentation des 5 appareils",
        speaker: "dammak",
        dialogue: "« Faisons maintenant l'expérience en direct ! Dans cette maison moderne, nous avons installé cinq appareils connectés indispensables. »",
        activeDeviceId: null,
        cue: "Dammak montre la vue générale de la maison avec les 5 icônes."
      },
      {
        stageIndex: 1,
        title: "L'Enceinte Connectée",
        speaker: "louay",
        dialogue: "« Premier appareil : l'enceinte connectée. C'est le cerveau vocal qui écoute nos demandes et répond instantanément. »",
        activeDeviceId: "speaker",
        cue: "Louay présente l'enceinte. Elle s'illumine et diffuse une onde sonore."
      },
      {
        stageIndex: 2,
        title: "La Machine à Café Connectée",
        speaker: "dammak",
        dialogue: "« Deuxième appareil : la machine à café connectée. Imaginez : le café commence à couler avant même que vous ne sortiez du lit ! »",
        activeDeviceId: "coffee",
        cue: "Dammak clique : la machine chauffe et fait couler un expresso fumant."
      },
      {
        stageIndex: 3,
        title: "Le Test Théâtral au Téléphone",
        speaker: "louay",
        dialogue: "« Mais le véritable pouvoir de la maison, c'est de combiner plusieurs actions en une seule phrase. Dammak, montre-nous ! »",
        activeDeviceId: null,
        phonePropReady: true,
        cue: "Louay passe la main à Dammak. Dammak sort son vrai téléphone."
      },
      {
        stageIndex: 4,
        title: "La Commande Vocale Magique",
        speaker: "dammak",
        dialogue: "« Regardez mon téléphone. Je dis simplement à ma maison : “Maison, prépare mon arrivée !” »",
        phoneCommandSent: "Maison, prépare mon arrivée !",
        cue: "Dammak fait semblant d'envoyer le message vocal. La bulle bleue glisse à droite."
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
        cue: "La bulle assistante arrive de gauche. Les 3 appareils réagissent simultanément !"
      },
      {
        stageIndex: 6,
        title: "Bilan de la Démonstration",
        speaker: "louay",
        dialogue: "« En deux secondes : les lumières éclairent le salon, les stores montent pour laisser entrer le soleil, et la climatisation souffle à 21 degrés ! »",
        houseState: { lights: true, blinds: "open", ac: true, coffee: false, speaker: true },
        cue: "Louay conclut la démonstration avec admiration."
      }
    ]
  },
  {
    id: 4,
    number: "04",
    name: "Comment Communiquent les Appareils ?",
    shortName: "Réseau",
    duration: "45 secondes",
    summary: "Schéma réseau pédagogique : Utilisateur → Assistant → Réseau → Objets connectés.",
    stages: [
      {
        stageIndex: 0,
        title: "Le mystère du sans-fil",
        speaker: "louay",
        dialogue: "« Mais une question se pose : comment tous ces objets se parlent-ils sans aucun fil dans les murs ? »",
        activeNetworkStep: 0,
        cue: "Louay pointe le schéma réseau au tableau."
      },
      {
        stageIndex: 1,
        title: "Étape 1 : De l'Utilisateur à l'Assistant",
        speaker: "dammak",
        dialogue: "« Tout commence par l'utilisateur. Nous donnons un ordre par la voix ou via notre smartphone. L'assistant transforme notre voix en signal informatique. »",
        activeNetworkStep: 1,
        cue: "Dammak explique la première flèche : Utilisateur → Assistant."
      },
      {
        stageIndex: 2,
        title: "Étape 2 : Le Réseau (Wi-Fi, Bluetooth, Internet)",
        speaker: "louay",
        dialogue: "« Ce signal voyage ensuite dans le réseau : le Wi-Fi dans toute la maison, le Bluetooth pour les objets très proches, et Internet si nous sommes dehors ! »",
        activeNetworkStep: 2,
        cue: "Louay détaille les 3 technologies sans fil avec leurs icônes."
      },
      {
        stageIndex: 3,
        title: "Étape 3 : L'action des Objets Connectés",
        speaker: "dammak",
        dialogue: "« Enfin, les objets connectés reçoivent le message en un dixième de seconde et exécutent l'ordre : allumer, ouvrir, chauffer ! »",
        activeNetworkStep: 3,
        cue: "Dammak montre l'aboutissement de la chaîne : l'action physique concrète."
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
        dialogue: "« Quels sont les véritables bénéfices de cette technologie ? Nous avons retenu cinq grands avantages. »",
        activeAdvantage: null,
        cue: "Dammak introduit les avantages avec enthousiasme."
      },
      {
        stageIndex: 1,
        title: "1. Gain de temps & 2. Confort",
        speaker: "louay",
        dialogue: "« D'abord, le gain de temps : finies les corvées répétitives ! Ensuite, un confort absolu : la maison s'adapte à notre rythme biologique. »",
        activeAdvantage: "comfort_time",
        cue: "Louay commente les 2 premiers blocs."
      },
      {
        stageIndex: 2,
        title: "3. Économie d'énergie & 4. Contrôle à distance",
        speaker: "dammak",
        dialogue: "« Troisième avantage capital : l'économie d'énergie. Les lumières et le chauffage se coupent si la pièce est vide. Et on peut tout vérifier depuis son travail ! »",
        activeAdvantage: "eco_remote",
        cue: "Dammak met en valeur la facture réduite et la sérénité."
      },
      {
        stageIndex: 3,
        title: "5. Sécurité renforcée & Question au public",
        speaker: "louay",
        dialogue: "« Cinquième point : la sécurité avec des détecteurs de fumée et des alertes immédiates sur notre téléphone. »",
        activeAdvantage: "security",
        cue: "Louay montre le bouclier de sécurité."
      },
      {
        stageIndex: 4,
        title: "Question interactive à la classe",
        speaker: "dammak",
        dialogue: "« Une petite question pour vous tous dans la classe : qui parmi vous aimerait vivre dans une maison comme celle-ci ? Levez la main ! »",
        showAudienceQuestion: true,
        cue: "Dammak regarde la classe, sourit et compte les mains levées !"
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
        dialogue: "« Mais attention : tout n'est pas rose au pays de la domotique ! Il existe aussi de vrais inconvénients et des risques à connaître. »",
        activeRisk: null,
        cue: "Le fond devient plus sérieux avec des touches ambrées."
      },
      {
        stageIndex: 1,
        title: "1. La dépendance totale à Internet",
        speaker: "dammak",
        dialogue: "« Premier inconvénient majeur : la dépendance à Internet. Si la box Wi-Fi tombe en panne ou s'il y a une coupure de courant... plus rien ne répond ! »",
        activeRisk: "internet",
        triggerGlitch: true,
        cue: "Démonstration en direct : le voyant Wi-Fi clignote en orange, alerte 'Hors-ligne'."
      },
      {
        stageIndex: 2,
        title: "2. La protection de la vie privée",
        speaker: "louay",
        dialogue: "« Deuxième risque : notre vie privée. Les micros et les caméras enregistrent des données sur nos habitudes intimes. Qui possède ces informations ? »",
        activeRisk: "privacy",
        cue: "Louay pose une question éthique essentielle."
      },
      {
        stageIndex: 3,
        title: "3. Le piratage informatique & 4. Le coût élevé",
        speaker: "dammak",
        dialogue: "« Troisièmement, le piratage : un hacker pourrait tenter de déverrouiller la porte à distance. Et quatrièmement : équiper toute une maison coûte très cher ! »",
        activeRisk: "hack_price",
        cue: "Dammak explique la cybersécurité et le budget avec simplicité."
      },
      {
        stageIndex: 4,
        title: "Le conseil des présentateurs",
        speaker: "louay",
        dialogue: "« La règle d'or : choisir des mots de passe très solides, mettre à jour les appareils et ne pas tout connecter inutilement. »",
        activeRisk: "advice",
        cue: "Louay donne une solution pratique et rassurante."
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
        dialogue: "« Une maison intelligente est-elle vraiment une bonne idée ? Est-ce un progrès formidable ou un danger pour notre liberté ? »",
        bigDebateQuestion: "Une maison intelligente est-elle vraiment une bonne idée ?",
        cue: "La question s'affiche en grand sur l'écran de projection."
      },
      {
        stageIndex: 3,
        title: "Remerciements et débat ouvert",
        speaker: "louay",
        dialogue: "« Dammak et moi vous remercions chaleureusement pour votre attention ! La parole est maintenant à vous : qu'en pensez-vous ? »",
        showEndCard: true,
        cue: "Dammak et Louay saluent la classe et ouvrent le débat avec le professeur et les élèves."
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
