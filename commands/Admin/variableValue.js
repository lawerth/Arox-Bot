module.exports = [
  {
    name: "getGlobalUserVar",
    aliases: ["gguv"],
    code: `
$nonEscape[$language[tr:**$username[$mentioned[1;true]] \`($mentioned[1;true])\`** adlı kullanıcıya ait değişken bilgileri:;en:Variable information about **$username[$mentioned[1;true]]** \`($mentioned[1;true])\`:;de:Variableninformationen zu **$username[$mentioned[1;true]]** \`($mentioned[1;true])\`:]
\`\`\`js\n\{
  Name : "$noMentionMessage[1]",
  Value: "$getGlobalUserVar[$noMentionMessage[1];$mentioned[1;true];$if[$noMentionMessage[2]==;main;$noMentionMessage[2]]]",
  User : "$mentioned[1;true]",
  Data : "$if[$noMentionMessage[2]==;main;$noMentionMessage[2]]",
  Type : "globalUser"
\}\n\`\`\`]

$onlyIf[$noMentionMessage[1]!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bir değişken adı belirtmelisin!;en:You must specify a variable name!;de:Du musst einen Variablennamen angeben!]]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;] 
    `
  },
  {
    name: "getVar",
    aliases: ["gv"],
    code: `
$nonEscape[$language[tr:Belirtilen değişkene ait bilgiler:;en:Information about the specified variable:;de:Informationen zur angegebenen Variablen:]]
\`\`\`js\n\{
  Name : "$noMentionMessage[1]",
  Value: "$getVar[$noMentionMessage[1];$if[$noMentionMessage[2]==;main;$noMentionMessage[2]]]",
  Data : "$if[$noMentionMessage[2]==;main;$noMentionMessage[2]]",
  Type : "global"
\}\n\`\`\`]

$onlyIf[$noMentionMessage[1]!=;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Bir değişken adı belirtmelisin!;en:You must specify a variable name!;de:Du musst einen Variablennamen angeben!]]]

$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;] 
    `
  }
];
