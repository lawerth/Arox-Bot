module.exports = (arox) => {
  arox.variables(
    {
      cash: 0,
      bank: 0,
      pray: 0,

      //Global Crypto Variables
      btc_value: 500000, btc_data: {},
      eth_value: 100000, eth_data: {},
      bnb_value: 40000, bnb_data: {},
      sol_value: 25000, sol_data: {},
      tet_value: 7000, tet_data: {},
      updateEnabled: true,
      
      //User Crypto Variables
      bitcoin: { amount: 0, lastPurchase: 0, lastPurchaseDate: 0 },
      ethereum: { amount: 0, lastPurchase: 0, lastPurchaseDate: 0 },
      binance: { amount: 0, lastPurchase: 0, lastPurchaseDate: 0 },
      solana: { amount: 0, lastPurchase: 0, lastPurchaseDate: 0 },
      tether: { amount: 0, lastPurchase: 0, lastPurchaseDate: 0 },

      //Professions Variables
      profession: 0,
      beggingCount: 0,
      workingCount: 0,

      //Leveling System Variables
      level: 0,
      currentXp: 0,
      requiredXp: 5000,
      totalXp: 0,
      dailyXpEarned: 0,
      firstMessage: false,

      //Backgrounds Variables
      background: 100,
      backgrounds: ["100"],

      //Voting Variables
      voted: false,
      lastVote: 0,
      totalVote: 0,
      voteStreak: 0,
      voteTimeoutID: 0,
      voteReminder: true,
      
      //Gambling Data
      coinflipData: { cash_win: 0, cash_lose: 0, games_played: 0, games_win: 0, games_lose: 0 },
      diceData: { cash_win: 0, cash_lose: 0, games_played: 0, games_win: 0, games_lose: 0 },
      guessnumberData: { cash_win: 0, cash_lose: 0, games_played: 0, games_win: 0, games_lose: 0 },
      rouletteData: { cash_win: 0, cash_lose: 0, games_played: 0, games_win: 0, games_lose: 0 },
      rpsData: { cash_win: 0, cash_lose: 0, games_played: 0, games_win: 0, games_lose: 0 },
      slotsData: { cash_win: 0, cash_lose: 0, games_played: 0, games_win: 0, games_lose: 0 },

      //Default Colors
      embedcolor: "#0096FF",
      color_black: "#343434",
      color_red: "#F65151",
      color_green: "#4CBB17",
      color_blue: "#1F51FF",
      color_cyan: "#7DF9FF",
      color_brown: "#D27D2D",
      color_grey: "#708090",
      color_orange: "#FFAC1C",
      color_pink: "#FF69B4",
      color_purple: "#BF40BF",
      color_white: "#F9F6EE",
      color_yellow: "#FDDA0D",

      //Other Bot's Variables
      prefix: "a!", 
      promoCodes: {},
      messageBuilderContent: "No content.",
      admins: ["592791390287822848"],
      botAnnounce: {},
      botAnnouncePreview: {},

      //Other User Variables
      dailyClaim: false,
      fastClickAmount: 0,
    },
    "main"
  );
};
