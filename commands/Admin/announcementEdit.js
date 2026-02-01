module.exports = [
  {
    name: "announcementedit",
    aliases: ["announcement-edit", "announceedit", "announce-edit"],
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
	  {author:$username[$clientid] | $language[tr:Bot Duyurusu;en:Bot Announcement;de:Bot Ankündigung]:$userAvatar[$clientid]}
		{color:$getVar[embedcolor]}
		{footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $userDisplayName:$authorAvatar}
		{timestamp}
		{description:$if[$getObjectProperty[botAnnounce;en]==;$emoji[error] $language[tr:Mevcut bir duyuru bulunamadı.;en:No current announcements found.;de:Keine bestehende Ankündigung gefunden.];$language[tr:Duyurunun yayınlanma tarihi:;en:Publication date of the announcement:;de:Veröffentlichungsdatum der Ankündigung:] $discordTimestamp[$getObjectProperty[botAnnounce;publishingDate];D] ($discordTimestamp[$getObjectProperty[botAnnounce;publishingDate];R])
## 🇹🇷 $language[tr:Türkçe:;en:Turkish:;de:Türkisch:]\n\`\`\`$getObjectProperty[botAnnounce;tr]\`\`\`
## 🇬🇧 $language[tr:İngilizce:;en:English:;de:Englisch:]\n\`\`\`$getObjectProperty[botAnnounce;en]\`\`\`
## 🇩🇪 $language[tr:Almanca:;en:German:;de:Deutsch:]\n\`\`\`$getObjectProperty[botAnnounce;de]\`\`\`
]}
	}
	{actionRow:
	  {button:$language[tr:Düzenle;en:Edit;de:Bearbeiten]:primary:botAnnounceEditModal_$authorID:false:$emojiID[buttonWrite]}
    {button:$language[tr:Kanala Gönder;en:Send to Channel;de:In Den Kanal Senden]:primary:botAnnounceSend_$authorID:false:$emojiID[buttonTextChannel]}
	}
;true]]

$createObject[botAnnounce;$getVar[botAnnounce]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
	  `
  },
  {
  //name: "botAnnounceEditModal",
    type: "interaction",
    prototype: "button",
    code: `
$interactionModal[$language[tr:Duyuru Yazısını Düzenle;en:Announcement Edit;de:Ankündigungstext Bearbeiten];botAnnounceEdit;
	{actionRow:
	  {textInput:$language[tr:Türkçe Duyuru:;en:Turkish Announcement:;de:Türkische Ankündigung:]:2:trText:true:$language[tr:Duyuru yazısını Türkçe olarak yazın!;en:Write the announcement letter in Turkish!;de:Bitte schreibe die Ankündigung auf Türkisch!]:2:2000:$if[$getObjectProperty[botAnnounce;tr]==;Örnek Metin!;$getObjectProperty[botAnnounce;tr]]}
	}
  {actionRow:
    {textInput:$language[tr:İngilizce Duyuru:;en:English Announcement:;de:Englische Ankündigung:]:2:enText:true:$language[tr:Duyuru yazısını İngilizce olarak yazın!;en:Write the announcement letter in English!;de:Bitte schreibe die Ankündigung auf Englisch!]:2:2000:$if[$getObjectProperty[botAnnounce;en]==;Example Text!;$getObjectProperty[botAnnounce;en]]}
  }
  {actionRow:
    {textInput:$language[tr:Almanca Duyuru:;en:German Announcement:;de:Deutsch Ankündigung:]:2:deText:true:$language[tr:Duyuru yazısını Almanca olarak yazın!;en:Write the announcement letter in German!;de:Bitte schreibe die Ankündigung auf Deutsch!]:2:2000:$if[$getObjectProperty[botAnnounce;de]==;Beispieltext!;$getObjectProperty[botAnnounce;de]]}
  }
]

$createObject[botAnnounce;$getVar[botAnnounce]]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==botAnnounceEditModal;]
	  `
  },
  {
    name: "botAnnounceEdit",
    type: "interaction",
    prototype: "modal",
    code: `
$editMessage[$messageID;
  {newEmbed:
	  {author:$username[$clientid] | $language[tr:Bot Duyurusu;en:Bot Announcement;de:Bot Ankündigung]:$userAvatar[$clientid]}
		{color:$getVar[embedcolor]}
		{footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $userDisplayName:$authorAvatar}
		{timestamp}
		{description:$if[$getObjectProperty[botAnnounce;en]==;$emoji[error] $language[tr:Mevcut bir duyuru bulunamadı.;en:No current announcements found.;de:Keine bestehende Ankündigung gefunden.];$language[tr:Duyurunun yayınlanma tarihi:;en:Publication date of the announcement:;de:Veröffentlichungsdatum der Ankündigung:] $discordTimestamp[$getObjectProperty[botAnnounce;publishingDate];D] ($discordTimestamp[$getObjectProperty[botAnnounce;publishingDate];R])
## 🇹🇷 $language[tr:Türkçe:;en:Turkish:;de:Türkisch:]\n\`\`\`$getObjectProperty[botAnnounce;tr]\`\`\`
## 🇬🇧 $language[tr:İngilizce:;en:English:;de:Englisch:]\n\`\`\`$getObjectProperty[botAnnounce;en]\`\`\`
## 🇩🇪 $language[tr:Almanca:;en:German:;de:Deutsch:]\n\`\`\`$getObjectProperty[botAnnounce;de]\`\`\`
]}
	}
	{actionRow:
	  {button:$language[tr:Düzenle;en:Edit;de:Bearbeiten]:primary:botAnnounceEditModal_$authorID:false:$emojiID[buttonWrite]}
    {button:$language[tr:Kanala Gönder;en:Send to Channel;de:In Den Kanal Senden]:primary:botAnnounceSend_$authorID:false:$emojiID[buttonTextChannel]}
	}
]

