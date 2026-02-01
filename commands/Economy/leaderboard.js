module.exports = [
  {
	  name: "leaderboard",
	  aliases: ["leaderboards", "lb", "rank", "top", "sıralama"],
    desc: ["You look at the global leaderboards.", "Global liderlik tablolarına bakarsın.", "Du siehst dir die globalen Bestenlisten an."],
    usage: "leaderboard cash|level|xp|pray|vote|votestreak",
    example: ["lb cash", "top pray"],
	  $if: "old",
  	code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$username[$clientID] | $get[lbName] — $language[tr:Sıralama İstatistikleri;en:Ranking Stats;de:Ranglisten Statistiken]:$userAvatar[$clientID]}
    {color:$getvar[embedcolor]}
    {thumbnail:$emojiURL[$get[lbEmoji]]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $userTag[$authorid]:$userAvatar[$authorid]}
    {timestamp}
    {color:$getvar[embedcolor]}
    {description:$nonEscape[
### $emoji[leaderboardUser] $language[tr:Senin Bilgilerin:;en:Your Informations:;de:Ihre Informationen:]
$emoji[dot] **$language[tr:Miktar:;en:Amount:;de:Betrag:]** $numberSeparator[$getGlobalUserVar[$get[lbVariable];$authorid]]
$emoji[dot] **$language[tr:Sıralama:;en:Rank:;de:Rang:]** #$getLeaderboardInfo[$get[lbVariable];$authorid;global;top]
### $emoji[leaderboard] $language[tr:Global Sıralama Tablosu:;en:Global Ranking Table:;de:Globale Rangliste:]
$ifv6[$get[totalUsers]==;- $language[tr:Sıralama bilgisi yok.;en:No ranking information.;de:Keine Ranglisteninformationen vorhanden.];$globalUserLeaderBoard[$get[lbVariable];desc;{top}. **{tag}** - {value:,};10;$get[currentPage];main]]
    ]}
  }
  {actionRow:
    {button::primary:leaderboardPage_back_$authorid_$get[currentPage]_$get[totalPage]_$get[lbName]_$get[lbEmoji]_$get[lbVariable]:$get[backButtonDisable]:$emojiID[buttonBackPage]}
    {button:$get[currentPage]/$get[totalPage]:secondary:sıralamaPageStatus:true}
    {button::primary:leaderboardPage_next_$authorid_$get[currentPage]_$get[totalPage]_$get[lbName]_$get[lbEmoji]_$get[lbVariable]:$get[nextButtonDisable]:$emojiID[buttonNextPage]}
  }
;true]]

$let[backButtonDisable;$ifv6[$get[currentPage]==1;true;false]]
$let[nextButtonDisable;$ifv6[$get[totalPage]==$get[currentPage];true;false]]

$let[currentPage;1]
$let[totalPage;$ifv6[$checkContains[$math[$getTextSplitLength/10];.]==true;$math[$truncate[$math[$getTextSplitLength/10]]+1];$math[$getTextSplitLength/10]]]
$textSplit[$get[totalUsers];, ]
$let[totalUsers;$globalVarUsers[$get[lbVariable];{id};, ]]

$onlyIf[$get[lbVariable]!=undefined&&$get[lbEmoji]!=undefined&&$get[lbName]!=undefined;]

$if[$checkContains[ $toLowercase[$message[1]] ; cash ; money ; balance ; aroxcash ; arox-cash ]==true]

  $let[lbName;Arox Cash]
  $let[lbEmoji;$emojiID[cash]]
  $let[lbVariable;cash]

$elseif[$checkContains[ $toLowercase[$message[1]] ; level ; lvl ]==true]

  $let[lbName;$language[tr:Seviye;en:Level;de:Stufe]]
  $let[lbEmoji;$emojiID[level]]
  $let[lbVariable;level]

$endelseif
$elseif[$checkContains[ $toLowercase[$message[1]] ; xp ]==true]

  $let[lbName;XP]
  $let[lbEmoji;$emojiID[xp]]
  $let[lbVariable;totalXp]

$endelseif
$elseif[$checkContains[ $toLowercase[$message[1]] ; pray ; luck ; lucky ]==true]

  $let[lbName;$language[tr:Şans;en:Pray;de:Gebet]]
  $let[lbEmoji;$emojiID[clover]]
  $let[lbVariable;pray]

