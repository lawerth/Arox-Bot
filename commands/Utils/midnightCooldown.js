module.exports = [
  {
	  name: "MidnightCooldownError",
	  type: "awaited",
	  code: `
$djsEval[
  const now = new Date();

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();

  const secondsUntilMidnight = (24 * 3600) - (currentHour * 3600 + currentMinute * 60 + currentSecond);
  const unixTimestampAtMidnight = Math.floor(now.getTime() / 1000) + secondsUntilMidnight;

  channel.send("**$emoji[cooldown] | $userDisplayName**, $language[tr:Lütfen bekleyin ve;en:Please wait and try again;de:Bitte warte und versuche es] **<t:" + unixTimestampAtMidnight + ":R>**$language[tr: tekrar deneyin!;en:!;de: erneut!]");
]
    `
  }
];