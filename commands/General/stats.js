module.exports = [
  {
	  name: "stats",
	  aliases: ["stat", "statistics", "botinfo", "istatistik", "botbilgi"],
    desc: ["Shows statistical information of the bot.", "Botun istatistiksel bilgilerini gösterir.", "Zeigt statistische Informationen des Bots an."],
    code: `
$sendMessage[
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Bot Bilgileri;en:Bot Information;de:Bot Informationen]:$userAvatar[$clientid]}
    {color:$getVar[embedcolor]}
    {timestamp}
    {thumbnail:$userAvatar[$clientID]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $username[$authorID]:$authorAvatar}
    {field:🛠️ $language[tr:Bot Geliştiricileri;en:Bot Developers;de:Bot Entwickler]:$nonEscape[$get[botAdmins]]:false}
    {field:🤖 $language[tr:Bot Bilgileri;en:Bot Information;de:Bot Informationen]:$nonEscape[> **• $language[tr:Çalışma Süresi:;en:Working Time:;de:Betriebszeit:]** $get[uptime]\n> **• $language[tr:Sunucu Sayısı:;en:Server Count:;de:Anzahl der Server:]** $numberSeparator[$guildCount]\n> **• $language[tr:Kullanıcı Sayısı:;en:User Count:;de:Anzahl der Benutzer:]** $numberSeparator[$allMembersCount]\n> **• $language[tr:Kanal Sayısı:;en:Channel Count:;de:Anzahl der Kanäle:]** $numberSeparator[$allChannelsCount]\n> **• $language[tr:Bellek Kullanımı:;en:Memory Usage:;de:Speicherauslastung:]** $truncate[$ram]MB\n> **• $language[tr:CPU Kullanımı:;en:CPU Usage:;de:CPU Auslastung:]** $cropText[$cpu[os];4;0]%]:false}
    {field:⌛ $language[tr:Gecikme Bilgileri;en:Latency Information;de:Verzögerungsinformationen]:$nonEscape[> **• $language[tr:Bot Gecikmesi:;en:Bot Ping:;de:Bot Verzögerung:]** $pingms\n> **• $language[tr:Mesaj Gecikmesi:;en:Message Ping:;de:Nachrichtenverzögerung:]** $truncate[$messagePing]ms\n> **• $language[tr:Veri Tabanı Gecikmesi:;en:Database Ping:;de:Datenbankverzögerung:]** $databasePingms]:false}
    {field:🔗 $language[tr:Bot Bağlantıları;en:Bot Links;de:Bot Verbindungen]:> **• [$language[tr:Destek Sunucusu;en:Support Server;de:Support Server]]($botLink[support])**\n> **• [$language[tr:Davet Et;en:Invite;de:Einladen]]($botLink[invite])**\n> **• [$language[tr:Oy Ver;en:Vote for Bot;de:Abstimmen]]($botLink[topgg])**\n> **• [$language[tr:Website;en:Website;de:Website]]($botLink[website])**:false}
  }
]

$let[botAdmins;> **•** $joinSplitText[\n> **•** ]]
$textSplit[$djsEval[d.client.application.fetch().then(x => x.owner.members ? x.owner.members.map(m => { const u = d.client.users.cache.get(m.id); return u ? u.displayName + " (" + u.username + ")" : m.id; }).reverse().join(" , ") : (() => { const u = d.client.users.cache.get(x.owner.id); return u ? u.displayName + " (" + u.username + ")" : x.owner.id; })());true]; , ]

$let[uptime;$advancedReplaceText[$uptime[full];week;$language[tr:Hafta;en:Week;de:Wochen];weeks;$language[tr:Hafta;en:Weeks;de:Wochen];day;$language[tr:Gün;en:Day;de:Tag];days;$language[tr:Gün;en:Days;de:Tage];hour;$language[tr:Saat;en:Hour;de:Stunde];hours;$language[tr:Saat;en:Hours;de:Stunden];minute;$language[tr:Dakika;en:Minute;de:Minute];minutes;$language[tr:Dakika;en:Minutes;de:Minuten];second;$language[tr:Saniye;en:Second;de:Sekunde];seconds;$language[tr:Saniye;en:Seconds;de:Sekunden]]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];