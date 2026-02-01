module.exports = [
  {
    name: "reload",
    aliases: ["rl", "reboot", "restart"],
    code: `
$editMessage[$get[messageID];**$emoji[success] |** $language[tr:Komutlar başarıyla yeniden yüklendi!;en:Commands reloaded successfully!;de:Die Befehle wurden erfolgreich neu geladen!]]
$updateCommands
$let[messageID;$sendMessage[**$emoji[loading] |** $language[tr:Komutlar yeniden yükleniyor...;en:Commands are reloading...;de:Die Befehle werden neu geladen...];true]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  }
];