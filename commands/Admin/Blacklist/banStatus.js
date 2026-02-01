module.exports = [
  {
    name: "banstatus",
    aliases: ["ban", "blackliststatus", "blstatus", "bls"],
    code: `
$sendMessage[
  {newEmbed:
    {author:$userDisplayName[$get[userID]] | $language[tr:Karaliste Durumu;en:Blacklist Status;de:Schwarze Liste Status]:$userAvatar[$get[userID]]}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $userTag[$authorid]:$userAvatar[$authorid]}
    {timestamp}
    {description:$nonEscape[**$emoji[blacklist] |** $language[tr:**$userDisplayName[$get[userID]]** adlı kullanıcı karalisteye alınmış ve **$commandsCount** komuttan yasaklanmış.;en:**$userDisplayName[$get[userID]]** has been blacklisted and banned from **$commandsCount** commands.;de:Der Benutzer **$userDisplayName[$get[userID]]** wurde auf die schwarze Liste gesetzt und von **$commandsCount** Befehlen ausgeschlossen.]]}
    {field:⏱️ $language[tr:Tarih:;en:Date:;de:Datum:]:**<t:$getObjectProperty[blacklistData;date]:F>**:true}
    {field:🛡 $language[tr:Yetkili:;en:Staff:;de:Befugte Person]:**$userDisplayName[$getObjectProperty[blacklistData;staffID]] \($username[$getObjectProperty[blacklistData;staffID]]\)**:true}
    {field:💬 $language[tr:Sebep:;en:Reason:;Grund:]:**$getObjectProperty[blacklistData;reason]**:true}
  }
  {actionRow:
    {button:$language[tr:Karalisteye Al;en:Add to Blacklist;de:Zur Schwarze Liste hinzufügen]:danger:blacklistUserAdd:true:$emojiID[buttonPlus]}
  }
]

$createObject[blacklistData;$getGlobalUserVar[blacklistData;$get[userID];important]]

$onlyif[$getGlobalUserVar[isBlacklisted;$get[userID];important]==true;
  {newEmbed:
    {author:$userDisplayName[$get[userID]] | $language[tr:Karaliste Durumu;en:Blacklist Status;de:Schwarze Liste Status]:$userAvatar[$get[userID]]}
    {description:**$emoji[unblacklist] |** $language[tr:**$userDisplayName[$get[userID]]** adlı kullanıcı karalistede değil.;en:**$userDisplayName[$get[userID]]** is not on the blacklist.;de:Der Benutzer **$userDisplayName[$get[userID]]** ist nicht auf der schwarzen Liste.]}
    {color:$getvar[color_red]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $userTag[$authorid]:$userAvatar[$authorid]}
    {timestamp}
	}
  {actionRow:
    {button:$language[tr:Karalisteye Al;en:Add to Blacklist;de:Zur Schwarze Liste hinzufügen]:danger:blacklistUserAdd:false:$emojiID[buttonPlus]}
  }
]

$let[userID;$findUser[$get[user]]]

$onlyIf[$userExists[$findUser[$get[user];false]]==true;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Kullanıcı bulunamadı, lütfen geçerli bir isim veya ID girin!;en:User not found, please enter a valid name or ID!;de:Benutzer nicht gefunden, bitte geben Sie einen gültigen Namen oder eine gültige ID ein!]] {deleteIn:5s}]

$let[user;$if[$message[1]!=;$if[$isMentioned[$message[1]]==true;$mentioned[1];$message[1]];$authorID]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  }
];
