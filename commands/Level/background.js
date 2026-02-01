module.exports = [
  {
	  name: "background",
	  aliases: ["backgrounds", "bg", "wallpapers", "wallpaper", "wp", "arkaplanlar", "arkaplan"],
    desc: ["You can view the available background images.", "Mevcut arkaplan resimlerini görüntülersin.", "Du kannst die verfügbaren Hintergrundbilder anzeigen."],
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$userDisplayName | $language[tr:Arkaplanlar;en:Backgrounds;de:Hintergründe]:$authorAvatar}
    {color:$getVar[embedcolor]}
    {description:$emoji[background] **$get[bgName]** $if[$get[bgUsed]==$get[bgNumber];- *$language[tr:Şu anda kullanılıyor!;en:Currently Equipped!;de:Wird derzeit verwendet!]*]}
    {image:$get[bgUrl]}
    {footer:$language[tr:Sayfa:;en:Page:;de:Seite:] $get[pageNumber]/$get[bgTotalNumber]}
    {timestamp}
  }
  {actionRow:
    {button::primary:backgrounds_back_$authorID_$get[pageNumber]:true:$emojiID[buttonBackPage]}
    {button:$language[tr:Kullan;en:Equip;de:Verwenden]:success:backgroundsEquip_$authorid_$get[pageNumber]:$get[equipBD]}
    {button::primary:backgrounds_next_$authorID_$get[pageNumber]:$get[nextBD]:$emojiID[buttonNextPage]}
  }
;true]]

$let[equipBD;$if[$get[bgUsed]==$get[bgNumber];true;false]]
$let[backBD;$if[$get[pageNumber]==1;true;false]]
$let[nextBD;$if[$get[bgTotalNumber]==$get[pageNumber];true;false]]

$let[bgUrl;$getObjectProperty[bgData;[$get[bgNumber]][0].url]]
$let[bgName;$getObjectProperty[bgData;[$get[bgNumber]][0].name[$language[tr:0;en:1]]]]
$let[bgNumber;$arrayAt[bgUser;$get[pageNumber]]]

$let[bgTotalNumber;$arrayLength[bgUser]]
$let[pageNumber;1]
$let[bgUsed;$getGlobalUserVar[background;$authorid]]

$createObject[bgData;$readFile[./data/backgrounds.json]]
$createArray[bgUser;$nonEscape[$djsEval[$getGlobalUserVar[backgrounds;$authorid].join(";");true]]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }, 
  {
  //name: "backgrounds",
    type: "interaction",
    prototype: "button",
    code: `
$interactionUpdate[
  {newEmbed:
    {author:$userDisplayName | $language[tr:Arkaplanlar;en:Backgrounds;de:Hintergründe]:$authorAvatar}
    {color:$getvar[embedcolor]}
    {description:$emoji[background] **$get[bgName]** $if[$get[bgUsed]==$get[bgNumber];- *$language[tr:Şu anda kullanılıyor!;en:Currently Equipped!;de:Wird derzeit verwendet!]*]}
    {image:$get[bgUrl]}
    {footer:$language[tr:Sayfa:;en:Page:;de:Seite:] $get[pageNumber]/$get[bgTotalNumber]}
    {timestamp}
  }
  {actionRow:
    {button::primary:backgrounds_back_$authorID_$get[pageNumber]:$get[backBD]:$emojiID[buttonBackPage]}
    {button:$language[tr:Kullan;en:Equip;de:Verwenden]:success:backgroundsEquip_$authorid_$get[pageNumber]:$get[equipBD]}
    {button::primary:backgrounds_next_$authorID_$get[pageNumber]:$get[nextBD]:$emojiID[buttonNextPage]}
  }
]

$let[equipBD;$if[$get[bgUsed]==$get[bgNumber];true;false]]
$let[backBD;$if[$get[pageNumber]==1;true;false]]
$let[nextBD;$if[$get[bgTotalNumber]==$get[pageNumber];true;false]]

$let[bgUrl;$getObjectProperty[bgData;[$get[bgNumber]][0].url]]
$let[bgName;$getObjectProperty[bgData;[$get[bgNumber]][0].name[$language[tr:0;en:1]]]]
$let[bgNumber;$arrayAt[bgUser;$get[pageNumber]]]

$let[bgTotalNumber;$arrayLength[bgUser]]
$let[pageNumber;$math[$advancedTextSplit[$interactionData[customId];_;4] $if[$advancedTextSplit[$interactionData[customId];_;2]==next;+;-] 1]]
$let[bgUsed;$getGlobalUserVar[background;$authorid]]

$createObject[bgData;$readFile[./data/backgrounds.json]]
$createArray[bgUser;$nonEscape[$djsEval[$getGlobalUserVar[backgrounds;$authorid].join(";");true]]]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;3]==$interactionData[author.id];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {interaction} {ephemeral}] 
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==backgrounds;]
    `
  }, 
  {
  //name: "backgroundsEquip",
    type: "interaction",
    prototype: "button",
    code: `
$interactionUpdate[
  {newEmbed:
    {author:$userDisplayName | $language[tr:Arkaplanlar;en:Backgrounds;de:Hintergründe]:$authorAvatar}
    {color:$getvar[embedcolor]}
    {description:$emoji[background] **$get[bgName]** $if[$get[bgUsed]==$get[bgNumber];- *$language[tr:Şu anda kullanılıyor!;en:Currently Equipped!;de:Wird derzeit verwendet!]*]}
    {image:$get[bgUrl]}
    {footer:$language[tr:Sayfa:;en:Page:;de:Seite:] $get[pageNumber]/$get[bgTotalNumber]}
    {timestamp}
  }
  {actionRow:
    {button::primary:backgrounds_back_$authorID_$get[pageNumber]:$get[backBD]:$emojiID[buttonBackPage]}
    {button:$language[tr:Kullan;en:Equip;de:Verwenden]:success:backgroundsEquip_$authorid_$get[pageNumber]:$get[equipBD]}
    {button::primary:backgrounds_next_$authorID_$get[pageNumber]:$get[nextBD]:$emojiID[buttonNextPage]}
  }
]

$let[equipBD;$if[$get[bgUsed]==$get[bgNumber];true;false]]
$let[backBD;$if[$get[pageNumber]==1;true;false]]
$let[nextBD;$if[$get[bgTotalNumber]==$get[pageNumber];true;false]]

$let[bgUsed;$getGlobalUserVar[background;$authorID]]
$setGlobalUserVar[background;$get[bgNumber];$authorID]

$let[bgUrl;$getObjectProperty[bgData;[$get[bgNumber]][0].url]]
$let[bgName;$getObjectProperty[bgData;[$get[bgNumber]][0].name[$language[tr:0;en:1]]]]
$let[bgNumber;$arrayAt[bgUser;$get[pageNumber]]]

$let[bgTotalNumber;$arrayLength[bgUser]]
$let[pageNumber;$advancedTextSplit[$interactionData[customId];_;3]]

$createObject[bgData;$readFile[./data/backgrounds.json]]
$createArray[bgUser;$nonEscape[$djsEval[$getGlobalUserVar[backgrounds;$authorid].join(";");true]]]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {interaction} {ephemeral}] 
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==backgroundsEquip;]
    `
  }
];