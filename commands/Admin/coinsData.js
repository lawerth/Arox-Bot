module.exports = [
  {
    name: "coinsData",
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Coin Verileri;en:Coins Data]:$userAvatar[$clientid]}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Sorgulayan:;en:Requested by] $username:$authorAvatar}
    {timestamp}
    {field:🪙 $language[tr:Mevcut Coin Verileri:;en:Current Coins Data:]:\`\`\`$getObject[coinsData;true]\`\`\`}
  }
  {actionRow:
    {button:$language[tr:Coin Ekle;en:Add Coin]:success:addCoin_$authorID:false:$emojiID[butonArtı]}
  }
;true]]

$createObject[coinsData;$getVar[coinsData;important]]

$onlyForIDs[$joinSplitText[;];] 
$textSplit[$getvar[developers];|] 
    `
  }, 
  {
  //name: "addCoin",
    type: "interaction",
    prototype: "button",
    code: `
$interactionModal[$language[tr:Coin Ekle;en:Add Coin];addCoin;
  {actionRow:
    {textInput:$language[tr:Coin İsmi;en:Coin Name]:1:name:true:$language[tr:Lütfen coinin ismini girin!;en:Please enter the name of the coin!]:2:20}
  }
]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;$nonEscape[**$emoji[red] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==addCoin;]
    `
  }
];