module.exports = [
  {
    name: "premiumquery",
    aliases: ["prequery", "premiumsorgula", "presorgu"],
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
	  {author:$userDisplayName[$get[user]] | $language[tr:Premium Durumu;en:Premium Status]:$userAvatar[$get[user]]}
	  {color:$getVar[color_green]}
    {description:$nonEscape[**$emoji[success] |** $language[tr:$userDisplayName[**$get[user]]** adlı kullanıcının $emoji[premium] **Premium**'u bulunuyor!;en:**$userDisplayName[$get[user]]** does have $emoji[premium] **Premium**!;de:**$userDisplayName[$get[user]]** verfügt über $emoji[premium] **Premium**!]]}
    {field:🕛 $language[tr:Başlangıç Tarihi;en:Starting Date;de:Startdatum:]:$nonEscape[<t:$truncate[$divide[$getObjectProperty[premiumData;purchaseDate];1000]]:f>]:true}
    {field:⏲️ $language[tr:Bitiş Tarihi;en:Ending Date;de:Enddatum]:$nonEscape[<t:$truncate[$divide[$getObjectProperty[premiumData;expireDate];1000]]:f>]:true}
	  {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $username[$authorid]:$authorAvatar}
	  {timestamp}
  }
;true]]

$createObject[premiumData;$getGlobalUserVar[premiumData;$get[user];important]]

$onlyif[$getGlobalUserVar[isPremium;$get[user];important]==true;
  {newEmbed:
	  {author:$userDisplayName[$get[user]] | $language[tr:Premium Durumu;en:Premium Status;de:Premium Status]:$userAvatar[$get[user]]}
		{color:$getVar[color_red]}
		{footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $username[$authorid]:$authorAvatar}
		{timestamp}
    {description:$nonEscape[**$emoji[error] |** $language[tr:Kullanıcının $emoji[premium] **Premium**'u bulunmuyor!;en:The user does not have $emoji[premium] **Premium**!;de:Der Benutzer verfügt nicht über $emoji[premium] **Premium**!]]}
	}
	{actionRow:
	  {button:$language[tr:Premium Ver;en:Give Premium;de:Premium Geben]:success:givePremiumModal_$authorid_$get[user]:false:$emojiID[premium]}
	}
]

$let[user;$if[$isNumber[$message[1]]==true&&$userExists[$message[1]]==true;$message[1];$mentioned[1;true]]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
	  `
  },
  {
  //name: "givePremiumModal",
    type: "interaction",
    prototype: "button",
    code: `
$interactionModal[$language[tr:Premium Ver;en:Give Premium;de:Premium Geben];givePremium;
	{actionRow:
	  {textInput:$language[tr:Kullanıcı Adı veya ID'si;en:Username or ID;de:Benutzername oder ID]:1:user:true:$language[tr:Bir kullanıcı adı veya ID'si yazın!;en:Type a username or ID!;de:Bitte gib einen Benutzernamen oder eine ID ein!]:2:50:$username[$get[user]]}
	}
	{actionRow:
    {textInput:$language[tr:Kaç günlük vermek istiyorsunuz?;en:How many days do you want to give?;de:Wie viele Tage möchten Sie vergeben?]:1:duration:true:$language[tr:Örnek:;en:Example:;de:Beispiel:] 7d, 30d, 90d:2:5}
  }
]

$let[user;$advancedTextSplit[$interactionData[customId];_;3]]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$authorid;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {interaction} {ephemeral}]
$onlyif[$advancedTextSplit[$interactionData[customId];_;1]==givePremiumModal;]
    `
  },
  {
    name: "givePremium",
    type: "interaction",
    prototype: "modal",
    code: `
$sendDm[
  {newEmbed:
	  {author:$userDisplayName[$get[user]]:$userAvatar[$get[user]]}
    {thumbnail:$userAvatar[$get[user]]}
	  {title:🎉 $language[tr:Premium Avantajlarına Hoşgeldin!;en:Welcome to Premium Benefits!;de:Willkommen bei den Premium-Vorteilen!]}
		{color:$getVar[color_green]}
    {description:$language[tr:Premium üyeliğini satın aldığın için teşekkür ederiz. Artık önümüzdeki **$replaceText[$get[duration];d; Gün]** boyunca Premium avantajlarına erişebileceksin. Ayrıcalığın tadını çıkar!;en:Thank you for purchasing your Premium membership. You will now have access to Premium benefits for the next **$replaceText[$get[duration];d; Days]**. Enjoy the privilege!;de:Vielen Dank für den Kauf deiner Premium-Mitgliedschaft. Ab sofort kannst du für die nächsten **$replaceText[$get[duration];d; Tage]** auf die Premium-Vorteile zugreifen. Genieße deine Privilegien!]}
	}
;$get[user];false]

$editMessage[$interactionData[message.id];$if[$isUserDmEnabled[$get[user]]==false;$language[tr:Kullanıcının DM'i kapalı olduğu için mesaj gönderemedim.;en:I couldn't send a message because the user's DM was closed.;de:Die DM des Benutzers ist geschlossen, daher konnte keine Nachricht gesendet werden.]]
  {newEmbed:
	  {author:$userDisplayName[$authorid] | $language[tr:Premium Verildi;en:Premium Given;de:Premium Wurde Vergeben]:$userAvatar[$get[user]]}
		{thumbnail:$userAvatar[$get[user]]}
		{color:$getVar[color_green]}
		{footer:$language[tr:Yetkili:;en:Staff:;de:Berechtigter:] $username[$authorid]:$authorAvatar}
		{timestamp}
		{description:$nonEscape[**$emoji[success] |** $language[tr:Başarıyla **$userDisplayName[$get[user]]** adlı kullanıcıya **$replaceText[$get[duration];d; Günlük]** $emoji[premium] **Premium** verildi.;en:Successfully given **$replaceText[$get[duration];d; Days]** of $emoji[premium] **Premium** to **$userDisplayName[$get[user]]**.;de:**$userDisplayName[$get[user]]** wurde erfolgreich für **$replaceText[$get[duration];d; Tage]** $emoji[premium] **Premium** zugewiesen.]]}
	}
]

$channelSendMessage[$customChannelID[premiumLog];
  {newEmbed:
    {author:$userDisplayName[$get[user]] | Premium Given:$userAvatar[$get[user]]}
    {color:$getVar[color_green]}
    {footer:Staff#COLON# $username[$authorID]:$userAvatar[$authorID]}
    {timestamp}
    {description:**User#COLON#** $username[$get[user]]
**Duration#COLON#** $get[duration] ($discordTimestamp[$get[expireDate];R])
**Timeout ID#COLON#** $get[timeoutID]
    }
  }
]

$interactionReply[$nonEscape[**$emoji[success] | $userDisplayName**, $language[tr:Başarıyla **$userDisplayName[$get[user]]** adlı kullanıcıya $emoji[premium] **Premium** verildi.;en:Successfully awarded a $emoji[premium] **Premium** to **$userDisplayName[$get[user]]**.;de:**$userDisplayName[$get[user]]** wurde erfolgreich $emoji[premium] **Premium** zugewiesen.]];everyone;true]

$let[timeoutID;$setTimeout[premiumExpire;$get[duration];{"authorID": "$get[user]"};true]]

$setGlobalUserVar[isPremium;true;$get[user];important]
$setGlobalUserVar[premiumData;$getObject[premiumData];$get[user];important]

$setObjectProperty[premiumData;expireDate;$get[expireDate]]
$setObjectProperty[premiumData;purchaseDate;$get[purchaseDate]]
$createObject[premiumData;$getGlobalUserVar[premiumData;$get[user];important]]

$let[expireDate;$sum[$dateStamp;$parseTime[$get[duration]]]]
$let[purchaseDate;$dateStamp]

$let[user;$findUser[$textInputValue[user]]]

$onlyif[$isNumber[$get[duration]]==false&&$parseTime[$get[duration]]!=-1;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir süre girin!;en:Please enter a valid duration!;de:Bitte gib eine gültige Dauer ein!]] {ephemeral} {interaction}]
$onlyIf[$findUser[$textInputValue[user];false]!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Kullanıcı bulunamadı, lütfen geçerli bir isim veya ID girin!;en:User not found, please enter a valid name or ID!;de:Benutzer nicht gefunden, bitte gib einen gültigen Namen oder eine ID ein!]] {ephemeral} {interaction}]

$let[duration;$textInputValue[duration]]
	  `
  },
  {
    name: "premiumExpire",
    type: "timeout",
    code: `
$sendDm[
  {newEmbed:
	  {author:$userDisplayName[$get[user]]:$userAvatar[$get[user]]}
    {thumbnail:$userAvatar[$get[user]]}
	  {title:🥀 $if[$get[lang]==tr;Premium Avantajlarını Kaybettin!;You've Lost Your Premium Benefits!;de:Du hast deine Premium-Vorteile verloren!]}
		{color:$getVar[color_red]}
    {description:$if[$get[lang]==tr;Premium üyeliğinin süresi dolduğu için tüm ayrıcalıklarını kaybettin!;You have lost all your privileges because your Premium membership has expired!;de:Dein Premium-Abonnement ist abgelaufen, daher hast du alle Privilegien verloren!]}
	}
;$get[user];false]

$channelSendMessage[$customChannelID[premiumLog];
  {newEmbed:
    {author:$userDisplayName[$get[user]] | Premium Duration Expired:$userAvatar[$get[user]]}
    {color:$getVar[color_red]}
    {footer:User#COLON# $username[$get[user]]}
    {timestamp}
  }
]

$setGlobalUserVar[premiumData;{};$get[user];important]
$setGlobalUserVar[isPremium;false;$get[user];important]

$let[lang;$getGlobalUserVar[lang;$get[user];important]]
$let[user;$timeoutData[authorID]]

$onlyIf[$getGlobalUserVar[isPremium;$timeoutData[authorID];important]==true;]
	  `
  }
];
