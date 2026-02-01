module.exports = [
  {
	  name: "inventory",
    aliases: ["inv", "envanter", "env"],
    desc: ["You view the items in your inventory.", "Envanterindeki ürünlere bakarsın.", "Sie können die Produkte in Ihrem Inventar anzeigen."],
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$userDisplayName | $language[tr:Envanter;en:Inventor;de:Inventar]:$authorAvatar}
    {color:$getVar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[inventory]]}
    {description:$nonEscape[**$emoji[inventory] | $language[tr:Merhaba;en:Hello;de:Hallo], $userDisplayName**! $language[tr:Envanterindeki ürünlere bakmak için aşağıdaki menüden ilgili kategorileri seçerek ulaşabilirsin!;en:You can view the products in your inventory by selecting the relevant categories from the menu below!;de:Um die Produkte in deinem Inventar anzusehen, wähle die entsprechenden Kategorien im Menü unten aus!]]}
  }
  {actionRow:
    {selectMenu:inventory_$authorid:$language[tr:Ürünlerine göz atmak için tıkla!;en:Click to view the products!;de:Klicke hier, um deine Produkte anzusehen!]:1:1:false:
      {stringInput:$language[tr:Eşyalar;en:Items]:products:$language[tr:Eşyalarına göz atmak için tıkla!;en:Click to view your items!;de:Klicke hier, um deine Gegenstände anzusehen!]:false:$emoji[invProducts]}
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
  //name: "inventory.products"
    type: "interaction",
    prototype: "selectMenu",
    code: `
$interactionUpdate[
  {newEmbed:
    {author:$userDisplayName | $language[tr:Eşyalar;en:Items;de:Gegenstände]:$userAvatar[$authorid]}
    {thumbnail:$emojiURL[$emojiID[invProducts]]}
    {color:$getVar[embedcolor]}
    {description:$textTrim[$get[text]]}
  }
  {actionRow:
    {selectMenu:inventory_$authorid:$language[tr:Ürünlerine göz atmak için tıkla!;en:Click to view the products!;de:Klicke hier, um deine Produkte anzusehen!]:1:1:false:
      {stringInput:$language[tr:Eşyalar;en:Items]:products:$language[tr:Eşyalarına göz atmak için tıkla!;en:Click to view your items!;de:Klicke hier, um deine Gegenstände anzusehen!]:true:$emoji[invProducts]}
    }
  }
]

$let[text;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Sahip olduğun bir eşyan bulunmuyor. **$getGuildVar[prefix;$guildid]market** yazarak bir eşya satın al!;en:Do you not have any items. Buy items by typing **$getGuildVar[prefix;$guildid]market**!;de:Du hast keinen Gegenstand. Schreibe **$getGuildVar[prefix;$guildid]market**, um einen Gegenstand zu kaufen!]]]

$onlyIf[$interactionData[values[0]]==products;]
$onlyIf[$splitText[2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu menüyü kullanamazsın!;en:You can't use this menu!;de:Du kannst dieses Menü nicht verwenden!]] {interaction} {ephemeral}]
$onlyif[$splitText[1]==inventory;]
$textSplit[$interactionData[customId];_]
    `
  }
];