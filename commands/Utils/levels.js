module.exports = [
  {
    name: "$alwaysExecute",
    code: `
$setGlobalUserVar[dailyXpEarned;0;$authorID;main]
$setGlobalUserVar[firstMessage;false;$authorID;main]

$wait[$get[resetTime]s]
$let[resetTime;$math[86400 - (($hour * 3600) + ($minute * 60) + $second)]]

$ifAwaited[$getGlobalUserVar[currentXp;$authorid]>=$getGlobalUserVar[requiredXp;$authorid];{execute:levelUpMessage}]

$setGlobalUserVar[totalXp;$math[$getGlobalUserVar[totalXp;$authorid]+($get[gain]+$get[gainBonus])];$authorid]
$setGlobalUserVar[currentXp;$math[$getGlobalUserVar[currentXp;$authorid]+($get[gain]+$get[gainBonus])];$authorid]
$setGlobalUserVar[firstMessage;true;$authorID]

$onlyif[$getGlobalUserVar[dailyXpEarned;$authorID]<$get[dailyLimit];]
$setGlobalUserVar[dailyXpEarned;$math[$getGlobalUserVar[dailyXpEarned;$authorid]+$get[gain]];$authorID]

$let[gainBonus;$if[$getGlobalUserVar[firstMessage;$authorid]==false;500;0]]
$let[gain;$random[$get[minXP];$get[maxXP]]]
$let[firstMsgBonus;500]
$let[minXP;10]
$let[maxXP;15]
$let[dailyLimit;3000]

$globalCooldown[60s;]

$onlyif[$channelType[$channelID]==text;]
$onlyif[$isBot[$authorid]==false]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorid;important]==false;]
    `
  },
  {
    name: "levelUpMessage",
    type: "awaited",
    code: `
$djsEval[
const canvafy = require("canvafy");

const generateLevelUpCard = async () => {

  const levelUp = await new canvafy.LevelUp()
    .setAvatar("$authorAvatar")
    .setBackground("image", "$getObjectProperty[bgData;[$getGlobalUserVar[background;$authorID]][0].url]")
    .setUsername("$username")
    .setAvatarBorder("#FFFFFF")
    .setOverlayOpacity(0.7)
    .setLevels($math[$getGlobalUserVar[level;$authorID]-1],$getGlobalUserVar[level;$authorID])
    .build();

    message.channel.send({
      content: "**$emoji[levelUp] |** $language[tr:Tebrikler **$userDisplayName**, az önce **$getGlobalUserVar[level;$authorid].** seviyeye ulaştın ve **$get[rewardEmoji] $numberSeparator[$get[rewardAmount]]** kazandın!;en:Congratulations **$userDisplayName**, You just reached level **$getGlobalUserVar[level;$authorid]** and earned **$get[rewardEmoji] $numberSeparator[$get[rewardAmount]]**!;de:Glückwunsch **$userDisplayName**, du hast soeben Level **$getGlobalUserVar[level;$authorid]** erreicht und **$get[rewardEmoji] $numberSeparator[$get[rewardAmount]]** verdient!]",
      files: [{
        attachment: levelUp,
        name: "levelup.png"
      }]
    });
  }

generateLevelUpCard();
]

$createObject[bgData;$readFile[./data/backgrounds.json]]

$setGlobalUserVar[$get[rewardVariable];$math[$getGlobalUserVar[$get[rewardVariable];$authorid]+$get[rewardAmount]];$authorid]
$setGlobalUserVar[currentXp;0;$authorid]
$setGlobalUserVar[requiredXp;$math[7+5000+($getGlobalUserVar[level;$authorid]*7)**2];$authorid]
$setGlobalUserVar[level;$math[$getGlobalUserVar[level;$authorid]+1];$authorid]

$let[rewardEmoji;$emoji[cash]]
$let[rewardVariable;cash]
$let[rewardAmount;$math[($getGlobalUserVar[level;$authorid]+1)*2000]]
$suppressErrors
	  `
  }
];
