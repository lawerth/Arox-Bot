module.exports = [
  {
	  name: "suggest",
	  aliases: ["suggestion", "öneri", "öner"],
    desc: ["You can share your suggestions about the bot with the developers.", "Bot hakkındaki önerilerini geliştiricilere iletirsin.", "Du kannst deine Vorschläge zum Bot mit den Entwicklern teilen."],
    usage: "suggest {text}",
    example: ["suggest I have an idea!"],
    code: `
$channelSendMessage[$customChannelID[suggestsLog];
  {newEmbed:
    {author:$userDisplayName[$authorid] \($username[$authorid]\) | Suggested:$userAvatar[$authorid]}
    {thumbnail:$emojiURL[$emojiID[suggest]]}
    {description:>>> *$message*\n
- **👤 [User Profile](https://discordapp.com/users/$authorid)**
- **💬 [Message Link](https://discord.com/channels/$guildID/$channelID/$messageID)**
- **🛡 Server#COLON# $guildName[$guildid]**}
    {color:$getvar[embedcolor]}
    {timestamp}
  }
;false]

$onlyIf[$checkContains[$channelPermissionsFor[$clientID;$customChannelID[suggestsLog];, ];SendMessages;SendMessage]==true;]
$onlyIf[$channelExists[$customChannelID[suggestsLog]]==true;]

$reply
$nonEscape[**$emoji[success] | $userDisplayName**, $language[tr:Başarıyla öneri mesajın geliştirilere iletildi. Önerin için teşekkür ederiz!;en:The suggest message has been successfully delivered to the developers. Thanks for suggest!;de:Dein Vorschlag wurde erfolgreich an das Team weitergeleitet. Vielen Dank für deine Idee!]]

$onlyif[$charCount[$message]>=25;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen daha uzun bir mesaj yazıp tekrar deneyin!;en:Please write a longer message and try again!;de:Bitte schreibe eine längere Nachricht und versuche es erneut!]] {deleteIn:5s}]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];