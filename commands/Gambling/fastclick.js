module.exports = [
  {
  	name: "fastclick",
  	aliases: ["fc", "quickclick", "hızlıtıkla", "ht"],
    desc: ["You play a fast clicking game.", "Hızlı tıklama oyunu oynarsın.", "Du spielst ein schnelles Klickspiel."],
	  code: `
$deleteVar[fastClickAmount;$get[messageID];main]
$wait[30s]

$setTimeout[disableComponents;20s;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$loop[10;{"messageID": "$get[messageID]", "channelID": "$channelID"};fastClickLoop]
$wait[500]
$setMessageVar[fastClickAmount;$math[20000+$random[200;500]];$get[messageID]]

$let[messageID;$sendMessage[**$emoji[fastClick] | $userDisplayName**, $language[tr:Başarıyla hızlı tıklama oyununa katıldın!\nFarklı olan butona tıkla!;en:You have successfully joined the fast click game!\nClick on the different button!;de:Du hast erfolgreich am Schnellklick-Spiel teilgenommen!\nKlicke auf die andere Schaltfläche!]
  {actionRow:
    {button::secondary:$advancedTextSplit[$get[buton1];/;1]:false:$advancedTextSplit[$get[buton1];/;2]}
    {button::secondary:$advancedTextSplit[$get[buton2];/;1]:false:$advancedTextSplit[$get[buton2];/;2]}
    {button::secondary:$advancedTextSplit[$get[buton3];/;1]:false:$advancedTextSplit[$get[buton3];/;2]}
    {button::secondary:$advancedTextSplit[$get[buton4];/;1]:false:$advancedTextSplit[$get[buton4];/;2]}
  }
  {actionRow:
    {button::secondary:$advancedTextSplit[$get[buton5];/;1]:false:$advancedTextSplit[$get[buton5];/;2]}
    {button::secondary:$advancedTextSplit[$get[buton6];/;1]:false:$advancedTextSplit[$get[buton6];/;2]}
    {button::secondary:$advancedTextSplit[$get[buton7];/;1]:false:$advancedTextSplit[$get[buton7];/;2]}
    {button::secondary:$advancedTextSplit[$get[buton8];/;1]:false:$advancedTextSplit[$get[buton8];/;2]}
  }
  {actionRow:
    {button::secondary:$advancedTextSplit[$get[buton9];/;1]:false:$advancedTextSplit[$get[buton9];/;2]}
    {button::secondary:$advancedTextSplit[$get[buton10];/;1]:false:$advancedTextSplit[$get[buton10];/;2]}
    {button::secondary:$advancedTextSplit[$get[buton11];/;1]:false:$advancedTextSplit[$get[buton11];/;2]}
    {button::secondary:$advancedTextSplit[$get[buton12];/;1]:false:$advancedTextSplit[$get[buton12];/;2]}
  }
  {actionRow:
    {button::secondary:$advancedTextSplit[$get[buton13];/;1]:false:$advancedTextSplit[$get[buton13];/;2]}
    {button::secondary:$advancedTextSplit[$get[buton14];/;1]:false:$advancedTextSplit[$get[buton14];/;2]}
    {button::secondary:$advancedTextSplit[$get[buton15];/;1]:false:$advancedTextSplit[$get[buton15];/;2]}
    {button::secondary:$advancedTextSplit[$get[buton16];/;1]:false:$advancedTextSplit[$get[buton16];/;2]}
  }
;true]]

$let[buton$random[1;16];fastClick-true-$authorid/$get[diffEmoji]]
$let[buton1;fastClick-false-$authorid-1/$get[sameEmoji]]
$let[buton2;fastClick-false-$authorid-2/$get[sameEmoji]]
$let[buton3;fastClick-false-$authorid-3/$get[sameEmoji]]
$let[buton4;fastClick-false-$authorid-4/$get[sameEmoji]]
$let[buton5;fastClick-false-$authorid-5/$get[sameEmoji]]
$let[buton6;fastClick-false-$authorid-6/$get[sameEmoji]]
$let[buton7;fastClick-false-$authorid-7/$get[sameEmoji]]
$let[buton8;fastClick-false-$authorid-8/$get[sameEmoji]]
$let[buton9;fastClick-false-$authorid-9/$get[sameEmoji]]
$let[buton10;fastClick-false-$authorid-10/$get[sameEmoji]]
$let[buton11;fastClick-false-$authorid-11/$get[sameEmoji]]
$let[buton12;fastClick-false-$authorid-12/$get[sameEmoji]]
$let[buton13;fastClick-false-$authorid-13/$get[sameEmoji]]
$let[buton14;fastClick-false-$authorid-14/$get[sameEmoji]]
$let[buton15;fastClick-false-$authorid-15/$get[sameEmoji]]
$let[buton16;fastClick-false-$authorid-16/$get[sameEmoji]]

$let[sameEmoji;$advancedTextSplit[$get[emojis];|;1]]
$let[diffEmoji;$advancedTextSplit[$get[emojis];|;2]]
$let[emojis;$randomText[$emojiID[fcBlackBomb]|$emojiID[fcRedBomb];🍎|🍏;🍏|🍎;🔴|🟢;🟥|🟩]]

$globalCooldown[10m;$nonEscape[**$emoji[cooldown] | $userDisplayName**, $language[tr:Lütfen bekleyin ve **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** tekrar deneyin!;en:Please wait and try again **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>**!;de:Bitte warte und versuche es **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** erneut!]] {deleteIn:$get[cooldownTime]s}]
$let[cooldownTime;$truncate[$divide[$getCooldownTime[10m;globalUser;fastclick;$authorID];1000]]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  },
  {
  //name: "fastClick-false",
  	type: "interaction",
	  prototype: "button",
	  code: `
$editMessage[$interactionData[message.id];$nonEscape[**$emoji[fcFailed] | $userDisplayName**, $language[tr:Maalesef yanlış butona tıkladığın için **kaybettin**...;en:Unfortunately, you **lost** because you clicked the wrong button...;de:Leider hast du die falsche Schaltfläche geklickt und **verloren**...]]]

$onlyIf[$advancedTextSplit[$interactionData[customId];-;3]==$interactionData[author.id];$nonescape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];-;2]==false;]
$onlyIf[$advancedTextSplit[$interactionData[customId];-;1]==fastClick;]
    `
  },
  {
  //name: "fastClick-true",
  	type: "interaction",
  	prototype: "button",
	  code: `
