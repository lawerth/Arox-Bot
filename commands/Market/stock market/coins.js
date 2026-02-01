 module.exports = [
  {
    name: "coins",
    aliases: ["coin", "coinler", "coinlerim"],
    desc: ["You can view the coins you have.", "Sahip olduğun coinlere bakarsın.", "Du kannst die Coins sehen, die du hast."],
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$userDisplayName | $language[tr:Borsa Bilgi;en:Stock Market Information;de:Börseninformation]:$userAvatar[$authorID]}
    {color:$getvar[embedcolor]}
    {thumbnail:https://cdn-icons-png.flaticon.com/512/3310/3310608.png}
    {footer:$language[tr:Coin satmak için butonları kullan!;en:Use the buttons to sell coins!;de:Verwende die Buttons, um Coins zu verkaufen!]}
    {description:$nonEscape[$if[$arrayLength[descList]==0;*$language[tr:Mevcut coinin bulunmuyor. Coin satın almak için **$getGuildVar[prefix;$guildid]borsa** yazabilirsin!;en:There are no coins available. You can type **$getGuildVar[prefix;$guildid]stockmarket** to buy coins!;de:Du hast keine Coins. Um Coins zu kaufen, schreibe **$getGuildVar[prefix;$guildid]stockmarket**!]*;$arrayJoin[descList;
]]]}
  }
  {actionRow:
    {selectMenu:coinKullanıcıBilgi_$authorid:$language[tr:Ayrıntılı bilgi için tıkla!;en:Click here for details!;de:Klicke hier für detaillierte Informationen!]:1:1:false:
      {stringInput:Bitcoin:btc-Bitcoin::false:$emoji[bitcoin]}
      {stringInput:Ethereum:eth-Ethereum::false:$emoji[ethereum]}
      {stringInput:Binance:bnb-Binance::false:$emoji[binance]}
      {stringInput:Solana:sol-Solana::false:$emoji[solana]}
      {stringInput:Tether:tet-Tether::false:$emoji[tether]}
    }
  }
  {actionRow:
    {selectMenu:coinSat_$authorid:$language[tr:Coin satmak için tıkla!;en:Click here for sell coins!;de:Klicke hier um Coins zu verkaufen!]:1:1:false:
      {stringInput:Bitcoin:btc-Bitcoin::false:$emoji[bitcoin]}
      {stringInput:Ethereum:eth-Ethereum::false:$emoji[ethereum]}
      {stringInput:Binance:bnb-Binance::false:$emoji[binance]}
      {stringInput:Solana:sol-Solana::false:$emoji[solana]}
      {stringInput:Tether:tet-Tether::false:$emoji[tether]}
    }
  }
;true]]

