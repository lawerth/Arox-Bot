module.exports = [
  {
    name: "channelDisableControl",
    type: "awaited",
    code: `$sendMessage[$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu komut bu kanalda devre dışı bırakıldı!;en:This command is disabled on this channel!;de:Dieser Befehl wurde in diesem Kanal deaktiviert!]] {deleteIn:5s}]`
  }
];