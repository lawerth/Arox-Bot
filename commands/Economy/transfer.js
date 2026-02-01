module.exports = [
  {
    name: "transfer",
    aliases: ["send", "give", "pay", "gönder", "paragönder"],
    desc: ["You send money to a user.", "Bir kullanıcıya para gönderirsin.", "Du sendest Geld an einen Benutzer."],
    usage: "send {@user} {amount}",
    example: ["send @Arox 1000"],
    code: `
$setTimeout[disableComponents;1m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {color:$getvar[embedcolor]}
    {author:$language[tr:$userDisplayName[$mentioned[1]] adlı kullanıcıya Arox Cash göndermek üzeresin!;en:You are about to give Arox Cash to $userDisplayName[$mentioned[1]]!;de:Du bist dabei, Arox Cash an den Benutzer $userDisplayName[$mentioned[1]] zu senden!]:$userAvatar[$mentioned[1]]}
    {description:$nonEscape[**$emoji[transfer] | $userDisplayName[$authorid]**, $language[tr:**$userDisplayName[$mentioned[1]]** adlı kullanıcıya $emoji[cash] **$numberSeparator[$get[amount]]** göndermeyi onaylıyor musun?;en:Do you approve sending $emoji[cash] **$numberSeparator[$get[amount]]** to **$userDisplayName[$mentioned[1]]**?;de:Bestätigst du, dass du $emoji[cash] **$numberSeparator[$get[amount]]** an den Benutzer **$userDisplayName[$mentioned[1]]** senden möchtest?]\n\n- $language[tr:Transferi onaylamak için **Onayla** butonuna tıklayın.;en:Click the **Confirm** button to confirm the transfer.;de:Klicke auf die **Bestätigen**-Schaltfläche, um die Überweisung zu bestätigen.]\n- $language[tr:Transferi reddetmek için **Reddet** butonuna tıklayın.;en:Click the **Cancel** button to cancel the transfer.;de:Klicke auf die **Ablehnen**-Schaltfläche, um die Überweisung abzulehnen.]\n\n**$emoji[transferWarning] | $language[tr:ÖNEMLİ NOT:** *Bu transferi, gerçek hayatta parasal bir değeri olan herhangi bir şeyle takas yaptığın tespit edilirse bottan **sınırsız** karalisteye alınırsın!*;en:IMPORTANT NOTE:** *If you are found to have traded this transfer for anything of monetary value in real life, you will be blacklisted from the bot **unlimitedly***!;de:WICHTIGER HINWEIS:** *Falls festgestellt wird, dass du diesen Transfer gegen etwas von realem Geldwert eintauschst, wirst du **unbefristet** auf die schwarze Liste des Bots gesetzt!*]]}
    {footer:$language[tr:Gönderen:;en:Submitted by:;de:Absender:] $userTag[$authorid]:$authorAvatar}
    {timestamp}
  }
  {actionRow:
    {button:$language[tr:Onayla;en:Confirm;de:Bestätigen]:success:transfer-confirm_$authorID_$get[amount]_$mentioned[1]:false:$emojiID[buttonAccept]}
    {button:$language[tr:Reddet;en:Cancel;de:Ablehnen]:danger:transfer-cancel_$authorID_$mentioned[1]:false:$emojiID[buttonDecline]}
  }
;true]]

$let[amount;$noMentionMessage[1]]

$onlyIf[$getGlobalUserVar[cash;$authorID]>=$noMentionMessage[1];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Cüzdanında yeterli miktarda $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have enough $emoji[cash] **Arox Cash** in your wallet!;de:Du hast nicht genügend $emoji[cash] **Arox Cash** in deinem Wallet!]] {deleteIn:5s}]
$onlyif[$noMentionMessage[1]>=10;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:En az $emoji[cash] **10** transfer edebilirsin!;en:You can transfer at least $emoji[cash] **10**!;de:Du kannst mindestens $emoji[cash] **10** übertragen!]] {deleteIn:5s}]
$onlyIf[$isNumber[$noMentionMessage[1]]!=false;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen gönderilecek $emoji[cash] **Arox Cash** miktarını girip tekrar deneyin!;en:Please provide the amount of $emoji[cash] **Arox Cash** to send and try again!;de:Bitte gib den Betrag an $emoji[cash] **Arox Cash** ein, den du senden möchtest, und versuche es erneut!]] {deleteIn:5s}]
$onlyif[$getGlobalUserVar[botRules;$mentioned[1];important]==true;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Etiketlediğin kişi kuralları kabul etmemiş!;en:The user you tagged didn't accept the rules!;de:Die von dir markierte Person hat die Regeln nicht akzeptiert!] {deleteIn:5s}]
$onlyif[$userExists[$mentioned[1]]==true&&$isBot[$mentioned[1]]==false&&$mentioned[1]!=$authorid&&$mentioned[1]!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen bir kullanıcı etiketleyip tekrar deneyin!;en:Please tag a user and try again!;de:Bitte markiere einen Benutzer und versuche es erneut!]] {deleteIn:5s}]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
  `
  },
  {
  //name: "transfer-confirm",
    type: "interaction",
    prototype: "button",
    code: `
$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash;$get[userID]];$get[amount]];$get[userID]]
$setGlobalUserVar[cash;$sub[$getGlobalUserVar[cash;$authorID];$get[amount]];$authorID]

$interactionUpdate[**$emoji[transfer] |** $language[tr:<@$authorID>, <@$get[userID]> kullanıcısına $emoji[cash] **$numberSeparator[$get[amount]]** gönderdi!;en:<@$authorID> sent $emoji[cash] **$numberSeparator[$get[amount]]** to <@$get[userID]>!;de:<@$authorID> hat $emoji[cash] **$numberSeparator[$get[amount]]** an den Benutzer <@$get[userID]> gesendet!]]
$disableMentionType[all]

$onlyif[$get[amount]<=$getGlobalUserVar[cash;$authorid];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Cüzdanında yeterli miktarda $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have enough $emoji[cash] **Arox Cash** in your wallet!;de:Du hast nicht genügend $emoji[cash] **Arox Cash** in deinem Wallet!]] {ephemeral} {interaction}]

$let[userID;$splitText[4]]
$let[amount;$splitText[3]]

$textSplit[$interactionData[customId];_]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];$nonEscape[$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {interaction} {ephemeral}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==transfer-confirm;]
  `
  },
  {
  //name: "transfer-cancel",
    type: "interaction",
    prototype: "button",
    code: `
$interactionUpdate[$language[tr:Transfer işlemi iptal edildi.;en:The transaction has been canceled.;de:Die Überweisung wurde abgebrochen.]
  {newEmbed:
    {author:$getEmbed[$channelID;$messageID;1;authorname]:$getEmbed[$channelID;$messageID;1;authoricon]}
    {color:$getVar[color_red]}
    {footer:$language[tr:Gönderen:;en:Submitted by:;de:Absender:] $userTag[$authorid]:$authorAvatar}
    {timestamp}
    {description:$getEmbed[$channelID;$messageID;1;description]}
  }
  {actionRow:
    {button:$language[tr:Onayla;en:Confirm;de:Bestätigen]:success:success-db:true:$emojiID[buttonAccept]}
    {button:$language[tr:Reddet;en:Cancel;de:Ablehnen]:danger:cancel-db:true:$emojiID[buttonDecline]}
  }
]

$onlyIf[$splitText[2]==$interactionData[author.id];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {interaction} {ephemeral}]
$onlyIf[$splitText[1]==transfer-cancel;]
$textSplit[$interactionData[customId];_]
    `
  }
];
