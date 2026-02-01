module.exports = [
  {
	  name: "pray",
  	aliases: ["luck", "lucky", "chance", "dua", "şans"],
    desc: ["You pray for yourself or a friend!", "Kendine veya bir arkadaşına dua edersin.", "Du betest für dich selbst oder einen Freund!"],
    usage: "pray {@user}",
    example: ["pray", "pray @Arox"],
    $if: "old",
    code: `
$if[$mentioned[1;true]==$authorid]

  $sendMessage[$nonEscape[**$emoji[pray] | $userDisplayName**, $language[tr:Başarıyla kendine $randomText[şans diledin;dua ettin]!\nArtık $emoji[clover] **$numberSeparator[$getGlobalUserVar[pray;$authorid]] Yonca Puanı**'na sahipsin!;en:You successfully $randomText[wished yourself luck;prayed to yourself]!\nYou now have $emoji[clover] **$numberSeparator[$getGlobalUserVar[pray;$authorid]] Clover Points**!;de:Du hast dir erfolgreich $randomText[Glück gewünscht;für dich selbst gebetet]!\nDu hast jetzt $emoji[clover] **$numberSeparator[$getGlobalUserVar[pray;$authorid]] Kleeblattpunkte**!]]]
  $setGlobalUserVar[pray;$math[$getGlobalUserVar[pray;$authorid]+1];$authorid]

$else

  $sendMessage[$nonEscape[**$emoji[pray] | $userDisplayName**, $language[tr:Başarıyla **$userDisplayName[$mentioned[1]]** adlı kullanıcıya $randomText[şans diledin;dua ettin]!\nArtık $emoji[clover] **$numberSeparator[$getGlobalUserVar[pray;$authorid]] Yonca Puanı**'na sahipsin!;en:You successfully $randomText[wished;prayed] to **$userDisplayName[$mentioned[1]]**!\nYou now have $emoji[clover] **$numberSeparator[$getGlobalUserVar[pray;$authorid]] Clover Points**!;de:Du hast **$userDisplayName[$mentioned[1]]** erfolgreich Glück gewünscht!\nDu hast jetzt $emoji[clover] **$numberSeparator[$getGlobalUserVar[pray;$authorid]] Kleeblattpunkte**!]]]
  $setGlobalUserVar[pray;$math[$getGlobalUserVar[pray;$mentioned[1]]+1];$mentioned[1]]
  $setGlobalUserVar[pray;$math[$getGlobalUserVar[pray;$authorid]-1];$authorid]

$endif

$globalCooldown[5m;$nonEscape[**$emoji[cooldown] | $userDisplayName**, $language[tr:Lütfen bekleyin ve **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** tekrar deneyin!;en:Please wait and try again **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>**!;de:Bitte warte und versuche es **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** erneut!]] {deleteIn:$get[cooldownTime]s}]
$let[cooldownTime;$truncate[$divide[$getCooldownTime[5m;globalUser;pray;$authorID];1000]]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];