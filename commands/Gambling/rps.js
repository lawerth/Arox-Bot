module.exports = [
  {
	  name: "rps",
    aliases: ["rockpaperscissors", "taşkağıtmakas", "tkm"],
    desc: ["You play rock paper scissors.", "Taş kağıt makas oyunu oynarsın.", "Du spielst Stein Papier Schere."],
    usage: "rps {bet}",
    example: ["rps 100", "rps all"],
    code: `
$setTimeout[disableComponents;20s;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[**$emoji[rps] | $userDisplayName**, $language[tr:Taş Kağıt Makas oyununa $emoji[cash] **$numberSeparator[$get[bet]]** yatırdın...\nLütfen aşağıdan seçimini yap!;en:You bet $emoji[cash] **$numberSeparator[$get[bet]]** on the Rock Paper Scissors game...\nPlease make your choice below!;de:Du hast $emoji[cash] **$numberSeparator[$get[bet]]** auf das Spiel Stein Papier Schere gesetzt...\nBitte wähle unten aus!]
  {actionRow:
    {button::secondary:rpsGame-Rock-$authorID-$get[bet]:false:$emojiID[rpsRock]}
    {button::secondary:rpsGame-Paper-$authorID-$get[bet]:false:$emojiID[rpsPaper]}
    {button::secondary:rpsGame-Scissors-$authorID-$get[bet]:false:$emojiID[rpsScissors]}
  }
;true]]

$let[bet;$if[$toLowerCase[$message[1]]==all;$if[$getGlobalUserVar[cash;$authorID]>=$get[maxBet];$get[maxBet];$getGlobalUserVar[cash;$authorID]];$if[$isNumber[$message[1]]==true&&$message[1]>0;$if[$message[1]>$get[maxBet];$if[$get[maxBet]>$getGlobalUserVar[cash;$authorID];$getGlobalUserVar[cash;$authorID];$get[maxBet]];$if[$message[1]>=$getGlobalUserVar[cash;$authorID];$getGlobalUserVar[cash;$authorID];$message[1]]];1]]]
$let[maxBet;$if[$getGlobalUserVar[isPremium;$authorid;important]==true;100000;50000]]

$globalCooldown[20s;$nonEscape[**$emoji[cooldown] | $userDisplayName**, $language[tr:Lütfen bekleyin ve **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** tekrar deneyin!;en:Please wait and try again **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>**!;de:Bitte warte und versuche es **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** erneut!]] {deleteIn:$get[cooldownTime]s}]
$let[cooldownTime;$truncate[$divide[$getCooldownTime[20s;globalUser;rps;$authorID];1000]]]

$onlyIf[$getGlobalUserVar[cash;$authorID]>0;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Cüzdanında hiç $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have any $emoji[cash] **Arox Cash** in your wallet!;de:In deinem Geldbeutel befindet sich kein $emoji[cash] **Arox Cash**!]] {deleteIn:5s}]
$onlyIf[$message!=;
  {newEmbed:
    {title:Rock Paper Scissors | $language[tr:İstatistikler;en:Statistics;de:Statistiken]}
    {color:$getVar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[rps]]}
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
$createObject[gameData;$getGlobalUserVar[rpsData;$authorID]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]

$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]  
    `
  },
  {
  //name: "rpsGame",
	  type: "interaction",
	  prototype: "button",
	  code: `
$editMessage[$get[messageID];$nonEscape[**$emoji[rps] | $userDisplayName**, $get[firstMessage]\n$get[lastMessage]];$channelID]
$onlyif[$messageExists[$interactionData[message.id];$channelID]==true;]
$onlyIf[$channelExists[$channelID]==true;]
$wait[3s]

$editMessage[$get[messageID];$nonEscape[**$emoji[rpsSpin] | $userDisplayName**, $get[firstMessage]\n$language[tr:**$username[$clientid]** seçimini yapıyor;en:**$username[$clientID]** makes its choice;de:**$username[$clientID]** trifft seine Wahl]...];$channelID]
$onlyif[$messageExists[$interactionData[message.id];$channelID]==true;]
$onlyIf[$channelExists[$channelID]==true;]

$let[lastMessage;$if[$get[status]==win||$get[status]==tie;$language[tr:Sonuç $get[botChoiceEmoji] **$advancedReplaceText[$get[botChoice];Rock;Taş;Paper;Kağıt;Scissors;Makas]** geldi ve $emoji[cash] **$numberSeparator[$multi[$get[bet];$get[multiple]]]** kazandın!;en:The result was $get[botChoiceEmoji] **$get[botChoice]** and you won $emoji[cash] **$numberSeparator[$multi[$get[bet];$get[multiple]]]**!;de:**$username[$clientID]** hat $get[botChoiceEmoji] **$advancedReplaceText[$get[botChoice];Rock;Stein;Paper;Papier;Scissors;Schere]** gewählt und du hast $emoji[cash] **$numberSeparator[$multi[$get[bet];$get[multiple]]]** gewonnen!];$language[tr:Sonuç $get[botChoiceEmoji] **$advancedReplaceText[$get[botChoice];Rock;Taş;Paper;Kağıt;Scissors;Makas]** geldi ve oyunu **kaybettin...**;en:The result was $get[botChoiceEmoji] **$get[botChoice]** and you **lost...**;de:**$username[$clientID]** hat $get[botChoiceEmoji] **$advancedReplaceText[$get[botChoice];Rock;Stein;Paper;Papier;Scissors;Schere]** gewählt und du hast **verloren...**]]]
$let[firstMessage;$language[tr:Taş Kağıt Makas oyununa $emoji[cash] **$numberSeparator[$get[bet]]** yatırdın ve $get[userChoiceEmoji] **$advancedReplaceText[$get[userChoice];Rock;Taş;Paper;Kağıt;Scissors;Makas]**'ı seçtin!;en:You bet $emoji[cash] **$numberSeparator[$get[bet]]** and chose the $get[userChoiceEmoji] **$get[userChoice]**!;de:Du hast $emoji[cash] **$numberSeparator[$get[bet]]** gesetzt und $get[userChoiceEmoji] **$advancedReplaceText[$get[userChoice];Rock;Stein;Paper;Papier;Scissors;Schere]** gewählt!]]

$setGlobalUserVar[rpsData;$getObject[gameData];$authorID]
$setObjectProperty[gameData;cash_$get[status];$math[$getObjectProperty[gameData;cash_$get[status]]+($if[$get[status]==win;$math[($get[bet]*$get[multiple])-$get[bet]];$get[bet]])]]
$setObjectProperty[gameData;games_$get[status];$math[$getObjectProperty[gameData;games_$get[status]]+1]]
$setObjectProperty[gameData;games_played;$math[$getObjectProperty[gameData;games_played]+1]]
$setGlobalUserVar[cash;$if[$get[status]==win;$math[($getGlobalUserVar[cash;$authorid]-$get[bet])+($get[bet]*$get[multiple])];$if[$get[status]==tie;$getGlobalUserVar[cash;$authorid];$math[$getGlobalUserVar[cash;$authorid]-$get[bet]]]];$authorid]

$let[multiple;$if[$get[status]==tie;1;3]]
$let[status;$if[$or[$and[$get[userChoice]==Rock;$get[botChoice]==Scissors]==true;$and[$get[userChoice]==Paper;$get[botChoice]==Rock]==true;$and[$get[userChoice]==Scissors;$get[botChoice]==Paper]==true]==true;win;$if[$get[userChoice]==$get[botChoice];tie;lose]]]

$let[botChoiceEmoji;$emoji[rps$get[botChoice]]]
$let[botChoice;$randomText[Rock;Paper;Scissors]]
$let[userChoiceEmoji;$emoji[rps$splitText[2]]]
$let[userChoice;$splitText[2]]

$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!] {interaction} {ephemeral}]
$onlyIf[$getGlobalUserVar[cash]>=$get[bet];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Cüzdanında yeterli miktarda $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have enough $emoji[cash] **Arox Cash** in your wallet!;de:Du hast nicht genügend $emoji[cash] **Arox Cash** in deinem Wallet!]] {ephemeral} {interaction}]

$let[bet;$splitText[4]]
$let[messageID;$messageID]
$createObject[gameData;$getGlobalUserVar[rpsData;$authorID]]

$onlyif[$messageExists[$interactionData[message.id];$channelID]==true;]
$onlyIf[$splitText[3]==$authorid;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!]] {ephemeral} {interaction}]
$onlyif[$splitText[1]==rpsGame;]
$textSplit[$interactionData[customId];-]
    `
  }
];
