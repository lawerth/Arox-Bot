module.exports = [
  {
  //name: "marketBackgroundsPage1"
	  type: "interaction",
	  prototype: "button",
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
$let[prefix;$getGuildVar[prefix;$guildID]]

$onlyIf[$splitText[2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {interaction} {ephemeral}]
$onlyif[$splitText[1]==marketBackgroundsPage1;]
$textSplit[$interactionData[customId];_]
    `
  },
  {
  //name: "marketBackgroundsPage2"
	  type: "interaction",
	  prototype: "button",
	  code: `
$interactionUpdate[
  {newEmbed:
    {author:Market | $language[tr:Arkaplanlar;en:Backgrounds;de:Hintergründe]:$userAvatar[$clientID]}
    {color:$getvar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[market]]}
    {description:
**[\`$get[prefix]$commandInfo[buy;usage]\`]($botLink[support])** - $commandInfo[buy;desc[$language[tr:0;en:1;de:2]]]
**[\`$get[prefix]backgrounds\`]($botLink[support])** - $commandInfo[backgrounds;desc[$language[tr:0;en:1;de:2]]]

\`\[106\]\` - $emoji[background] **[$getObjectProperty[bgData;[106][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[106][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[106][0].price]]\`\n
\`\[107\]\` - $emoji[background] **[$getObjectProperty[bgData;[107][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[107][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[107][0].price]]\`\n
\`\[108\]\` - $emoji[background] **[$getObjectProperty[bgData;[108][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[108][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[108][0].price]]\`\n
\`\[109\]\` - $emoji[background] **[$getObjectProperty[bgData;[109][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[109][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[109][0].price]]\`\n
\`\[110\]\` - $emoji[background] **[$getObjectProperty[bgData;[110][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[110][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[110][0].price]]\`
    }
  }
  {actionRow:
    {selectMenu:market_$authorID:$language[tr:Ürünlere göz atmak için tıkla!;en:Click to view the products!;de:Klicke hier, um deine Produkte anzusehen!]:1:1:false:
      {stringInput:$language[tr:Arkaplanlar;en:Backgrounds;de:Hintergründe]:backgrounds:$language[tr:Arkaplanlara göz atmak için tıkla!;en:Click to view backgrounds!;de:Klicke hier, um die Hintergründe anzusehen!]:true:$emoji[background]}
    }
  }
  {actionRow:
    {button::primary:marketBackgroundsPage1_$authorID:false:$emojiID[buttonBackPage]}
    {button:2/4:secondary:marketPageStatus:true}
    {button::primary:marketBackgroundsPage3_$authorID:false:$emojiID[buttonNextPage]}
  }
]

$createObject[bgData;$readFile[./data/backgrounds.json]]
$let[prefix;$getGuildVar[prefix;$guildID]]

$onlyIf[$splitText[2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {interaction} {ephemeral}]
$onlyif[$splitText[1]==marketBackgroundsPage2;]
$textSplit[$interactionData[customId];_]
  `
  },
  {
  //name: "marketBackgroundsPage3"
	  type: "interaction",
	  prototype: "button",
	  code: `
$interactionUpdate[
  {newEmbed:
    {author:Market | $language[tr:Arkaplanlar;en:Backgrounds;de:Hintergründe]:$userAvatar[$clientID]}
    {color:$getvar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[market]]}
    {description:
**[\`$get[prefix]$commandInfo[buy;usage]\`]($botLink[support])** - $commandInfo[buy;desc[$language[tr:0;en:1;de:2]]]
**[\`$get[prefix]backgrounds\`]($botLink[support])** - $commandInfo[backgrounds;desc[$language[tr:0;en:1;de:2]]]

\`\[111\]\` - $emoji[background] **[$getObjectProperty[bgData;[111][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[111][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[111][0].price]]\`\n
\`\[112\]\` - $emoji[background] **[$getObjectProperty[bgData;[112][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[112][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[112][0].price]]\`\n
\`\[113\]\` - $emoji[background] **[$getObjectProperty[bgData;[113][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[113][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[113][0].price]]\`\n
\`\[114\]\` - $emoji[background] **[$getObjectProperty[bgData;[114][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[114][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[114][0].price]]\`\n
\`\[115\]\` - $emoji[background] **[$getObjectProperty[bgData;[115][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[115][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[115][0].price]]\`
    }
  }
  {actionRow:
    {selectMenu:market_$authorID:$language[tr:Ürünlere göz atmak için tıkla!;en:Click to view the products!;de:Klicke hier, um deine Produkte anzusehen!]:1:1:false:
      {stringInput:$language[tr:Arkaplanlar;en:Backgrounds;de:Hintergründe]:backgrounds:$language[tr:Arkaplanlara göz atmak için tıkla!;en:Click to view backgrounds!;de:Klicke hier, um die Hintergründe anzusehen!]:true:$emoji[background]}
    }
  }
  {actionRow:
    {button::primary:marketBackgroundsPage2_$authorID:false:$emojiID[buttonBackPage]}
    {button:3/4:secondary:marketPageStatus:true}
    {button::primary:marketBackgroundsPage4_$authorID:false:$emojiID[buttonNextPage]}
  }
]

$createObject[bgData;$readFile[./data/backgrounds.json]]
$let[prefix;$getGuildVar[prefix;$guildID]]

$onlyIf[$splitText[2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {interaction} {ephemeral}]
$onlyif[$splitText[1]==marketBackgroundsPage3;]
$textSplit[$interactionData[customId];_]
    `
  },
  {
  //name: "marketBackgroundsPage4"
	  type: "interaction",
	  prototype: "button",
	  code: `
$interactionUpdate[
  {newEmbed:
    {author:Market | $language[tr:Arkaplanlar;en:Backgrounds;de:Hintergründe]:$userAvatar[$clientID]}
    {color:$getvar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[market]]}
    {description:
**[\`$get[prefix]$commandInfo[buy;usage]\`]($botLink[support])** - $commandInfo[buy;desc[$language[tr:0;en:1;de:2]]]
**[\`$get[prefix]backgrounds\`]($botLink[support])** - $commandInfo[backgrounds;desc[$language[tr:0;en:1;de:2]]]

\`\[116\]\` - $emoji[background] **[$getObjectProperty[bgData;[116][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[116][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[116][0].price]]\`\n
\`\[117\]\` - $emoji[background] **[$getObjectProperty[bgData;[117][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[117][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[117][0].price]]\`\n
\`\[118\]\` - $emoji[background] **[$getObjectProperty[bgData;[118][0].name[$language[tr:0;en:1;de:2]]]]($getObjectProperty[bgData;[118][0].url])**\n$emoji[dot] $language[tr:Ücret:;en:Price:;de:Preis:] $emoji[cash] \`$numberSeparator[$getObjectProperty[bgData;[118][0].price]]\`
    }
  }
  {actionRow:
    {selectMenu:market_$authorID:$language[tr:Ürünlere göz atmak için tıkla!;en:Click to view the products!;de:Klicke hier, um deine Produkte anzusehen!]:1:1:false:
      {stringInput:$language[tr:Arkaplanlar;en:Backgrounds;de:Hintergründe]:backgrounds:$language[tr:Arkaplanlara göz atmak için tıkla!;en:Click to view backgrounds!;de:Klicke hier, um die Hintergründe anzusehen!]:true:$emoji[background]}
    }
  }
  {actionRow:
    {button::primary:marketBackgroundsPage3_$authorID:false:$emojiID[buttonBackPage]}
    {button:4/4:secondary:marketPageStatus:true}
    {button::primary:marketBackgroundsPage5_$authorID:true:$emojiID[buttonNextPage]}
  }
]

$createObject[bgData;$readFile[./data/backgrounds.json]]
$let[prefix;$getGuildVar[prefix;$guildID]]

$onlyIf[$splitText[2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {interaction} {ephemeral}]
$onlyif[$splitText[1]==marketBackgroundsPage4;]
$textSplit[$interactionData[customId];_]
    `
  }
];