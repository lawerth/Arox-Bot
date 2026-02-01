module.exports = [
  {
	  name: "embedbuilder",
	  code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$username[$clientID] | $language[tr:Embed Oluşturucu;en:Embed Builder;de:Embed Ersteller]:$userAvatar[$clientID]}
	  {color:$getVar[embedcolor]}
		{description:### $language[tr:Mesaj Değişkenleri:;en:Message Variables;de:Nachricht Variablen:]
\`#RIGHT_BRACKET#server.name#LEFT_BRACKET#\` - $language[tr:Sunucunun adını döndürür.;en:Returns the name of the server.;de:Gibt den Namen des Servers zurück.]
\`#RIGHT_BRACKET#server.id#LEFT_BRACKET#\` - $language[tr:Sunucunun ID'sini döndürür.;en:Returns the server ID.;de:Gibt die Server-ID zurück.]
\`#RIGHT_BRACKET#server.icon#LEFT_BRACKET#\` - $language[tr:Sunucu simgesinin bağlantısını döndürür.;en:Returns the URL of the server avatar.;de:Gibt die URL des Server-Avatars zurück.]
\`#RIGHT_BRACKET#bot.name#LEFT_BRACKET#\` - $language[tr:Botun adını döndürür.;en:Returns the bot's name.;de:Gibt den Namen des Bots zurück.]
\`#RIGHT_BRACKET#bot.tag#LEFT_BRACKET#\` - $language[tr:Botun ismini ve etiketini döndürür.;en:Returns the name and tag of the bot.;de:Gibt den Namen und das Tag des Bots zurück.]
\`#RIGHT_BRACKET#bot.id#LEFT_BRACKET#\` - $language[tr:Botun ID'sini döndürür.;en:Returns the bot's ID.;de:Gibt die Bot-ID zurück.]
\`#RIGHT_BRACKET#bot.icon#LEFT_BRACKET#\` - $language[tr:Botun simgesinim bağlantısını döndürür.;en:Returns the URL of the bot's icon.;de:Gibt die URL des Bot-Icons zurück.]
    }
	}
	{actionRow:
	  {button:$language[tr:Mesaj Oluştur;en:Create Message;de:Nachricht Erstellen]:primary:messageBuilder_$authorID:false}
	  {button:$language[tr:Embed Oluştur;en:Create Embed;de:Embed Erstellen]:primary:embedBuilder_$authorID:false}
	}
;true]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
	  `
  }, 
  {
  //name: "messageBuilder",
    type: "interaction",
	  prototype: "button",
	  code: `
$interactionModal[$language[tr:Mesaj Oluşturucu;en:Message Creator;de:Nachricht Ersteller];messageBuilderModal;
  {actionRow:
    {textInput:$language[tr:Mesaj İçeriği;en:Message Content;de:Inhalt der Nachricht]:2:messageContent:true:$language[tr:Gönderilecek mesajın içeriğini buraya yazın.;en:Type the content of the message to be sent here.;de:Gib hier den Inhalt der zu sendenden Nachricht ein.]:1:2000}
  }
]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==messageBuilder;]
	  `
  }, 
  {
  //name: "embedBuilder",
    type: "interaction",
	  prototype: "button",
	  code: `
$interactionModal[$language[tr:Embed Oluşturucu;en:Embed Builder;de:Embed Ersteller];embedBuilderModal;
  {actionRow:
    {textInput:$language[tr:Mesaj İçeriği;en:Message Content;de:Inhalt der Nachricht]:2:messageContent:false:$language[tr:Embed harici normal mesaj.;en:Normal message outside embed.;de:Textnachricht ohne Einbettung.]:0:2000}
  }
  {actionRow:
    {textInput:Author Name:2:authorName:false::0:2000}
  }
  {actionRow:
    {textInput:Author Icon:1:authorIcon:false::0:2000}
  }
  {actionRow:
    {textInput:Title Name:2:title:false::0:2000}
  }
	{actionRow:
    {textInput:Description:2:description:false::0:2000}
  }
  {actionRow:
    {textInput:Embed Color:1:color:false::0:50:$getVar[embedcolor]}
  }
  {actionRow:
    {textInput:Thumbnail;en:Thumbnail]:1:thumbnail:false::0:2000}
  }
	{actionRow:
    {textInput:Image URL:1:image:false::0:2000}
  }
	{actionRow:
    {textInput:Footer Text:2:footerText:false::0:2000}
  }
  {actionRow:
    {textInput:Footer Icon:1:footerIcon:false::0:2000}
  }
]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==embedBuilder;]
	  `
  }, 
  {
	  name: "messageBuilderModal",
	  type: "interaction",
	  prototype: "modal",
	  code: `
$interactionReply[$language[tr:Lütfen mesajın gönderileceği kanalı seçin!;en:Please select the channel to send the message!;de:Bitte wähle den Kanal aus, in den die Nachricht gesendet werden soll!]
  {actionRow:
	  {selectMenu:messageSendToChannel:$language[tr:Gönderilecek Kanal;en:Channel to Send;de:Zu Sendender Kanal]:1:1:false:{channelInput}}
	}
;everyone;true;false]

$setGlobalUserVar[messageBuilderContent;$textInputValue[messageContent];$authorID]
	  `
  }, 
  {
	  name: "messageSendToChannel",
	  type: "interaction",
	  prototype: "selectMenu",
	  code: `
$setGlobalUserVar[messageBuilderContent;No content.;$authorID]
$interactionUpdate[$nonEscape[**$emoji[success] |** $language[tr:Mesaj başarıyla <#$get[channelID]> kanalına gönderildi.;en:The message has been successfully sent to <#$get[channelID]>.;de:Nachricht wurde erfolgreich im Kanal <#$get[channelID]> gesendet.]]]

$channelSendMessage[$get[channelID];$get[messageContent]]

$let[messageContent;$advancedReplaceText[$getGlobalUserVar[messageBuilderContent;$authorID];{server.name};$guildName[$guildID];{server.id};$guildID;{server.icon};$guildIcon;{bot.name};$username[$clientID];{bot.tag};$userTag[$clientID];{bot.id};$clientID;{bot.icon};$userAvatar[$clientID]]]

$onlyif[$checkContains[$toLowercase[$channelPermissionsFor[$clientID;$get[channelID]; ]];sendmessages;sendmessage]==true;**$emoji[error] | $userDisplayName**, $language[tr:Mesajı gönderebilmek için yeterli yetkim yok!;en:I do not have sufficient permissions to send the message!;de:Ich habe nicht genug Berechtigungen, um die Nachricht zu senden!] {ephemeral} {interaction}]
$onlyif[$channelType[$get[channelID]]==text;**$emoji[error] | $userDisplayName**, $language[tr:Lütfen bir metin kanalı seçin!;en:Please select a text channel!;de:Bitte wähle einen Textkanal aus!] {ephemeral} {interaction}]

$let[channelID;$getSelectMenuValues[1]]
	  `
  }
];