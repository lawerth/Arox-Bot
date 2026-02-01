module.exports = [
  {
	  name: "market",
	  aliases: ["shop", "pazar", "dükkan"],
    desc: ["You can view the available products and their prices in the market.", "Marketteki mevcut ürünlere ve fiyatlarına bakarsın.", "Du kannst die verfügbaren Produkte und deren Preise im Markt einsehen."],
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$username[$clientID] | $language[tr:Market;en:Market;de:Markt]:$userAvatar[$clientID]}
    {thumbnail:$emojiURL[$emojiID[market]]}
    {color:$getVar[embedcolor]}
    {description:$nonEscape[$emoji[market] | $language[tr:Merhaba **$userDisplayName**! Market ürünlerine göz atmak için aşağıdaki menüyü kullanabilirsin!;en:Hello **$userDisplayName**! You can use the menu below to browse the market products!;de:Hallo **$userDisplayName**! Du kannst das untenstehende Menü verwenden, um die Marktprodukte anzusehen!]]}
  }
  {actionRow:
    {selectMenu:market_$authorID:$language[tr:Ürünlere göz atmak için tıkla!;en:Click to view the products!;de:Klicke hier, um deine Produkte anzusehen!]:1:1:false:
      {stringInput:$language[tr:Arkaplanlar;en:Backgrounds]:backgrounds:$language[tr:Arkaplanlara göz atmak için tıkla!;en:Click to view backgrounds!;de:Klicke hier, um die Hintergründe anzusehen!]:false:$emoji[background]}
    }
  }
;true]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  },
  {
  //name: "market.backgrounds"
	  type: "interaction",
	  prototype: "selectMenu",
	  code: `
$interactionUpdate[
  {newEmbed:
    {author:Market | $language[tr:Arkaplanlar;en:Backgrounds;de:Hintergründe]:$userAvatar[$clientID]}
    {color:$getvar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[market]]}
    {description:
**[\`$get[prefix]$commandInfo[buy;usage]\`]($botLink[support])** - $commandInfo[buy;desc[$language[tr:0;en:1;de:2]]]
**[\`$get[prefix]backgrounds\`]($botLink[support])** - $commandInfo[backgrounds;desc[$language[tr:0;en:1;de:2]]]

\`\[101\]\` - $emoji[background] **[$getObjectProperty[bgData;[101][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[101][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[101][0].price]]\`\n
\`\[102\]\` - $emoji[background] **[$getObjectProperty[bgData;[102][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[102][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[102][0].price]]\`\n
\`\[103\]\` - $emoji[background] **[$getObjectProperty[bgData;[103][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[103][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[103][0].price]]\`\n
\`\[104\]\` - $emoji[background] **[$getObjectProperty[bgData;[104][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[104][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[104][0].price]]\`\n
\`\[105\]\` - $emoji[background] **[$getObjectProperty[bgData;[105][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[105][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[105][0].price]]\`
    }
  }
  {actionRow:
    {selectMenu:market_$authorID:$language[tr:Ürünlere göz atmak için tıkla!;en:Click to view the products!;de:Klicke hier, um deine Produkte anzusehen!]:1:1:false:
      {stringInput:$language[tr:Arkaplanlar;en:Backgrounds;de:Hintergründe]:backgrounds:$language[tr:Arkaplanlara göz atmak için tıkla!;en:Click to view backgrounds!;de:Klicke hier, um die Hintergründe anzusehen!]:true:$emoji[background]}
    }
  }
  {actionRow:
    {button::primary:marketBackgroundsPage0_$authorID:true:$emojiID[buttonBackPage]}
    {button:1/4:secondary:marketPageStatus:true}
    {button::primary:marketBackgroundsPage2_$authorID:false:$emojiID[buttonNextPage]}
  }
]

$createObject[bgData;$readFile[./data/backgrounds.json]]
$let[lang;$getGlobalUserVar[lang;$authorID;important]]
$let[prefix;$getGuildVar[prefix;$guildID]]

$onlyIf[$interactionData[values[0]]==backgrounds;]
$onlyIf[$splitText[2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu menüyü kullanamazsın!;en:You can't use this menu!;de:Du kannst diese Menü nicht verwenden!]] {interaction} {ephemeral}]
$onlyIf[$splitText[1]==market;]
$textSplit[$interactionData[customId];_]
`
}]