module.exports = [
  {
    name: "help",
    description: "Lists all commands",
    content: {
      sponsor: "{{client}} is supported by {{sponsor}}.",
      title: "Command List",
      description: "Here's a list of all commands and their descriptions:",
      aiCommands: "AI Commands",
      aiCommandsList:
        "`chat`: Chat with AI\n`draw`: Draw with AI\n`pixelart`: Create pixel art with AI",
      botCommands: "Bot Commands",
      botCommandsList:
        "`help`: Shows this help message\n`sponsor`: Shows our sponsors\n`stats`: Shows bot statistics",
      funCommands: "Fun Commands",
      funCommandsList:
        "`anime`: Shows a random anime image\n`tictactoe`: Play tic-tac-toe\n`wallpaper`: Shows a random wallpaper",
      ownerCommands: "Owner Commands",
      ownerCommandsList: "`eval`: Executes code (Bot owner only)",
      pastebinCommands: "Pastebin Commands",
      pastebinCommandsList: "`pastebin`: Uploads text to Pastebin",
      watchbotCommands: "Watchbot Commands",
      watchbotCommandsList: "`watchbot`: Manages Watchbot features",
    },
    id: 1,
  },
  {
    name: "stats",
    description: "View Crow's statistics",
    content: {
      title: "Crow Statistics",
      serverCount: "Server Count",
      userCount: "User Count",
      botPing: "Bot Latency",
      cpuUsage: "CPU Usage",
      ramUsage: "RAM Usage",
      uptime: "Time of Service",
      botVersion: "Bot Version",
      shardCount: "Shard Count",
      owner: "Owner",
      sponsor: "{{client}}, powered by {{sponsor}}.",
    },
    id: 2,
  },
  {
    name: "eval",
    description: "[Admin] Run Command",
    content: {
      fail: "Only [developer](https://discord.com/users/1029431477219360869) can use this command.",
      sponsor: "{{client}}, powered by {{sponsor}}.",
    },
    firstOptions: {
      name: "code",
      description: "[Admin] Run Command",
    },
    id: 3,
  },
  {
    name: "draw",
    description: "Generate an image",
    content: {
      generatingImage: "Generating your image",
      imageName: "Image",
      expiredTime: "Button interaction time has expired",
      anErrorOccurred:
        "There is currently an issue with our AI service. Please try again later.",
    },
    firstOptions: {
      name: "request",
      description: "Enter the subject of the image",
    },
    id: 4,
  },
  {
    name: "chat",
    description: "Chat with Crow",
    content: {
      sponsor: "{{client}} is powered by {{sponsor}}.",
      resetMemory: "Reset Memory",
      previousPage: "Previous",
      nextPage: "Next",
      memoryIsEmptyOrFault: "Memory is empty or faulty",
      memoryResetted: "Memory reset successfully",
      timeExpiredForButtons: "Time for button interaction has expired(30 seconds)"
    },
    firstOptions: {
      name: "text",
      description: "What should we do with Crow today?",
    },
    id: 5,
  },
  {
    name: "pixel-art",
    description: "Generate a pixel art image",
    firstOptions: {
      name: "request",
      description: "Enter the subject of the image",
    },
    id: 6,
  },
  {
    name: "anime",
    description: "View a random anime image",
    content: {
      image: "Here's the image:",
      isNotNSFWChannel:
        "This channel is not an NSFW channel. Please enable this setting and try again.",
    },
    firstOptions: {
      name: "nsfw",
      description: "Do you want an NSFW image?",
    },
    id: 7,
  },
  {
    name: "tictactoe",
    description: "Play Tic-Tac-Toe with Crow",
    firstOptions: {
      name: "user",
      description: "Tag a user!",
    },
    id: 8,
  },
  {
    name: "wallpaper",
    description: "View a random anime wallpaper",
    content: {
      image: "Here's the image:",
    },
    id: 9,
  },
  {
    name: "sponsor",
    description: "Get information about Crow's sponsor",
    id: 12,
  },
  {
    name: "watchbot",
    description: "Manage your bots with the Watchbot system",
    firstOptions: {
      name: "action",
      description: "Choose the action you want to perform",
      choices: {
        add: "Add a bot",
        list: "List your bots",
        delete: "Delete a bot",
      },
    },
    content: {
      sponsor: "{{client}} is sponsored by {{sponsor}}.",
      add: {
        name: "add",
        description: "Add a bot",
      },
      list: {
        name: "list",
        description: "List your bots",
      },
      delete: {
        name: "delete",
        description: "Delete a bot",
      },
      addBot: {
        description:
          "If you want to have your bot monitored through Crow, you can do so via the official website. Click the button below to go there!",
        goToWebSite: "Go to Website",
      },
      listBot: {
        errorTitle: "Error",
        noBotFound:
          "Unfortunately, there are no bots belonging to you in the system right now. How about adding a bot by typing </watchbot add:786466522972946462>?",
        botLabel: "Bot",
        embedTitle: "WatchBot System - List",
      },
      delBot: {
        noBotFound: "No bots found in the database belonging to you.",
        selectBotToDelete:
          "Select one of the buttons below to delete your bot:",
        botLabel: "Bot",
        botDeletedSuccess: (index) => `- Bot ${index} successfully deleted`,
        errorOccurred: "An error occurred. Please try again.",
        youCanDeleteYourBot:
          "You can delete your bot by selecting one of the buttons below:",
      },
    },
    id: 13,
  },
  {
    name: "pastebin",
    description: "Manage your content with the Pastebin system",
    firstOptions: {
      name: "action",
      description: "Choose the action you want to perform",
      choices: {
        create: "Create paste",
        list: "List pastes",
        delete: "Delete paste",
        view: "View paste",
      },
    },
    secondOptions: {
      name: "code",
      description: "Enter the public code of the paste you want to view",
    },
    thirdOptions: {
      name: "private",
      description: "Should the message be sent only to you?",
    },
    content: {
      errorTitle: "Error",
      createPaste: {
        successTitle:
          "Your paste has been successfully added to the system. Thank you for choosing us.",
        publicCode: (code) => "Here's your public PasteBin code: " + code,
        modalTitle: "Create New Paste",
        contentLabel: "Write the necessary content here",
        contentPlaceholder: "Hello!",
      },
      listPaste: {
        noPasteFound:
          "Unfortunately, you currently have no pastes in the system. How about creating one by typing </pastebin create:786466522972946462>?",
        pasteLabel: "Paste",
        embedTitle: "PasteBin System - List",
      },
      deletePaste: {
        noPasteFound: "No paste belonging to you was found in the database.",
        selectPasteToDelete:
          "Select one of the buttons below to delete your paste:",
        pasteLabel: "Paste",
        pasteDeletedSuccess: (index) =>
          `- Paste ${index} was successfully deleted`,
        errorOccurred: "An error occurred. Please try again.",
        youCanDeleteYourPaste:
          "You can delete your paste by selecting one of the buttons below:",
        timedOut: "Transaction timed out",
      },
      viewPaste: {
        pasteNotFound: "No paste with this public code was found",
        successTitle: "Success",
      },
      invalidAction: "Invalid action selected.",
    },
    id: 14,
  },
];
