module.exports = [
  {
    name: "slots",
    aliases: ["slot", "s"],
    desc: ["You play slots.", "Slot oyunu oynarsın.", "Du spielst Slots."],
    usage: "slots {bet}",
    example: ["slots 100", "slots all"],
    code: `
$editMessage[$get[messageID];$nonEscape[
\`┏━ • SLOTS • ━┓\`
\`┃  \`$get[slot1] $get[slot2] $get[slot3] \` ┃\` **$userDisplayName**, $get[firstMessage]
\`┃             ┃\` $get[lastMessage]
\`┗━━━━━━━━━━━━━┛\`]]
$onlyif[$messageExists[$get[messageID];$channelid]==true;]
$onlyIf[$channelExists[$channelID]==true;]
$wait[1s]

$editMessage[$get[messageID];$nonEscape[
\`┏━ • SLOTS • ━┓\`
\`┃  \`$get[slot1] $get[slot2] $emoji[slotGif] \` ┃\` **$userDisplayName**, $get[firstMessage]
\`┃             ┃\` *$language[tr:Slot dönüyor;en:Slot is spinning;de:Der Spielautomat dreht sich]...*
\`┗━━━━━━━━━━━━━┛\`]]
$onlyif[$messageExists[$get[messageID];$channelid]==true;]
$onlyIf[$channelExists[$channelID]==true;]
$wait[1s]

$editMessage[$get[messageID];$nonEscape[
\`┏━ • SLOTS • ━┓\`
\`┃  \`$get[slot1] $emoji[slotGif] $emoji[slotGif] \` ┃\` **$userDisplayName**, $get[firstMessage]
\`┃             ┃\` *$language[tr:Slot dönüyor;en:Slot is spinning;de:Der Spielautomat dreht sich]..*
\`┗━━━━━━━━━━━━━┛\`]]
$onlyif[$messageExists[$get[messageID];$channelid]==true;]
$onlyIf[$channelExists[$channelID]==true;]
$wait[1s]

$let[messageID;$sendMessage[$nonEscape[
\`┏━ • SLOTS • ━┓\`
\`┃  \`$emoji[slotGif] $emoji[slotGif] $emoji[slotGif] \` ┃\` **$userDisplayName**, $get[firstMessage]
\`┃             ┃\` *$language[tr:Slot dönüyor;en:Slot is spinning;de:Der Spielautomat dreht sich].*
\`┗━━━━━━━━━━━━━┛\`];true]]

$setGlobalUserVar[slotsData;$getObject[gameData];$authorID]
$setObjectProperty[gameData;cash_$get[status];$math[$getObjectProperty[gameData;cash_$get[status]]+($if[$get[status]==win;$math[($get[bet]*$get[multiple])-$get[bet]];$get[bet]])]]
$setObjectProperty[gameData;games_$get[status];$math[$getObjectProperty[gameData;games_$get[status]]+1]]
$setObjectProperty[gameData;games_played;$math[$getObjectProperty[gameData;games_played]+1]]
$setGlobalUserVar[cash;$if[$get[status]==win;$math[($getGlobalUserVar[cash;$authorID]-$get[bet])+($get[bet]*$get[multiple])];$math[$getGlobalUserVar[cash;$authorID]-$get[bet]]];$authorID]

$let[lastMessage;$if[$get[status]==win;$language[tr:Ve $emoji[cash] **$numberSeparator[$math[$get[bet]*$get[multiple]]]** kazandın!;en:And you won $emoji[cash] **$numberSeparator[$math[$get[bet]*$get[multiple]]]**!;de:Und du hast $emoji[cash] **$numberSeparator[$math[$get[bet]*$get[multiple]]]** gewonnen!];$language[tr:Ve maalesef kaybettin...;en:And unfortunately you lost...;de:Und leider hast du verloren...]]]
$let[firstMessage;$language[tr:Slota $emoji[cash] **$numberSeparator[$get[bet]]** yatırdın!;en:You bet $emoji[cash] **$numberSeparator[$get[bet]]** into the slot!;de:Du hast $emoji[cash] **$numberSeparator[$get[bet]]** auf den Spielautomaten gesetzt!]]

$let[status;$if[$get[slot1]==$get[slot2]&&$get[slot1]==$get[slot3];win;lose]]
$let[multiple;2]

$let[slot1;$randomText[$joinSplitText[;]]]
$let[slot2;$randomText[$joinSplitText[;];$joinSplitText[;]]]
$let[slot3;$randomText[$joinSplitText[;];$joinSplitText[;]];$joinSplitText[;]]

$textSplit[$emoji[slot1]_$emoji[slot2]_$emoji[slot3];_]

$let[bet;$if[$toLowerCase[$message[1]]==all;$if[$getGlobalUserVar[cash;$authorID]>=$get[maxBet];$get[maxBet];$getGlobalUserVar[cash;$authorID]];$if[$isNumber[$message[1]]==true&&$message[1]>0;$if[$message[1]>$get[maxBet];$if[$get[maxBet]>$getGlobalUserVar[cash;$authorID];$getGlobalUserVar[cash;$authorID];$get[maxBet]];$if[$message[1]>=$getGlobalUserVar[cash;$authorID];$getGlobalUserVar[cash;$authorID];$message[1]]];1]]]
$let[maxBet;$if[$getGlobalUserVar[isPremium;$authorid;important]==true;100000;50000]]

$globalCooldown[20s;$nonEscape[**$emoji[cooldown] | $userDisplayName**, $language[tr:Lütfen bekleyin ve **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** tekrar deneyin!;en:Please wait and try again **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>**!;de:Bitte warte und versuche es **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** erneut!]] {deleteIn:$get[cooldownTime]s}]
$let[cooldownTime;$truncate[$divide[$getCooldownTime[20s;globalUser;slots;$authorID];1000]]]

$onlyIf[$getGlobalUserVar[cash;$authorID]>0;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Cüzdanında hiç $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have any $emoji[cash] **Arox Cash** in your wallet!;de:In deinem Geldbeutel befindet sich kein $emoji[cash] **Arox Cash**!]] {deleteIn:5s}]
$onlyIf[$message!=;
  {newEmbed:
    {title:Slots | $language[tr:İstatistikler;en:Statistics;de:Statistiken]}
    {color:$getVar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[slots]]}
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
$createObject[gameData;$getGlobalUserVar[slotsData;$authorID]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];