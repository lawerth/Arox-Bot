module.exports = [
  {
	  name: "prefix",
	  aliases: ["önek"],
    desc: ["You change the bot's prefix on the server.", "Botun sunucudaki prefixini (ön ekini) değiştirirsin.", "Du änderst das Präfix des Bots auf dem Server."],
    usage: "prefix {newPrefix}",
    example: ["prefix !"],
    code: `
$setGuildVar[prefix;$message[1];$guildid]

$author[$username[$clientid] | $language[tr:Önek Değiştirildi;en:Prefix Changed;de:Präfix Wurde Geändert];$userAvatar[$clientid]]
$color[$getVar[embedcolor]]
$description[$nonEscape[**$emoji[success] |** $language[tr:Bu sunucunun öneki başarıyla **$message[1]** olarak değiştirildi.;en:This server's prefix has been successfully changed to **$message[1]**.;de:Das Präfix dieses Servers wurde erfolgreich in **$message[1]** geändert.]]]
$footer[$language[tr:Komutu kullanan:;en:Used by;de:Verwendet von:] $username;$authorAvatar]
$addTimestamp

$onlyif[$charCount[$message[1]]<5;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Önek en fazla 5 karakterden oluşabilir!;en:Prefix can consist of maximum 5 characters!;de:Das Präfix darf höchstens 5 Zeichen lang sein!]] {deleteIn:5s}]
$onlyPerms[manageguild;administrator;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu komutu kullanabilmek için \`Sunucuyu Yönet\` iznine sahip olmalısın!;en:You must have \`Manage Server\` permission to use this command!;de:Du musst die Berechtigung \`Server Verwalten\` haben, um diesen Befehl zu verwenden!]] {deleteIn:5s}]
$onlyif[$message!=;$nonEscape[$language[tr:Bu sunucudaki önekim \`$getGuildVar[prefix;$guildid]\`. Mevcut komutlarıma ulaşmak için \`$getGuildVar[prefix;$guildid]yardım\` yazın!;en:My prefix on this server is \`$getGuildVar[prefix;$guildid]\`. Type \`$getGuildVar[prefix;$guildid]help\` to access my available commands!;de:Das Präfix in diesem Server ist \`$getGuildVar[prefix;$guildid]\`. Um auf meine aktuellen Befehle zuzugreifen, schreibe \`$getGuildVar[prefix;$guildid]help\`!]] {reply:$messageID:false}]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
	  `
  },
  {
	  name: "<@$clientID>",
    aliases: ["Arox"],
	  nonPrefixed: true,
    code:`
$reply
$nonEscape[👋 $language[tr:Merhaba! Bu sunucudaki önekim \`$getGuildVar[prefix;$guildid]\`. Mevcut komutlarıma ulaşmak için \`$getGuildVar[prefix;$guildid]yardım\` yazın!;en:Hello! My prefix on this server is \`$getGuildVar[prefix;$guildid]\`. Type \`$getGuildVar[prefix;$guildid]help\` to access my available commands!;de:Hallo! Das Präfix in diesem Server ist \`$getGuildVar[prefix;$guildid]\`. Um auf meine aktuellen Befehle zuzugreifen, schreibe \`$getGuildVar[prefix;$guildid]help\`!]]
$onlyIf[$toLowercase[$message]==arox||$message==<@$clientID>;]
	  `
  }
];