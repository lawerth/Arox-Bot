module.exports = [
  {
	  name: "myjob",
	  aliases: ["myprofession", "myoccupation", "job", "profession", "occupation", "meslek", "mesleğim"],
    desc: ["You can view information about your profession.", "Sahip olduğun mesleğe ait bilgilere bakarsın.", "Sie können Informationen zu Ihrem Beruf anzeigen."],
    code:`
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$userDisplayName | $language[tr:Meslek Bilgileri;en:Profession Information;de:Berufsinformationen]:$authorAvatar}
    {color:$getVar[embedcolor]}
    {thumbnail:$getObjectProperty[profData;[$get[currentProf]][0].emojiURL]}
    {field:$emoji[profession] $language[tr:Mevcut Mesleğin;en:Current Profession;de:Aktueller Beruf]:$emoji[dot] $getObjectProperty[profData;[$get[currentProf]][0].emoji] $getObjectProperty[profData;[$get[currentProf]][0].name[$language[tr:0;en:1;de:2]]]}
    {field:$emoji[nextprofession] $language[tr:Sıradaki Meslek;en:Next Profession;de:Nächster Beruf]:$emoji[dot] $if[$get[currentProf]==8;$language[tr:Yok;en:None;de:Keine];$getObjectProperty[profData;[$get[nextProf]][0].emoji] $getObjectProperty[profData;[$get[nextProf]][0].name[$language[tr:0;en:1;de:2]]]]}
    {field:$if[$get[currentProf]==0;$emoji[begging] $language[tr:Dilenme Sayısı;en:Begging Count;de:Bettelanzahl];$emoji[working] $language[tr:Çalışma Sayısı;en:Working Count;de:Arbeitenanzahl]]:$emoji[dot] $if[$get[currentProf]==8;$numberSeparator[$get[currentCount]];$get[currentCount]/$get[requiredCount]]}
  }
  {actionRow:
    {button:$language[tr:İstifa Et;en:Resign;de:Kündigen]:danger:resign_$authorID:$get[disableButton1]:$emojiID[resign]}
    {button:$language[tr:Meslek Atla;en:Skip Profession;de:Beruf Überspringen]:success:skipProfession_$authorID:$get[disableButton2]:$emojiID[nextProfession]}
  }
;true]]

$let[disableButton1;$if[$get[currentProf]==0;true;false]]
$let[disableButton2;$if[$get[currentProf]==8;true;false]]

$let[requiredCount;$getObjectProperty[profData;[$get[currentProf]][0].requiredWorkingCount]]
$let[currentCount;$if[$get[currentProf]==0;$getGlobalUserVar[beggingCount];$getGlobalUserVar[workingCount]]]

$let[nextProf;$math[$getGlobalUserVar[profession;$authorID]+1]]
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
  //name: "resign",
	  type: "interaction",
	  prototype: "button",
	  code: `
$interactionReply[
  {newEmbed:
    {author:$userDisplayName | $language[tr:İstifa;en:Resignation;de:Kündigung]:$authorAvatar}
    {title:$nonEscape[$emoji[resign] $language[tr:İstifa Etmek Üzeresin..;en:You Are About to Resign..;de:Du Bist Dabei, Zu Kündigen..]]}
    {color:$getVar[embedcolor]}
    {description:- *$language[tr:İşini bırakıp tekrar dilenci olmayı onaylıyor musun?;en:Do you approve of quitting your profession and becoming a beggar again?;de:Bist du sicher, dass du deinen Job aufgeben und wieder Bettler werden möchtest?]*}
  }
  {actionRow:
    {button:$language[tr:Onayla;en:Confirm;de:Bestätigen]:success:resignConfirm_$authorid:false:$emojiID[buttonAccept]}
    {button:$language[tr:İptal;en:Cancel;de:Abbrechen]:danger:resignCancel_$authorid:false:$emojiID[buttonDecline]}
  }
;everyone;false]

$onlyif[$getGlobalUserVar[profession;$authorid]>0;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Zaten dilencisin. İstifa edemezsin!;en:You are already a beggar. You cannot resign!;de:Du bist bereits ein Bettler. Du kannst nicht kündigen!]] {ephemeral} {interaction}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==resign;]
  `
  },
  {
  //name: "resignConfirm",
    type: "interaction",
	  prototype: "button",
	  code: `
$setGlobalUserVar[profession;0;$authorid]
$setGlobalUserVar[beggingCount;0;$authorid]
$setGlobalUserVar[workingCount;0;$authorid]

$interactionUpdate[
  {newEmbed:
   {author:$userDisplayName | $language[tr:İstifa Edildi;en:Resigned;de:Kündigung Erfolgreich]:$authorAvatar}
   {color:$getVar[color_red]}
   {description:$nonEscape[**$emoji[resign] | $userDisplayName**, $language[tr:İşinden istifa ettin. Artık bir dilencisin!;en:You resigned from your profession. You're a beggar now!;de:Du hast deinen Job gekündigt. Jetzt bist du ein Bettler!]]}
   {thumbnail:$getObjectProperty[profData;[0][0].emojiURL]}
  }
]

$createObject[profData;$readFile[./data/professions.json]]

$onlyif[$splitText[2]==$authorid;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$splitText[1]==resignConfirm;]
$textSplit[$interactionData[customId];_]
  `
  },
  {
  //name: "resignCancel",
	  type: "interaction",
	  prototype: "button",
	  code: `
$deleteMessage[$interactionData[message.id];$channelid]

$onlyif[$splitText[2]==$authorid;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$splitText[1]==resignCancel;]
$textSplit[$interactionData[customId];_]
    `
  }
];