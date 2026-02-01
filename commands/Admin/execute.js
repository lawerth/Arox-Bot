module.exports = [
  {
    name: "execute",
    aliases: "exec",
    code: `
\`\`\`\n$exec[$message]\n\`\`\`
$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  }
];