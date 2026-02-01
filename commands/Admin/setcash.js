module.exports = [
  {
    name: "setcash",
    code: `
$sendMessage[
  {newEmbed:
    {author:$language[tr:$userDisplayName[$get[user]] adlı kullanıcının $get[name] miktarı güncellendi.;$userDisplayName[$get[user]]'s $get[name] amount has been changed.;de:Der $get[name]-Betrag von $userDisplayName[$get[user]] wurde aktualisiert.]:$userAvatar[$get[user]]}
    {color:$if[$get[set]==+;$getVar[color_green];$if[$get[set]==-;$getVar[color_red];$getVar[embedcolor]]]}
    {description:$get[$get[set]Text]}
    {field:$language[tr:Değişim:;en:Change:;de:Veränderung:]:$emoji[dot] $get[emoji] \`$numberSeparator[$get[oldValue]]\` $emoji[rightArrow] $get[emoji] \`$numberSeparator[$getGlobalUserVar[$get[var];$get[user]]]\`}
    {footer:$language[tr:Kullanan:;en:Used by;de:Verwendet von] $username[$authorid]:$authorAvatar}
    {timestamp}
  }
]

$setGlobalUserVar[$get[var];$if[$get[set]==/;$get[newValue];$math[$getGlobalUserVar[$get[var];$get[user]]$get[set]$get[newValue]]];$get[user]]

$let[+Text;$nonEscape[**💰 |** $language[tr:**$userDisplayName[$get[user]]** kullanıcısının $get[emoji] **$get[name]** miktarı **$numberSeparator[$get[newValue]]** artırıldı.;en:**$userDisplayName[$get[user]]**'s $get[emoji] **$get[name]** amount has been increased by **$numberSeparator[$get[newValue]]**.;de:Das $get[emoji] **$get[name]** von **$userDisplayName[$get[user]]** wurde um **$numberSeparator[$get[newValue]]** erhöht]]]
$let[-Text;$nonEscape[**💰 |** $language[tr:**$userDisplayName[$get[user]]** kullanıcısının $get[emoji] **$get[name]** miktarı **$numberSeparator[$get[newValue]]** azaltıldı.;en:**$userDisplayName[$get[user]]**'s $get[emoji] **$get[name]** amount has been decreased by **$numberSeparator[$get[newValue]]**.;de:Das $get[emoji] **$get[name]** von **$userDisplayName[$get[user]]** wurde um **$numberSeparator[$get[newValue]]** verringert.]]]
$let[/Text;$nonEscape[**💰 |** $language[tr:**$userDisplayName[$get[user]]** kullanıcısının $get[emoji] **$get[name]** miktarı **$numberSeparator[$get[newValue]]** olarak ayarlandı.;en:**$userDisplayName[$get[user]]**'s $get[emoji] **$get[name]** amount has been set to **$numberSeparator[$get[newValue]]**.;de:Das $get[emoji] **$get[name]** von **$userDisplayName[$get[user]]** wurde auf **$numberSeparator[$get[newValue]]** eingestellt.]]]

$let[newValue;$filterMessage[$noMentionMessage[1];+;-]]
$let[oldValue;$getGlobalUserVar[$get[var];$get[user]]]

$let[set;$if[$stringStartsWith[$noMentionMessage[1];+]==true;+;$if[$stringStartsWith[$noMentionMessage[1];-]==true;-;/]]]
$let[var;cash]
$let[emoji;$emoji[cash]]
$let[name;Arox Cash]
$let[user;$mentioned[1;true]]

$onlyif[$checkContains[$cropText[$noMentionMessage[1];1];+;-]==true&&$isInteger[$cropText[$noMentionMessage[1];$charCount[$noMentionMessage[1]];1]]==true||$isInteger[$noMentionMessage[1]]==true;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir sayı girin ve tekrar deneyin!;en:Please enter a valid number and try again!;de:Bitte geben Sie eine gültige Zahl ein und versuchen Sie es erneut!]] {deleteIn:5s}]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
  `
  }
];