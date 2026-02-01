module.exports = [
  {
    name: "stockmarket",
    aliases: ["stocks", "stockexchange", "stockexchange", "exchange", "borsa"],
    desc: ["You can view the coins on the exchange.", "Borsadaki coinlere bakarsın.", "Sie können die Münzen an der Börse sehen."],
    code: ` 
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$username[$clientID] | $language[en:Current Stock Market;tr:Güncel Borsa Piyasası;de:Aktueller Börsenmarkt]:$userAvatar[$clientID]}
    {footer:$language[tr:Fiyatlar gerçek zamanlı güncellenmez. Güncel fiyatlar için aşağıdaki butonu kullanın!;en:Prices are not updated in real time. Use the button below for current prices!;de:Die Preise werden nicht in Echtzeit aktualisiert. Für aktuelle Preise verwenden Sie den untenstehenden Button!]:$emojiURL[$emojiID[footerWarning]]}
    {timestamp}
    {color:$getVar[embedcolor]}
    {thumbnail:https#COLON#//cdn-icons-png.flaticon.com/512/3310/3310608.png}
    {description:**\[\`$getGuildVar[prefix]$commandInfo[buy;usage]\`\]($botLink[support])** - $commandInfo[buy;desc[$language[tr:0;en:1;de:2]]]
**\[\`$getGuildVar[prefix]$commandInfo[sell;usage]\`\]($botLink[support])** - $commandInfo[sell;desc[$language[tr:0;en:1;de:2]]]

> $emoji[bitcoin] **Bitcoin** \`\(BTC\)\`: $emoji[cash] **$numberSeparator[$getVar[btc_value]]**
> $emoji[ethereum] **Ethereum** \`\(ETH\)\`: $emoji[cash] **$numberSeparator[$getVar[eth_value]]**
> $emoji[binance] **Binance** \`\(BNB\)\`: $emoji[cash] **$numberSeparator[$getVar[bnb_value]]**
> $emoji[solana] **Solana** \`\(SOL\)\`: $emoji[cash] **$numberSeparator[$getVar[sol_value]]**
> $emoji[tether] **Tether** \`\(TET\)\`: $emoji[cash] **$numberSeparator[$getVar[tet_value]]**}
  }
  {actionRow:
    {selectMenu:coinInfo_$authorid:$language[tr:Ayrıntılı bilgi için tıkla!;en:Click here for details!;de:Klicke hier für weitere Informationen!]:1:1:false:
      {stringInput:Bitcoin:btc-Bitcoin::false:$emoji[bitcoin]}
      {stringInput:Ethereum:eth-Ethereum::false:$emoji[ethereum]}
      {stringInput:Binance:bnb-Binance::false:$emoji[binance]}
      {stringInput:Solana:sol-Solana::false:$emoji[solana]}
      {stringInput:Tether:tet-Tether::false:$emoji[tether]}
    }
  }
  {actionRow:
    {button:$language[tr:Fiyatları Güncelle;en:Update Prices;de:Preise Aktualisieren]:primary:refreshStockMarket_$authorid:false:$emojiID[buttonReload]}
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
  //name: "coinInfo", //      It was left unfinished from this point onwards!!!!!
	  type: "interaction",
	  prototype: "selectMenu",
	  code: `
$interactionUpdate[
  {newEmbed:
	  {author:$get[coinName] \($toUpperCase[$get[coinCode]]\):$emojiURL[$emojiID[$toLowercase[$get[coinName]]]]}
		{color:$getVar[embedcolor]}
		{footer:$username[$authorid]:$authorAvatar}
    {timestamp}
    {description:*$language[tr:Bu coinle alakalı verilere aşağıdan göz atabilirsin. Bu veriler rastgele sürelerle değişiklik gösterebilir.;en:You can take a look at the data about this coin below. This data may change at random times.;de:Du kannst die Daten zu dieser Coin unten einsehen. Diese Daten können sich in zufälligen Intervallen ändern.]*}
		{field:🪙 $language[tr:Mevcut Fiyat;en:Current Price;de:Aktueller Preis]:$emoji[blank]$emoji[reply] $emoji[cash] $numberSeparator[$getVar[$get[coinCode]_value]]:true}
		{field:📤 $language[tr:Çıkış Fiyatı;en:Launch Price;de:Eröffnungs Preis]:$emoji[blank]$emoji[reply] $emoji[cash] bilmemki:true}
		{field:📈 $language[tr:En Yüksek Fiyat;en:Highest Price;de:Höchster Preis]:$emoji[blank]$emoji[reply] $emoji[cash] $numberSeparator[$getObjectProperty[coin_data;highestValue]]:true}
		{field:📉 $language[tr:En Düşük Fiyat;en:Lowest Price;de:Niedrigster Preis]:$emoji[blank]$emoji[reply] $emoji[cash] $numberSeparator[$getObjectProperty[coin_data;lowestValue]]:true}
    {image:$get[chart]}
  }
  {actionRow:
    {selectMenu:coinInfo_$authorid:$language[tr:Ayrıntılı bilgi için tıkla!;en:Click here for details!;de:Klicke hier für weitere Informationen!]:1:1:false:
      {stringInput:Bitcoin:btc-Bitcoin::$if[$interactionData[values[0]]==btc-Bitcoin;true;false]:$emoji[bitcoin]}
      {stringInput:Ethereum:eth-Ethereum::$if[$interactionData[values[0]]==eth-Ethereum;true;false]:$emoji[ethereum]}
      {stringInput:Binance:bnb-Binance::$if[$interactionData[values[0]]==bnb-Binance;true;false]:$emoji[binance]}
      {stringInput:Solana:sol-Solana::$if[$interactionData[values[0]]==sol-Solana;true;false]:$emoji[solana]}
      {stringInput:Tether:tet-Tether::$if[$interactionData[values[0]]==tet-Tether;true;false]:$emoji[tether]}
    }
  }
  {actionRow:
    {button::danger:stockMarketMainPage_$authorid:false:$emojiID[buttonBack]}
    {button:$language[tr:Bilgileri Güncelle;en:Update Informations;de:Informationen Aktualisieren]:primary:refreshCoinInfo_$get[coinCode]-$get[coinName]_$authorid:false:$emojiID[buttonReload]}
  }
]

$let[chart;$nonEscape[https://quickchart.io/chart?c=$uri[{
  "type": "line",
  "data": {
    "labels": $getObjectProperty[coin_data;lastDates], 
    "datasets": [
      {
        "label": "$get[coinName]", 
        "borderColor": "$getVar[$if[$get[coinCode]==tet;color_cyan;$if[$get[coinCode]==sol;color_black;$if[$get[coinCode]==bnb;color_yellow;$if[$get[coinCode]==eth;color_blue;$if[$get[coinCode]==btc;color_orange;embedcolor]]]]]]",
        "borderWidth": 2, 
        "fill": false,
        "data": $getObjectProperty[coin_data;lastValues], 
        "tension": 0
      }
    ]
  },
  "options": {
    "responsive": true,
    "title": {
      "display": true,
      "text": "$get[coinName] $language[tr:Değer Değişim Grafiği;en:Value Change Chart;de:Wertänderungsdiagramm]"
    }, 
    "scales": {
      "y": {
        "beginAtZero": false
      }
    }
  }
}]]]

