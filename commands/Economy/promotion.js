module.exports = [
  {
    name: "promotion",
    aliases: ["promotioncode", "promocode", "promo", "promosyon", "promokod"],
    desc: ["You can use promo codes and win prizes.", "Promosyon kodu kullanıp ödüller kazanırsın.", "Du kannst Promo-Codes verwenden und Preise gewinnen."],
	  code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$userDisplayName | $language[tr:Promosyon;en:Promotion;de:Promotion]:$authorAvatar}
    {title:$nonEscape[$emoji[promotionCode] $language[tr:Promosyon Kodu Kullan;en:Use Promo Code;de:Promotionscode Einlösen]!]}
    {description:$nonEscape[$language[tr:- Promosyon kodunu kullanırken tüm harflerin büyük olmasına dikkat et!\n- Promosyon kodlarından haberdar olmak için destek sunucumuza katılabilirsin!;en:- Make sure all letters are capitalized when using your promo code!\n- You can join our support server to be notified about promo codes!;de:- Achte darauf, dass alle Buchstaben des Promotionscodes groß geschrieben sind!\n- Tritt unserem Support-Server bei, um über Promotionscodes informiert zu bleiben!]]}
    {color:$getVar[embedcolor]}
  }
  {actionRow:
    {button:$language[tr:Promosyon Kodu Kullan!;en:Use Promo Code!;de:Promotionscode Einlösen!]:primary:promoCodeEnterModal_$authorid:false:$emojiID[buttonWrite]}
  }
;true]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  },
  {
  //name: "promoCodeEnterModal",
	  type: "interaction",
	  prototype: "button",
	  code: `
$interactionModal[$language[tr:Promosyon Kodu Gir;en:Enter a Promo Code;de:Gib den Promotionscode ein];promoCodeEnter;
  {actionRow:
    {textInput:$language[tr:Promosyon kodunu yazın;en:Enter the promo code;de:Schreibe den Promotionscode]:1:code:true:$language[tr:Yazmak için dokun.;en:Tap to write.;de:Tippen zum Schreiben]:4:20}
  }
]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==promoCodeEnterModal;]
    `
  },
  {
	  name: "promoCodeEnter",
	  type: "interaction",
	  prototype: "modal",
	  code: `
$setGlobalUserVar[$get[rewardVariable];$math[$getGlobalUserVar[$get[rewardVariable];$authorID]+$get[rewardAmount]];$authorid]

$channelSendMessage[$customChannelID[promoCodesLog];$if[$getObjectProperty[promoCodes;$get[codeName].uses]>=$get[codeMaxUses];**🟡 |** The promotion code **$get[codeName]** has reached its maximum number of uses. \`$getObjectProperty[promoCodes;$get[codeName].uses]/$getObjectProperty[promoCodes;$get[codeName].maxUses]\`]]
$channelSendMessage[$customChannelID[promoCodesLog];**🟢 |** The promotion code **$get[codeName]** was used by **$userDisplayname ($username)** ||$authorID||. \`$getObjectProperty[promoCodes;$get[codeName].uses]/$getObjectProperty[promoCodes;$get[codeName].maxUses]\`]

$interactionUpdate[
  {newEmbed:
    {author:$userDisplayName[$authorid] | $language[tr:Promosyon;en:Promotion;de:Promotion]:$authorAvatar}
    {title:<#COLON#confetti#COLON#1136046618207076465> $language[tr:Promosyon Kodu Kullanıldı;en:Promotion Code Used;de:Promotionscode Eingelöst]}
    {description:$nonEscape[$language[tr:Promosyon kodunu başarılı bir şekilde kullandın ve ödül olarak **$get[rewardEmoji] $numberSeparator[$get[rewardAmount]]** kazandın!;en:You successfully redeemed the promo code and got **$get[rewardEmoji] $numberSeparator[$get[rewardAmount]]** as a reward!;de:Du hast den Promotionscode erfolgreich eingelöst und als Belohnung **$get[rewardEmoji] $numberSeparator[$get[rewardAmount]]** erhalten!]]}
    {color:$getVar[color_green]}
  }
  {actionRow:
    {button:$language[tr:Promosyon Kodu Kullan!;en:Use Promo Code!;de:Promotionscode Einlösen!]:primary:promoCodeEnter_$authorid:true:$emojiID[buttonWrite]}
  }
]

$setVar[promoCodes;$getObject[promoCodes]]
$setObjectproperty[promoCodes;$get[codeName].users;$getObjectProperty[promoCodes;$get[codeName].users],$authorID]
$setObjectProperty[promoCodes;$get[codeName].uses;$math[$get[codeUses]+1]]

$onlyif[$get[codeUses]<$get[codeMaxUses]||$get[codeMaxUses]==∞;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Belirttiğin kod maksimum kullanım sayısına ulaşmış!;en:The code you specified has reached its maximum number of uses!;de:Der angegebene Code hat die maximale Anzahl an Einlösungen erreicht!]] {interaction} {ephemeral}]

$let[codeMaxUses;$getObjectProperty[promoCodes;$get[codeName].maxUses]]
$let[codeUses;$getObjectProperty[promoCodes;$get[codeName].uses]]
$let[codeTime;$getObjectProperty[promoCodes;$get[codeName].time]]
$let[rewardAmount;$getObjectProperty[promoCodes;$get[codeName].amount]]
$let[rewardVariable;$getObjectProperty[promoCodes;$get[codeName].variable]]
$let[rewardEmoji;$getObjectProperty[promoCodes;$get[codeName].emoji]]
$let[codeName;$getObjectProperty[promoCodes;$textInputValue[code].name]]

$onlyif[$checkContains[$getObjectProperty[promoCodes;$textInputValue[code].users];$authorID]==false;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Belirttiğin kodu daha önce zaten kullanmışsın. Promosyon kodları tek kullanımlıktır!;en:You have already used the code you specified before. Promo codes are single use only!;de:Den angegebenen Code hast du bereits verwendet. Promotionscodes sind nur einmal einlösbar!]] {interaction} {ephemeral}]

$onlyif[$checkContains[$getObjectKeys[promoCodes];$textInputValue[code]]==true;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Böyle bir promosyon kodu bulunmuyor. Lütfen farklı bir kod girip tekrar deneyin!;en:Such a promotion code does not exist. Please enter a different code and try again!;de:Solch ein Promotionscode existiert nicht. Bitte gib einen anderen Code ein und versuche es erneut!]] {interaction} {ephemeral}]

$createObject[promoCodes;$getVar[promoCodes]]
    `
  }
];