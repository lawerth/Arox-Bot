module.exports = [
  {
    name: "admins",
    aliases: ["admin", "developers", "developer", "devs", "dev"],
    code: `
$setTimeout[disableComponents;5m;{"messageID": "$get[messageID]", "channelID": "$channelID"};false]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$username[$clientID] | $language[tr:Yöneticiler;en:Admins;de:Administratoren]:$userAvatar[$clientID]}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $userDisplayName:$authorAvatar}
    {timestamp}
    {description:## 🤖 $language[tr:Bot Yöneticileri;en:Bot Admins;de:Bot-Administratoren]\n$if[$djsEval[$getVar[admins].join(",");true]==;❌ $language[tr:Hiçbir yönetici bulunamadı.;en:No admins found.;de:Keine Administratoren gefunden.];$get[botAdmins]]\n## 🛡️ $language[tr:Takım Üyeleri;en:Team Members;de:Team-Mitglieder]\n$get[teamAdmins]\n> -# $language[tr:Takım üyelerini düzenlemek için [buradaki]($botLink[devTeam]) bağlantıya tıklayın!;en:Click [here]($botLink[devTeam]) to edit team members!;de:Klicken Sie [hier]($botLink[devTeam]), um Teammitglieder zu bearbeiten!]}
  }
  {actionRow:
    {button:$language[tr:Yönetici Ekle;en:Add Admin;de:Administrator Hinzufügen]:success:botAdminAddModal_$authorID:false:$emoji[buttonPlus]}
    {button:$language[tr:Yönetici Kaldır;en:Remove Admin;de:Administrator Entfernen]:danger:botAdminRemoveModal_$authorID:false:$emoji[buttonMinus]}
  }
;true]]

$let[botAdmins;- $joinSplitText[\n- ]]
$textSplit[$djsEval[Promise.all($getVar[admins].map(id => client.users.fetch(id).then(u => u.displayName + " (" + u.username + ") - \`[" + u.id + "]\`").catch(() => "Kullanıcı bulunamadı. \`(" + id + ")\`"))).then(results => results.join(" , "));true]; , ]
$let[teamAdmins;- $joinSplitText[\n- ]]
$textSplit[$djsEval[d.client.application.fetch().then((x) => {return x.owner.members? x.owner.members.map((x) => {const user = d.client.users.cache.get(x.id);return ("\`[" +x.role.toUpperCase() +"]\`" +" **" +(user? user?.displayName + " (" + user?.username + ")**": x.id + "**"));}).join(" , "): x.owner.id;});true]; , ]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  }, 
  {
  //name: "botAdminAddModal",
    type: "interaction",
    prototype: "button",
    code: `
$interactionModal[$language[tr:Yönetici Ekle;en:Add Admin;de:Administrator Hinzufügen];botAdminAdd;
  {actionRow:
    {textInput:$language[tr:Kullanıcı ID;en:User ID;de:Benutzer-ID]:1:id:true:$language[tr:Lütfen bir kullanıcı ID'si girin!;en:Please enter a user ID!;de:Bitte geben Sie eine Benutzer-ID ein!]:5:50}
  }
]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==botAdminAddModal;]
    `
  }, 
  {
  //name: "botAdminRemoveModal",
    type: "interaction",
    prototype: "button",
    code: `
$interactionModal[$language[tr:Yönetici Kaldır;en:Remove Admin;de:Administrator Entfernen];botAdminRemove;
  {actionRow:
    {textInput:$language[tr:Kullanıcı ID;en:User ID;de:Benutzer-ID]:1:id:true:$language[tr:Lütfen bir kullanıcı ID'si girin!;en:Please enter a user ID!;de:Bitte geben Sie eine Benutzer-ID ein!]:5:50}
  }
]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$authorID;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu butonu kullanamazsın!;en:You can't use this button!;de:Du kannst diese Schaltfläche nicht verwenden!]] {ephemeral} {interaction}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==botAdminRemoveModal;]
    `
  }, 
  {
    name: "botAdminAdd",
    type: "interaction",
    prototype: "modal",
    code: `
$editMessage[$messageID;
  {newEmbed:
    {author:$username[$clientID] | $language[tr:Yöneticiler;en:Admins;de:Administratoren]:$userAvatar[$clientID]}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $userDisplayName:$authorAvatar}
    {timestamp}
    {description:## 🤖 $language[tr:Bot Yöneticileri;en:Bot Admins;de:Bot-Administratoren]\n$if[$djsEval[$getVar[admins].join(",");true]==;❌ $language[tr:Hiçbir yönetici bulunamadı.;en:No admins found.;de:Keine Administratoren gefunden.];$get[botAdmins]]\n## 🛡️ $language[tr:Takım Üyeleri;en:Team Members;de:Team-Mitglieder]\n$get[teamAdmins]\n> -# $language[tr:Takım üyelerini düzenlemek için [buradaki]($botLink[devTeam]) bağlantıya tıklayın!;en:Click [here]($botLink[devTeam]) to edit team members!;de:Klicken Sie [hier]($botLink[devTeam]), um Teammitglieder zu bearbeiten!]}
  }
  {actionRow:
    {button:$language[tr:Yönetici Ekle;en:Add Admin;de:Administrator Hinzufügen]:success:botAdminAddModal_$authorID:false:$emoji[buttonPlus]}
    {button:$language[tr:Yönetici Kaldır;en:Remove Admin;de:Administrator Entfernen]:danger:botAdminRemoveModal_$authorID:false:$emoji[buttonMinus]}
  }
]

$let[botAdmins;- $joinSplitText[\n- ]]
$textSplit[$djsEval[Promise.all($getVar[admins].map(id => client.users.fetch(id).then(u => u.displayName + " (" + u.username + ") - \`[" + u.id + "]\`").catch(() => "Kullanıcı bulunamadı. \`(" + id + ")\`"))).then(results => results.join(" , "));true]; , ]
$let[teamAdmins;- $joinSplitText[\n- ]]
$textSplit[$djsEval[d.client.application.fetch().then((x) => {return x.owner.members? x.owner.members.map((x) => {const user = d.client.users.cache.get(x.id);return ("\`[" +x.role.toUpperCase() +"]\`" +" **" +(user? user?.displayName + " (" + user?.username + ")**": x.id + "**"));}).join(" , "): x.owner.id;});true]; , ]

$interactionReply[$nonEscape[**$emoji[success] | $userDisplayName**, $language[tr:Başarıyla **$userDisplayName[$textInputValue[id]] ($username[$textInputValue[id]])** adlı kullanıcı yönetici olarak eklendi!;en:Successfully added **$userDisplayName[$textInputValue[id]] ($username[$textInputValue[id]])** as an admin!;de:Erfolgreich **$userDisplayName[$textInputValue[id]] ($username[$textInputValue[id]])** als Administrator hinzugefügt!]];everyone;true]

$setVar[admins;$getArray[admins]]
$createArray[admins;$nonEscape[$djsEval[const array = $getVar[admins]; array.push("$textInputValue[id]"); array.join(";");true]]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$textInputValue[id]]==false;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu kullanıcı zaten bir yönetici!;en:This user is already an admin!;de:Dieser Benutzer ist bereits ein Administrator!]] {ephemeral} {interaction}]
$onlyIf[$userExists[$textInputValue[id]]==true&&$isBot[$textInputValue[id]]==false;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir kullanıcı ID'si girin!;en:Please enter a valid user ID!;de:Bitte geben Sie eine gültige Benutzer-ID ein!]] {ephemeral} {interaction}]
    `
  }, 
  {
    name: "botAdminRemove",
    type: "interaction",
    prototype: "modal",
    code: `
$editMessage[$messageID;
  {newEmbed:
    {author:$username[$clientID] | $language[tr:Yöneticiler;en:Admins;de:Administratoren]:$userAvatar[$clientID]}
    {color:$getVar[embedcolor]}
    {footer:$language[tr:Sorgulayan:;en:Requested by;de:Angefordert von] $userDisplayName:$authorAvatar}
    {timestamp}
    {description:## 🤖 $language[tr:Bot Yöneticileri;en:Bot Admins;de:Bot-Administratoren]\n$if[$djsEval[$getVar[admins].join(",");true]==;❌ $language[tr:Hiçbir yönetici bulunamadı.;en:No admins found.;de:Keine Administratoren gefunden.];$get[botAdmins]]\n## 🛡️ $language[tr:Takım Üyeleri;en:Team Members;de:Team-Mitglieder]\n$get[teamAdmins]\n> -# $language[tr:Takım üyelerini düzenlemek için [buradaki]($botLink[devTeam]) bağlantıya tıklayın!;en:Click [here]($botLink[devTeam]) to edit team members!;de:Klicken Sie [hier]($botLink[devTeam]), um Teammitglieder zu bearbeiten!]}
  }
  {actionRow:
    {button:$language[tr:Yönetici Ekle;en:Add Admin;de:Administrator Hinzufügen]:success:botAdminAddModal_$authorID:false:$emoji[buttonPlus]}
    {button:$language[tr:Yönetici Kaldır;en:Remove Admin;de:Administrator Entfernen]:danger:botAdminRemoveModal_$authorID:false:$emoji[buttonMinus]}
  }
]

$let[botAdmins;- $joinSplitText[\n- ]]
$textSplit[$djsEval[Promise.all($getVar[admins].map(id => client.users.fetch(id).then(u => u.displayName + " (" + u.username + ") - \`[" + u.id + "]\`").catch(() => "Kullanıcı bulunamadı. \`(" + id + ")\`"))).then(results => results.join(" , "));true]; , ]
$let[teamAdmins;- $joinSplitText[\n- ]]
$textSplit[$djsEval[d.client.application.fetch().then(x => x.owner.members ? x.owner.members.map(m => { const u = d.client.users.cache.get(m.id); return "[" + m.role.toUpperCase() + "]" + " **" + (u ? u.displayName + " (" + u.username + ")**" : m.id + "**"); }).reverse().join(" , ") : (() => { const u = d.client.users.cache.get(x.owner.id); return "**" + (u ? u.displayName + " (" + u.username + ")" : x.owner.id) + "**"; })());true]; , ]

$interactionReply[$nonEscape[**$emoji[success] | $userDisplayName**, $language[tr:Başarıyla **$userDisplayName[$textInputValue[id]] ($username[$textInputValue[id]])** adlı kullanıcı yöneticilikten kaldırıldı!;en:Successfully removed **$userDisplayName[$textInputValue[id]] ($username[$textInputValue[id]])** from admin!;de:Erfolgreich **$userDisplayName[$textInputValue[id]] ($username[$textInputValue[id]])** als Administrator entfernt!]];everyone;true]

$setVar[admins;$djsEval[$getvar[admins].filter(x => x !== "$textInputValue[id]");true]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$textInputValue[id]]==true;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bu kullanıcı zaten bir yönetici değil!;en:This user is not an admin!;de:Dieser Benutzer ist kein Administrator!]] {ephemeral} {interaction}]
$onlyIf[$userExists[$textInputValue[id]]==true&&$isBot[$textInputValue[id]]==false;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Lütfen geçerli bir kullanıcı ID'si girin!;en:Please enter a valid user ID!;de:Bitte geben Sie eine gültige Benutzer-ID ein!]] {ephemeral} {interaction}]
    `
  }
];