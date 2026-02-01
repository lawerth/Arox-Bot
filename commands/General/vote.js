module.exports = [
  {
    name: "vote",
    aliases: ["topgg", "oy", "oyver"],
    desc: ["Vote for the bot and win prizes.", "Bota oy verip ödüller kazanırsın.", "Vote for the bot and win prizes."],
    code: `
$sendMessage[
  {newEmbed:
    {author:$username[$clientID] | $language[tr:Oy Ver;en:Vote;de:Abstimmen]:$userAvatar[$clientID]}
    {color:$getVar[embedcolor]}
    {footer:$username:$authorAvatar}
    {timestamp}
    {description:$language[tr:Oy vermek için hemen aşağıdaki butona tıklayabilirsin! Her gün oy vererek serini yükseltmeye devam edebilirsin. Ama dikkat, bir gün oy vermediğin taktirde tüm serin sıfırlanır.;en:Click the button below to vote now! You can continue to increase your streak by voting every day. But beware, if you don't vote one day, your entire streak will be reset.;de:Klicke einfach auf den Button unten, um abzustimmen! Du kannst deine Serie fortsetzen, indem du jeden Tag abstimmst. Aber pass auf – wenn du einen Tag auslässt, wird deine gesamte Serie zurückgesetzt.]

**$language[tr:Oy Ödülü:;en:Vote Reward:;de:Abstimm Belohnung:]** $emoji[cash] $numberSeparator[$get[voteReward]]
**$language[tr:Oy Serisi:;en:Vote Streak:;de:Abstimm-Serie:]** $numberSeparator[$getGlobalUserVar[voteStreak;$authorID]]
**$language[tr:Toplam Oy:;en:Total Vote:;de:Gesamtstimmen:]** $numberSeparator[$getGlobalUserVar[totalVote;$authorID]]
$if[$getGlobalUserVar[lastVote;$authorID]!=0;**$language[tr:Son Oy:;en:Last Vote:;de:Letzte Stimme:]** $discordTimestamp[$getGlobalUserVar[lastVote;$authorID];R]]
    }
  }
  {actionRow:
    {button:$language[tr:Oy Ver;en:Vote;de:Abstimmen]:link:$botLink[topgg]:false}
    {button:$language[tr:Oy Hatırlatcısı;en:Vote Reminder;de:Abstimm Erinnerung]:$if[$getGlobalUserVar[voteReminder;$authorID]==true;success;danger]:voteReminder_$authorID:false:⏰}
  }
]

$let[voteReward;$math[5000 + (5000/100*$getGlobalUserVar[voteStreak;$authorid])]]
  
$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }, 
  {
  //name: "voteReminder",
    type: "interaction",
    prototype: "button",
    code: `
$editButton[voteReminder_$authorID;$language[tr:Oy Hatırlatcısı;en:Vote Reminder;de:Abstimm Erinnerung];$if[$getGlobalUserVar[voteReminder;$authorID]==true;Success;Danger];false;⏰;$messageID]

$interactionReply[$nonEscape[$if[$getGlobalUserVar[voteReminder;$authorID]==true;**$emoji[success] |** $language[tr:Oy hatırlatıcısı başarıyla aktif edildi!;en:Vote reminder successfully enabled!;de:Abstimm Erinnerung wurde erfolgreich aktiviert!];**$emoji[error] |** $language[tr:Oy hatırlatıcısı başarıyla devre dışı bırakıldı!;en:Vote reminder successfully disabled!;de:Abstimm Erinnerung wurde erfolgreich deaktiviert!]]];everyone;true]

$setGlobalUserVar[voteReminder;$if[$getGlobalUserVar[voteReminder;$authorID]==true;false;true];$authorID]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==voteReminder;]
    `
  }
];