$djsEval[
let array = d.data.arrays.descList
array = array.filter(item => item !== "");

d.data.arrays.descList = array;
]
$arrayPush[descList;$if[$getObjectProperty[btc;amount]>0;$emoji[bitcoin] **Bitcoin** \`(BTC)\` - $numberSeparator[$getObjectProperty[btc;amount]]]]
$arrayPush[descList;$if[$getObjectProperty[bnb;amount]>0;$emoji[binance] **Binance** \`(BNB)\` — $numberSeparator[$getObjectProperty[bnb;amount]]]]
$arrayPush[descList;$if[$getObjectProperty[eth;amount]>0;$emoji[ethereum] **Ethereum** \`(ETH)\` — $numberSeparator[$getObjectProperty[eth;amount]]]]
$arrayPush[descList;$if[$getObjectProperty[sol;amount]>0;$emoji[solana] **Solana** \`(SOL)\` — $numberSeparator[$getObjectProperty[sol;amount]]]]
$arrayPush[descList;$if[$getObjectProperty[tet;amount]>0;$emoji[tether] **Tether** \`(TET)\` — $numberSeparator[$getObjectProperty[tet;amount]]]]
$createArray[descList]

$createObject[btc;$getGlobalUserVar[bitcoin;$authorID]]
$createObject[bnb;$getGlobalUserVar[binance;$authorid]]
$createObject[eth;$getGlobalUserVar[ethereum;$authorid]]
$createObject[sol;$getGlobalUserVar[solana;$authorid]]
$createObject[tet;$getGlobalUserVar[tether;$authorid]]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }, 
  {
  //name: ["btc-sat", "bnb-sat", "eth-sat", "tet-sat"...],
    type: "interaction",
    prototype: "selectMenu",
    code: `
$interactionModal[$language[tr:$toUpperCase[$get[coinCode]] Sat;en:Sell $toUpperCase[$get[coinCode]];de:$toUpperCase[$get[coinCode]] Verkaufen];coinSatModal_$get[coinCode];
  {actionRow:
    {textInput:$language[tr:Kaç adet satmak istersiniz?;en:How many do you want to sell?;de:Wie viele möchtest du verkaufen?]:1:amount:false:$language[tr:Satmak istediğiniz miktarı girin.;en:Enter the amount you want to sell.;de:Gib die Menge ein, die du verkaufen möchtest.]:1:50}
  }
]

$let[coinName;$advancedTextSplit[$interactionData[values[0]];-;2]]
$let[coinCode;$advancedTextSplit[$interactionData[values[0]];-;1]]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu menüyü kullanamazsın!;en:You can't use this menu!;de:Du kannst diese Menü nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==coinSat;]
  `
  }, 
  {
  //name: "coinSatModal_btc/eth/bnb/sol/tet",
    type: "interaction",
    prototype: "modal",
    code: `
$setGlobalUserVar[cash;$math[$getGlobalUserVar[cash;$authorid]+($getObjectProperty[coinData;currentValue]*$get[amount])];$authorid]
$setGlobalUserVar[$get[coinName];$getObject[userData];$authorid]
$setObjectProperty[userData;purchaseDate;0]
$setObjectProperty[userData;lastPurchase;0]
$setObjectProperty[userData;amount;$math[$getObjectProperty[userData;amount]-$get[amount]]]

$interactionReply[$nonEscape[**$emoji[success] | $userDisplayName**, $language[tr:Başarıyla $emoji[cash] **$numberSeparator[$math[$getObjectProperty[coinData;currentValue]*$get[amount]]]** değerinde **$numberSeparator[$get[amount]]** adet $emoji[$get[coinName]] **$toLocaleUpperCase[$get[coinName]]** sattın!;en:You successfully sold $emoji[cash] **$numberSeparator[$math[$getObjectProperty[coinData;currentValue]*$get[amount]]]** worth **$numberSeparator[$get[amount]]** $emoji[$get[coinName]] **$toLocaleUpperCase[$get[coinName]]**!;de:Du hast erfolgreich **$numberSeparator[$get[amount]]** Stück $emoji[$get[coinName]] **$toLocaleUpperCase[$get[coinName]]** im Wert von $emoji[cash] **$numberSeparator[$math[$getObjectProperty[coinData;currentValue]*$get[amount]]]** verkauft!]]]

$onlyif[$getObjectProperty[btcUserData;amount]>0;**$nonEscape[$emoji[error] | $userDisplayName**, $language[tr:Satmak için **$numberSeparator[$get[amount]]** adet $emoji[$get[coinName]] **$toLocaleUpperCase[$get[coinName]]** \`\($toUpperCase[$get[coinName]]\)\` bulunmuyor!;You don't have **$numberSeparator[$get[amount]]** $emoji[$get[coinName]] **$toLocaleUpperCase[$get[coinName]]** \`\($toUpperCase[$get[coinName]]\)\` to sell!;de:Du hast nicht genug $emoji[$get[coinName]] **$toLocaleUpperCase[$get[coinName]]** \`\($toUpperCase[$get[coinName]]\)\`, um **$numberSeparator[$get[amount]]** Stück zu verkaufen!] {ephemeral} {interaction}]

$createObject[coinData;$getVar[$get[coinCode]_coin;important]]
$createObject[userData;$getGlobalUserVar[$get[coinName];$authorid]]

$let[coinName;$advancedReplaceText[$get[coinCode];btc;bitcoin;eth;ethereum;bnb;binance;sol;solana;tet;tether]]
$let[coinCode;$advancedTextSplit[$interactionData[customId];_;2]]

$let[amount;$if[$textInputValue[amount]==;1;$truncate[$textInputValue[amount]]]]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==coinSatModal;]
    `
  },
  {
  //name: "coinKullanıcıBilgi"
    type: "interaction",
    prototype: "selectMenu",
    code: `
$interactionUpdate[
  {newEmbed:
    {author:$userDisplayName | $language[tr:Borsa Bilgi;en:Stock Market Information;de:Börseninformation]:$userAvatar[$authorID]}
    {color:$getVar[embedcolor]}
    {thumbnail:$emojiURL[$emojiID[$toLowercase[$get[coinName]]]]}
    {footer:$language[tr:Coin satmak için butonları kullan!;en:Use buttons to sell coins!;de:Verwende die Buttons, um Coins zu verkaufen!]}
    {field:💳 $language[tr:Bulunan Miktar;en:Available Amount;de:Verfügbare Menge:]:$emoji[blank]$emoji[reply] $numberSeparator[$getObjectProperty[coinUserData;amount]]:true}
    {field:⏱️ $language[tr:Son Satın Alınma Tarihi;en:Last Purchase Date;de:Letztes Kaufdatum:]:$emoji[blank]$emoji[reply] $if[$getObjectProperty[coinUserData;lastPurchaseDate]==0;Yok;<t#COLON#$truncate[$divide[$getObjectProperty[coinUserData;lastPurchaseDate];1000]]#COLON#f>]:true}
    {field:💸 $language[tr:Son Satın Alınma Fiyatı;en:Last Purchase Price;de:Letzter Kaufpreis:]:$emoji[blank]$emoji[reply] $emoji[cash] $numberSeparator[$getObjectProperty[coinUserData;lastPurchase]]:true}
    {field:💵 $language[tr:Şu Anki Değeri;en:Current Value;de:Aktueller Wert:]:$emoji[blank]$emoji[reply] $emoji[cash] $numberSeparator[$getObjectProperty[coinData;currentValue]]:true}
    {field:💰 $language[tr:Toplam Değer;en:Total Value;de:Gesamtwert:]:$emoji[blank]$emoji[reply] $emoji[cash] $numberSeparator[$math[$getObjectProperty[coinUserData;amount]*$getObjectProperty[coinData;currentValue]]]:true}
  }
  {actionRow:
    {selectMenu:coinKullanıcıBilgi_$authorid:$language[tr:Ayrıntılı bilgi için tıkla!;en:Click here for details!;de:Klicke hier für detaillierte Informationen!]:1:1:false:
      {stringInput:Bitcoin:btc-Bitcoin::$if[$interactionData[values[0]]==btc-Bitcoin;true;false]:$emoji[bitcoin]}
      {stringInput:Ethereum:eth-Ethereum::$if[$interactionData[values[0]]==eth-Ethereum;true;false]:$emoji[ethereum]}
      {stringInput:Binance:bnb-Binance::$if[$interactionData[values[0]]==bnb-Binance;true;false]:$emoji[binance]}
      {stringInput:Solana:sol-Solana::$if[$interactionData[values[0]]==sol-Solana;true;false]:$emoji[solana]}
      {stringInput:Tether:tet-Tether::$if[$interactionData[values[0]]==tet-Tether;true;false]:$emoji[tether]}
    }
  }
  {actionRow:
    {selectMenu:coinSat_$authorid:$language[tr:Coin satmak için tıkla!;en:Click here for sell coins!;de:Klicke hier um Coins zu verkaufen!]:1:1:false:
      {stringInput:Bitcoin:btc-Bitcoin::false:$emoji[bitcoin]}
      {stringInput:Ethereum:eth-Ethereum::false:$emoji[ethereum]}
      {stringInput:Binance:bnb-Binance::false:$emoji[binance]}
      {stringInput:Solana:sol-Solana::false:$emoji[solana]}
      {stringInput:Tether:tet-Tether::false:$emoji[tether]}
    }
  }
  {actionRow:
    {button::danger:coinUserAnaSayfa_$authorid:false:$emojiID[buttonBack]}
  }
]

$createObject[coinData;$getVar[$get[coinCode]_coin;important]]
$createObject[coinUserData;$getGlobalUserVar[$toLowercase[$get[coinName]];$authorid]]

$let[coinName;$advancedTextSplit[$interactionData[values[0]];-;2]]
$let[coinCode;$advancedTextSplit[$interactionData[values[0]];-;1]]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$authorid;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu menüyü kullanamazsın!;en:You can't use this menu!;de:Du kannst diese Menü nicht verwenden!]] {ephemeral} {interaction}]
$onlyif[$advancedTextSplit[$interactionData[customId];_;1]==coinKullanıcıBilgi;]
    `
  },
  {
  //name: "coinUserAnaSayfa"
    type: "interaction",
    prototype: "button",
    code: `
$interactionUpdate[
  {newEmbed:
    {author:$userDisplayName | $language[tr:Borsa Bilgi;en:Stock Market Information;de:Börseninformation]:$userAvatar[$authorID]}
    {color:$getvar[embedcolor]}
    {thumbnail:https://cdn-icons-png.flaticon.com/512/3310/3310608.png}
    {footer:$language[tr:Coin satmak için butonları kullan!;en:Use the buttons to sell coins!;de:Verwende die Buttons, um Coins zu verkaufen!]}
    {description:$nonEscape[$if[$arrayLength[descList]==0;*$language[tr:Mevcut coinin bulunmuyor. Coin satın almak için **$getGuildVar[prefix;$guildid]borsa** yazabilirsin!;en:There are no coins available. You can type **$getGuildVar[prefix;$guildid]stockmarket** to buy coins!;de:Du hast keine Coins. Um Coins zu kaufen, schreibe **$getGuildVar[prefix;$guildid]stockmarket**!]*;$arrayJoin[descList;
]]]}
  }
  {actionRow:
    {selectMenu:coinKullanıcıBilgi_$authorid:$language[tr:Ayrıntılı bilgi için tıkla!;en:Click here for details!;de:Klicke hier für detaillierte Informationen!]:1:1:false:
      {stringInput:Bitcoin:btc-Bitcoin::false:$emoji[bitcoin]}
      {stringInput:Ethereum:eth-Ethereum::false:$emoji[ethereum]}
      {stringInput:Binance:bnb-Binance::false:$emoji[binance]}
      {stringInput:Solana:sol-Solana::false:$emoji[solana]}
      {stringInput:Tether:tet-Tether::false:$emoji[tether]}
    }
  }
  {actionRow:
    {selectMenu:coinSat_$authorid:$language[tr:Coin satmak için tıkla!;en:Click here for sell coins!;de:Klicke hier um Coins zu verkaufen!]:1:1:false:
      {stringInput:Bitcoin:btc-Bitcoin::false:$emoji[bitcoin]}
      {stringInput:Ethereum:eth-Ethereum::false:$emoji[ethereum]}
      {stringInput:Binance:bnb-Binance::false:$emoji[binance]}
      {stringInput:Solana:sol-Solana::false:$emoji[solana]}
      {stringInput:Tether:tet-Tether::false:$emoji[tether]}
    }
  }
]

$djsEval[
let array = d.data.arrays.descList
array = array.filter(item => item !== "");

d.data.arrays.descList = array;
]
$arrayPush[descList;$if[$getObjectProperty[btc;amount]>0;$emoji[bitcoin] **Bitcoin** \`(BTC)\` - $numberSeparator[$getObjectProperty[btc;amount]]]]
$arrayPush[descList;$if[$getObjectProperty[bnb;amount]>0;$emoji[binance] **Binance** \`(BNB)\` — $numberSeparator[$getObjectProperty[bnb;amount]]]]
$arrayPush[descList;$if[$getObjectProperty[eth;amount]>0;$emoji[ethereum] **Ethereum** \`(ETH)\` — $numberSeparator[$getObjectProperty[eth;amount]]]]
$arrayPush[descList;$if[$getObjectProperty[sol;amount]>0;$emoji[solana] **Solana** \`(SOL)\` — $numberSeparator[$getObjectProperty[sol;amount]]]]
$arrayPush[descList;$if[$getObjectProperty[tet;amount]>0;$emoji[tether] **Tether** \`(TET)\` — $numberSeparator[$getObjectProperty[tet;amount]]]]
$createArray[descList]

$createObject[btc;$getGlobalUserVar[bitcoin;$authorID]]
$createObject[bnb;$getGlobalUserVar[binance;$authorid]]
$createObject[eth;$getGlobalUserVar[ethereum;$authorid]]
$createObject[sol;$getGlobalUserVar[solana;$authorid]]
$createObject[tet;$getGlobalUserVar[tether;$authorid]]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$authorid;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyif[$advancedTextSplit[$interactionData[customId];_;1]==coinUserAnaSayfa;]
    `
  }
];                 