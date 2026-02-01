module.exports = [
  {
	  name: "help",
	  aliases: ["commands", "command", "cmds", "yardım"],
    desc: ["You will have access to all available commands of the bot.", "Botun mevcut tüm komutlarına ulaşırsın.", "Du hast Zugriff auf alle verfügbaren Befehle des Bots."],
    usage: "help {command}",
    example: ["help", "help balance"],
    code: `
$sendMessage[
  {newEmbed:
    {author:$username[$clientID] | $language[tr:Yardım Menüsü;en:Help Menu;de:Hilfemenü]:$userAvatar[$clientid]}
    {color:$getVar[embedcolor]}
    {description:
$emoji[dot] $language[tr:Belirli bir komut hakkında daha fazla bilgi için:;en:For more info on a specific command:;de:Für weitere Informationen zu einem bestimmten Befehl:] \`$get[prefix]$commandInfo[help;usage]\`
$emoji[dot] $language[tr:Bu sunucudaki prefix:;en:This server's prefix:;de:Das Präfix dieses Servers:] \`$get[prefix]\`
    }
    {field:$emoji[helpGeneral] $language[tr:Ekonomi;en:Economy;de:Wirtschaft]:\`balance\`  \`bank\`  \`daily\`  \`leaderboard\`  \`pray\`  \`transfer\`:false}
    {field:$emoji[helpJob] $language[tr:Meslek;en:Propession;de:Beruf]:\`professions\`  \`myjob\`  \`work\`  \`beg\`:false}
    {field:$emoji[helpGambling] $language[tr:Kumar;en:Gambling;de:Glücksspiel]:\`coinflip\`  \`dice\`  \`fastclick\`  \`guessnumber\`  \`roulette\`  \`rps\`  \`slots\`:false}
    {field:$emoji[helpMarket] $language[tr:Market;en:Market;de:Markt]:\`background\`  \`market\`  \`buy\`  \`sell\`  \`use\`  \`inventory\`  \`stockmarket\`  \`coins\`:false}
    {field:$emoji[helpBot] $language[tr:İşe Yarar;en:Utility;de:Nützlich]:\`announcement\`  \`calculate\`  \`channel\`  \`help\`  \`invite\`  \`language\`  \`level\`  \`ping\`  \`prefix\`  \`report\`  \`rules\`  \`stats\`  \`suggest\`  \`support\`  \`vote\`:false}
  }
  {actionRow:
    {button:Website:link:$botLink[website]}
    {button:$language[tr:Destek;en:Support;de:Support]:link:$botLink[support]}
    {button:$language[tr:Davet Et;en:Invite;de:Einladen]:link:$botLink[invite]}
    {button:$language[tr:Oy Ver;en:Vote;de:Abstimmen]:link:$botLink[topgg]}
  }
]

$let[prefix;$getGuildVar[prefix;$guildid]]
$onlyif[$message==;{execute:commandHelp}]
$onlyIf[$message!=--admin;{execute:adminHelpMenu}]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  },
  {
    name: "help",
    type: "interaction",
    prototype: "slash",
    code: `$interactionReply[$language[tr:$username[$clientID] bu sunucuda \`$getGuildVar[prefix;$guildID]\` önekini kullanıyor ve slash komutlarını kullanmıyor.\nMevcut komutların listesine ulaşmak için lütfen \`$getGuildVar[prefix;$guildID]yardım\` yazın.;en:$username[$clientID] uses the prefix \`$getGuildVar[prefix;$guildID]\` on this server and does not use slash commands.\nPlease use the command \`$getGuildVar[prefix;$guildID]help\` to get a list of commands.;de:$username[$clientID] verwendet das Präfix \`$getGuildVar[prefix;$guildID]\` in diesem Server und unterstützt keine Slash-Befehle.\nUm die Liste der verfügbaren Befehle anzuzeigen, geben Sie bitte \`$getGuildVar[prefix;$guildID]help\` ein.];everyone;true]`
  }, 
  {
    name: "commandHelp",
    type: "awaited",
    code: `
$sendMessage[
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Komut Yardım;en:Command Help;de:Befehlshilfe]:$userAvatar[$clientid]}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $username:$authorAvatar}
    {field:$emoji[helpParams] $language[tr:Komut Kullanım Parametreleri;en:Command Usage Parameters;de:Befehl Nutzungsparameter]:
$emoji[dot] \`\[ \]\` - $language[tr:İsteğe bağlı argümanlar;en:Optional arguments;de:Optionale Argumente]
$emoji[dot] \`#RIGHT_BRACKET# #LEFT_BRACKET#\` - $language[tr:İsteğe bağlı kullanıcı girdisi;en:Optional user input;de:Optionale Benutzereingabe]
    }
    {field:$emoji[helpCommands] $language[tr:Komut Bilgi;en:Command Info;de:Befehl Information]:
$emoji[dot] **$language[tr:Komut:;en:Command:;de:Befehl:]** $get[prefix]$if[$commandInfo[$message[1];usage]==;$commandInfo[$message[1];name];$commandInfo[$message[1];usage]]
$emoji[dot] **$language[tr:Diğer İsimler:;en:Aliases:;de:Andere Namen:]** $if[$commandInfo[$message[1];aliases]!=;$replaceText[$commandInfo[$message[1];aliases];,;, ];$language[tr:Bulunamadı.;en:Not found.;de:Nicht gefunden.]]
$emoji[dot] **$language[tr:Açıklama:;en:Description:;de:Beschreibung:]** $if[$commandInfo[$message[1];desc[$get[lang]]]!=;$commandInfo[$message[1];desc[$get[lang]]];$language[tr:Bulunamadı.;en:Not found.;de:Nicht gefunden.]]
$if[$commandInfo[$message[1];example]!=;$emoji[dot] **$language[tr:Örnek Kullanım:;en:Example Usage:;de:Beispielverwendung:]** $get[prefix]$replaceText[$commandInfo[$message[1];example];,;, $get[prefix]]]
    }
  }
]

$onlyif[$commandInfo[$message[1];name]!=&&$commandInfo[$message[1];desc]!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Böyle bir komut yok!;en:There is no such command!;de:Es gibt keinen solchen Befehl!]] {deleteIn:5s}]
$let[prefix;$getGuildVar[prefix;$guildID]]
$let[lang;$language[en:0;tr:1;de:2]]
    `
  }, 
  {
    name: "adminHelpMenu",
    type: "awaited",
    code: `
$sendMessage[
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Yardım Menüsü;en:Help Menu;de:Hilfemenü]:$userAvatar[$clientid]}
    {color:$getVar[embedcolor]}
    {field:$emoji[helpOwner] $language[tr:Yetkili Komutları;en:Admin Commands;de:Admin-Befehle]:\`admins\`  \`announcementedit\`  \`banlist\`  \`banstatus\`  \`coinsdata\`  \`djseval\`  \`embedbuilder\`  \`eval\`  \`execute\`  \`maintenance\`  \`premiumquery\`  \`promocodes\`  \`reload\`  \`setcash\`  \`setglobaluservar\`  \`setvar\`  \`getglobaluservar\`  \`getvar\`:false}
  }
  {actionRow:
    {button:Website:link:$botLink[website]}
    {button:$language[tr:Destek;en:Support;de:Support]:link:$botLink[support]}
    {button:$language[tr:Davet Et;en:Invite;de:Einladen]:link:$botLink[invite]}
    {button:$language[tr:Oy Ver;en:Vote;de:Abstimmen]:link:$botLink[topgg]}
  }
]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  }
];