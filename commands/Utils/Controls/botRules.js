module.exports = [
  {
	  name: "botRulesControl",
    type: "awaited",
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$language[tr:Kuralları kabul etmelisin!;en:You must accept the rules!;de:Du musst die Regeln akzeptieren!]:$emojiURL[$emojiID[rules]]}
    {thumbnail:$userAvatar[$clientid]}
    {color:$getvar[embedcolor]}
    {description:$botRulesText[$getGlobalUserVar[lang;$authorID;important]]}
    {footer:$userTag[$authorid] | $language[tr:$numberSeparator[$getVar[botRulesTotalAccept;important]] kullanıcı kuralları kabul etti.;en:$numberSeparator[$getVar[botRulesTotalAccept;important]] users accepted the rules.;de:$numberSeparator[$getVar[botRulesTotalAccept;important]] Nutzer haben die Regeln akzeptiert.]:$authorAvatar}
  }
  {actionRow:
    {button:$language[tr:Kuralları Kabul Et;en:Accept the Rules;de:Regeln Akzeptieren]:success:botRulesAccept_$authorID:false:$emojiID[buttonAccept]}
  }
;true]]
	  `
  }
];