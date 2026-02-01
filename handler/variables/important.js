module.exports = (arox) => {
  arox.variables(
    {
      isBlacklisted: false,
      blacklistData: {},

      isMaintenance: false,
      maintenanceData: {},

      isPremium: false,
      premiumData: {},

      botRules: false,
      botRulesTotalAccept: 0,
      
      channelDisable: false,

      lang: "en",
    },
    "important",
  );
};
