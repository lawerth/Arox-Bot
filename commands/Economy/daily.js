module.exports = [
  {
    name: "daily",
    aliases: ["günlük"],
    desc: ["You get your daily reward.", "Günlük ödülünü alırsın.", "Du erhältst deine tägliche Belohnung."],
    code: `
$sendMessage[
  {newEmbed:
    {author:$language[tr:Günlük Ödül Talep Edildi;en:Daily Reward Claimed;de:Tägliche Belohnung Abgerufen]:$authorAvatar}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Sonraki Günlük:;en:Next Daily:;de:Nächstes Tagebuch:] $get[nextDaily]}
    {thumbnail:$emojiURL[$emojiID[daily]]}
    {description:$nonEscape[**💰 | $userDisplayName**, $language[tr:Başarıyla günlüğünü talep ettin ve aşağıdaki ödülleri kazandın!;en:You have successfully claimed your daily and won the following prizes!;de:Du hast erfolgreich deine tägliche Belohnung erhalten und die folgenden Preise gewonnen!]\n
$emoji[dot] $emoji[cash] **$numberSeparator[$get[reward]]**
    ]}
  }
]

$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash;$authorID];$get[reward]];$authorID]

$let[nextDaily;$advancedReplaceText[$parseDate[$math[$get[cooldownTime]*1000];time];seconds;$language[tr:Saniye;en:Seconds;de:Sekunden];second;$language[tr:Saniye;en:Second;de:Sekunde];minutes;$language[tr:Dakika;en:Minutes;de:Minuten];minute;$language[tr:Dakika;en:Minute;de:Minute];hours;$language[tr:Saat;en:Hours;de:Stunden];hour;$language[tr:Saat;en:Hour;de:Stunde];days;$language[tr:Gün;en:Days;de:Tage];day;$language[tr:Gün;en:Day;de:Tag]]]
$let[reward;$random[10000;15000]]

$globalCooldown[$get[cooldownTime]s;{execute:MidnightCooldownError}]
$let[cooldownTime;$math[86400 - (($hour * 3600) + ($minute * 60) + $second)]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
]