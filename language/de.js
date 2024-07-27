module.exports = [
  {
    name: "hilfe",
    description: "Listet alle Befehle auf",
    content: {
      sponsor: "{{client}} wird unterstützt von {{sponsor}}.",
      title: "Befehlsliste",
      description: "Hier ist eine Liste aller Befehle und ihre Beschreibungen:",
      aiCommands: "KI-Befehle",
      aiCommandsList:
        "`chat`: Chatten Sie mit der KI\n`draw`: Zeichnen Sie mit der KI\n`pixelart`: Erstellen Sie Pixel-Art mit der KI",
      botCommands: "Bot-Befehle",
      botCommandsList:
        "`help`: Zeigt diese Hilfsnachricht an\n`sponsor`: Zeigt unsere Sponsoren an\n`stats`: Zeigt Bot-Statistiken an",
      funCommands: "Spaß-Befehle",
      funCommandsList:
        "`anime`: Zeigt ein zufälliges Anime-Bild\n`tictactoe`: Spielen Sie Tic-Tac-Toe\n`wallpaper`: Zeigt ein zufälliges Hintergrundbild",
      ownerCommands: "Besitzer-Befehle",
      ownerCommandsList: "`eval`: Führt Code aus (Nur für Bot-Besitzer)",
      pastebinCommands: "Pastebin-Befehle",
      pastebinCommandsList: "`pastebin`: Lädt Text auf Pastebin hoch",
      watchbotCommands: "Watchbot-Befehle",
      watchbotCommandsList: "`watchbot`: Verwaltet Watchbot-Funktionen",
    },
    id: 1,
  },
  {
    name: "statistiken",
    description: "Sehen Sie die Statistiken von Crow",
    content: {
      title: "Statistiken von Crow",
      serverCount: "Anzahl der Server",
      userCount: "Anzahl der Benutzer",
      botPing: "Latenz des Bots",
      cpuUsage: "CPU-Auslastung",
      ramUsage: "RAM-Auslastung",
      uptime: "Betriebszeit",
      botVersion: "Bot-Version",
      shardCount: "Anzahl der Shards",
      owner: "Besitzer",
      sponsor: "{{client}}, gesponsert von {{sponsor}}.",
    },
    id: 2,
  },
  {
    name: "eval",
    description: "[Admin] Führen Sie einen Befehl aus",
    content: {
      fail: "Nur [Entwickler](https://discord.com/users/1029431477219360869) kann diesen Befehl ausführen.",
      sponsor: "{{client}}, gesponsert von {{sponsor}}.",
    },
    firstOptions: {
      name: "code",
      description: "[Admin] Führen Sie einen Befehl aus",
    },
    id: 3,
  },
  {
    name: "zeichnen",
    description: "Erstellen Sie ein Bild",
    content: {
      generatingImage: "Erstellen Sie Ihr Bild",
      imageName: "Bild",
      expiredTime: "Die Interaktionszeit des Buttons ist abgelaufen",
      anErrorOccurred:
        "Es gibt ein Problem mit unserem KI-Dienst. Bitte versuchen Sie es später noch einmal.",
    },
    firstOptions: {
      name: "anfrage",
      description: "Geben Sie das Thema des Bildes ein",
    },
    id: 4,
  },
  {
    name: "chat",
    description: "Chatten Sie mit Crow",
    content: {
      sponsor: "{{client}} wird von {{sponsor}} gesponsert.",
      resetMemory: "Speicher zurücksetzen",
      previousPage: "Vorherige",
      nextPage: "Nächste",
      memoryIsEmptyOrFault: "Speicher ist leer oder fehlerhaft",
      memoryResetted: "Speicher erfolgreich zurückgesetzt",
      timeExpiredForButtons: "Zeit für Tasteninteraktion ist abgelaufen (30 Sekunden)"
    },
    firstOptions: {
      name: "text",
      description: "Was sollen wir heute mit Crow machen?",
    },
    id: 5,
  },
  {
    name: "pixel-kunst",
    description: "Erstellen Sie ein Pixel-Kunst-Bild",
    firstOptions: {
      name: "anfrage",
      description: "Geben Sie das Thema des Bildes ein",
    },
    id: 6,
  },
  {
    name: "anime",
    description: "Sehen Sie ein zufälliges Anime-Bild",
    content: {
      image: "Hier ist das Bild:",
      isNotNSFWChannel:
        "Dieser Kanal ist kein NSFW-Kanal. Bitte aktivieren Sie diese Einstellung und versuchen Sie es erneut.",
    },
    firstOptions: {
      name: "nsfw",
      description: "Möchten Sie ein NSFW-Bild?",
    },
    id: 7,
  },
  {
    name: "tic-tac-toe",
    description: "Spielen Sie Tic-Tac-Toe mit Crow",
    firstOptions: {
      name: "benutzer",
      description: "Markieren Sie einen Benutzer",
    },
    id: 8,
  },
  {
    name: "hintergrundbild",
    description: "Sehen Sie ein zufälliges Anime-Hintergrundbild",
    content: {
      image: "Hier ist das Bild:",
    },
    id: 9,
  },
  {
    name: "sponsor",
    description: "Erfahren Sie mehr über Crow's Sponsor",
    id: 12,
  },
  {
    name: "watchbot",
    description: "Verwalten Sie Ihre Bots mit dem Watchbot-System",
    firstOptions: {
      name: "aktion",
      description: "Wählen Sie die Aktion aus, die Sie durchführen möchten",
      choices: {
        add: "Hinzufügen",
        list: "Liste",
        delete: "Löschen",
      },
    },
    content: {
      sponsor: "{{client}} wird von {{sponsor}} gesponsert.",
      add: {
        name: "hinzufügen",
        description: "Einen Bot hinzufügen",
      },
      list: {
        name: "liste",
        description: "Ihre Bots auflisten",
      },
      delete: {
        name: "löschen",
        description: "Einen Bot löschen",
      },
      addBot: {
        description:
          "Wenn Sie möchten, dass Ihr Bot über Crow überwacht wird, können Sie dies über die offizielle Website tun. Klicken Sie auf den Button unten, um dorthin zu gelangen!",
        goToWebSite: "Zur Website gehen",
      },
      listBot: {
        errorTitle: "Fehler",
        noBotFound:
          "Leider gibt es im Moment keine Bots im System, die Ihnen gehören. Wie wäre es, wenn Sie einen Bot hinzufügen, indem Sie </watchbot hinzufügen:786466522972946462> eingeben?",
        botLabel: "Bot",
        embedTitle: "WatchBot-System - Liste",
      },
      delBot: {
        noBotFound:
          "Es wurden keine Bots in der Datenbank gefunden, die Ihnen gehören.",
        selectBotToDelete:
          "Wählen Sie eine der Schaltflächen unten, um Ihren Bot zu löschen:",
        botLabel: "Bot",
        botDeletedSuccess: (index) => `- Bot ${index} erfolgreich gelöscht`,
        errorOccurred:
          "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        youCanDeleteYourBot:
          "Sie können Ihren Bot löschen, indem Sie eine der Schaltflächen unten auswählen:",
      },
    },
    id: 13,
  },
  {
    name: "pastebin",
    description: "Verwalten Sie Ihre Inhalte mit dem Pastebin-System",
    firstOptions: {
      name: "aktion",
      description: "Wählen Sie die Aktion aus, die Sie durchführen möchten",
      choices: {
        create: "Paste erstellen",
        list: "Pastes auflisten",
        delete: "Paste löschen",
        view: "Paste anzeigen",
      },
    },
    secondOptions: {
      name: "code",
      description:
        "Geben Sie den öffentlichen Code des Pastes ein, den Sie anzeigen möchten",
    },
    thirdOptions: {
      name: "privat",
      description: "Soll die Nachricht nur an Sie gesendet werden?",
    },
    content: {
      errorTitle: "Fehler",
      list: {
        name: "liste",
        description: "Ihre Pastes auflisten",
      },
      delete: {
        name: "löschen",
        description: "Einen Paste löschen",
      },
      view: {
        name: "anzeigen",
        description: "Einen Paste anzeigen",
      },
      createPaste: {
        successTitle: "Erfolg",
        pasteAddedSuccess: (code) =>
          "Ihr Paste wurde erfolgreich zum System hinzugefügt. Vielen Dank, dass Sie uns gewählt haben.\n- Hier ist Ihr öffentlicher PasteBin-Code: " +
          code,
        modalTitle: "Neuen Paste erstellen",
        contentLabel: "Schreiben Sie hier den erforderlichen Inhalt",
        contentPlaceholder: "Hallo!",
      },
      listPaste: {
        noPasteFound:
          "Leider haben Sie derzeit keine Pastes im System. Wie wäre es, wenn Sie einen erstellen, indem Sie </pastebin erstellen:786466522972946462> eingeben?",
        pasteLabel: "Paste",
        embedTitle: "PasteBin-System - Liste",
      },
      deletePaste: {
        noPasteFound:
          "Es wurde kein Ihnen gehörender Paste in der Datenbank gefunden.",
        selectPasteToDelete:
          "Wählen Sie eine der folgenden Schaltflächen aus, um Ihren Paste zu löschen:",
        pasteLabel: "Paste",
        pasteDeletedSuccess: (index) =>
          `- Paste ${index} wurde erfolgreich gelöscht`,
        errorOccurred:
          "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        youCanDeleteYourPaste:
          "Sie können Ihren Paste löschen, indem Sie eine der folgenden Schaltflächen auswählen:",
        timedOut: "Transaktion wurde abgebrochen",
      },
      viewPaste: {
        pasteNotFound:
          "Es wurde kein Paste mit diesem öffentlichen Code gefunden",
        successTitle: "Erfolg",
      },
      invalidAction: "Ungültige Aktion ausgewählt.",
    },
    id: 14,
  },
];
