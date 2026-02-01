module.exports = [
  {
    name: "guessnumber",
    aliases: ["gn", "sayıtahmin", "st", "tahmin"],
    desc: ["You play a number guessing game.", "Sayı tahmin etme oyunu oynarsın.", "Du spielst ein Zahlenspiel."],
    usage: "guessnumber {bet}",
    example: ["guessnumber 100", "guessnumber all"],
    code: `
$setTimeout[disableComponents;20s;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[**$emoji[guessNumber] | $userDisplayName**, $language[tr:Sayı tahmin oyununa $emoji[cash] **$numberSeparator[$get[bet]]** yatırdın...\nLütfen aşağıdan bir sayı seç!;en:You bet $emoji[cash] **$numberSeparator[$get[bet]]** on the guess number game...\nPlease pick a number below!;de:Du hast $emoji[cash] **$numberSeparator[$get[bet]]** auf das Zahlenspiel gesetzt...\nBitte wähle eine Zahl unten aus!]
  {actionRow:
    {button::secondary:guessNumber-1-$authorID-$get[bet]:false:$emojiID[gn1]}
    {button::secondary:guessNumber-2-$authorID-$get[bet]:false:$emojiID[gn2]}
    {button::secondary:guessNumber-3-$authorID-$get[bet]:false:$emojiID[gn3]}
  }
;true]]

$let[bet;$if[$toLowerCase[$message[1]]==all;$if[$getGlobalUserVar[cash;$authorID]>=$get[maxBet];$get[maxBet];$getGlobalUserVar[cash;$authorID]];$if[$isNumber[$message[1]]==true&&$message[1]>0;$if[$message[1]>$get[maxBet];$if[$get[maxBet]>$getGlobalUserVar[cash;$authorID];$getGlobalUserVar[cash;$authorID];$get[maxBet]];$if[$message[1]>=$getGlobalUserVar[cash;$authorID];$getGlobalUserVar[cash;$authorID];$message[1]]];1]]]
$let[maxBet;$if[$getGlobalUserVar[isPremium;$authorid;important]==true;100000;50000]]

$globalCooldown[20s;$nonEscape[**$emoji[cooldown] | $userDisplayName**, $language[tr:Lütfen bekleyin ve **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** tekrar deneyin!;en:Please wait and try again **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>**!;de:Bitte warte und versuche es **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** erneut!]] {deleteIn:$get[cooldownTime]s}]
$let[cooldownTime;$truncate[$divide[$getCooldownTime[20s;globalUser;guessnumber;$authorID];1000]]]

$onlyIf[$getGlobalUserVar[cash;$authorID]>0;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Cüzdanında hiç $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have any $emoji[cash] **Arox Cash** in your wallet!;de:In deinem Geldbeutel befindet sich kein $emoji[cash] **Arox Cash**!]] {deleteIn:5s}]
$onlyIf[$message!=;
  {newEmbed:
    {title:Guess Number | $language[tr:İstatistikler;en:Statistics;de:Statistiken]}
    {color:$getVar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[guessNumber]]}
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
$createObject[gameData;$getGlobalUserVar[guessnumberData;$authorID]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  },
  {
  //name: "guessNumber-1/2/3"
    type: "interaction",
    prototype: "button",
    code: `
$editMessage[$get[messageID];$nonEscape[**$emoji[gn$toLocaleUpperCase[$get[status]]] | $userDisplayName**, $get[firstMessage]\n$get[lastMessage];$channelID]
$onlyif[$messageExists[$get[messageID];$channelID]==true;]
$onlyIf[$channelExists[$channelID]==true;]

$wait[3s]
$editMessage[$get[messageID];$nonEscape[**$emoji[gn3Spin] | $userDisplayName**, $get[firstMessage]\n$language[tr:Sayı seçiliyor;en:Number is being selected;de:Zahl wird ausgewählt]...;$channelID] 
$onlyif[$messageExists[$get[messageID];$channelID]==true;]
$onlyIf[$channelExists[$channelID]==true;]

$let[lastMessage;$if[$get[status]==win;$language[tr:Sonuç **$get[botChoiceEmoji]** geldi ve $emoji[cash] **$numberSeparator[$get[earning]]** kazandın!;en:The result was **$get[botChoiceEmoji]** and you won $emoji[cash] **$numberSeparator[$get[earning]]**!;de:Das Ergebnis ist **$get[botChoiceEmoji]** und du hast $emoji[cash] **$numberSeparator[$get[earning]]** gewonnen!];$language[tr:Sonuç **$get[botChoiceEmoji]** geldi ve **kaybettin...**;en:The result was **$get[botChoiceEmoji]** and you **lost...**;de:Das Ergebnis ist **$get[botChoiceEmoji]** und du hast **verloren...**]]]
$let[firstMessage;$language[tr:Sayı tahmin oyununa $emoji[cash] **$numberSeparator[$get[bet]]** yatırdın ve $get[userChoiceEmoji] sayısını seçtin!;en:You bet $emoji[cash] **$numberSeparator[$get[bet]]** and chose the number $get[userChoiceEmoji]!;de:Du hast $emoji[cash] **$numberSeparator[$get[bet]]** auf die Zahl $get[userChoiceEmoji] gesetzt!]]

$setGlobalUserVar[guessnumberData;$getObject[gameData];$authorID]
$setObjectProperty[gameData;cash_$get[status];$math[$getObjectProperty[gameData;cash_$get[status]]+($if[$get[status]==win;$math[($get[bet]*$get[multiple])-$get[bet]];$get[bet]])]]
$setObjectProperty[gameData;games_$get[status];$math[$getObjectProperty[gameData;games_$get[status]]+1]]
$setObjectProperty[gameData;games_played;$math[$getObjectProperty[gameData;games_played]+1]]
$setGlobalUserVar[cash;$if[$get[status]==win;$math[($getGlobalUserVar[cash;$authorID]-$get[bet])+($get[bet]*$get[multiple])];$math[$getGlobalUserVar[cash;$authorID]-$get[bet]]];$authorID]

$let[earning;$math[$get[bet]*$get[multiple]]]
$let[multiple;3]
$let[lastEmoji;$if[$get[status]==win;$emoji[gnWin];$emoji[gnLose]]]
$let[status;$if[$get[botChoice]==$get[userChoice];win;lose]]

$let[botChoiceEmoji;$emoji[gn$get[botChoice]]]
$let[botChoice;$randomText[1;2;3]]
$let[userChoiceEmoji;$emoji[gn$get[userChoice]]]
$let[userChoice;$splitText[2]]

$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!] {interaction} {ephemeral}]
$onlyIf[$getGlobalUserVar[cash]>=$get[bet];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Cüzdanında yeterli miktarda $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have enough $emoji[cash] **Arox Cash** in your wallet!;de:Du hast nicht genügend $emoji[cash] **Arox Cash** in deinem Wallet!]] {ephemeral} {interaction}]

$let[bet;$splitText[4]]
$let[messageID;$messageID]
$createObject[gameData;$getGlobalUserVar[guessnumberData;$authorID]]

$onlyif[$messageExists[$interactionData[message.id];$channelID]==true;]
$onlyIf[$splitText[3]==$interactionData[author.id];$nonescape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$splitText[1]==guessNumber;]
$textSplit[$interactionData[customId];-]
    `
  }
];
