module.exports = [
  {
	  name: "use",
	  aliases: ["kullan"],
    desc: ["You use the product whose number you entered.", "Numarasını girdiğin ürünü kullanırsın.", "Du verwendest das Produkt, dessen Nummer du eingegeben hast."],
    usage: ["use {id}"],
    example: ["use 1"],
    $if: "old",
    code: `
$sendMessage[$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir ürün numarası belirtip tekrar deneyin!;en:Please provide a valid item number and try again!;de:Bitte gib eine gültige Produktnummer an und versuche es erneut!]] {deleteIn:5s}]

$let[firstEmoji;🤌]
$onlyif[$message!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen kullanmak istediğiniz ürünün numarasını belirtip tekrar deneyin!;en:Please specify the number of the product you want to use and try again!;de:Bitte gib die Nummer des Produkts an, das du verwenden möchtest, und versuche es erneut!]] {deleteIn:5s}]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];