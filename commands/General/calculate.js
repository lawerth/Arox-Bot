module.exports = [
  {
	  name: "calculate",
	  aliases: ["calc", "math", "hesapla", "matematik", "işlem"],
    desc: ["You do the math.", "Matematik işlemi yaparsın.", "Du machst die Mathematik."],
    usage: "calculate {equation}",
    example: ["calculate 2+2", "math 5*5"],
    code: `
**$emoji[math] | $userDisplayName**, $language[tr:İşleminin sonucu;en:The answer is;de:Ergebnis deiner Aktion]: **$if[$get[result]==Infinity;$language[tr:Sonsuzluk;en:Infinity;de:Unendlichkeit];$get[result]]**
$reply

$let[result;$math[$message]]

$onlyif[$isValidMath[$message]==true;$nonescape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir işlem belirtip tekrar deneyin!;en:Please specify a valid math operation and try again!;de:Bitte gib eine gültige Aktion an und versuche es erneut!]] {deleteIn:5s}]
$onlyif[$message!=;$nonescape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen bir matematik işlemi belirtip tekrar deneyin!;en:Please specify a math operation and try again!;de:Bitte gib eine mathematische Operation an und versuche es erneut!]] {deleteIn:5s}]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];