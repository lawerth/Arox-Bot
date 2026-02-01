module.exports = [
  {
    name: "rules",
    aliases: ["rule", "kurallar", "kural"],
    desc: ["You can view the bot's terms of use.", "Botun kullanım kurallarına bakarsın.", "Du kannst die Nutzungsbedingungen des Bots einsehen."],
    code: `
$sendMessage[
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Kurallar;en:Rules;de:Regeln]:$emojiURL[$emojiID[rules]]}
    {thumbnail:$userAvatar[$clientid]}
    {color:$getvar[embedcolor]}
    {description:$botRulesText[$language[tr:tr;en:en;de:de]]}
    {footer:$userTag[$authorid] | $language[tr:$numberSeparator[$getVar[botRulesTotalAccept;important]] kullanıcı kuralları kabul etti.;en:$numberSeparator[$getVar[botRulesTotalAccept;important]] users accepted the rules.;de:$numberSeparator[$getVar[botRulesTotalAccept;important]] Benutzer haben die Regeln akzeptiert.]:$authorAvatar}
  }
  {reply:$messageID:false}
  {actionRow: 
    {button:$language[tr:Kuralları Kabul Etmişsin;en:You Accepted the Rules;de:Regeln Akzeptiert]:success:botRulesAccept_$authorID:true:$emojiID[buttonAccept]}
  }
  {suppress}
]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  },
  {
  //name: "botRulesAccept", 
    type: "interaction",
    prototype: "button",
    code: `
$interactionUpdate[
  {newEmbed:
    {author:$language[tr:Kurallar Başarıyla Kabul Edildi;en:Rules Successfully Accepted;de:Regeln Erfolgreich Akzeptiert]:$emojiURL[$emojiID[rulesSuccess]]}
    {thumbnail:$userAvatar[$clientid]}
    {color:$getVar[color_green]}
    {description:$botRulesText[$language[tr:tr;en:en;de:de]]}
    {footer:$userTag[$authorid] | $language[tr:$numberSeparator[$getVar[botRulesTotalAccept;important]] kullanıcı kuralları kabul etti.;en:$numberSeparator[$getVar[botRulesTotalAccept;important]] users accepted the rules.;de:$numberSeparator[$getVar[botRulesTotalAccept;important]] Benutzer haben die Regeln akzeptiert.]:$authorAvatar}
  }
  {actionRow:
    {button:$language[tr:Kuralları Kabul Et;en:Accept the Rules;de:Regeln Akzeptieren]:success:botRulesAccept_$authorID:true:$emojiID[buttonAccept]}
  }
]

$setVar[botRulesTotalAccept;$math[$getVar[botRulesTotalAccept;important]+1];important]
$setGlobalUserVar[botRules;true;$authorId;important]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==botRulesAccept;]
    `
  }
];
