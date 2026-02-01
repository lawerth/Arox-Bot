module.exports = [
  {
	  name: "professions",
	  aliases: ["jobs", "occupations", "meslekler"],
    desc: ["You can view available professions.", "Mevcut mesleklere bakarsın.", "Sie können verfügbare Berufe anzeigen."],
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Meslekler;en:Professions;de:Berufe]:$userAvatar[$clientid]}
    {color:$getVar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[professions]]}
    {footer:$language[tr:Sayfa:;en:Page:;de:Seite:] 1/2}
    {timestamp}
    {description:$nonEscape[**$language[tr:Şu anki mesleğin:;en:Your current profession:;de:Dein aktueller Beruf:]** $get[profEmoji] $get[profName]]}
    {field:$if[$get[currentProf]>=1;$emoji[checkMark];\[1\]] $getObjectProperty[profData;[1][0].emoji] $getObjectProperty[profData;[1][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[1][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[1][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
    {field:$if[$get[currentProf]>=2;$emoji[checkMark];\[2\]] $getObjectProperty[profData;[2][0].emoji] $getObjectProperty[profData;[2][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[2][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[2][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
    {field:$if[$get[currentProf]>=3;$emoji[checkMark];\[3\]] $getObjectProperty[profData;[3][0].emoji] $getObjectProperty[profData;[3][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[3][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[3][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
    {field:$if[$get[currentProf]>=4;$emoji[checkMark];\[4\]] $getObjectProperty[profData;[4][0].emoji] $getObjectProperty[profData;[4][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[4][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[4][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
    {field:$if[$get[currentProf]>=5;$emoji[checkMark];\[5\]] $getObjectProperty[profData;[5][0].emoji] $getObjectProperty[profData;[5][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[5][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[5][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
  }
  {actionRow:
    {button::primary:professionsPage0_$authorID:true:$emojiID[buttonBackPage]}
    {button:$language[tr:Meslek Atla;en:Skip Profession;de:Beruf Überspringen]:success:skipProfession_$authorID:$get[disableButton]}
    {button::primary:professionsPage2_$authorID:false:$emojiID[buttonNextPage]}
  }
;true]]

$let[disableButton;$if[$getGlobalUserVar[profession;$authorID]==8;true;false]]
$let[profEmoji;$getObjectProperty[profData;[$getGlobalUserVar[profession;$authorID]][0].emoji]]
$let[profName;$getObjectProperty[profData;[$getGlobalUserVar[profession;$authorID]][0].name[$language[tr:0;en:1;de:2]]]]
$let[currentProf;$getGlobalUserVar[profession;$authorID]]

$createObject[profData;$readFile[./data/professions.json]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }, 
  {
  //name: "professionsPage2",
	  type: "interaction",
	  prototype: "button",
	  code: `
$interactionUpdate[
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Meslekler;en:Professions;de:Berufe]:$userAvatar[$clientid]}
    {color:$getVar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[professions]]}
    {footer:$language[tr:Sayfa:;en:Page:;de:Seite:] 2/2}
    {timestamp}
    {description:$nonEscape[**$language[tr:Şu anki mesleğin:;en:Your current profession:;de:Dein aktueller Beruf:]** $get[profEmoji] $get[profName]]}
    {field:$if[$get[currentProf]>=6;$emoji[checkMark];\[6\]] $getObjectProperty[profData;[6][0].emoji] $getObjectProperty[profData;[6][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[6][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[6][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
    {field:$if[$get[currentProf]>=7;$emoji[checkMark];\[7\]] $getObjectProperty[profData;[7][0].emoji] $getObjectProperty[profData;[7][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[7][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[7][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
    {field:$if[$get[currentProf]>=8;$emoji[checkMark];\[8\]] $getObjectProperty[profData;[8][0].emoji] $getObjectProperty[profData;[8][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[8][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[8][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
  }
  {actionRow:
    {button::primary:professionsPage1_$authorID:false:$emojiID[buttonBackPage]}
    {button:$language[tr:Meslek Atla;en:Skip Profession;de:Beruf Überspringen]:success:skipProfession_$authorID:$get[disableButton]}
    {button::primary:professionsPage3_$authorID:true:$emojiID[buttonNextPage]}
  }
]

$let[disableButton;$if[$getGlobalUserVar[profession;$authorID]==8;true;false]]
$let[profEmoji;$getObjectProperty[profData;[$getGlobalUserVar[profession;$authorID]][0].emoji]]
$let[profName;$getObjectProperty[profData;[$getGlobalUserVar[profession;$authorID]][0].name[$language[tr:0;en:1;de:2]]]]
$let[currentProf;$getGlobalUserVar[profession;$authorID]]

$createObject[profData;$readFile[./data/professions.json]]

$onlyIf[$splitText[2]==$authorid;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$splitText[1]==professionsPage2;]
$textSplit[$interactionData[customId];_]
    `									
  },
  {
  //name: "professionsPage1",
	  type: "interaction",
	  prototype: "button",
	  code: `
$interactionUpdate[
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Meslekler;en:Professions;de:Berufe]:$userAvatar[$clientid]}
    {color:$getVar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[professions]]}
    {footer:$language[tr:Sayfa:;en:Page:;de:Seite:] 1/2}
    {timestamp}
    {description:$nonEscape[**$language[tr:Şu anki mesleğin:;en:Your current profession:;de:Dein aktueller Beruf:]** $get[profEmoji] $get[profName]]}
    {field:$if[$get[currentProf]>=1;$emoji[checkMark];\[1\]] $getObjectProperty[profData;[1][0].emoji] $getObjectProperty[profData;[1][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[1][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[1][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
    {field:$if[$get[currentProf]>=2;$emoji[checkMark];\[2\]] $getObjectProperty[profData;[2][0].emoji] $getObjectProperty[profData;[2][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[2][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[2][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
    {field:$if[$get[currentProf]>=3;$emoji[checkMark];\[3\]] $getObjectProperty[profData;[3][0].emoji] $getObjectProperty[profData;[3][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[3][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[3][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
    {field:$if[$get[currentProf]>=4;$emoji[checkMark];\[4\]] $getObjectProperty[profData;[4][0].emoji] $getObjectProperty[profData;[4][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[4][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[4][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
    {field:$if[$get[currentProf]>=5;$emoji[checkMark];\[5\]] $getObjectProperty[profData;[5][0].emoji] $getObjectProperty[profData;[5][0].name[$language[tr:0;en:1;de:2]]]:$emoji[dot] **$language[tr:Meslek Ücreti:;en:Profession Price:;de:Berufspreis:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[5][0].price]]\`\n$emoji[dot] **$language[tr:Kazanç:;en:Income:;de:Einkommen:]** $emoji[cash] \`$numberSeparator[$getObjectProperty[profData;[5][0].income[0].daily]]/$language[tr:gün;en:day;de:tag]\`}
  }
  {actionRow:
    {button::primary:professionsPage0_$authorID:true:$emojiID[buttonBackPage]}
    {button:$language[tr:Meslek Atla;en:Skip Profession;de:Beruf Überspringen]:success:skipProfession_$authorID:$get[disableButton]}
    {button::primary:professionsPage2_$authorID:false:$emojiID[buttonNextPage]}
  }
]

$let[disableButton;$if[$getGlobalUserVar[profession;$authorID]==8;true;false]]
$let[profEmoji;$getObjectProperty[profData;[$getGlobalUserVar[profession;$authorID]][0].emoji]]
$let[profName;$getObjectProperty[profData;[$getGlobalUserVar[profession;$authorID]][0].name[$language[tr:0;en:1;de:2]]]]
$let[currentProf;$getGlobalUserVar[profession;$authorID]]

$createObject[profData;$readFile[./data/professions.json]]

$onlyIf[$splitText[2]==$authorid;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$splitText[1]==professionsPage1;]
$textSplit[$interactionData[customId];_]
    `
  },
  {
  //name: "skipProfession",
	  type: "interaction",
	  prototype: "button",
	  code: `
$setGlobalUserVar[workingCount;0;$authorid]
$setGlobalUserVar[profession;$get[nextProf];$authorid]

$interactionReply[$nonEscape[**$emoji[Profession] | $userDisplayName**, $language[tr:Başarıyla meslek atladın! Yeni mesleğin;en:You have successfully skipped a profession! Your new profession;de:Du hast erfolgreich den Beruf gewechselt! Dein neuer Beruf ist]:\n- $getObjectProperty[profData;[$get[nextProf]][0].emoji] **$getObjectProperty[profData;[$get[nextProf]][0].name[$language[tr:0;en:1;de:2]]]**];everyone;false]

$onlyIf[$get[currentProf]<8;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Zaten en son meslekte olduğun için meslek atlayamazsın!;en: You can't skip professions because you are already in the last profession!;de:Da du bereits im letzten Beruf bist, kannst du den Beruf nicht mehr überspringen!]] {ephemeral} {interaction}]
$onlyIf[$get[currentCount]>=$get[requiredCount];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Meslek atlamak için **$math[$get[requiredCount]-$get[currentCount]]** kez daha $if[$get[currentProf]==0;dilenmen;çalışman] gerekiyor!;en:You need to $if[$get[currentProf]==0;beg;work] **$math[$get[requiredCount]-$get[currentCount]]** more times to skip profession!;de:Um den Beruf zu überspringen, musst du noch **$math[$get[requiredCount]-$get[currentCount]]** Mal $if[$get[currentProf]==0;betteln;arbeiten]!]] {ephemeral} {interaction}]

$let[requiredCount;$getObjectProperty[profData;[$get[currentProf]][0].requiredWorkingCount]]
$let[currentCount;$if[$get[currentProf]==0;$getGlobalUserVar[beggingCount];$getGlobalUserVar[workingCount]]]

$let[nextProf;$math[$getGlobalUserVar[profession;$authorID]+1]]
$let[currentProf;$getGlobalUserVar[profession;$authorID]]

$createObject[profData;$readFile[./data/professions.json]]

$onlyif[$splitText[2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$splitText[1]==skipProfession;]
$textSplit[$interactionData[customId];_]
    `
  }
];