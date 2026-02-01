module.exports = [
  {
	  name: "level",
	  aliases: ["lvl", "seviye", "svy", "xp"],
    desc: ["You view your current level progress.", "Mevcut seviye ilerlemene bakarsın.", "Du siehst deinen aktuellen Levelfortschritt."],
    code: `
$djsEval[
const { Font, RankCardBuilder } = require('canvacord');

Font.loadDefault();

const generateRankCard = async () => {

  const card = new RankCardBuilder()
    .setDisplayName("$userDisplayName[$authorid]")
    .setUsername("@$username[$authorid]")
    .setAvatar("$replaceText[$authorAvatar;.gif;.png]")
    .setCurrentXP($getGlobalUserVar[currentXp;$authorid])
    .setRequiredXP($getGlobalUserVar[requiredXp;$authorid])
    .setLevel($getGlobalUserVar[level;$authorid])
    .setRank($getLeaderboardInfo[level;$authorId;global;top])
    .setOverlay(50)
    .setBackground("./data/backgrounds/$getGlobalUserVar[background;$authorid].jpg")
    .setStatus("$userStatus[$guildID;$authorID]");

  card.setTextStyles({
    level: "$language[tr:SEVİYE:;en:LEVEL:;de:LEVEL:]",
    xp: "XP:",
    rank: "$language[tr:SIRA:;en:RANK:;de:RANG:]",
  });

  const image = await card.build();

  message.channel.send({ files: [{ attachment: image, name: "rank-card.png" }] });
};

generateRankCard(); 
]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];