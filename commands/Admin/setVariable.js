module.exports = [
  {
	  name: "setGlobalUserVar",
    aliases: ["sguv"],
	  code: `
$sendMessage[
  {newEmbed:
    {author:$language[tr:Değişken Ayarları Güncellendi;en:Variable Settings Updated;de:Variableneinstellungen Wurden Aktualisiert]:$userAvatar[$get[varuser]]}
    {color:$getvar[embedcolor]}
    {description:$nonEscape[**
$language[tr:Değişken İsmi:;en:Variable Name:;de:Variablenname:] \`$get[varname]\`
$language[tr:Değişken Türü:;en:Variable Type:;de:Variablentyp:] \`globalUser\`
$language[tr:Eski Değeri:;en:Old Value:;de:Alter Wert:] \`$get[oldvalue]\`
$language[tr:Yeni Değeri:;en:New Value:;de:Neuer Wert:] \`$get[newvalue]\`
$language[tr:Kullanıcı:;en:User:;de:Benutzer:] \`$userTag[$get[varuser]]\`
**]}
    {footer:$language[tr:Kullanan:;en:Used by;de:Verwendet von] $userTag[$authorid]:$userAvatar[$authorid]}
    {timestamp}
  }
;false]

$setGlobalUserVar[$get[varname];$get[varvalue];$get[varuser]]
 
$let[oldvalue;$getGlobalUserVar[$get[varname];$get[varuser]]]
$let[newvalue;$if[$get[varvalue]==; ;$get[varvalue]]]
$let[varuser;$mentioned[1]]
$let[varvalue;$textTrim[$replaceText[$noMentionMessage;$NoMentionMessage[1];;1]]]
$let[varname;$noMentionMessage[1]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  }, 
  {
	  name: "setVar",
	  aliases: ["sv"],
	  code: `
$sendMessage[
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Değişken Ayarları Güncellendi;en:Variable Settings Updated;de:Variableneinstellungen Wurden Aktualisiert]:$userAvatar[$clientID]}
    {color:$getvar[embedcolor]}
    {description:$nonEscape[**
$language[tr:Değişken İsmi:;en:Variable Name:;de:Variablenname:] \`$get[varname]\`
$language[tr:Değişken Türü:;en:Variable Type:;de:Variablentyp:] \`globalUser\`
$language[tr:Eski Değeri:;en:Old Value:;de:Alter Wert:] \`$get[oldvalue]\`
$language[tr:Yeni Değeri:;en:New Value:;de:Neuer Wert:] \`$get[newvalue]\`
**]}
    {footer:$language[tr:Kullanan:;en:Used by;de:Verwendet von] $userTag[$authorid]:$userAvatar[$authorid]}
    {timestamp}
  }
;false]

$setVar[$get[varname];$get[varvalue]]
 
$let[oldvalue;$getVar[$get[varname]]
$let[newvalue;$if[$get[varvalue]==; ;$get[varvalue]]]
$let[varvalue;$textTrim[$replaceText[$noMentionMessage;$NoMentionMessage[1];;1]]]
$let[varname;$noMentionMessage[1]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  }
];