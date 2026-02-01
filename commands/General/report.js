module.exports = [
  {
    name: "report",
    aliases: ["bugreport", "bug", "hatabildir", "hata", "bildir"],
    desc: ["You report any bugs found in the bot to the developers.", "Botta bulunan hataları geliştiricilere bildirirsin.", "Du meldest alle Fehler, die im Bot gefunden werden."],
    usage: "bug-report {text}",
    example: ["report I found a bug!"],
    code: `
$channelSendMessage[$customChannelID[suggestsLog];
  {newEmbed:
    {author:$userDisplayName[$authorid] \($username[$authorid]\) | Bug Reported:$userAvatar[$authorid]}
    {color:$getVar[embedcolor]}
    {timestamp}
    {thumbnail:$emojiURL[$emojiID[report]]}
    {description:>>> *$message*\n
- **👤 [User Profile](https://discordapp.com/users/$authorid)**
- **💬 [Message Link](https://discord.com/channels/$guildID/$channelID/$messageID)**
- **🛡 Server#COLON# $guildName[$guildid]**}
  }
;false]

$onlyIf[$checkContains[$channelPermissionsFor[$clientID;$customChannelID[suggestsLog];, ];SendMessages;SendMessage]==true;]
$onlyIf[$channelExists[$customChannelID[suggestsLog]]==true;]

$reply
$nonEscape[**$emoji[success] | $userDisplayName**, $language[tr:Başarıyla bildiri mesajın geliştirilere iletildi. Bildirdiğin için teşekkür ederiz!;en:The report message has been successfully delivered to the developers. Thanks for reporting!;de:Deine Meldung wurde erfolgreich an das Team weitergeleitet. Vielen Dank für deine Meldung!]]

$onlyif[$charCount[$message]>=25;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen daha uzun bir mesaj yazıp tekrar deneyin!;en:Please write a longer message and try again!;de:Bitte schreibe eine längere Nachricht und versuche es erneut!]] {deleteIn:5s}]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];
