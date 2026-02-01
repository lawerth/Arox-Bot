module.exports = [
  {
    name: "language",
    aliases: ["lang", "dil"],
    desc: ["You change the language of the bot.", "Botun dilini değiştirirsin.", "Du änderst die Sprache des Bots."],
    usage: "language en|tr|de",
    example: ["language", "language en"],
    $if: "old",
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
	  {author:$language[tr:Dil Sistemi;en:Language System;de:Spracheinstellung]:$userAvatar[$clientID]}
	  {color:$getVar[embedcolor]}
	  {footer:$userDisplayName:$authorAvatar}
	  {timestamp}
	  {description:$language[tr:Botun dilini alttaki menüyü kullanarak değiştirebilirsiniz!\n\nŞu anki diliniz: 🇹🇷 **Türkçe**;en:You can change the language of the bot using the menu below!\n\nYour current language: 🇬🇧 **English**;de:Du kannst die Sprache des Bots mit dem untenstehenden Menü ändern!\n\nIhre aktuelle Sprache: 🇩🇪 **Deutsch**]}
  }
  {actionRow:
	  {selectMenu:langSelect_$authorid:$language[tr:Botun dilini değiştirmek için dokunun!;en:Tap to change the language of the bot!]:1:1:false:
	    {stringInput:English:en::$language[tr:false;en:true;de:false]:🇬🇧}
      {stringInput:Türkçe:tr::$language[tr:true;en:false;de:false]:🇹🇷}
      {stringInput:Deutsch:de::$language[tr:false;en:false;de:true]:🇩🇪}
	  }
  }
;true]]

$if[$message[1]==tr&&$getGlobalUserVar[lang;$authorID;important]!=tr]
  $setGlobalUserVar[lang;tr;$authorID;important]
$else
$if[$message[1]==en&&$getGlobalUserVar[lang;$authorID;important]!=en]
  $setGlobalUserVar[lang;en;$authorID;important]
$else
$if[$message[1]==de&&$getGlobalUserVar[lang;$authorID;important]!=de]
  $setGlobalUserVar[lang;de;$authorID;important]
$endif
$endif
$endif

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
	  `
  },
  {
    type: "interaction",
    prototype: "selectMenu",
    code: `
$editMessage[$interactionData[message.id];
  {newEmbed:
	  {author:$language[tr:Dil Sistemi;en:Language System;de:Spracheinstellung]:$userAvatar[$clientID]}
	  {color:$getVar[embedcolor]}
	  {footer:$userDisplayName:$authorAvatar}
	  {timestamp}
	  {description:$language[tr:Botun dilini alttaki menüyü kullanarak değiştirebilirsiniz!\n\nŞu anki diliniz: 🇹🇷 **Türkçe**;en:You can change the language of the bot using the menu below!\n\nYour current language: 🇬🇧 **English**;de:Du kannst die Sprache des Bots mit dem untenstehenden Menü ändern!\n\nIhre aktuelle Sprache: 🇩🇪 **Deutsch**]}
  }
  {actionRow:
	  {selectMenu:langSelect_$authorid:$language[tr:Botun dilini değiştirmek için dokunun!;en:Tap to change the language of the bot!]:1:1:false:
	    {stringInput:English:en::$language[tr:false;en:true;de:false]:🇬🇧}
      {stringInput:Türkçe:tr::$language[tr:true;en:false;de:false]:🇹🇷}
      {stringInput:Deutsch:de::$language[tr:false;en:false;de:true]:🇩🇪}
	  }
  }
]

$interactionReply[$nonEscape[**$emoji[success] |** $language[tr:Botun dili başarıyla 🇹🇷 **Türkçe** olarak ayarlandı!;en:The bot's language was successfully set to 🇬🇧 **English**!;de:Die Sprache des Bots wurde erfolgreich auf 🇩🇪 **Deutsch** eingestellt!]];everyone;true]

$setGlobalUserVar[lang;$get[selectedLang];$authorID;important]

$let[selectedLang;$interactionData[values[0]]]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu menüyü kullanamazsın!;en:You can't use this menu!;de:Du kannst diese Menü nicht verwenden!]] {ephemeral} {interaction}]
$onlyif[$advancedTextSplit[$interactionData[customId];_;1]==langSelect;]
	  `
  }
];