$editMessage[$interactionData[message.id];$nonEscape[**$emoji[fcSuccess] | $userDisplayName**, $get[firstMessage] $language[tr:Başarıyla $emoji[cash] **$numberSeparator[$get[amount]]** kazandın!;en:You have successfully earned $emoji[cash] **$numberSeparator[$get[amount]]**!;de:Du hast erfolgreich $emoji[cash] **$numberSeparator[$get[amount]]** gewonnen!]]]
$onlyif[$messageExists[$interactionData[message.id];$channelID]==true;]
$let[firstMessage;$if[$get[amount]>=4000;$language[tr:Mükemmelsin!;en:You're perfect!;de:Du bist großartig!];$if[$get[amount]>=3000;$language[tr:Çok iyiydin!;en:You're very good!;de:Du warst sehr gut!];$if[$get[amount]>=2000;$language[tr:Biraz daha iyi olabilirdin!;en:You could have been a little better!;de:Du könntest noch ein bisschen besser sein!];$if[$get[amount]>=1000;$language[tr:Biraz yavaşsın!;en:You're a little slow!;de:Du bist ein bisschen langsam!];$if[$get[amount]<=50;$language[tr:Çok yavaşsın!;en:You're too slow!;de:Du bist sehr langsam!];$language[tr:Kaplumbağadan daha yavaşsın...;en:You're slower than a turtle...;de:Du bist langsamer als eine Schildkröte...]]]]]]]

$setGlobalUserVar[cash;$math[$getGlobalUserVar[cash;$authorid]+$get[amount]];$authorid]
$let[amount;$getMessageVar[fastClickAmount;$messageID]]

$onlyIf[$advancedTextSplit[$interactionData[customId];-;3]==$interactionData[author.id];$nonescape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];-;2]==true;]
$onlyIf[$advancedTextSplit[$interactionData[customId];-;1]==fastClick;]
    `
  },
  {
    name: "fastClickLoop",
    type: "awaited",
    code: `
$setMessageVar[fastClickAmount;$math[$getMessageVar[fastClickAmount;$awaitData[messageID]]-2000];$awaitData[messageID]]
$wait[500]
    `
  }
];