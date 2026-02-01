module.exports = [
  {
    name: "banlist",
    aliases: ["blacklist", "bl"],
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$username[$clientID] | $t[blacklist]:$userAvatar[$clientID]}
    {color:$getvar[embedcolor]}
    {thumbnail:https://cdn.discordapp.com/emojis/$emojiID[blacklist]}
    {footer:$t[requestedBy] $username[$authorID]:$authorAvatar}
    {timestamp}
    {description:$nonEscape[## $t[banlist.users]
$if[$globalUsersWithVarValue[isBlacklisted;true;{username};, ;important]==;$emoji[dot] $t[banlist.noUsers];$globalUsersWithVarValue[isBlacklisted;true;$emoji[dot] {displayName} ({username});\n;important]]]}
  }
  {actionRow:
    {button:$t[addUser]:success:blacklistUserAdd:false:$emojiID[buttonPlus]}
    {button:$t[removeUser]:danger:blacklistUserRemove:false:$emojiID[buttonMinus]}
  }
;true]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  },
  {
    name: "blacklistUserAdd",
    type: "interaction",
    prototype: "button",
    code: `
$interactionModal[$t[banlist.addUser];blacklistUserAddModal;
  {actionRow:
    {textInput:$language[tr:Kullanıcı adı veya ID'si;en:Username or ID;de:Benutzername oder ID]:1:user:true:$language[tr:Karaliste'ye alınacak kullanıcının adı veya ID'sini girin.;en:Enter the name or ID of the user to be blacklisted.;de:Geben Sie den Benutzernamen oder die ID ein.]:3:50}
  }
  {actionRow:
    {textInput:$t[reason]:1:reason:true:$t[banlist.addUserReason]:5:100}
  }
]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  },
  {
    name: "blacklistUserRemove",
    type: "interaction",
    prototype: "button",
    code: `
$interactionModal[$language[tr:Karalisteden Kullanıcı Çıkar;en:Remove User from Blacklist;de:Benutzer von der schwarzen Liste entfernen];blacklistUserRemoveModal;
  {actionRow:
    {textInput:$language[tr:Kullanıcı adı veya ID'si;en:Username or ID;de:Benutzername oder ID]:1:user:true:$language[tr:Karalisteden çıkarılacak kullanıcının adı veya ID'sini girin.;en:Enter the name or ID of the user to be removed from the blacklist.;de:Geben Sie den Benutzernamen oder die ID ein.]:3:50}
  }
]
$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  },
  {
    name: "blacklistUserAddModal",
    type: "interaction",
    prototype: "modal",
    code: `
$channelSendMessage[$customChannelID[blacklistsLog];
  {newEmbed:
    {author:$userDisplayName[$get[userID]] ($username[$get[userID]]):$userAvatar[$get[userID]]}
    {color:$getVar[color_red]}
    {thumbnail:$userAvatar[$get[userID]]}
    {footer:Staff#COLON# $username[$authorID]:$authorAvatar}
    {timestamp}
    {description:$nonEscape[**$emoji[blacklist] | $userDisplayName[$get[userID]]** has been blacklisted for **unlimited** time and banned from all commands.]}
    {field:Blacklisted Reason#COLON#:\`\`\`$nonEscape[$get[reason]]\`\`\`:false}
  }
]

$onlyIf[$checkContains[$channelPermissionsFor[$clientID;$customChannelID[blacklistsLog];, ];SendMessages;SendMessage]==true;]
$onlyIf[$channelExists[$customChannelID[blacklistsLog]]==true;]

$setGlobalUserVar[isBlacklisted;true;$get[userID];important]
$setGlobalUserVar[blacklistData;$getObject[blacklistData];$get[userID];important]

$setObjectProperty[blacklistData;date;$truncate[$math[$dateStamp/1000]]]
$setObjectProperty[blacklistData;reason;$get[reason]]
$setObjectProperty[blacklistData;staffID;$authorID]
$setObjectProperty[blacklistData;userID;$get[userID]]
$createObject[blacklistData;$getGlobalUserVar[blacklistData;$get[userID];important]]

$sendDM[
  {newEmbed:
    {title:$emoji[blacklist] $if[$get[userLang]==tr;Karalisteye Alındın!;$if[$get[userLang]==en;You've Been Blacklisted!;$if[$get[userLang]==de;Du wurdest auf die schwarze Liste gesetzt!]]]}
    {description:$nonEscape[$if[$get[userLang]==tr;Botun kurallarını ihlal ettiğin için **sınırsız** süreliğine karalisteye alındın ve tüm komutlardan yasaklandın! Haksız yere olduğunu düşünüyorsan [destek sunucumuza]($botLink[support]) gelerek itiraz edebilirsin.;$if[$get[userLang]==en;For violating the bot's rules, you have been blacklisted for **unlimited** time and banned from all commands! If you think it is unfair, you can object by coming to our [support server]($botLink[support]).;$if[$get[userLang]==de;Du wurdest aufgrund eines Verstoßes gegen die Bot-Regeln für **unbefristet** auf die schwarze Liste gesetzt und von allen Befehlen ausgeschlossen! Wenn du denkst, dass dies unbegründet ist, kannst du unserem [Support-Server]($botLink[support]) beitreten und Einspruch erheben.]]]}
    {field:$if[$get[userLang]==tr;Karalisteye Alınma Sebebin;$if[$get[userLang]==en;Blacklisted Reason;$if[$get[userLang]==de;Grund für die schwarze Liste]]]:\`\`\`$nonEscape[$get[reason]]\`\`\`:false}
    {color:$getvar[color_red]}
    {timestamp}
	}
;$get[userID];false]

$let[userLang;$getGlobalUserVar[lang;$get[userID];important]]

$interactionReply[$if[$isUserDmEnabled[$get[userID]]==false;> $language[tr:Kullancının DM'si kapalı olduğu için ona mesaj gönderemedim!;en:I couldn't send a message to the user because his DM was closed!;de:Die DM des Benutzers ist geschlossen, daher konnte ich keine Nachricht senden!]]
  {newEmbed:
    {author:$userTag[$get[userID]] | $language[tr:Karalisteye Alındı;en:Blacklisted;de:Wurde auf die schwarze Liste gesetzt]:$userAvatar[$get[userID]]}
    {title:$language[tr:İşlem Başarılı;en:Transaction successful;de:Vorgang Erfolgreich]}
    {description:**$emoji[success] |** $language[tr:Başarıyla **$userDisplayName[$get[userID]]** adlı kullanıcı **sınırsız** süreyle **karalisteye** alındı ve tüm komutlardan yasaklandı.;en:Successfully **$userDisplayName[$get[userID]]** has been **blacklisted** for an **unlimited** time and banned from all commands.;de:**$userDisplayName[$get[userID]]** wurde erfolgreich für unbegrenzt auf die schwarze Liste gesetzt und von allen Befehlen ausgeschlossen.]}
    {field:$language[tr:Sebep:;en:Reason:;de:Grund:]:\`\`\`$nonEscape[$get[reason]]\`\`\`:false}
    {footer:$language[tr:Yetkili:;en:Staff:;de:Befugte Person:] $userTag[$authorid]:$userAvatar[$authorid]}
    {color:$getvar[color_green]}
    {timestamp}
	}
;everyone;false;false]

$onlyif[$getGlobalUserVar[isBlacklisted;$get[userID];important]==false;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Belirttiğin kullanıcı zaten karalistede!;en:The user you specified is already blacklisted!;de:Der von dir angegebene Benutzer ist bereits auf der schwarzen Liste!]] {ephemeral} {interaction}]

$let[userID;$findUser[$textInputValue[user]]]
$let[reason;$textInputValue[reason]]

$onlyIf[$findUser[$textInputValue[user];false]!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Kullanıcı bulunamadı, lütfen geçerli bir isim veya ID girin!;en:User not found, please enter a valid name or ID!;de:Benutzer nicht gefunden, bitte gib einen gültigen Namen oder eine gültige ID ein!]] {ephemeral} {interaction}]
    `
  },
  {
    name: "blacklistUserRemoveModal",
    type: "interaction",
    prototype: "modal",
    code: `
$channelSendMessage[$customChannelID[blacklistsLog];
  {newEmbed:
    {author:$userDisplayName[$get[userID]] ($username[$get[userID]]):$userAvatar[$get[userID]]}
    {color:$getVar[color_green]}
    {thumbnail:$userAvatar[$get[userID]]}
    {footer:Staff#COLON# $username[$authorID]:$authorAvatar}
    {timestamp}
    {description:$nonEscape[**$emoji[unblacklist] | $userDisplayName[$get[userID]]** has been removed from the blacklist and unbanned from all commands.]}
  }
]

$onlyIf[$checkContains[$channelPermissionsFor[$clientID;$customChannelID[blacklistsLog];, ];SendMessages;SendMessage]==true;]
$onlyIf[$channelExists[$customChannelID[blacklistsLog]]==true;]

$setGlobalUserVar[isBlacklisted;false;$get[userID];important]
$setGlobalUserVar[blacklistData;{};$get[userID];important]

$sendDM[
  {newEmbed:
    {title:$nonEscape[$emoji[unblacklist] $if[$get[userLang]==tr;Karalisteden Çıkarıldın!;$if[$get[userLang]==en;You've been Removed from Blacklist!;$if[$get[userLang]==de;Du wurdest von der schwarzen Liste entfernt!]]]]}
    {description:$if[$get[userLang]==tr;Herhangi bir sebepten dolayı karalisteden çıkarıldın ve tüm komutlardaki yasakların kaldırıldı! İyi oyunlar dileriz!;$if[$get[userLang]==en;You have been removed from the blacklist for any reason and all commands have been unbanned! We wish you good games!;$if[$get[userLang]==de;Aus irgendeinem Grund wurdest du von der schwarzen Liste entfernt und alle Verbote für Befehle wurden aufgehoben! Viel Spaß beim Spielen!]]]}
    {color:$getvar[color_green]}
    {timestamp}
	}
;$get[userID];false]

$let[userLang;$getGlobalUserVar[lang;$get[userID];important]]


$interactionReply[$if[$isUserDmEnabled[$get[userID]]==false;> $language[tr:Kullancının DM'si kapalı olduğu için ona mesaj gönderemedim!;en:I couldn't send a message to the user because his DM was closed!;de:Die DM des Benutzers ist geschlossen, daher konnte ich keine Nachricht senden!]]
  {newEmbed:
    {author:$userTag[$get[userID]] | $language[tr:Karalisteden Çıkarıldı;en:Removed from Blacklist;de:Von der schwarzen Liste entfernt]:$userAvatar[$get[userID]]}
    {title:$language[tr:İşlem Başarılı;en:Transaction successful;de:Vorgang Erfolgreich]}
    {description:**$emoji[success] |** $language[tr:Başarıyla **$userDisplayName[$get[userID]]** adlı kullanıcı karalisteden çıkarıldı ve tüm komutlardan yasaklaması kaldırıldı.;en:Successfully **$userDisplayName[$get[userID]]** has been removed from the blacklist and unbanned from all commands.;de:**$userDisplayName[$get[userID]]** Wurde Erfolgreich Von Der Schwarzen Liste Entfernt Und Alle Verbote Für Befehle Wurden Aufgehoben.]}
    {footer:$language[tr:Yetkili:;en:Staff:;de:Befugte Person:] $userTag[$authorid]:$userAvatar[$authorid]}
    {color:$getVar[color_red]}
    {timestamp}
	}
;everyone;false;false]
    
$onlyif[$getGlobalUserVar[isBlacklisted;$get[userID];important]==true;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Belirttiğin kullanıcı zaten karalistede değil!;en:The user you specified is not already blacklisted!;de:Der von dir angegebene Benutzer ist nicht auf der schwarzen Liste!]] {ephemeral} {interaction}]

$let[userID;$findUser[$textInputValue[user]]]

$onlyIf[$findUser[$textInputValue[user];false]!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Kullanıcı bulunamadı, lütfen geçerli bir isim veya ID girin!;en:User not found, please enter a valid name or ID!;de:Benutzer nicht gefunden, bitte gib einen gültigen Namen oder eine gültige ID ein!]] {ephemeral} {interaction}]
    `
  }
];
