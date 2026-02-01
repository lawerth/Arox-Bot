module.exports = [
  {
    name: "coinflip",
    aliases: ["cf", "yazıtura"],
    desc: ["You play the coinflip game.", "Yazı tura oyunu oynarsın.", "Du spielst das Münzwurfspiel."],
    usage: "coinflip {bet} [heads|tails]",
    example: ["coinflip 100", "coinflip all tails"],
    code: `
$editMessage[$get[messageID];$nonEscape[**$get[lastEmoji] | $userDisplayName**, $get[firstMessage]\n$get[lastMessage]]]
$onlyif[$messageExists[$get[messageID];$channelid]==true;]
$onlyIf[$channelExists[$channelID]==true;]
$wait[3s]

$let[messageID;$sendMessage[$nonEscape[**$emoji[coinflip] | $userDisplayName**, $get[firstMessage]\n$language[tr:Para dönüyor;en:The coin spins;de:Die Münze wird geworfen]...];true]]

$let[lastMessage;$if[$get[status]==win;$language[tr:Sonuç **$advancedReplaceText[$get[botChoice];tails;tura;heads;yazı]** geldi ve $emoji[cash] **$numberSeparator[$get[earning]]** kazandın!;en:The result was **$get[botChoice]** and you won $emoji[cash] **$numberSeparator[$get[earning]]**!;de:Das Ergebnis ist **$advancedReplaceText[$get[botChoice];tails;Zahl;heads;Kopf]** und du hast $emoji[cash] **$numberSeparator[$get[earning]]** gewonnen!];$language[tr:Sonuç **$advancedReplaceText[$get[botChoice];tails;tura;heads;yazı]** geldi ve **kaybettin..**;en:The result was **$get[botChoice]** and you **lost..**;de:Das Ergebnis ist **$advancedReplaceText[$get[botChoice];tails;Zahl;heads;Kopf]** und du hast **verloren..**]]]
$let[firstMessage;$language[tr:Yazı turaya $emoji[cash] **$numberSeparator[$get[bet]]** yatırdın ve **$advancedReplaceText[$get[userChoice];tails;turayı;heads;yazıyı]** seçtin!;en:You bet $emoji[cash] **$numberSeparator[$get[bet]]** and chose **$get[userChoice]**!;de:Du hast $emoji[cash] **$numberSeparator[$get[bet]]** auf **$advancedReplaceText[$get[userChoice];tails;Zahl;heads;Kopf]** gesetzt!]]

$setGlobalUserVar[coinflipData;$getObject[gameData];$authorID]
$setObjectProperty[gameData;cash_$get[status];$math[$getObjectProperty[gameData;cash_$get[status]]+($if[$get[status]==win;$math[($get[bet]*$get[multiple])-$get[bet]];$get[bet]])]]
$setObjectProperty[gameData;games_$get[status];$math[$getObjectProperty[gameData;games_$get[status]]+1]]
$setObjectProperty[gameData;games_played;$math[$getObjectProperty[gameData;games_played]+1]]
$setGlobalUserVar[cash;$if[$get[status]==win;$math[($getGlobalUserVar[cash;$authorID]-$get[bet])+($get[bet]*$get[multiple])];$math[$getGlobalUserVar[cash;$authorID]-$get[bet]]];$authorID]

$let[earning;$math[$get[bet]*$get[multiple]]]
$let[multiple;2]
$let[status;$if[$get[botChoice]==$get[userChoice];win;lose]]

$let[bet;$if[$toLowerCase[$message[1]]==all;$if[$getGlobalUserVar[cash;$authorID]>=$get[maxBet];$get[maxBet];$getGlobalUserVar[cash;$authorID]];$if[$isNumber[$message[1]]==true&&$message[1]>0;$if[$message[1]>$get[maxBet];$if[$get[maxBet]>$getGlobalUserVar[cash;$authorID];$getGlobalUserVar[cash;$authorID];$get[maxBet]];$if[$message[1]>=$getGlobalUserVar[cash;$authorID];$getGlobalUserVar[cash;$authorID];$message[1]]];1]]]
$let[maxBet;$if[$getGlobalUserVar[isPremium;$authorid;important]==true;100000;50000]]

$let[lastEmoji;$emoji[$get[botChoice]]]
$let[botChoice;$randomText[heads;tails]]
$let[userChoice;$if[$checkContains[ $toLowerCase[$message] ; tails ; tail ; t ]==true;tails;heads]]

$globalCooldown[20s;$nonEscape[**$emoji[cooldown] | $userDisplayName**, $language[tr:Lütfen bekleyin ve **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** tekrar deneyin!;en:Please wait and try again **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>**!;de:Bitte warte und versuche es **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** erneut!]] {deleteIn:$get[cooldownTime]s}]
$let[cooldownTime;$truncate[$divide[$getCooldownTime[20s;globalUser;coinflip;$authorID];1000]]]

$onlyIf[$getGlobalUserVar[cash;$authorID]>0;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Cüzdanında hiç $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have any $emoji[cash] **Arox Cash** in your wallet!;de:In deinem Geldbeutel befindet sich kein $emoji[cash] **Arox Cash**!]] {deleteIn:5s}]
$onlyIf[$message!=;
  {newEmbed:
    {title:Coinflip | $language[tr:İstatistikler;en:Statistics;de:Statistiken]}
    {color:$getVar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[tails]]}
    {footer:@$username:$authorAvatar}
    {timestamp}
    {field:$emoji[helpParams] Command Info:
$emoji[dot] **$language[tr:Kullanım:;en:Usage:;de:Verwendung:]** $getGuildVar[prefix]$commandInfo[$commandName;usage]
$emoji[dot] **$language[tr:Açıklama:;en:Description:;de:Beschreibung:]** $commandInfo[$commandName;desc[$language[en:0;tr:1;de:2]]]:false}
    {field:$emoji[helpStats] Your Stats:
$emoji[dot] **$language[tr:Güncel Bakiye:;en:Current Balance:;de:Aktueller Kontostand:]** $emoji[cash] $numberSeparator[$getGlobalUserVar[cash;$authorID]]
$emoji[dot] **$language[tr:Toplam Kazanç:;en:Total Earning:;de:Gesamter Gewinn:]** $emoji[cash] $numberSeparator[$getObjectProperty[gameData;cash_win]]
$emoji[dot] **$language[tr:Toplam Kayıp:;en:Total Loss:;de:Gesamter Verlust:]** $emoji[cash] $numberSeparator[$getObjectProperty[gameData;cash_lose]]
$emoji[dot] **$language[tr:Kazanç Durumu;;en:Earnings Status:;de:Einkommensstatus::]** $emoji[cash] $numberSeparator[$math[$getObjectProperty[gameData;cash_win]-$getObjectProperty[gameData;cash_lose]]]
$emoji[dot] **$language[tr:Toplam Oynanan Oyun:;en:Total Played Games:;de:Insgesamt Gespielte Spiele:]** $numberSeparator[$getObjectProperty[gameData;games_played]]
$emoji[dot] **$language[tr:Toplam Kazanılan Oyun:;en:Total Won Games:;de:Insgesamt Gewonnene Spiele:]** $numberSeparator[$getObjectProperty[gameData;games_win]]
$emoji[dot] **$language[tr:Toplam Kaybedilen Oyun:;en:Total Lost Games:;de:Insgesamt Verlorene Spiele:]** $numberSeparator[$getObjectProperty[gameData;games_lose]]
:false}
  }
]
$createObject[gameData;$getGlobalUserVar[coinflipData;$authorID]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];
