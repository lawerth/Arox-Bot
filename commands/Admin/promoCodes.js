module.exports = [
  {
    name: "promocodes",
    aliases: ["promotioncodes", "promotions"],
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
	  {author:$language[tr:Promosyon Kodu Oluştur;en:Create Promotion Code;de:Promo-Code Erstellen]:$userAvatar[$clientid]}
	  {color:$getVar[embedcolor]}
	  {footer:@$username:$authorAvatar}
	  {timestamp}
	  {description:$nonEscape[
**👋 $language[tr:Merhaba, $userDisplayName**! Promosyon kodu oluşturmak için aşağıdaki butona tıklayıp çıkan seçenekleri doldurmalısın.;en:Hello, $userDisplayName**! To create a promotion code, you must click the button below and fill in the options.;de:Hallo, $userDisplayName**! Um einen Promo-Code zu erstellen, klicke auf die Schaltfläche unten und fülle die angezeigten Optionen aus.]
⚠️ *$language[tr:Kodu oluştururken girdiğin emojiyi, hangi değişken üzerinde kullanılıyorsa onu gir. Seçenekleri birbirinden bağımsız olarak doldurma!;en:Enter the emoji you entered when creating the code, on whichever variable it is used. Filling in the options independently of each other!;de:Gib den Emoji ein, den du beim Erstellen des Codes eingegeben hast, und gib ihn auf der entsprechenden Variablen an. Fülle die Optionen nicht unabhängig voneinander aus!]*

**📝 $language[tr:Mevcut Promosyon Kodları:;en:Available Promotion Codes:;de:Aktuelle Promo-Codes:]**
$if[$getObjectKeys[promoCodes]==;- 🚫 *$language[tr:Promosyon kodu yok.;en:No promotion code.;de:Kein Promo-Code.]*;$djsEval[Object.keys($getVar[promoCodes]).join(', ');true]]
    ]}
  }
  {actionRow:
	  {button:$language[tr:Promosyon Kodu Oluştur;en:Create Promotion Code;de:Promo-Code Erstellen]:primary:promoCodeCreate_$authorid:false:$emojiID[buttonPlus]}
  }
;true]]

