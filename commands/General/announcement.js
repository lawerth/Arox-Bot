module.exports = [
  {
    name: "announcement",
    aliases: ["announcements", "announce", "changelog", "changelogs", "duyuru"],
    desc: ["You view the bot's latest announcement.", "Botun son duyurusuna bakarsın.", "Du siehst dir die letzte Ankündigung des Bots an."],
    code: `
$sendMessage[
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Bot Duyurusu;en:Bot Announcement;de:Bot Ankündigung]:$userAvatar[$clientid]}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $username[$authorID]:$authorAvatar}
    {timestamp}
    {title:$language[tr:Duyuru Tarihi:;en:Announcement Date:;de:Ankündigungsdatum:] $discordTimestamp[$getObjectProperty[botAnnounce;publishingDate];D]}
    {description:$getObjectProperty[botAnnounce;$language[tr:tr;en:en;de:de]]}
  }
]

$createObject[botAnnounce;$getVar[botAnnounce]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];