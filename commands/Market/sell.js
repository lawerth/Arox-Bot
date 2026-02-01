module.exports = [
  {
	  name: "sell",
	  aliases: ["sold", "sat"],
    desc: ["You sell the product whose number you entered at 80% of the price.", "Numarasını girdiğin ürünü %80 fiyatına satarsın.", "Du verkaufst das Produkt, dessen Nummer du eingegeben hast, zum Preis von 80%."],
    usage: ["sell {id} {amount}"],
    example: ["sell 101", "sell 1 5"],
    $if: "old",
    code: `
$sendMessage[$nonEscape[**$emoji[error] | $userDisplayName**, Lütfen geçerli bir ürün numarası belirtip tekrar deneyin!;de:Bitte gib eine gültige Produktnummer an und versuche es erneut!] {deleteIn:5s}]

$let[percent;80]
$let[amount;$ifv6[$message[2]==||$isNumber[$message[2]]==false||$message[2]<1;1;$message[2]]]
$let[firstEmoji;🛒]

$onlyif[$message!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen satmak istediğiniz ürünün numarasını belirtip tekrar deneyin!;en:Please specify the number of the product you want to sell and try again!;de:Bitte gib die Nummer des Produkts an, das du verkaufen möchtest, und versuche es erneut!]] {deleteIn:5s}]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];