$createObject[promoCodes;$getVar[promoCodes]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
	  `
  },
  {
  //name: "promoCodeCreate",
    type: "interaction",
    prototype: "button",
    code: `
$interactionModal[$language[tr:Promosyon Kodu Oluştur;en:Create Promotion Code;de:Promo-Code Erstellen];promoCodeCreateModal;
  {actionRow:
    {textInput:$language[tr:Ödül Emojisi ve Miktarı;en:Reward Emoji and Amount;de:Belohnungs-Emoji und Menge]:1:rewardEmojiAndAmount:true:$language[tr:Emoji ve miktar arasına 1 boşluk bırakın.;en:Leave 1 space between emoji and amount.;de:Lassen Sie zwischen dem Emoji und der Menge ein Leerzeichen.] \(🪙 10000\):1:50}
  }
  {actionRow:
    {textInput:$language[tr:Ödül Değişkeni;en:Reward Variable;de:Belohnung Variable]:1:rewardVariable:true:$language[tr:Ödülün değişken ismini girin.;en:Enter the variable name of the reward.;de:Gib den Namen der Belohnungsvariablen ein.]:1:50}
  }
  {actionRow:
    {textInput:$language[tr:Kod Süresi;en:Code Duration;de:Code Gültigkeit]:1:codeDuration:true:$language[tr:Kodun süresini girin.;en:Enter code duration.;de:Geben Sie die Gültigkeitsdauer des Codes ein.] (72h, 3d):1:50}
  }
  {actionRow:
    {textInput:$language[tr:Kod Adı;en:Code Name;de:Code Name]:1:codeName:false:$language[tr:Kod adını girin. (Rastgele için boş bırakın.);en:Enter code name. (Leave blank for random);de:Gib den Code-Namen ein. (Lass es leer für zufällig.)]:1:50}
  }
  {actionRow:
    {textInput:$language[tr:Maksimum Kullanım;en:Maximum Usage;de:Maximale Nutzung]:1:codeMaxUses:false:$language[tr:Kodu en fazla kaç kişi kullanacak?;en:How many people will use the code at most?;de:Wie viele Personen können den Code maximal verwenden?]:1:50}
  }
]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];$nonescape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==promoCodeCreate;]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  },
  {
    name: "promoCodeCreateModal",
    type: "interaction",
    prototype: "modal",
    code: `
$setTimeout[promoCodeTimeout;$get[codeDuration];{"authorID": "$authorID", "codeName": "$get[codeName]"};false]

$editMessage[$messageID;
  {newEmbed:
	  {author:$language[tr:Promosyon Kodu Oluştur;en:Create Promotion Code;de:Promo-Code Erstellen]:$userAvatar[$clientid]}
	  {color:$getVar[embedcolor]}
	  {footer:@$username:$authorAvatar}
	  {timestamp}
	  {description:$nonEscape[
**👋 $language[tr:Merhaba, $userDisplayName**! Promosyon kodu oluşturmak için aşağıdaki butona tıklayıp çıkan seçenekleri doldurmalısın.;en:Hello, $userDisplayName**! To create a promotion code, you must click the button below and fill in the options.;de:Hallo, $userDisplayName**! Um einen Promo-Code zu erstellen, klicke auf die Schaltfläche unten und fülle die angezeigten Optionen aus.]
⚠️ *$language[tr:Kodu oluştururken girdiğin emojiyi, hangi değişken üzerinde kullanılıyorsa onu gir. Seçenekleri birbirinden bağımsız olarak doldurma!;en:Enter the emoji you entered when creating the code, on whichever variable it is used. Filling in the options independently of each other!;de:Gib den Emoji ein, den du beim Erstellen des Codes eingegeben hast, und gib ihn auf der entsprechenden Variablen an. Fülle die Optionen nicht unabhängig voneinander aus!]*

**📝 $language[tr:Mevcut Promosyon Kodları:;en:Available Promotion Codes:;de:Aktuelle Promo-Codes:]**
$if[$getObjectKeys[promoCodes]==;- 🚫 *$language[tr:Promosyon kodu yok.;en:No promotion code.;de:Kein Promo-Code.]*;$djsEval[Object.keys($getVar[promoCodes]).join(', ');true]]
    ]}
  }
  {actionRow:
	  {button:$language[tr:Promosyon Kodu Oluştur;en:Create Promotion Code;de:Promo-Code Erstellen]:primary:promoCodeCreate_$authorid:false:$emojiID[buttonPlus]}
  }
] 

$setVar[promoCodes;$getObject[promoCodes]]

$setObjectProperty[promoCodes;$get[codeName];{
  "authorID": "$authorID",
  "name": "$get[codeName]",
  "emoji": "$get[rewardEmoji]",
  "variable": "$get[rewardVariable]",
  "amount": "$get[rewardAmount]",
  "duration": "$get[codeDuration]",
  "durationUnix": "$get[codeDurationUnix]",
  "uses": "0",
  "maxUses": "$get[codeMaxUses]"
}]

$interactionReply[
  {newEmbed:
	  {author:$language[tr:Promosyon Kodu Oluşturuldu;en:Promotion Code Created;de:Promo-Code Wurde Erstellt]:$userAvatar[$clientid]}
	  {color:$getVar[color_green]}
    {footer:$language[tr:Oluşturan:;en:Created by;de:Erstellt von] $username[$authorid]:$authorAvatar}
	  {timestamp}
	  {description:$nonEscape[
⟶ \`🌐 $language[tr:Kod Adı;en:Code Name;de:Code-Name]:\` $get[codeName]
⟶ \`🎁 $language[tr:Ödül;en:Reward;de:Belohnung]:\` $get[rewardEmoji] $numberSeparator[$get[rewardAmount]]
⟶ \`📊 $language[tr:Değişken;en:Variable;de:Variable]:\` $get[rewardVariable]
⟶ \`⏱️ $language[tr:Süre;en:Duration;de:Dauer]:\` <t:$get[codeDurationUnix]:f> (<t:$get[codeDurationUnix]:R>)
⟶ \`✨️ $language[tr:Max Kullanım;en:Max Usage;de:Maximale Nutzung]:\` $replaceText[$get[codeMaxUses];∞;$language[tr:Sınırsız;en:Unlimited;de:Unbegrenzt]]
    ]}
  }
;everyone;true;false]

$channelSendMessage[$customChannelID[promoCodesLog];
  {newEmbed:
    {author:Promotion Code Created:$userAvatar[$clientid]}
	  {color:$getVar[color_green]}
    {footer:Created by $username[$authorid]:$authorAvatar}
	  {timestamp}
	  {description:$nonEscape[
⟶ \`🌐 Code Name:\` $get[codeName]
⟶ \`🎁 Reward:\` $get[rewardEmoji] $numberSeparator[$get[rewardAmount]]
⟶ \`📊 Variable:\` $get[rewardVariable]
⟶ \`⏱️ Duration:\` <t:$get[codeDurationUnix]:f> (<t:$get[codeDurationUnix]:R>)
⟶ \`✨️ Max Usage:\` $replaceText[$get[codeMaxUses];∞;Unlimited]
⟶ \`👤 Creator:\` $userDisplayName ($username)
    ]}
  }
]

$onlyif[$isNumber[$get[codeMaxUses]]==true&&$get[codeMaxUses]>0||$get[codeMaxUses]==∞;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir kullanım sayısı girin!;en:Please enter a valid number of uses!;de:Bitte gib eine gültige Nutzungsanzahl ein!]] {interaction} {ephemeral}]
$onlyif[$checkContains[$getObjectKeys[promoCodes;,];$get[codeName]]==false;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu kod adı zaten mevcut!;en:This code name already exists!;de:Dieser Code-Name existiert bereits!]] {interaction} {ephemeral}]
$onlyif[$parseTime[$get[codeDuration]]<=1814400000;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Kod süresi 21 günden fazla olamaz!;en:Code duration cannot exceed 21 days!;de:Die Gültigkeit des Codes darf 21 Tage nicht überschreiten!]] {interaction} {ephemeral}]
$onlyif[$parseTime[$get[codeDuration]]!=-1;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir süre girin!;en:Please enter a valid duration!;de:Bitte geben Sie eine gültige Dauer ein!] **\($language[tr:En Fazla 21 Gün;en:Max 21 Days;de:Maximal 21 Tage]\)** \`s, m, h, d\`] {interaction} {ephemeral}]
$onlyif[$isNumber[$get[rewardAmount]]==true;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir miktar girin!;en:Please enter a valid amount!;de:Bitte geben Sie einen gültigen Betrag ein!]] {interaction} {ephemeral}]
$onlyif[$isVariableExist[$get[rewardVariable]]==true;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir değişken girin!;en:Please enter a valid variable!;de:Bitte geben Sie eine gültige Variable ein!]] {interaction} {ephemeral}]
$onlyif[$checkContains[$nonEscape[$get[rewardEmoji]];:;<;>]==true;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir emoji girin!;en:Please enter a valid emoji!;de:Bitte geben Sie ein gültiges Emoji ein!]] {interaction} {ephemeral}]

$createObject[promoCodes;$getVar[promoCodes]]

$let[codeMaxUses;$if[$textInputValue[codeMaxUses]==;∞;$textInputValue[codeMaxUses]]]
$let[codeName;$if[$textInputValue[codeName]==;$toUpperCase[$randomString[$random[5;6;6]]];$toUpperCase[$textInputValue[codeName]]]]
$let[codeDurationUnix;$sum[$truncate[$divide[$datestamp;1000]];$divide[$parseTime[$get[codeDuration]];1000]]]
$let[codeDuration;$textInputValue[codeDuration]]
$let[rewardVariable;$textInputValue[rewardVariable]]
$let[rewardAmount;$advancedTextSplit[$textInputValue[rewardEmojiAndAmount]; ;2]]
$let[rewardEmoji;$advancedTextSplit[$textInputValue[rewardEmojiAndAmount]; ;1]]

$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!] {ephemeral} {interaction}]
    `
  },
  {
    name: "promoCodeTimeout",
    type: "timeout",
    code: `
$channelSendMessage[$customChannelID[promoCodesLog];$nonEscape[**🔴 |** The promotion code **$timeoutData[codeName]** created by **$userDisplayName[$timeoutData[authorID]]** has expired!];false]

$setVar[promoCodes;$getObject[promoCodes]]
$removeObjectProperty[promoCodes;$timeoutData[codeName]]
$createObject[promoCodes;$getVar[promoCodes]]
    `
  }
];
