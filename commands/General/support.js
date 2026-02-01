module.exports = [
  {
	  name: "support",
	  aliases: ["botsupport", "sup", "guild", "guildlink", "botdestek", "destek"],
    desc: ["Sends the link to the bot's support server.", "Botun destek sunucusunun bağlantısını gönderir.", "Bot-Einladungslink senden."],
    code: `
**$emoji[greeting] | $language[tr:Selam, $userDisplayName**! Destek sunucumuza katılmak için aşağıdaki butona tıklayabilirsin!;en:Hi, $userDisplayName**! Click the button below to join our support server!;de:Hallo, $userDisplayName**! Du kannst auf die untenstehende Schaltfläche klicken, um unserem Support-Server beizutreten!]
$addButton[1;$language[tr:Destek Sunucusu;en:Support Server;de:Support Server];link;$nonEscape[$botLink[support]];false]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];