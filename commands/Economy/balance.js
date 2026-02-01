module.exports = [
  {
    name: "balance",
    aliases: ["bal", "money", "wallet", "cash", "bakiye", "cüzdan", "para"],
    desc: ["View your current balance and bank.", "Mevcut bakiyene ve bankana bakarsın.", "Sie können Ihr aktuelles Guthaben und Ihre Bank anzeigen."],
    code: `
$sendMessage[
  {newEmbed:
    {color:$getvar[embedcolor]}
    {thumbnail:$emojiURL[$if[$getGlobalUserVar[cash;$authorID]<=0;$emojiID[walletEmpty];$emojiID[walletFull]]]}
    {author:$userDisplayName[$authorid] | $language[tr:Bakiye Bilgileri;en:Balance Information;de:Deine Kontoinformationen]:$userAvatar[$authorid]}
    {field:$emoji[walletFull] $language[tr:Cüzdan;en:Balance;de:Wallet]:$emoji[cash] **$numberSeparator[$getGlobalUserVar[cash;$authorid]]**}
    {field:$emoji[bank] $language[tr:Banka;en:Bank;de:Bank]:$emoji[cash] **$numberSeparator[$getGlobalUserVar[bank;$authorid]]**}
    {field:💰 $language[tr:Toplam;en:Total;de:Gesamt]:$emoji[cash] **$numberSeparator[$math[$getGlobalUserVar[bank;$authorid]+$getGlobalUserVar[cash;$authorid]]]**}
  }
;false]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];