$createObject[coin_data;$getVar[$get[coinCode]_data]]

$let[coinName;$advancedTextSplit[$interactionData[values[0]];-;2]]
$let[coinCode;$advancedTextSplit[$interactionData[values[0]];-;1]]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$authorid;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu menüyü kullanamazsın!;en:You can't use this menu!;de:Du kannst diese Menü nicht verwenden!]] {ephemeral} {interaction}]
$onlyif[$advancedTextSplit[$interactionData[customId];_;1]==coinInfo;]
	  ` 
  },
  {
  //name: "coinAnaSayfa"
    type: "interaction",
	  prototype: "button",
	  code: `
$interactionUpdate[
  {newEmbed:
    {author:$username[$clientID] | $language[en:Current Stock Market;tr:Güncel Borsa Piyasası;de:Aktueller Börsenmarkt]:$userAvatar[$clientID]}
    {footer:$language[tr:Coin satın almak için butonları kullan!;en:Use the buttons to buy coins!;de:Verwende die Buttons, um Coins zu kaufen!]}
    {color:$getVar[embedcolor]}
    {thumbnail:https#COLON#//cdn-icons-png.flaticon.com/512/3310/3310608.png}
    {description:$nonEscape[$language[tr:Borsa güncellendiğinde anında haberdar olmak için [destek sunucumuza]($botLink[support]) katılabilirsin!;en:You can join to our [support server]($botLink[support]) to be notified instantly when the exchange is updated!;de:Tritt unserem [Support Server]($botLink[support]) bei, um sofort benachrichtigt zu werden, wenn sich der Markt aktualisiert!]\n
**$emoji[bitcoin] Bitcoin** \`\(BTC\)\` : $emoji[cash] $numberSeparator[$getObjectProperty[bitcoinData;currentValue]]
**$emoji[ethereum] Ethereum** \`\(ETH\)\` : $emoji[cash] $numberSeparator[$getObjectProperty[ethereumData;currentValue]]
**$emoji[binance] Binance** \`\(BNB\)\` : $emoji[cash] $numberSeparator[$getObjectProperty[binanceData;currentValue]]
**$emoji[solana] Solana** \`\(SOL\)\` : $emoji[cash] $numberSeparator[$getObjectProperty[solanaData;currentValue]]
**$emoji[tether] Tether** \`\(TET\)\` : $emoji[cash] $numberSeparator[$getObjectProperty[tetherData;currentValue]]]}
  }
  {actionRow:
    {selectMenu:coinBilgi_$authorid:$get[dinf]:1:1:false:
      {stringInput:Bitcoin:btc-Bitcoin::false:$emoji[bitcoin]}
      {stringInput:Ethereum:eth-Ethereum::false:$emoji[ethereum]}
      {stringInput:Binance:bnb-Binance::false:$emoji[binance]}
      {stringInput:Solana:sol-Solana::false:$emoji[solana]}
      {stringInput:Tether:tet-Tether::false:$emoji[tether]}
    }
  }
  {actionRow:
    {selectMenu:coinAl_$authorid:$get[sinf]:1:1:false:
      {stringInput:Bitcoin:btc-Bitcoin:$get[sinf]:false:$emoji[bitcoin]}
      {stringInput:Ethereum:eth-Ethereum:$get[sinf]:false:$emoji[ethereum]}
      {stringInput:Binance:bnb-Binance:$get[sinf]:false:$emoji[binance]}
      {stringInput:Solana:sol-Solana:$get[sinf]:false:$emoji[solana]}
      {stringInput:Tether:tet-Tether:$get[sinf]:false:$emoji[tether]}
    }
  }
]

$let[inf;$language[tr:Daha ayrıntılı bilgi için tıkla!;en:Click here for more details!;de:Klicke hier für detailliertere Informationen!]]
$let[dinf;$language[tr:Ayrıntılı bilgi için tıkla!;en:Click here for details!;de:Klicke hier für weitere Informationen!]]
$let[sinf;$language[tr:Satın almak için tıkla!;en:Click here for buy coins!;de:Klicke hier, um zu kaufen!]]

$createObject[bitcoinData;$getVar[btc_coin;important]]
$createObject[binanceData;$getVar[bnb_coin;important]]
$createObject[ethereumData;$getVar[eth_coin;important]]
$createObject[solanaData;$getVar[sol_coin;important]]
$createObject[tetherData;$getVar[tet_coin;important]]
	
$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$authorid;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyif[$advancedTextSplit[$interactionData[customId];_;1]==coinAnaSayfa;]
	  `
  }
];