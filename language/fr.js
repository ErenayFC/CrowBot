module.exports = [
  {
    name: "aide",
    description: "Liste toutes les commandes",
    content: {
      sponsor: "{{client}} est soutenu par {{sponsor}}.",
      title: "Liste des Commandes",
      description:
        "Voici la liste de toutes les commandes et leurs descriptions :",
      aiCommands: "Commandes IA",
      aiCommandsList:
        "`chat`: Discutez avec l'IA\n`draw`: Dessinez avec l'IA\n`pixelart`: Créez du pixel art avec l'IA",
      botCommands: "Commandes du Bot",
      botCommandsList:
        "`help`: Affiche ce message d'aide\n`sponsor`: Affiche nos sponsors\n`stats`: Affiche les statistiques du bot",
      funCommands: "Commandes de Divertissement",
      funCommandsList:
        "`anime`: Affiche une image d'anime aléatoire\n`tictactoe`: Jouez au morpion\n`wallpaper`: Affiche un fond d'écran aléatoire",
      ownerCommands: "Commandes du Propriétaire",
      ownerCommandsList:
        "`eval`: Exécute du code (Réservé au propriétaire du bot)",
      pastebinCommands: "Commandes Pastebin",
      pastebinCommandsList: "`pastebin`: Télécharge du texte sur Pastebin",
      watchbotCommands: "Commandes Watchbot",
      watchbotCommandsList: "`watchbot`: Gère les fonctionnalités de Watchbot",
    },
    id: 1,
  },
  {
    name: "statistiques",
    description: "Voir les statistiques de Crow",
    content: {
      title: "Statistiques de Crow",
      serverCount: "Nombre de serveurs",
      userCount: "Nombre d'utilisateurs",
      botPing: "Latence du bot",
      cpuUsage: "Utilisation de la CPU",
      ramUsage: "Utilisation de la RAM",
      uptime: "Durée du service",
      botVersion: "Version du bot",
      shardCount: "Nombre de shards",
      owner: "Propriétaire",
      sponsor: "{{client}}, parrainé par {{sponsor}}.",
    },
    id: 2,
  },
  {
    name: "eval",
    description: "[Admin] Exécutez une commande",
    content: {
      fail: "Seul [développeur](https://discord.com/users/1029431477219360869) peut utiliser cette commande.",
      sponsor: "{{client}}, parrainé par {{sponsor}}.",
    },
    firstOptions: {
      name: "code",
      description: "[Admin] Exécutez une commande",
    },
    id: 3,
  },
  {
    name: "dessine",
    description: "Générez une image",
    content: {
      generatingImage: "Génération de votre image",
      imageName: "Image",
      expiredTime: "Le temps d'interaction du bouton a expiré",
      anErrorOccurred:
        "Il y a un problème avec notre service d'intelligence artificielle. Veuillez réessayer plus tard.",
    },
    firstOptions: {
      name: "demande",
      description: "Entrez le sujet de l'image",
    },
    id: 4,
  },
  {
    name: "discuter",
    description: "Discutez avec Crow",
    content: {
      sponsor: "{{client}} est parrainé par {{sponsor}}.",
      resetMemory: "Réinitialiser la Mémoire",
      previousPage: "Précédent",
      nextPage: "Suivant",
      memoryIsEmptyOrFault: "La mémoire est vide ou défectueuse",
      memoryResetted: "Réinitialisation de la mémoire réussie",
      timeExpiredForButtons:
        "Le temps d'interaction avec les boutons a expiré (30 secondes)",
    },
    firstOptions: {
      name: "texte",
      description: "Que devrions-nous faire avec Crow aujourd'hui ?",
    },
    id: 5,
  },
  {
    name: "art-pixel",
    description: "Générez une image d'art en pixels",
    firstOptions: {
      name: "demande",
      description: "Entrez le sujet de l'image",
    },
    id: 6,
  },
  {
    name: "anime",
    description: "Voir une image aléatoire d'anime",
    content: {
      image: "Voici l'image:",
      isNotNSFWChannel:
        "Ce canal n'est pas un canal NSFW. Veuillez activer cette configuration et réessayer.",
    },
    firstOptions: {
      name: "nsfw",
      description: "Voulez-vous une image NSFW?",
    },
    id: 7,
  },
  {
    name: "tic-tac-toe",
    description: "Jouez au Tic-Tac-Toe avec Crow",
    firstOptions: {
      name: "utilisateur",
      description: "Étiquetez un utilisateur",
    },
    id: 8,
  },
  {
    name: "wallpaper",
    description: "Voir un fond d'écran d'anime aléatoire",
    content: {
      image: "Voici l'image:",
    },
    id: 9,
  },
  {
    name: "sponsor",
    description: "Obtenez des informations sur le sponsor de Crow",
    id: 12,
  },
  {
    name: "watchbot",
    description: "Gérez vos bots avec le système Watchbot",
    firstOptions: {
      name: "action",
      description: "Choisissez l'action que vous souhaitez effectuer",
      choices: {
        add: "Ajouter un bot",
        list: "Lister vos bots",
        delete: "Supprimer un bot",
      },
    },
    content: {
      sponsor: "{{client}} est sponsorisé par {{sponsor}}.",
      addBot: {
        description:
          "Si vous souhaitez faire surveiller votre bot via Crow, vous pouvez le faire via le site web officiel. Cliquez sur le bouton ci-dessous pour y accéder !",

        goToWebSite: "Aller au Site Web",
      },
      listBot: {
        errorTitle: "Erreur",
        noBotFound:
          "Malheureusement, il n'y a aucun bot vous appartenant dans le système pour le moment. Que diriez-vous d'ajouter un bot en tapant </watchbot ajouter:786466522972946462> ?",
        botLabel: "Bot",
        embedTitle: "Système WatchBot - Liste",
      },
      delBot: {
        noBotFound:
          "Aucun bot trouvé dans la base de données vous appartenant.",
        selectBotToDelete:
          "Sélectionnez l'un des boutons ci-dessous pour supprimer votre bot :",
        botLabel: "Bot",
        botDeletedSuccess: (index) => `- Bot ${index} supprimé avec succès`,
        errorOccurred: "Une erreur s'est produite. Veuillez réessayer.",
        youCanDeleteYourBot:
          "Vous pouvez supprimer votre bot en sélectionnant l'un des boutons ci-dessous :",
      },
    },
    id: 13,
  },
  {
    name: "pastebin",
    description: "Gérez vos contenus avec le système Pastebin",
    firstOptions: {
      name: "action",
      description: "Choisissez l'action que vous souhaitez effectuer",
      choices: {
        create: "Créer un paste",
        list: "Lister les pastes",
        delete: "Supprimer un paste",
        view: "Afficher un paste",
      },
    },
    secondOptions: {
      name: "code",
      description: "Entrez le code public du paste que vous souhaitez afficher",
    },
    thirdOptions: {
      name: "prive",
      description: "Le message doit-il être envoyé uniquement à vous ?",
    },
    content: {
      errorTitle: "Erreur",
      createPaste: {
        successTitle:
          "Votre paste a été ajouté avec succès au système. Merci de nous avoir choisis.",
        publicCode: (code) => "Voici votre code PasteBin public: " + code,
        modalTitle: "Créer un nouveau paste",
        contentLabel: "Écrivez le contenu nécessaire ici",
        contentPlaceholder: "Bonjour !",
      },
      listPaste: {
        noPasteFound:
          "Malheureusement, vous n'avez actuellement aucun paste dans le système. Que diriez-vous d'en créer un en tapant </pastebin creer:786466522972946462> ?",
        pasteLabel: "Paste",
        embedTitle: "Système PasteBin - Liste",
      },
      deletePaste: {
        noPasteFound:
          "Aucun paste vous appartenant n'a été trouvé dans la base de données.",
        selectPasteToDelete:
          "Sélectionnez l'un des boutons ci-dessous pour supprimer votre paste :",
        pasteLabel: "Paste",
        pasteDeletedSuccess: (index) =>
          `- Le paste ${index} a été supprimé avec succès`,
        errorOccurred: "Une erreur s'est produite. Veuillez réessayer.",
        youCanDeleteYourPaste:
          "Vous pouvez supprimer votre paste en sélectionnant l'un des boutons ci-dessous :",
        timedOut: "L'opération a expiré",
      },
      viewPaste: {
        pasteNotFound: "Aucun paste avec ce code public n'a été trouvé",
        successTitle: "Succès",
      },
      invalidAction: "Action invalide sélectionnée.",
    },
    id: 14,
  },
];
