module.exports = [
  {
	  name: "ping",
    aliases: ["delay", "latency", "ms", "gecikme"],
    desc: ["Shows the latency of the bot.", "Botun gecikme süresini gösterir.", "Zeigt die Latenz des Bots an."],
	  code: `
$sendMessage[
  {newEmbed:
    {title:⌛ $language[tr:Gecikme Bilgileri;en:Latency Information;de:Verzögerungsinformationen]}
    {color:$getVar[embedcolor]}
    {description:$nonEscape[
**🏓 $language[tr:Bot Gecikmesi:;en:Bot Ping:;de:Bot Verzögerung:]** $pingms
**💬 $language[tr:Mesaj Gecikmesi:;en:Message Ping:;de:Nachrichtenverzögerung:]** $messagePingms
**🌐 $language[tr:Veri Tabanı Gecikmesi:;en:Database Ping:;de:Datenbankverzögerung:]** $databasePingms]}
  }
]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];