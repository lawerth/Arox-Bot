module.exports = [
  {
    name: "premium",
    aliases: ["pre"],
    code: `
$sendMessage[
  {newEmbed:
    {author:$userDisplayName | Premium:$authorAvatar}
    {color:$getVar[color_yellow]}
    {description:🎉 **$userDisplayName**, $language[tr:Premium hizmetlerimizden yararlanmak için [destek sunucumuza]($botLink[support]) katılabilirsiniz.;en:You can join our [support server]($botLink[support]) to benefit from our premium services.;de:Du kannst unserem [Support Server]($botLink[support]) beitreten, um von unseren Premium-Diensten zu profitieren.]}
  }
  {actionRow:
    {button:$language[tr:Premium Ayrıcalıkları;en:Premium Perks]:success:premiumPerks:false:$emojiID[premium]}
  }
]

$onlyif[1==2;] $comment[has not yet been completed]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!]]
    `
  }
];