module.exports = [
  {
	  name: "bank",
	  aliases: ["deposit", "withdraw", "banka"],
    desc: ["You can view all your bank transactions.", "Tüm banka işlemlerini görüntülersin.", "Sie können alle Ihre Banktransaktionen anzeigen."],
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$userDisplayName[$authorid] | $language[tr:Banka Bilgileri;en:Bank Information;de:Deine Bankinformationen]:$authorAvatar}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Aşağıdaki menü ve butonlar yardımıyla bankanı yönetebilirsin!;en:Use the menus and buttons below to manage your bank!;de:Du kannst deine Bank mit den folgenden Menüs und Schaltflächen verwalten!]}
    {timestamp}
    {thumbnail:$emojiURL[$emojiID[bank]]}
    {description:$nonEscape[$emoji[bank] **$language[tr:Banka;en:Bank;de:Bank]** - \`($username)\`\n
$emoji[blank] $emoji[cash] **$numberSeparator[$getGlobalUserVar[bank;$authorid]]**]}
  }
  {actionRow:
    {selectMenu:bankTransactionModal_$authorid:$language[tr:Banka İşlemleri;en:Bank Transactions;de:Bankgeschäfte]:1:1:false:
      {stringInput:$language[tr:Arox Cash Yatır;en:Deposit Arox Cash;de:Arox Cash Einzahlen]:deposit:$language[tr:Bankaya Arox Cash yatırmak için tıkla!;en:Click to deposit Arox Cash in the bank!;de:Klicke, um Arox Cash in die Bank einzuzahlen!]:false:$emoji[cash]}
      {stringInput:$language[tr:Arox Cash Çek;en:Withdraw Arox Cash;de:Arox Cash Abheben]:withdraw:$language[tr:Bankadan Arox Cash çekmek için tıkla!;en:Click to withdraw Arox Cash in the bank!;de:Klicke, um Arox Cash von der Bank abzuheben!]:false:$emoji[cash]}
    }
  }
  {actionRow:
	  {button:$language[tr:Tüm Paranı Yatır;en:Deposit All Money;de:Gesamtes Geld Einzahlen]:danger:bankDepositAll_$authorid:$get[depositDisable]:$emojiID[buttonDeposit]}
	  {button:$language[tr:Tüm Paranı Çek;en:Withdraw All Money;de:Gesamtes Geld Abheben]:success:bankWithdrawAll_$authorid:$get[withdrawDisable]:$emojiID[buttonWithdraw]}
  }
;true]]

$let[withdrawDisable;$if[$getGlobalUserVar[bank;$authorid]<=0;true;false]]
$let[depositDisable;$if[$getGlobalUserVar[cash;$authorID]<=0;true;false]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  },
  {
  //name: "bankTransactionModal",
	  type : "interaction",
	  prototype: "selectMenu",
	  code: `
$interactionModal[$if[$get[transaction]==deposit;$language[tr:Arox Cash Yatır;en:Deposit Arox Cash;de:Arox Cash Einzahlen];$language[tr:Arox Cash Çek;en:Withdraw Arox Cash;de:Arox Cash Abheben]];bank$toLocaleUpperCase[$get[transaction]];
  {actionRow:
	  {textInput:$language[tr:Miktar girin.;en:Enter amount.;de:Betrag eingeben.]:1:miktar:true:$get[text]:1:50}
	}
]

$onlyif[$getGlobalUserVar[$get[variable];$authorid]>0;$nonEscape[**$emoji[error] | $userDisplayName**, $if[$get[transaction]==deposit;$language[tr:Yatırmak için cüzdanında yeterli miktarda $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have enough $emoji[cash] **Arox Cash** in your wallet to deposit!;de:Du hast nicht genügend $emoji[cash] **Arox Cash** in deinem Wallet, um es einzuzahlen!];$language[tr:Çekmek için bankanda yeterli miktarda $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have enough $emoji[cash] **Arox Cash** in your bank to withdraw!;de:Du hast nicht genügend $emoji[cash] **Arox Cash** auf deiner Bank, um es abzuheben!]]] {ephemeral} {interaction}]

$let[variable;$if[$get[transaction]==deposit;cash;bank]]
$let[text;$if[$get[transaction]==deposit;$language[tr:Lütfen bankaya yatırmak istediğin miktarı gir!;en:Please enter the amount you want to deposit in the bank!;de:Bitte gib den Betrag ein, den du in die Bank einzahlen möchtest!];$language[tr:Lütfen bankadan çekmek istediğin miktarı gir!;en:Please enter the amount you want to withdraw from the bank!;de:Bitte gib den Betrag ein, den du von der Bank abheben möchtest!]]]
$let[transaction;$interactionData[values[0]]]

$onlyIf[$interactionData[values[0]]==deposit||$interactionData[values[0]]==withdraw;]
$onlyIf[$splitText[2]==$interactionData[author.id];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu menüyü kullanamazsın!;en:You can't use this menu!;de:Du kannst diese Menü nicht verwenden!]] {ephemeral} {interaction}]
$onlyif[$splitText[1]==bankTransactionModal;]
$textSplit[$interactionData[customId];_]
    `
  },
  {
	  name: "bankDeposit",
	  type: "interaction",
	  prototype: "modal",
	  code: `
$editMessage[$interactionData[message.id];
  {newEmbed:
    {author:$userDisplayName[$authorid] | $language[tr:Banka Bilgileri;en:Bank Information;de:Deine Bankinformationen]:$authorAvatar}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Aşağıdaki menü ve butonlar yardımıyla bankanı yönetebilirsin!;en:Use the menus and buttons below to manage your bank!;de:Du kannst deine Bank mit den folgenden Menüs und Schaltflächen verwalten!]}
    {timestamp}
    {thumbnail:$emojiURL[$emojiID[bank]]}
    {description:$nonEscape[$emoji[bank] **$language[tr:Banka;en:Bank;de:Bank]** - \`($username)\`\n
$emoji[blank] $emoji[cash] **$numberSeparator[$getGlobalUserVar[bank;$authorid]]**]}
  }
  {actionRow:
    {selectMenu:bankTransactionModal_$authorid:$language[tr:Banka İşlemleri;en:Bank Transactions;de:Bankgeschäfte]:1:1:false:
      {stringInput:$language[tr:Arox Cash Yatır;en:Deposit Arox Cash;de:Arox Cash Einzahlen]:deposit:$language[tr:Bankaya Arox Cash yatırmak için tıkla!;en:Click to deposit Arox Cash in the bank!;de:Klicke, um Arox Cash in die Bank einzuzahlen!]:false:$emoji[cash]}
      {stringInput:$language[tr:Arox Cash Çek;en:Withdraw Arox Cash;de:Arox Cash Abheben]:withdraw:$language[tr:Bankadan Arox Cash çekmek için tıkla!;en:Click to withdraw Arox Cash in the bank!;de:Klicke, um Arox Cash von der Bank abzuheben!]:false:$emoji[cash]}
    }
  }
  {actionRow:
	  {button:$language[tr:Tüm Paranı Yatır;en:Deposit All Money;de:Gesamtes Geld Einzahlen]:danger:bankDepositAll_$authorid:$get[depositDisable]:$emojiID[buttonDeposit]}
	  {button:$language[tr:Tüm Paranı Çek;en:Withdraw All Money;de:Gesamtes Geld Abheben]:success:bankWithdrawAll_$authorid:$get[withdrawDisable]:$emojiID[buttonWithdraw]}
  }
]

$let[withdrawDisable;$if[$getGlobalUserVar[bank;$authorid]<=0;true;false]]
$let[depositDisable;$if[$getGlobalUserVar[cash;$authorID]<=0;true;false]]

$setGlobalUserVar[cash;$math[$getGlobalUserVar[cash;$authorID]-$textInputValue[miktar]];$authorid]
$setGlobalUserVar[bank;$math[$getGlobalUserVar[bank;$authorID]+$textInputValue[miktar]];$authorid]

$interactionReply[$nonEscape[**$emoji[bank] | $userDisplayName**, $language[tr:Başarıyla bankana $emoji[cash] **$numberSeparator[$textInputValue[miktar]]** yatırdın!;en:You have successfully deposited $emoji[cash] **$numberSeparator[$textInputValue[miktar]]** in your bank!;de:Du hast erfolgreich $emoji[cash] **$numberSeparator[$textInputValue[miktar]]** auf deine Bank eingezahlt!]];everyone;true]

$onlyif[$getGlobalUserVar[cash;$authorid]>=$textInputValue[miktar];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bankaya yatırmak için yeterli miktarda $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have enough $emoji[cash] **Arox Cash** to deposit in the bank!;de:Du hast nicht genügend $emoji[cash] **Arox Cash**, um es in die Bank einzuzahlen!]] {ephemeral} {interaction}]
$onlyif[$isNumber[$textInputValue[miktar]]==true&&$textInputValue[miktar]>0;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir sayı girip tekrar deneyin!;enPlease enter a valid number and try again!;de:Bitte gib eine gültige Zahl ein und versuche es erneut!]] {ephemeral} {interaction}]
    `
  },
  {
	  name: "bankWithdraw",
	  type: "interaction",
	  prototype: "modal",
	  code: `
$editMessage[$interactionData[message.id];
  {newEmbed:
    {author:$userDisplayName[$authorid] | $language[tr:Banka Bilgileri;en:Bank Information;de:Deine Bankinformationen]:$authorAvatar}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Aşağıdaki menü ve butonlar yardımıyla bankanı yönetebilirsin!;en:Use the menus and buttons below to manage your bank!;de:Du kannst deine Bank mit den folgenden Menüs und Schaltflächen verwalten!]}
    {timestamp}
    {thumbnail:$emojiURL[$emojiID[bank]]}
    {description:$nonEscape[$emoji[bank] **$language[tr:Banka;en:Bank;de:Bank]** - \`($username)\`\n
$emoji[blank] $emoji[cash] **$numberSeparator[$getGlobalUserVar[bank;$authorid]]**]}
  }
  {actionRow:
    {selectMenu:bankTransactionModal_$authorid:$language[tr:Banka İşlemleri;en:Bank Transactions;de:Bankgeschäfte]:1:1:false:
      {stringInput:$language[tr:Arox Cash Yatır;en:Deposit Arox Cash;de:Arox Cash Einzahlen]:deposit:$language[tr:Bankaya Arox Cash yatırmak için tıkla!;en:Click to deposit Arox Cash in the bank!;de:Klicke, um Arox Cash in die Bank einzuzahlen!]:false:$emoji[cash]}
      {stringInput:$language[tr:Arox Cash Çek;en:Withdraw Arox Cash;de:Arox Cash Abheben]:withdraw:$language[tr:Bankadan Arox Cash çekmek için tıkla!;en:Click to withdraw Arox Cash in the bank!;de:Klicke, um Arox Cash von der Bank abzuheben!]:false:$emoji[cash]}
    }
  }
  {actionRow:
	  {button:$language[tr:Tüm Paranı Yatır;en:Deposit All Money;de:Gesamtes Geld Einzahlen]:danger:bankDepositAll_$authorid:$get[depositDisable]:$emojiID[buttonDeposit]}
	  {button:$language[tr:Tüm Paranı Çek;en:Withdraw All Money;de:Gesamtes Geld Abheben]:success:bankWithdrawAll_$authorid:$get[withdrawDisable]:$emojiID[buttonWithdraw]}
  }
]

$let[withdrawDisable;$if[$getGlobalUserVar[bank;$authorid]<=0;true;false]]
$let[depositDisable;$if[$getGlobalUserVar[cash;$authorID]<=0;true;false]]

$setGlobalUserVar[cash;$math[$getGlobalUserVar[cash;$authorID]+$textInputValue[miktar]];$authorid]
$setGlobalUserVar[bank;$math[$getGlobalUserVar[bank;$authorID]-$textInputValue[miktar]];$authorid]

$interactionReply[$nonEscape[**$emoji[bank] | $userDisplayName**, $language[tr:Başarıyla bankandan $emoji[cash] **$numberSeparator[$textInputValue[miktar]]** çektin!;en:You successfully withdraw $emoji[cash] **$numberSeparator[$textInputValue[miktar]]** from your bank!;de:Du hast erfolgreich $emoji[cash] **$numberSeparator[$textInputValue[miktar]]** von deiner Bank abgehoben!]];everyone;true]

$onlyif[$getGlobalUserVar[bank;$authorid]>=$textInputValue[miktar];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bankanda belirttiğin miktarda $emoji[cash] **Arox Cash** bulunmuyor!;en:Your bank doesn't have the specified amount of $emoji[cash] **Arox Cash**!;de:Du hast nicht genügend $emoji[cash] **Arox Cash** auf deiner Bank für den angegebenen Betrag!]] {ephemeral} {interaction}]
$onlyif[$isNumber[$textInputValue[miktar]]==true&&$textInputValue[miktar]>0;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir sayı girip tekrar deneyin!;en:Please enter a valid number and try again!;de:Bitte gib eine gültige Zahl ein und versuche es erneut!] {ephemeral} {interaction}]
    `
  },
  {
  //name: "bankDepositAll"
	  type: "interaction",
	  prototype: "button",
	  code: `
$editMessage[$interactionData[message.id];
  {newEmbed:
    {author:$userDisplayName[$authorid] | $language[tr:Banka Bilgileri;en:Bank Information;de:Deine Bankinformationen]:$authorAvatar}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Aşağıdaki menü ve butonlar yardımıyla bankanı yönetebilirsin!;en:Use the menus and buttons below to manage your bank!;de:Du kannst deine Bank mit den folgenden Menüs und Schaltflächen verwalten!]}
    {timestamp}
    {thumbnail:$emojiURL[$emojiID[bank]]}
    {description:$nonEscape[$emoji[bank] **$language[tr:Banka;en:Bank;de:Bank]** - \`($username)\`\n
$emoji[blank] $emoji[cash] **$numberSeparator[$getGlobalUserVar[bank;$authorid]]**]}
  }
  {actionRow:
    {selectMenu:bankTransactionModal_$authorid:$language[tr:Banka İşlemleri;en:Bank Transactions;de:Bankgeschäfte]:1:1:false:
      {stringInput:$language[tr:Arox Cash Yatır;en:Deposit Arox Cash;de:Arox Cash Einzahlen]:deposit:$language[tr:Bankaya Arox Cash yatırmak için tıkla!;en:Click to deposit Arox Cash in the bank!;de:Klicke, um Arox Cash in die Bank einzuzahlen!]:false:$emoji[cash]}
      {stringInput:$language[tr:Arox Cash Çek;en:Withdraw Arox Cash;de:Arox Cash Abheben]:withdraw:$language[tr:Bankadan Arox Cash çekmek için tıkla!;en:Click to withdraw Arox Cash in the bank!;de:Klicke, um Arox Cash von der Bank abzuheben!]:false:$emoji[cash]}
    }
  }
  {actionRow:
	  {button:$language[tr:Tüm Paranı Yatır;en:Deposit All Money;de:Gesamtes Geld Einzahlen]:danger:bankDepositAll_$authorid:$get[depositDisable]:$emojiID[buttonDeposit]}
	  {button:$language[tr:Tüm Paranı Çek;en:Withdraw All Money;de:Gesamtes Geld Abheben]:success:bankWithdrawAll_$authorid:$get[withdrawDisable]:$emojiID[buttonWithdraw]}
  }
]

$let[withdrawDisable;$if[$getGlobalUserVar[bank;$authorid]<=0;true;false]]
$let[depositDisable;$if[$getGlobalUserVar[cash;$authorID]<=0;true;false]]

$setGlobalUserVar[cash;0;$authorid]
$setGlobalUserVar[bank;$math[$getGlobalUserVar[bank;$authorid]+$getGlobalUserVar[cash;$authorid]];$authorID]

$interactionReply[$nonEscape[**$emoji[bank] | $userDisplayName**, $language[tr:Başarıyla bankana $emoji[cash] **$numberSeparator[$getGlobalUserVar[cash;$authorid]]** yatırdın!;en:You have successfully deposited $emoji[cash] **$numberSeparator[$getGlobalUserVar[cash;$authorid]]** in your bank!;de:Du hast erfolgreich $emoji[cash] **$numberSeparator[$getGlobalUserVar[cash;$authorid]]** auf deine Bank eingezahlt!]];everyone;true]

$onlyif[$getGlobalUserVar[cash;$authorid]>0;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bankaya yatırmak için cüzdanında hiç $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have any $emoji[cash] **Arox Cash** in your wallet to deposit in the bank!;de:Du hast kein $emoji[cash] **Arox Cash** in deinem Wallet, um es in die Bank einzuzahlen!]] {ephemeral} {interaction}]

$onlyIf[$splitText[2]==$interactionData[author.id];$nonescape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$splitText[1]==bankDepositAll;]
$textSplit[$interactionData[customId];_]
    `
  },
  {
  //name: "bankWithdrawAll"
	  type: "interaction",
	  prototype: "button",
	  code: `
$editMessage[$interactionData[message.id];
  {newEmbed:
    {author:$userDisplayName[$authorid] | $language[tr:Banka Bilgileri;en:Bank Information;de:Deine Bankinformationen]:$authorAvatar}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Aşağıdaki menü ve butonlar yardımıyla bankanı yönetebilirsin!;en:Use the menus and buttons below to manage your bank!;de:Du kannst deine Bank mit den folgenden Menüs und Schaltflächen verwalten!]}
    {timestamp}
    {thumbnail:$emojiURL[$emojiID[bank]]}
    {description:$nonEscape[$emoji[bank] **$language[tr:Banka;en:Bank;de:Bank]** - \`($username)\`\n
$emoji[blank] $emoji[cash] **$numberSeparator[$getGlobalUserVar[bank;$authorid]]**]}
  }
  {actionRow:
    {selectMenu:bankTransactionModal_$authorid:$language[tr:Banka İşlemleri;en:Bank Transactions;de:Bankgeschäfte]:1:1:false:
      {stringInput:$language[tr:Arox Cash Yatır;en:Deposit Arox Cash;de:Arox Cash Einzahlen]:deposit:$language[tr:Bankaya Arox Cash yatırmak için tıkla!;en:Click to deposit Arox Cash in the bank!;de:Klicke, um Arox Cash in die Bank einzuzahlen!]:false:$emoji[cash]}
      {stringInput:$language[tr:Arox Cash Çek;en:Withdraw Arox Cash;de:Arox Cash Abheben]:withdraw:$language[tr:Bankadan Arox Cash çekmek için tıkla!;en:Click to withdraw Arox Cash in the bank!;de:Klicke, um Arox Cash von der Bank abzuheben!]:false:$emoji[cash]}
    }
  }
  {actionRow:
	  {button:$language[tr:Tüm Paranı Yatır;en:Deposit All Money;de:Gesamtes Geld Einzahlen]:danger:bankDepositAll_$authorid:$get[depositDisable]:$emojiID[buttonDeposit]}
	  {button:$language[tr:Tüm Paranı Çek;en:Withdraw All Money;de:Gesamtes Geld Abheben]:success:bankWithdrawAll_$authorid:$get[withdrawDisable]:$emojiID[buttonWithdraw]}
  }
]

$let[withdrawDisable;$if[$getGlobalUserVar[bank;$authorid]<=0;true;false]]
$let[depositDisable;$if[$getGlobalUserVar[cash;$authorID]<=0;true;false]]

$setGlobalUserVar[bank;0;$authorid]
$setGlobalUserVar[cash;$math[$getGlobalUserVar[cash;$authorid]+$getGlobalUserVar[bank;$authorid]];$authorID]

$interactionReply[$nonEscape[**$emoji[bank] | $userDisplayName**, $language[tr:Başarıyla bankandan $emoji[cash] **$numberSeparator[$getGlobalUserVar[bank;$authorid]]** çektin!;en:You successfully withdraw $emoji[cash] **$numberSeparator[$getGlobalUserVar[bank;$authorid]]** from your bank!;de:Du hast erfolgreich $emoji[cash] **$numberSeparator[$getGlobalUserVar[bank;$authorid]]** von deiner Bank abgehoben!]];everyone;true]

$onlyif[$getGlobalUserVar[bank;$authorid]>0;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Çekmek için bankanda hiç $emoji[cash] **Arox Cash** bulunmuyor!;en:You don't have any $emoji[cash] **Arox Cash** in your bank to withdraw!;de:Du hast kein $emoji[cash] **Arox Cash** auf deiner Bank, um es abzuheben!]] {ephemeral} {interaction}]

$onlyIf[$splitText[2]==$interactionData[author.id];$nonescape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$splitText[1]==bankWithdrawAll;]
$textSplit[$interactionData[customId];_]
    `
  }
];