module.exports = [
  {
    name: "ayuda",
    description: "Lista todos los comandos",
    content: {
      sponsor: "{{client}} está patrocinado por {{sponsor}}.",
      title: "Lista de Comandos",
      description:
        "Aquí está la lista de todos los comandos y sus descripciones:",
      aiCommands: "Comandos de IA",
      aiCommandsList:
        "`chat`: Chatea con la IA\n`draw`: Dibuja con la IA\n`pixelart`: Crea pixel art con la IA",
      botCommands: "Comandos del Bot",
      botCommandsList:
        "`help`: Muestra este mensaje de ayuda\n`sponsor`: Muestra nuestros patrocinadores\n`stats`: Muestra las estadísticas del bot",
      funCommands: "Comandos de Diversión",
      funCommandsList:
        "`anime`: Muestra una imagen de anime aleatoria\n`tictactoe`: Juega al tres en raya\n`wallpaper`: Muestra un fondo de pantalla aleatorio",
      ownerCommands: "Comandos del Propietario",
      ownerCommandsList:
        "`eval`: Ejecuta código (Solo para el propietario del bot)",
      pastebinCommands: "Comandos de Pastebin",
      pastebinCommandsList: "`pastebin`: Sube texto a Pastebin",
      watchbotCommands: "Comandos de Watchbot",
      watchbotCommandsList: "`watchbot`: Gestiona las funciones de Watchbot",
    },
    id: 1,
  },
  {
    name: "estadísticas",
    description: "Ver las estadísticas de Crow",
    content: {
      title: "Estadísticas de Crow",
      serverCount: "Cantidad de servidores",
      userCount: "Cantidad de usuarios",
      botPing: "Latencia del bot",
      cpuUsage: "Uso de CPU",
      ramUsage: "Uso de RAM",
      uptime: "Tiempo de servicio",
      botVersion: "Versión del bot",
      shardCount: "Cantidad de shards",
      owner: "Propietario",
      sponsor: "{{client}}, patrocinado por {{sponsor}}.",
    },
    id: 2,
  },
  {
    name: "eval",
    description: "[Admin] Ejecuta un comando",
    content: {
      fail: "Solo [desarrollador](https://discord.com/users/1029431477219360869) puede usar este comando.",
      sponsor: "{{client}}, patrocinado por {{sponsor}}.",
    },
    firstOptions: {
      name: "código",
      description: "[Admin] Ejecuta un comando",
    },
    id: 3,
  },
  {
    name: "dibuja",
    description: "Genera una imagen",
    content: {
      generatingImage: "Generando tu imagen",
      imageName: "Imagen",
      expiredTime: "El tiempo de interacción del botón ha expirado",
      anErrorOccurred:
        "Hay un problema con nuestro servicio de inteligencia artificial. Por favor, inténtalo de nuevo más tarde.",
    },
    firstOptions: {
      name: "solicitud",
      description: "Ingresa el tema de la imagen",
    },
    id: 4,
  },
  {
    name: "charla",
    description: "Chatea con Crow",
    content: {
      sponsor: "{{client}} está patrocinado por {{sponsor}}.",
      resetMemory: "Reiniciar Memoria",
      previousPage: "Anterior",
      nextPage: "Siguiente",
      memoryIsEmptyOrFault: "La memoria está vacía o defectuosa",
      memoryResetted: "Restablecimiento de la memoria con éxito",
      timeExpiredForButtons: "El tiempo para la interacción con los botones ha expirado(30 segundos)"
    },
    firstOptions: {
      name: "texto",
      description: "¿Qué deberíamos hacer con Crow hoy?",
    },
    id: 5,
  },
  {
    name: "arte-pixel",
    description: "Genera una imagen de arte en píxeles",
    firstOptions: {
      name: "solicitud",
      description: "Ingresa el tema de la imagen",
    },
    id: 6,
  },
  {
    name: "anime",
    description: "Ver una imagen aleatoria de anime",
    content: {
      image: "Aquí está la imagen:",
      isNotNSFWChannel:
        "Este canal no es un canal NSFW. Por favor, habilita esta configuración e inténtalo de nuevo.",
    },
    firstOptions: {
      name: "nsfw",
      description: "¿Quieres una imagen NSFW?",
    },
    id: 7,
  },
  {
    name: "tic-tac-toe",
    description: "Juega Tic-Tac-Toe con Crow",
    firstOptions: {
      name: "usuario",
      description: "Etiqueta a un usuario",
    },
    id: 8,
  },
  {
    name: "fondo-de-pantalla",
    description: "Ver un fondo de pantalla de anime aleatorio",
    content: {
      image: "Aquí está la imagen:",
    },
    id: 9,
  },
  {
    name: "patrocinador",
    description: "Obtén información sobre el patrocinador de Crow",
    id: 12,
  },
  {
    name: "watchbot",
    description: "Administre sus bots con el sistema Watchbot",
    firstOptions: {
      name: "acción",
      description: "Elija la acción que desea realizar",
      choices: {
        add: "Agregar un bot",
        list: "Listar sus bots",
        delete: "Eliminar un bot",
      },
    },
    content: {
      sponsor: "{{client}} está patrocinado por {{sponsor}}.",
      addBot: {
        description:
          "Si deseas que tu bot sea monitoreado a través de Crow, puedes hacerlo a través del sitio web oficial. ¡Haz clic en el botón de abajo para ir allí!",
        goToWebSite: "Ir al Sitio Web",
      },
      listBot: {
        errorTitle: "Error",
        noBotFound:
          "Desafortunadamente, no hay bots que le pertenezcan en el sistema en este momento. ¿Qué tal si agrega un bot escribiendo </watchbot agregar:786466522972946462>?",
        botLabel: "Bot",
        embedTitle: "Sistema WatchBot - Lista",
      },
      delBot: {
        noBotFound:
          "No se encontraron bots en la base de datos que le pertenezcan.",
        selectBotToDelete:
          "Seleccione uno de los botones a continuación para eliminar su bot:",
        botLabel: "Bot",
        botDeletedSuccess: (index) => `- Bot ${index} eliminado con éxito`,
        errorOccurred: "Ocurrió un error. Por favor, inténtelo de nuevo.",
        youCanDeleteYourBot:
          "Puede eliminar su bot seleccionando uno de los botones a continuación:",
      },
    },
    id: 13,
  },
  {
    name: "pastebin",
    description: "Gestione sus contenidos con el sistema Pastebin",
    firstOptions: {
      name: "accion",
      description: "Seleccione la acción que desea realizar",
      choices: {
        create: "Crear paste",
        list: "Listar pastes",
        delete: "Eliminar paste",
        view: "Ver paste",
      },
    },
    secondOptions: {
      name: "codigo",
      description: "Ingrese el código público del paste que desea ver",
    },
    thirdOptions: {
      name: "privado",
      description: "¿Debería enviarse el mensaje solo a usted?",
    },
    content: {
      errorTitle: "Error",
      createPaste: {
        successTitle:
          "Su paste se ha añadido con éxito al sistema. Gracias por elegirnos.",
        publicCode: (code) => "Aquí está su código PasteBin público: " + code,
        modalTitle: "Crear nuevo paste",
        contentLabel: "Escriba el contenido necesario aquí",
        contentPlaceholder: "¡Hola!",
      },
      listPaste: {
        noPasteFound:
          "Desafortunadamente, actualmente no tiene ningún paste en el sistema. ¿Qué tal si crea uno escribiendo </pastebin crear:786466522972946462>?",
        pasteLabel: "Paste",
        embedTitle: "Sistema PasteBin - Lista",
      },
      deletePaste: {
        noPasteFound:
          "No se encontró ningún paste que le pertenezca en la base de datos.",
        selectPasteToDelete:
          "Seleccione uno de los botones a continuación para eliminar su paste:",
        pasteLabel: "Paste",
        pasteDeletedSuccess: (index) =>
          `- El paste ${index} se eliminó con éxito`,
        errorOccurred: "Ocurrió un error. Por favor, inténtelo de nuevo.",
        youCanDeleteYourPaste:
          "Puede eliminar su paste seleccionando uno de los botones a continuación:",
        timedOut: "Transacción finalizada",
      },
      viewPaste: {
        pasteNotFound: "No se encontró ningún paste con este código público",
        successTitle: "Éxito",
      },
      invalidAction: "Se seleccionó una acción no válida.",
    },
    id: 14,
  },
];
