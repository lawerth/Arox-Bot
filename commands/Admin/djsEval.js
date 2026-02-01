module.exports = [
  {
	  name: "djsEval",
	  code:`
$djsEval[$message;true]
$onlyIf[$checkContains[$djsEval[$getVar[admins].join(",");true];$authorID]==true;]
	  `
  }
];