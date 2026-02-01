module.exports = [
  {
    name: "tet-loop-trigger",
    type: "loop",
    executeOnStartup: true,
    every: 60000,
    code: `
$awaitExecute[coinUpdate]
$let[changePercent;$roundTenth[$random[0.1;1.5;true];2]] $comment[0.10 - 1.50]
$let[0ChanceValue;15000]
$let[20ChanceValue;11000]
$let[80ChanceValue;3000]
$let[100ChanceValue;1000]
$let[code;tet]

$wait[$random[0;20]s]
$onlyIf[$getVar[updateEnabled]==true;]
    `
  },
  {
    name: "sol-loop-trigger",
    type: "loop",
    executeOnStartup: true,
    every: 60000,
    code: `
$awaitExecute[coinUpdate]
$let[changePercent;$roundTenth[$random[0.1;1.5;true];2]] $comment[0.10 - 1.50]
$let[0ChanceValue;40000]
$let[20ChanceValue;35000]
$let[80ChanceValue;20000]
$let[100ChanceValue;15000]
$let[code;sol]

$wait[$random[0;20]s]
$onlyIf[$getVar[updateEnabled]==true;]
    `
  },
  {
    name: "bnb-loop-trigger",
    type: "loop",
    executeOnStartup: true,
    every: 60000,
    code: `
$awaitExecute[coinUpdate]
$let[changePercent;$roundTenth[$random[0.1;1.5;true];2]] $comment[0.10 - 1.50]
$let[0ChanceValue;70000]
$let[20ChanceValue;65000]
$let[80ChanceValue;25000]
$let[100ChanceValue;20000]
$let[code;bnb]

$wait[$random[0;20]s]
$onlyIf[$getVar[updateEnabled]==true;]
    `
  },
  {
    name: "eth-loop-trigger",
    type: "loop",
    executeOnStartup: true,
    every: 60000,
    code: `
$awaitExecute[coinUpdate]
$let[changePercent;$roundTenth[$random[0.1;1.5;true];2]] $comment[0.10 - 1.50]
$let[0ChanceValue;250000]
$let[20ChanceValue;200000]
$let[80ChanceValue;80000]
$let[100ChanceValue;50000]
$let[code;eth]

$wait[$random[0;20]s]
$onlyIf[$getVar[updateEnabled]==true;]
    `
  },
  {
    name: "btc-loop-trigger",
    type: "loop",
    executeOnStartup: true,
    every: 60000,
    code: `
$awaitExecute[coinUpdate]
$let[changePercent;$roundTenth[$random[0.1;1.5;true];2]] $comment[0.10 - 1.50]
$let[0ChanceValue;700000]
$let[20ChanceValue;600000]
$let[80ChanceValue;400000]
$let[100ChanceValue;300000]
$let[code;btc]

$wait[$random[0;20]s]
$onlyIf[$getVar[updateEnabled]==true;]
    `
  },
  {
    name: "coinUpdate",
    type: "awaited",
    code: `
$setVar[$get[code]_data;$getObject[coin_data]]

$setObjectProperty[coin_data;lowestValue;$if[$getVar[$get[code]_value]<$getObjectProperty[coin_data;lowestValue];$getVar[$get[code]_value];$getObjectProperty[coin_data;lowestValue]]]
$setObjectProperty[coin_data;highestValue;$if[$getVar[$get[code]_value]>$getObjectProperty[coin_data;highestValue];$getVar[$get[code]_value];$getObjectProperty[coin_data;highestValue]]]

$setObjectproperty[coin_data;lowestValue;$if[$getObjectProperty[coin_data;lowestValue]==;$getVar[$get[code]_value];$getObjectProperty[coin_data;lowestValue]]]
$setObjectproperty[coin_data;highestValue;$if[$getObjectProperty[coin_data;highestValue]==;$getVar[$get[code]_value];$getObjectProperty[coin_data;highestValue]]]

$setObjectProperty[coin_data;lastDates;$getArray[lastDates]]
$setObjectProperty[coin_data;lastValues;$getArray[lastValues]]
$createArray[lastDates;$nonEscape[$djsEval[const array = $if[$getObjectProperty[coin_data;lastDates]==;[];$getObjectProperty[coin_data;lastDates]]; array.length >= 10 && array.shift(); array.push("$if[$charCount[$hour]==1;0$hour;$hour].$if[$charCount[$minute]==1;0$minute;$minute]"); array.join(";");true]]]
$createArray[lastValues;$nonEscape[$djsEval[const array = $if[$getObjectProperty[coin_data;lastValues]==;[];$getObjectProperty[coin_data;lastValues]]; array.length >= 10 && array.shift(); array.push("$getVar[$get[code]_value]"); array.join(";");true]]]

$createObject[coin_data;$getVar[$get[code]_data]]

$setVar[$get[code]_value;$truncate[$if[$get[isUp]==true;$math[$getVar[$get[code]_value]+$get[change]];$math[$getVar[$get[code]_value]-$get[change]]]]]
$let[change;$math[$getVar[$get[code]_value]*($get[changePercent]/100)]]
$let[isUp;$checkCondition[$random[0;100]<$get[upChance]]]
$let[upChance;$if[$getVar[$get[code]_value]<$get[100ChanceValue];100;$if[$getVar[$get[code]_value]<$get[80ChanceValue];80;$if[$getVar[$get[code]_value]>$get[0ChanceValue];0;$if[$getVar[$get[code]_value]>$get[20ChanceValue];20;50]]]]]
	  `
  }
];
