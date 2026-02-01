module.exports = [
  {
	  name: "blacklistControl",
	  type: "awaited",
	  code: `
$sendMessage[
  {newEmbed:
    {title:$emoji[blacklist] $language[tr:Karalistedesin!;en:You are Blacklisted!;de:Du bist auf der schwarzen Liste!]}
    {description:$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Karalistede olduğun için botun komutlarını kullanamazsın! Bunun bir hata olduğunu düşünüyorsan lütfen [destek sunucumuza]($botLink[support]) gelip yetkililerimizle iletişime geçin!;en:You can't use the bot's commands because you are blacklisted! If you think this is a bug, please come to our [support server]($botLink[support]) and contact our support staff!;de:Da du auf der schwarzen Liste stehst, kannst du die Befehle des Bots nicht verwenden! Wenn du denkst, dass es sich um einen Fehler handelt, tritt bitte unserem [Support-Server]($botLink[support]) bei und kontaktiere unser Team!]]}
    {field:$language[tr:Karalisteye Alınma Sebebin:;en:Reason for Blacklisting:;de:Grund der Blacklist:]:\`\`\`$getObjectProperty[data;reason]\`\`\`:true}
    {color:$getvar[color_red]}
  }
  {deleteIn:30s}
  {suppress}
]

$createObject[data;$getGlobalUserVar[blacklistData;$authorID;important]]
	  `
  }
];