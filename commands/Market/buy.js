module.exports = [
  {
    name: "buy",
    aliases: ["purchase", "satınal"],
    desc: ["You purchase the product whose number you entered.", "Numarasını girdiğin ürünü satın alırsın.", "Sie kaufen das Produkt, dessen Nummer Sie eingegeben haben."],
    usage: ["buy {id} {amount}"],
    example: ["buy 101", "buy 1 5"],
    $if: "old",
    code: `
$if[$checkContains[ $message[1] ; 101 ; 102 ; 103 ; 104 ; 105 ; 106 ; 107 ; 108 ; 109 ; 110 ; 111 ; 112 ; 113 ; 114 ; 115 ; 116 ; 117 ; 118 ]==true]

  $setGlobalUserVar[backgrounds;$getArray[bgUser]] $arrayPush[bgUser;$message[1]]
  $setGlobalUserVar[cash;$math[$getGlobalUserVar[cash;$authorID]-$get[productPrice]];$authorid]
  
  $sendMessage[$nonEscape[**$get[firstEmoji] | $userDisplayName**, $language[tr:Başarıyla **$emoji[cash] $numberSeparator[$get[productPrice]]** karşılığında **$emoji[background] $get[bgName]** satın aldın!;en:You have successfully purchased **$emoji[background] $get[bgName]** for $emoji[cash] **$numberSeparator[$get[productPrice]]**;de:Du hast erfolgreich **$emoji[background] $get[bgName]** im Austausch für **$emoji[cash] $numberSeparator[$get[productPrice]]** gekauft!!]]]
  
  $onlyif[$getGlobalUserVar[cash;$authorid]>=$get[productPrice];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:$emoji[background] **$get[bgName]** satın alabilmek için **$emoji[cash] $numberSeparator[$math[$get[productPrice]-$getGlobalUserVar[cash;$authorid]]]** daha gerekiyor!;en:You need **$emoji[cash] $numberSeparator[$math[$get[productPrice]-$getGlobalUserVar[cash;$authorid]]]** more to buy $emoji[background] **$get[bgName]**!;de:Um $emoji[background] **$get[bgName]** kaufen zu können, brauchst du noch **$emoji[cash] $numberSeparator[$math[$get[productPrice]-$getGlobalUserVar[cash;$authorid]]]**!]] {deleteIn:5s}]
  $let[productPrice;$getObjectProperty[bgData;[$message[1]][0].price]]
  
  $onlyIf[$arrayIncludes[bgUser;$get[bgName]]==false;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:**$emoji[backgruond] $get[bgName]** zaten sende var!;en:You already have **$emoji[background] $get[bgName]**!;de:**$emoji[background] $get[bgName]** gehört dir bereits!]] {deleteIn:5s}]
  $let[bgName;$getObjectProperty[bgData;[$message[1]][0].name[$language[tr:0;en:1]]]]
  
  $createObject[bgData;$readFile[./data/backgrounds.json]]
  $createArray[bgUser;$nonEscape[$djsEval[$getGlobalUserVar[backgrounds;$authorid].join(";");true]]]

$else
  $sendMessage[$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir ürün numarası belirtip tekrar deneyin!;en:Please specify a valid product number and try again!;de:Bitte gib eine gültige Produktnummer an und versuche es erneut!]] {deleteIn:5s}]
$endif

$let[amount;$ifv6[$message[2]==||$isNumber[$message[2]]==false||$message[2]<1;1;$message[2]]]
$let[firstEmoji;🛒]

$onlyif[$message!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen satın almak istediğiniz ürünün numarasını belirtip tekrar deneyin!;en:Please specify the number of the product you want to purchase and try again!;de:Bitte gib die Nummer des Produkts an, das du kaufen möchtest, und versuche es erneut!]] {deleteIn:5s}]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];