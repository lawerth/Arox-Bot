module.exports = [
  {
	  name: "invite",
	  aliases: ["botinvite", "davet"],
    desc: ["Sends the bot's invite link.", "Botun davet bağlantısını gönderir.", "Bot-Einladungslink senden."],
    code: `
**$emoji[greeting] | $language[tr:Selam, $userDisplayName**! Beni sunucuna davet etmek için aşağıdaki butona tıklayabilirsin!;en:Hi, $userDisplayName**! You can click the button below to invite me to your server!;de:Hallo, $userDisplayName**! Du kannst auf die untenstehende Schaltfläche klicken, um mich zu deinem Server einzuladen!]
$addButton[1;$language[tr:$username[$clientID]'u Ekle;en:Add $username[$clientID];de:$username[$clientID] Hinzufügen];link;$nonEscape[$botLink[invite]];false]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];