$interactionReply[$nonEscape[$emoji[success] $language[tr:Başarıyla duyuru mesajı güncellendi!;en:Successfully updated announcement text!;de:Die Ankündigungsnachricht wurde erfolgreich aktualisiert!]];everyone;true]

$setVar[botAnnounce;$getObject[botAnnounce]]

$setObjectProperty[botAnnounce;de;$textInputValue[deText]]
$setObjectProperty[botAnnounce;en;$textInputValue[enText]]
$setObjectProperty[botAnnounce;tr;$textInputValue[trText]]
$setObjectProperty[botAnnounce;publishingDate;$dateStamp]
$createObject[botAnnounce;$getVar[botAnnounce]]
	  `
  },
  {
  //name: "botAnnounceSend",
    type: "interaction",
    prototype: "button",
    code: `
$interactionReply[$language[tr:Lütfen mesajın gönderileceği kanalı seçin!;en:Please select the channel to send the message!;de:Bitte wähle den Kanal aus, in dem die Nachricht gesendet werden soll!]
  {actionRow:
	  {selectMenu:botAnnounceSendToChannel:$language[tr:Gönderilecek Kanal;en:Channel to Send;de:Zu Sendender Kanal]:1:1:false:{channelInput}}
	}
;everyone;true;false]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==botAnnounceSend;]
	  `
  },
  {
    name: "botAnnounceSendToChannel",
    type: "interaction",
    prototype: "selectMenu",
    code: `
$setMessageVar[botAnnouncePreview;$getObject[botAnnounce];$get[messageID]]
$removeObjectProperty[botAnnounce;publishingDate]

$interactionUpdate[$nonEscape[$emoji[success] $language[tr:Mesaj başarıyla <#$get[channelID]> kanalına gönderildi.;en:The message has been successfully sent to <#$get[channelID]>.;de:Die Nachricht wurde erfolgreich an den Kanal <#$get[channelID]> gesendet.]]]

$let[messageID;$channelSendMessage[$get[channelID];$getObjectProperty[botAnnounce;$language[tr:tr;en:en;de:de]]
  {actionRow:
    {button:$get[button1]:primary:botAnnouncePreview_$advancedReplaceText[$get[button1];Türkçe;tr;English;en;Deutsch;de]:false:$advancedReplaceText[$get[button1];Türkçe;🇹🇷;English;🇬🇧;Deutsch;🇩🇪]}
    {button:$get[button2]:primary:botAnnouncePreview_$advancedReplaceText[$get[button2];Türkçe;tr;English;en;Deutsch;de]:false:$advancedReplaceText[$get[button2];Türkçe;🇹🇷;English;🇬🇧;Deutsch;🇩🇪]}
  }
;true]]

$let[button1;$language[tr:English;en:Türkçe;de:Türkçe]]
$let[button2;$language[tr:Deutsch;en:Deutsch;de:English]]

$onlyIf[$getObjectKeys[botAnnounce]!=;**$emoji[error] | $userDisplayName**, $language[tr:Önce bir duyuru oluşturmalısın!;en:You must first create an announcement!;de:Du musst zuerst eine Ankündigung erstellen!] {ephemeral} {interaction}]

$createObject[botAnnounce;$getVar[botAnnounce]]

$onlyif[$checkContains[$toLowercase[$channelPermissionsFor[$clientID;$get[channelID]; ]];sendmessages;sendmessage]==true;**$emoji[error] | $userDisplayName**, $language[tr:Mesajı gönderebilmek için yeterli yetkim yok!;en:I do not have permissions to send the message!;de:Ich habe nicht genug Berechtigungen, um die Nachricht zu senden!] {ephemeral} {interaction}]
$onlyif[$channelType[$get[channelID]]==text||$channelType[$get[channelID]]==announcement;**$emoji[error] | $userDisplayName**, $language[tr:Lütfen bir metin kanalı seçin!;en:Please select a text channel!;de:Bitte wähle einen Textkanal aus!] {ephemeral} {interaction}]

$let[channelID;$getSelectMenuValues[1]]
	`
  },
  {
  //name: "botAnnouncePreview",
    type: "interaction",
    prototype: "button",
    code: `
$interactionReply[$getObjectProperty[botAnnounce;$get[lang]];everyone;true]

$onlyIf[$getObjectProperty[botAnnounce;$get[lang]]!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Duyuru mesajı bulunamadı.;en:Announcement message not found.;de:Ankündigungsnachricht nicht gefunden.]] {ephemeral} {interaction}]

$createObject[botAnnounce;$getMessageVar[botAnnouncePreview;$interactionData[message.id]]]
$let[lang;$advancedTextSplit[$interactionData[customId];_;2]]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==botAnnouncePreview;]
    `
  }
];
