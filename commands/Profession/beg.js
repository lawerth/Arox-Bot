module.exports = [
  {
	  name: "beg",
	  aliases: ["dilen"],
    desc: ["If you don't have a job, you can earn money by begging.", "Bir mesleğe sahip değilsen dilenip para kazanırsın.", "Wenn du keinen Job hast, kannst du Geld betteln."],
    code: `
$editMessage[$get[messageID];
  {newEmbed:
    {author:$userDisplayName | $language[tr:Başarıyla Dilendin;en:You Begged Successfully;de:Erfolgreich Gebettelt]:$authorAvatar}
    {color:$getVar[color_green]}
    {title:$nonEscape[$emoji[begging] $language[tr:Dilendin ve kazandın!;en:You begged and earned money!;de:Du hast gebettelt und Geld verdient!]]}
    {thumbnail:$getObjectProperty[profData;[0][0].emojiURL]}
    {description:$nonEscape[$language[tr:Başarılı bir şekilde dilendin ve insanlar sana toplam $emoji[cash] **$numberSeparator[$get[income]]** verdiler!;en:You successfully begged and people gave you a total of $emoji[cash] **$numberSeparator[$get[income]]**!;de:Du hast erfolgreich gebettelt und die Menschen haben dir insgesamt $emoji[cash] **$numberSeparator[$get[income]]** gegeben!]]}
  }
;$channelid]
$onlyIf[$messageExists[$get[messageID];$channelID]==true;]

$wait[$random[3;5]s]

$setGlobalUserVar[beggingCount;$math[$getGlobalUserVar[beggingCount;$authorid]+1];$authorid]
$setGlobalUserVar[cash;$math[$getGlobalUserVar[cash;$authorid]+$get[income]];$authorid]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$userDisplayName | $language[tr:Dileniyor;en:Begging;de:Bettelt]:$authorAvatar}
    {color:$getVar[embedcolor]}
    {title:$nonEscape[$emoji[begging] $language[tr:Dileniyorsun;en:You are begging;de:Du bettelst]...]}
    {thumbnail:$getObjectProperty[profData;[0][0].emojiURL]}
    {description:$language[tr:İnsanlardan para dilenmeye başladın. Bakalım seni iyi niyetli insanlar bulacak mı!;en:You started begging people for money. Let's see if well-intentioned people will find you!;de:Du hast begonnen, von den Menschen Geld zu betteln. Mal sehen, ob dich gutherzige Menschen finden!]}
  }
;true]]

$let[income;$random[100;1000]]

$globalCooldown[5m;$nonEscape[**$emoji[cooldown] | $userDisplayName**, $language[tr:Lütfen bekleyin ve **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** tekrar deneyin!;en:Please wait and try again **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>**!;de:Bitte warte und versuche es **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** erneut!]] {deleteIn:$get[cooldownTime]s}]
$let[cooldownTime;$truncate[$divide[$getCooldownTime[5m;globalUser;beg;$authorID];1000]]]

$onlyif[$getGlobalUserVar[profession;$authorid]==0;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Zaten bir mesleğe sahipsin. Dilenmek yerine çalışarak para kazanabilirsin!;en:You already have a profession. You can earn money by working instead of begging!;de:Du hast bereits einen Beruf. Verdiene Geld durch Arbeit statt zu betteln!]] {deleteIn:5s}]

$createObject[profData;$readFile[./data/professions.json]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];