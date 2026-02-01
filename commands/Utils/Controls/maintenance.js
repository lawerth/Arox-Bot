module.exports = [
  {
    name: "maintenanceControl",
    type: "awaited",
    code: `
$sendMessage[
  {newEmbed:
    {author:$language[tr:$username[$clientid] Bakımda;en:$username[$clientid] is Under Maintenance;de:$username[$clientID]] ist in Wartung!:$userAvatar[$clientid]}
    {color:$getVar[color_white]}
    {thumbnail:$emojiURL[$emojiID[maintenanceThumb]]}
    {description:$nonEscape[**$emoji[bakımModu] | $userDisplayName[$authorid]**, $language[tr:$username[$clientid] şu anda bakımda olduğu için bu komutu kullanamazsın. Daha fazla ayrıntı için [destek sunucumuza]($botLink[support]) katılabilirsin!;en:You can't use this command because $username[$clientid] is currently under maintenance. You can join our [support server]($botLink[support]) for more details!;de:$username[$clientid] ist derzeit in Wartung, daher kannst du diesen Befehl nicht verwenden. Für weitere Informationen kannst du unserem [Support-Server]($botLink[support]) beitreten!]]}
    {field:📋 $language[tr:Bakım Sebebi:;en:Maintenance Reason:;de:Grund der Wartung:]:\`\`\`$getObjectProperty[maintData;reason]\`\`\`}
  }
  {reply:$messageID:false}
  {suppress}
]

$createObject[maintData;$getVar[maintenanceData;important]]
    `
  }
];