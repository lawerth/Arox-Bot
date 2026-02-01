module.exports = [
  {
    type: "awaited",
    name: "topggVote",
    code: `
$setGlobalUserVar[cash;$math[$getGlobalUserVar[cash;$get[authorID]]+$get[voteReward]];$get[authorID]]
$onlyIf[$getGlobalUserVar[botRules;$get[authorID];important]==true;]

$setGlobalUserVar[voteTimeoutID;$setTimeout[voteStreakReset;24h;{"authorID": "$get[authorID]"};true];$get[authorID]]
$setTimeout[voteReminder;12h;{"authorID": "$get[authorID]"}]

$ifAwaited[$getGlobalUserVar[voteTimeoutID;$get[authorID]]!=0;{execute:voteTimeoutReset}]
$ifAwaited[$isUserDmEnabled[$get[authorID]]==true;{execute:voteMsgSendDM}]

$setGlobalUserVar[lastVote;$dateStamp;$get[authorID]]
$setGlobalUserVar[totalVote;$sum[$getGlobalUserVar[totalVote;$get[authorID]];1];$get[authorID]]
$setGlobalUserVar[voteStreak;$get[streak];$get[authorID]]
$setGlobalUserVar[voted;true;$get[authorID]]

$let[voteReward;$math[5000 + (5000/100*$get[streak])]]
$let[streak;$sum[$getGlobalUserVar[voteStreak;$get[authorID]];1]]

$let[lang;$getGlobalUserVar[lang;$get[authorID];important]]
    `
  },
  {
    name: "topggVoteMsg",
    type: "awaited",
    $if: "old",
    code: `
$if[$memberExists[$get[authorID];$customGuildID[support]]==true]
  $setTimeout[voteRoleTimer;12h;{"authorID": "$get[authorID]", "roleID": "$customRoleID[botSupporter]"};false]
  $giveRole[$customGuildID[support];$get[authorID];$customRoleID[botSupporter]]
$endif

$if[$hasPermsInChannel[$customChannelID[supportVotesLog];$clientID;viewchannel;sendmessages]==true]
  $channelSendMessage[$customChannelID[supportVotesLog];
    {newEmbed:
      {title:$userDisplayName[$get[authorID]] just voted for $username[$clientID]}
      {thumbnail:$userAvatar[$get[authorID]]}
      {color:Random}
      {footer:User#COLON# $username[$get[authorID]]}
      {timestamp}
      {description:❤️ Thank you for your support! You can vote on top.gg **[here]($botLink[topgg])** every 12 hours.\n- User's Vote Streak: **$GetGlobalUserVar[voteStreak;$get[authorID]]** $ifv6[$memberExists[$get[authorID];$customGuildID[support]]==true;\n- User was given **$roleName[$customRoleID[botSupporter];$customGuildID[support]]** role for 12 hours.]}
    }
  ]
$endif
    `
  },
  {
    name: "voteMsgSendDM",
    type: "awaited",
    code: `
$sendDM[
  {newEmbed:
    {title:🗳️ $if[$get[lang]==tr;Oy Verdiğiniz İçin Teşekkürler!;$if[$get[lang]==en;Thanks for Voting!;$if[$get[lang]==de;Danke Für Deine Stimme!]]]}
    {color:$getVar[embedcolor]}
    {description:$if[$get[lang]==tr;Tebrikler! Bugün oy vererek toplam **$get[streak]** seriye ulaştın!;$if[$get[lang]==en;Congratulations! You have reached a total of **$get[streak]** streaks by voting today!;$if[$get[lang]==de;Glückwunsch! Du hast heute abgestimmt und damit eine Serie von insgesamt **$get[streak]** erreicht!]]]}
    {field:🎁 $if[$get[lang]==tr;Kazanılan Ödül(ler):;$if[$get[lang]==en;Gained Reward(s):;$if[$get[lang]==de;Erhaltene Belohnung(en):]]]:$emoji[dot] $if[$getGlobalUserVar[botRules;$get[authorID];important]==true;$emoji[cash] $numberSeparator[$get[voteReward]];*$if[$get[lang]==tr;Ödül alabilmeniz için kuralları kabul etmelisiniz!;$if[$get[lang]==en;You must accept the rules to receive the rewards!;$if[$get[lang]==de;Um die Belohnung zu erhalten, musst du die Regeln akzeptieren!]]]*]}
  }
;$get[authorID]]
    `
  },
  {
    name: "voteRoleTimer",
    type: "timeout",
    code: `
$removeRole[$customGuildID[support];$timeoutData[authorID];$timeoutData[roleID]]
$onlyIf[$memberExists[$timeoutData[authorID];$customGuildID[support]]==true;]
    `
  },
  {
    name: "voteStreakReset",
    type: "timeout",
    code: `
$setGlobalUserVar[voteTimeoutID;0;$timeoutData[authorID]]
$setGlobalUserVar[voteStreak;0;$timeoutData[authorID]]
    `
  },
  {
    name: "voteTimeoutReset",
    type: "awaited",
    code: `
$setGlobalUserVar[voteTimeoutID;0;$get[authorID]]
$stopTimeout[$getGlobalUserVar[voteTimeoutID;$get[authorID]]]
$onlyIf[$checkContains[$timeoutList[id;,];$getGlobalUserVar[voteTimeoutID;$get[authorID]]]==true;]
    `
  },
  {
    name: "voteReminder",
    type: "timeout",
    code: `
$sendDM[
  {newEmbed:
    {title:⏰ $if[$get[lang]==tr;Oy Hatırlatıcısı;$if[$get[lang]==en;Vote Reminder;$if[$get[lang]==de;Stimmungserinnerung!]]]}
    {color:$getVar[color_yellow]}
    {footer:$if[$get[lang]==tr;Bu hatırlatıcıyı "a!oy" komutu ile devre dışı bırakabilirsiniz.;$if[$get[lang]==en;You can disable this reminder with "a!vote".;$if[$get[lang]==de;Du kannst diese Erinnerung mit dem Befehl "a!vote" deaktivieren.]]]}
    {description:$if[$get[lang]==tr;Hala oy vermediniz mi? Oy vermek için [buraya]($botLink[topgg]) tıklayın!;$if[$get[lang]==en;Haven't you voted yet? Click [here]($botLink[topgg]) to vote!;$if[$get[lang]==de;Hast du noch nicht abgestimmt? Klicke [hier]($botLink[topgg]), um abzustimmen!]]]}
  }
;$timeoutData[authorID]]

$let[lang;$getGlobalUserVar[lang;$timeoutData[authorID];important]]

$onlyIf[$getGlobalUserVar[voteReminder;$timeoutData[authorID]]==true;]

$setGlobalUserVar[voted;false;$timeoutData[authorID]]
    `
  }
];
