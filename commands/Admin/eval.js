module.exports = [
  {
    name: "eval",
    code: `
\`\`\`js\n$eval[$message;true;true;true;true]\n\`\`\`
$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
    `
  }
];
