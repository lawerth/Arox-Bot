module.exports = [
  {
	  name: "maintenance",
	  aliases: ["maint", "bakım", "bakim"],
	  code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Bakım Modu;en:Maintenance Mode;de:Wartungsmodus]:$useravatar[$clientid]}
	  {color:$if[$get[status]==false;$getVar[color_red];$getVar[color_green]]}
	  {thumbnail:$emojiURL[$emojiID[maintenanceThumb]]}
	  {description:$nonEscape[**$emoji[maintenanceMode] |** $if[$get[status]==false;$language[tr:Bakım modu şu anda devre dışı halde.;en:Maintenance mode is currently disabled.;de:Der Wartungsmodus ist derzeit deaktiviert.];$language[tr:Bakım modu şu anda tüm komutlar üzerinde açık halde.;en:Maintenance mode is currently enabled on all commands.;de:Der Wartungsmodus ist derzeit für alle Befehle aktiviert.]\n\n**👮‍♂️ $language[tr:Yetkili:;en:Staff:;de:Berechtigter::]**\n\`\`\`$userDisplayName[$get[staffID]] ($username[$get[staffID]])\`\`\`\n**📋 $language[tr:Bakım sebebi:;en:Maintenance reason:;de:Wartungsgrund:]**\n\`\`\`$get[reason]\`\`\`]]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $userTag[$authorid]:$authorAvatar}
    {timestamp}
  }
  {actionRow:
	  {button:$language[tr:Aç;en:Enable;de:Aktivieren]:success:MaintenanceModeEnableModal:$if[$get[status]==false;false;true]:$emojiID[buttonAccept]}
    {button:$language[tr:Kapat;en:Disable;de:Deaktivieren]:danger:MaintenanceModeDisable:$if[$get[status]==false;true;false]:$emojiID[buttonDecline]}
  }
;true]]

$let[staffID;$if[$getObjectProperty[maintData;staffID]==||$userExists[$getObjectProperty[maintData;staffID]]==false;$clientID;$getObjectProperty[maintData;staffID]]]
$let[reason;$getObjectProperty[maintData;reason]]

$createObject[maintData;$getVar[maintenanceData;important]]
$let[status;$getVar[isMaintenance;important]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  },
  {
	  name: "MaintenanceModeEnableModal",
	  type: "interaction",
	  prototype: "button",
	  code: `
$interactionModal[$userName[$clientid] $language[tr:Bakım Modu;en:Maintenance Mode;de:Wartungsmodus];MaintenanceModeEnable;
	{actionRow:
    {textInput:$language[tr:Bakım Sebebi;en:Maintenance Reason;de:Wartungsgrund:]:1:reason:true:$language[tr:Lütfen bakıma alma nedenini yazın.;en:Please write the reason for maintenance.;de:Bitte geben Sie den Grund für die Wartung an.]:5:500}
  }
]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bunu yapabilmen için **Geliştirici** olman gerekiyor!;en:You need to be a **Developer** to do this!;de:Um dies zu tun, musst du **Entwickler** sein!] {ephemeral} {interaction}]
    `
  },
  {
	  name: "MaintenanceModeDisable",
    type: "interaction",
	  prototype: "button",
    code: `
$editMessage[$messageID;
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Bakım Modu;en:Maintenance Mode;de:Wartungsmodus]:$useravatar[$clientid]}
	  {color:$if[$get[status]==false;$getVar[color_red];$getVar[color_green]]}
	  {thumbnail:$emojiURL[$emojiID[maintenanceThumb]]}
	  {description:$nonEscape[**$emoji[maintenanceMode] |** $if[$get[status]==false;$language[tr:Bakım modu şu anda devre dışı halde.;en:Maintenance mode is currently disabled.;de:Der Wartungsmodus ist derzeit deaktiviert.];$language[tr:Bakım modu şu anda tüm komutlar üzerinde açık halde.;en:Maintenance mode is currently enabled on all commands.;de:Der Wartungsmodus ist derzeit für alle Befehle aktiviert.]\n\n**👮‍♂️ $language[tr:Yetkili:;en:Staff:;de:Berechtigter::]**\n\`\`\`$userDisplayName[$get[staffID]] ($username[$get[staffID]])\`\`\`\n**📋 $language[tr:Bakım sebebi:;en:Maintenance reason:;de:Wartungsgrund:]**\n\`\`\`$get[reason]\`\`\`]]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $userTag[$authorid]:$authorAvatar}
    {timestamp}
  }
  {actionRow:
	  {button:$language[tr:Aç;en:Enable;de:Aktivieren]:success:MaintenanceModeEnableModal:$if[$get[status]==false;false;true]:$emojiID[buttonAccept]}
    {button:$language[tr:Kapat;en:Disable;de:Deaktivieren]:danger:MaintenanceModeDisable:$if[$get[status]==false;true;false]:$emojiID[buttonDecline]}
  }
]

$let[staffID;$if[$getObjectProperty[maintData;staffID]==||$userExists[$getObjectProperty[maintData;staffID]]==false;$clientID;$getObjectProperty[maintData;staffID]]]
$let[reason;$getObjectProperty[maintData;reason]]

$createObject[maintData;$getVar[maintenanceData;important]]
$let[status;$getVar[isMaintenance;important]]

$setVar[isMaintenance;false;important]
$setVar[maintenanceData;{};important]

$interactionReply[$nonEscape[**$emoji[success] | $userDisplayName**, $language[tr:Başarıyla bakım modu **devre dışı** hale getirildi.;en:Maintenance mode has been successfully **disabled**.;de:Der Wartungsmodus wurde erfolgreich **deaktiviert**.]];everyone;true]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bunu yapabilmen için **Geliştirici** olman gerekiyor!;en:You need to be a **Developer** to do this!;de:Um dies zu tun, musst du **Entwickler** sein!] {ephemeral} {interaction}]
	  `
  }, 
  {
    name: "MaintenanceModeEnable",
    type: "interaction",
    prototype: "modal",
    code: `
$editMessage[$messageID;
  {newEmbed:
    {author:$username[$clientid] | $language[tr:Bakım Modu;en:Maintenance Mode;de:Wartungsmodus]:$useravatar[$clientid]}
	  {color:$if[$get[status]==false;$getVar[color_red];$getVar[color_green]]}
	  {thumbnail:$emojiURL[$emojiID[maintenanceThumb]]}
	  {description:$nonEscape[**$emoji[maintenanceMode] |** $if[$get[status]==false;$language[tr:Bakım modu şu anda devre dışı halde.;en:Maintenance mode is currently disabled.;de:Der Wartungsmodus ist derzeit deaktiviert.];$language[tr:Bakım modu şu anda tüm komutlar üzerinde açık halde.;en:Maintenance mode is currently enabled on all commands.;de:Der Wartungsmodus ist derzeit für alle Befehle aktiviert.]\n\n**👮‍♂️ $language[tr:Yetkili:;en:Staff:;de:Berechtigter::]**\n\`\`\`$userDisplayName[$get[staffID]] ($username[$get[staffID]])\`\`\`\n**📋 $language[tr:Bakım sebebi:;en:Maintenance reason:;de:Wartungsgrund:]**\n\`\`\`$get[reason]\`\`\`]]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $userTag[$authorid]:$authorAvatar}
    {timestamp}
  }
  {actionRow:
	  {button:$language[tr:Aç;en:Enable;de:Aktivieren]:success:MaintenanceModeEnableModal:$if[$get[status]==false;false;true]:$emojiID[buttonAccept]}
    {button:$language[tr:Kapat;en:Disable;de:Deaktivieren]:danger:MaintenanceModeDisable:$if[$get[status]==false;true;false]:$emojiID[buttonDecline]}
  }
]

$let[staffID;$if[$getObjectProperty[maintData;staffID]==||$userExists[$getObjectProperty[maintData;staffID]]==false;$clientID;$getObjectProperty[maintData;staffID]]]
$let[reason;$getObjectProperty[maintData;reason]]

$createObject[maintData;$getVar[maintenanceData;important]]
$let[status;$getVar[isMaintenance;important]]

$interactionReply[$nonEscape[**$emoji[success] | $userDisplayName**, $language[tr:Başarıyla bakım modu **etkin** hale getirildi.;en:Maintenance mode has been successfully **enabled**.;de:Der Wartungsmodus wurde erfolgreich **aktiviert**.]];everyone;true]

$setVar[isMaintenance;true;important]
$setVar[maintenanceData;$getObject[maintData];important]

$createObject[maintData;{
  "reason": "$textInputValue[reason]",
  "staffID": "$authorID"
}]

$let[reason;$textInputValue[reason]]
	  `
  }
];