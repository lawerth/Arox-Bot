module.exports = [
  {
    name: "channel",
    aliases: ["kanal"],
    desc: ["You can turn the bot's usage open/close in the channel.", "Kanalda botun kullanımını kapatırsın/açarsın.", "Du kannst die Verwendung des Bots im Kanal öffnen/schließen."],
    usage: "channel [open|close]",
    example: ["channel open", "channel close"],
    code: `
$setChannelVar[channelDisable;$get[action];$channelid;important]

$nonEscape[**$emoji[success] | $userDisplayName**, $language[tr:Bu kanalda komut kullanımı başarıyla $advancedReplaceText[$get[action];false;**aktif** edildi!;true;**devre dışı** bırakıldı!];en:Command usage has been succesfully **$advancedReplaceText[$get[action];false;enabled;true;disabled]** on this channel!;de:Die Befehlsnutzung wurde in diesem Kanal erfolgreich **$advancedReplaceText[$get[action];false;aktiviert;true;deaktiviert]**.]]

$onlyIf[$get[action]!=$getChannelVar[channelDisable;$channelid;important];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu kanalda komut kullanımı zaten **$advancedReplaceText[$get[action];true;devre dışı;false;aktif]** halde!;en:This channel already has command usage **$advancedReplaceText[$get[action];true;disabled;false;enabled]**!;de:Die Befehlsnutzung ist in diesem Kanal bereits **$advancedReplaceText[$get[action];true;aktiviert;false;deaktiviert]**!]] {deleteIn:5s}]

$let[action;$if[$checkContains[ $toLowerCase[$message[1]] ; ac ; aç ; enable ; aktivieren ]==true;false;$if[$checkContains[ $tolowercase[$message[1]] ; kapat ; disable ; deaktivieren ]==true;true]]]

$onlyIf[$checkContains[$toLowerCase[$message[1]];aç;ac;kapat;disable;enable;aktivieren;deaktivieren]==true;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir işlem belirtip tekrar deneyin! \`aç, kapat\`;en:Please specify an valid action and try again! \`enable, disable\`;de:Bitte gib einen gültigen Vorgang an und versuche es erneut! \`aktivieren, deaktivieren\`]] {deleteIn:10s}]
$onlyIf[$message[1]!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen bir işlem belirtip tekrar deneyin! \`aç, kapat\`;en:Please specify an action and try again! \`enable, disable\`;de:Bitte gib einen gültigen Vorgang an und versuche es erneut! \`aktivieren, deaktivieren\`]] {deleteIn:10s}]
$onlyPerms[administrator;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın!;en:You must have \`Administrator\` permission to use this command!;de:Um diesen Befehl zu verwenden, musst du über die Berechtigung \`Administrator\` verfügen!]] {deleteIn:5s}]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];