module.exports = [
  {
    name: "disableComponents",
    type: "timeout",
    code: `
$disableComponents[$timeoutData[channelID];$timeoutData[messageID];all]

$onlyIf[$messageExists[$timeoutData[messageID];$timeoutData[channelID]]==true;]
$onlyIf[$channelExists[$timeoutData[channelID]]==true;]
    `
  }
];