$endelseif
$elseif[$checkContains[ $toLowercase[$message[1]] ; vote ; totalvote ; total-vote ]==true]

  $let[lbName;$language[tr:Toplam Oy;en:Total Vote;de:Gesamtstimmen]]
  $let[lbEmoji;$emojiID[vote]]
  $let[lbVariable;totalVote]

$endelseif
$elseif[$checkContains[ $toLowercase[$message[1]] ; votestreak ; vote-streak ]==true]

  $let[lbName;$language[tr:Oy Serisi;en:Vote Streak;de:Stimmenserie]]
  $let[lbEmoji;$emojiID[vote]]
  $let[lbVariable;voteStreak]

$endelseif
$else
  $sendMessage[$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir sıralama türü belirtin!;en:Please specify a valid ranking type!;de:Bitte gib eine gültige Ranglistenart an!] \`cash, pray, level, xp, vote, votestreak\`] {deleteIn:10s}]
$endif

$let[lbName;undefined]
$let[lbEmoji;undefined]
$let[lbVariable;undefined]

$onlyIf[$message!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir sıralama türü belirtin!;en:Please specify a valid ranking type!;de:Bitte gib eine gültige Ranglistenart an!] \`cash, pray, level, xp, vote, votestreak\`] {deleteIn:10s}]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  },
  {
  //name: ["leaderboardPage_next", "leaderboardPage_back"],
    type: "interaction",
    prototype: "button",
    code: `
$interactionUpdate[
  {newEmbed:
    {author:$username[$clientID] | $get[lbName] — $language[tr:Sıralama İstatistikleri;en:Ranking Stats;de:Ranglisten Statistiken]:$userAvatar[$clientID]}
    {color:$getvar[embedcolor]}
    {thumbnail:$emojiURL[$get[lbEmoji]]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $userTag[$authorid]:$userAvatar[$authorid]}
    {timestamp}
    {color:$getvar[embedcolor]}
    {description:$nonEscape[
### $emoji[leaderboardUser] $language[tr:Senin Bilgilerin:;en:Your Informations:;de:Ihre Informationen:]
$emoji[dot] **$language[tr:Miktar:;en:Amount:;de:Betrag:]** $numberSeparator[$getGlobalUserVar[$get[lbVariable];$authorid]]
$emoji[dot] **$language[tr:Sıralama:;en:Rank:;de:Rang:]** #$getLeaderboardInfo[$get[lbVariable];$authorid;global;top]
### $emoji[leaderboard] $language[tr:Global Sıralama Tablosu:;en:Global Ranking Table:;de:Globale Rangliste:]
$globalUserLeaderBoard[$get[lbVariable];desc;{top}. **{tag}** - {value:,};10;$get[currentPage];main]
    ]}
  }
  {actionRow:
    {button::primary:leaderboardPage_back_$authorid_$get[currentPage]_$get[totalPage]_$get[lbName]_$get[lbEmoji]_$get[lbVariable]:$get[backButtonDisable]:$emojiID[buttonBackPage]}
    {button:$get[currentPage]/$get[totalPage]:secondary:sıralamaPageStatus:true}
    {button::primary:leaderboardPage_next_$authorid_$get[currentPage]_$get[totalPage]_$get[lbName]_$get[lbEmoji]_$get[lbVariable]:$get[nextButtonDisable]:$emojiID[buttonNextPage]}
  }
]

$let[backButtonDisable;$if[$get[currentPage]==1;true;false]]
$let[nextButtonDisable;$if[$get[totalPage]==$get[currentPage];true;false]]

$let[lbVariable;$splitText[8]]
$let[lbEmoji;$splitText[7]]
$let[lbName;$splitText[6]]
$let[totalPage;$splitText[5]]
$let[currentPage;$math[$splitText[4]$if[$splitText[2]==next;+;-]1]]

$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!] {ephemeral} {interaction}]

$onlyIf[$splitText[3]==$authorid;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {interaction} {ephemeral}]
$onlyIf[$splitText[1]==leaderboardPage;]
$textSplit[$interactionData[customId];_]
    `
  }
];