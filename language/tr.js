module.exports = [
  {
    name: "yardım",
    description: "Tüm komutları listeler",
    content: {
      sponsor: "{{client}}, {{sponsor}} tarafından desteklenmektedir.",
      title: "Komut Listesi",
      description:
        "Aşağıda tüm komutların listesi ve açıklamaları bulunmaktadır:",
      aiCommands: "AI Komutları",
      aiCommandsList:
        "`chat`: AI ile sohbet edin\n`draw`: AI ile resim çizin\n`pixelart`: AI ile pixel art oluşturun",
      botCommands: "Bot Komutları",
      botCommandsList:
        "`help`: Bu yardım mesajını gösterir\n`sponsor`: Sponsorlarımızı gösterir\n`stats`: Bot istatistiklerini gösterir",
      funCommands: "Eğlence Komutları",
      funCommandsList:
        "`anime`: Rastgele anime resmi gösterir\n`tictactoe`: XOX oyunu oynayın\n`wallpaper`: Rastgele duvar kağıdı gösterir",
      ownerCommands: "Sahip Komutları",
      ownerCommandsList:
        "`eval`: Kod çalıştırır (Sadece bot sahibi kullanabilir)",
      pastebinCommands: "Pastebin Komutları",
      pastebinCommandsList: "`pastebin`: Pastebin'e metin yükler",
      watchbotCommands: "Watchbot Komutları",
      watchbotCommandsList: "`watchbot`: Watchbot özelliklerini yönetir",
    },
    id: 1,
  },
  {
    name: "istatistik",
    description: "Crow Hakkındaki istatistiklere bakarsınız",
    content: {
      title: "Crow İstatistikleri",
      serverCount: "Sunucu Sayısı",
      userCount: "Kullanıcı Sayısı",
      botPing: "Bot Gecikmesi",
      cpuUsage: "CPU Kullanımı",
      ramUsage: "RAM Kullanımı",
      uptime: "Hizmet Süresi",
      botVersion: "Bot Sürümü",
      shardCount: "Shard Sayısı",
      owner: "Sahip",
      sponsor: "{{client}}, {{sponsor}} tarafından desteklenmektedir.",
    },
    id: 2,
  },
  {
    name: "eval",
    description: "[Yönetici] Komut Çalıştır",
    content: {
      fail: "Bu komutu sadece [geliştirici](https://discord.com/users/1029431477219360869) kullanabilir.",
      sponsor: "{{client}}, {{sponsor}} tarafından desteklenmektedir.",
    },
    firstOptions: {
      name: "kod",
      description: "[Yönetici] Komut Çalıştır",
    },
    id: 3,
  },
  {
    name: "çiz",
    description: "Resim çizdirirsiniz",
    content: {
      generatingImage: "Resminiz oluşturuluyor",
      imageName: "Resim",
      expiredTime: "Butonların etkileşim süresi doldu",
      anErrorOccurred:
        "Şuanda yapay zeka hizmetimizde bir sorun var. Lütfen daha sonra tekrar deneyiniz",
    },
    firstOptions: {
      name: "istek",
      description: "Resmin konusunu giriniz",
    },
    id: 4,
  },
  {
    name: "sohbet",
    description: "Crow ile sohbet edersiniz",
    content: {
      sponsor: "{{client}}, {{sponsor}} tarafından desteklenmektedir.",
      resetMemory: "Belleği Sıfırla",
      previousPage: "Önceki",
      nextPage: "Sonraki",
      memoryIsEmptyOrFault: "Bellek boş veya hatalı",
      memoryResetted: "Bellek başarıyla sıfırlandı",
      timeExpiredForButtons: "Buton etkileşimi için süre doldu(30 saniye)"
    },
    firstOptions: {
      name: "metin",
      description: "Crow ile bugün ne yapsak ki?",
    },
    id: 5,
  },
  {
    name: "piksel-sanat",
    description: "Piksel sanat resimi çizdirirsiniz",
    firstOptions: {
      name: "istek",
      description: "Resmin konusunu giriniz",
    },
    id: 6,
  },
  {
    name: "anime",
    description: "Rastgele bir anime resmi görüntülersiniz",
    content: {
      image: "İşte resim:",
      isNotNSFWChannel:
        "Bu kanal bir NSFW kanalı değil. Lütfen bu ayarı açıp tekrar deneyiniz",
    },
    firstOptions: {
      name: "nsfw",
      description: "NSFW Resimi istiyormusunuz?",
    },
    id: 7,
  },
  {
    name: "tictactoe",
    description: "Crow ile Tic-Tac-Toe oyununu oynarsınız",
    firstOptions: {
      name: "kullanıcı",
      description: "Bir kullanıcı etiketle!",
    },
    id: 8,
  },
  {
    name: "duvar_kağıdı",
    description: "Rastgele bir anime duvar kağıdı resmi görüntülersiniz",
    content: {
      image: "İşte resim:",
    },
    id: 9,
  },
  {
    name: "sponsor",
    description: "Crow'un sponsoru hakkında bilgi alırsınız",
    id: 12,
  },
  {
    name: "watchbot",
    description: "Watchbot sistemi ile botlarınızı yönetin",
    firstOptions: {
      name: "işlem",
      description: "Yapmak istediğiniz işlemi seçin",
      choices: {
        add: "Bot ekle",
        list: "Botları listele",
        delete: "Bot sil",
      },
    },
    content: {
      sponsor: "{{client}}, {{sponsor}} tarafından desteklenmektedir.",
      addBot: {
        description:
          "Crow üzerinden botunu kontrol ettirmek istiyorsan resmi internet sitesi üzerinden işlem yapabilirsin. Gitmek için aşağıdaki butona tıkla!",
        goToWebSite: "Siteye Git",
      },
      listBot: {
        errorTitle: "Hata",
        noBotFound:
          "Maalesef şu anda sistemde size ait hiçbir bot yok. </watchbot ekle:786466522972946462> yazarak bir bot eklemeye ne dersiniz?",
        botLabel: "Bot",
        embedTitle: "WatchBot Sistemi - Liste",
      },
      delBot: {
        noBotFound: "Veritabanında size ait herhangi bir bot bulunamadı.",
        selectBotToDelete:
          "Aşağıdaki butonlardan birini seçerek botunuzu silebilirsiniz:",
        botLabel: "Bot",
        botDeletedSuccess: (index) => `- Bot ${index} başarıyla silindi`,
        errorOccurred: "Bir hata oluştu. Lütfen tekrar deneyin.",
        youCanDeleteYourBot:
          "Aşağıdaki butonlardan birini seçerek botunu silebilirsin:",
      },
    },
    id: 13,
  },
  {
    name: "pastebin",
    description: "Pastebin sistemi ile içeriklerinizi yönetin",
    firstOptions: {
      name: "işlem",
      description: "Yapmak istediğiniz işlemi seçin",
      choices: {
        create: "Paste oluştur",
        list: "Paste'leri listele",
        delete: "Paste sil",
        view: "Paste görüntüle",
      },
    },
    secondOptions: {
      name: "kod",
      description:
        "Görüntülemek istediğiniz Paste'nin herkese açık kodunu girin",
    },
    thirdOptions: {
      name: "gizli",
      description: "Mesajı yalnızca size mi gönderilsin?",
    },
    content: {
      errorTitle: "Hata",
      createPaste: {
        successTitle:
          "Pasteniz başarıyla sisteme eklendi. Bizi tercih ettiğiniz için teşekkür ederiz.",
        publicCode: (code) => "İşte Herkese Açık PasteBin Kodunuz: " + code,
        modalTitle: "Yeni Paste Oluştur",
        contentLabel: "Bu kısıma gerekli içeriği yazınız",
        contentPlaceholder: "Merhaba!",
      },
      listPaste: {
        noPasteFound:
          "Maalesef şu anda sistemde size ait hiçbir paste yok. </pastebin oluştur:786466522972946462> yazarak bir paste oluşturmaya ne dersiniz?",
        pasteLabel: "Paste",
        embedTitle: "PasteBin Sistemi - Liste",
      },
      deletePaste: {
        noPasteFound: "Veritabanında size ait herhangi bir paste bulunamadı.",
        selectPasteToDelete:
          "Aşağıdaki butonlardan birini seçerek pastenizi silebilirsiniz:",
        pasteLabel: "Paste",
        pasteDeletedSuccess: (index) => `- Paste ${index} başarıyla silindi`,
        errorOccurred: "Bir hata oluştu. Lütfen tekrar deneyin.",
        youCanDeleteYourPaste:
          "Aşağıdaki butonlardan birini seçerek pastenizi silebilirsiniz:",
        timedOut: "İşlem zamanaşımına uğradı",
      },
      viewPaste: {
        pasteNotFound: "Böyle bir Herkese Açık Koda sahip bir Paste bulunmuyor",
        successTitle: "Başarılı",
      },
      invalidAction: "Geçersiz işlem seçildi.",
    },
    id: 14,
  },
];
