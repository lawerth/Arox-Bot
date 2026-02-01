module.exports = [
  {
	  name: "work",
	  aliases: ["works", "çalış"],
    desc: ["If you have a job, you work and earn money.", "Bir mesleğe sahipsen çalışıp para kazanırsın.", "Wenn du einen Beruf hast, arbeitest du und verdienst Geld."],
    code: `
$setGlobalUserVar[cash;$math[$getGlobalUserVar[cash;$authorid]+$get[income]];$authorid]
$setGlobalUserVar[workingCount;$math[$getGlobalUserVar[workingCount;$authorid]+1];$authorid]

$editMessage[$get[messageID];
  {newEmbed:
    {author:$userDisplayName | $language[tr:Çalışıyor;en:Working;de:Arbeitet]:$authorAvatar}
    {title:$language[tr:$get[profEmoji] $get[profName] olarak çalışıyorsun...;en:You work as a $get[profEmoji] $get[profName]...;de:Du arbeitest als $get[profEmoji] $get[profName]...]}
    {color:$getVar[embedcolor]}
    {description:$splitText[3] $language[tr:Bugün çalışarak toplam $emoji[cash] **$numberSeparator[$get[income]]** kazandın!;en:You earned a total of $emoji[cash] **$numberSeparator[$get[income]]** by working today!;de:Heute hast du durch deine Arbeit insgesamt $emoji[cash] **$numberSeparator[$get[income]]** verdient!]}
  }
;$channelid]
$onlyIf[$messageExists[$get[messageID];$channelID]==true;]
$wait[3s]

$editMessage[$get[messageID];
  {newEmbed:
    {author:$userDisplayName | $language[tr:Çalışıyor;en:Working;de:Arbeitet]:$authorAvatar}
    {title:$language[tr:$get[profEmoji] $get[profName] olarak çalışıyorsun...;en:You work as a $get[profEmoji] $get[profName]...;de:Du arbeitest als $get[profEmoji] $get[profName]...]}
    {color:$getVar[embedcolor]}
    {description:$splitText[2]}
  }
;$channelid]
$onlyIf[$messageExists[$get[messageID];$channelID]==true;]
$wait[3s]

$let[messageID;$sendMessage[
  {newEmbed:
    {author:$userDisplayName | $language[tr:Çalışıyor;en:Working;de:Arbeitet]:$authorAvatar}
    {title:$language[tr:$get[profEmoji] $get[profName] olarak çalışıyorsun...;en:You work as a $get[profEmoji] $get[profName]...;de:Du arbeitest als $get[profEmoji] $get[profName]...]}
    {color:$getVar[embedcolor]}
    {description:$splitText[1]}
  }
;true]]

$let[income;$getObjectProperty[profData;[$get[currentProf]][0].income[0].daily]]

$textSplit[$get[text_$get[currentProf]];/]

$let[text_1;**🧱 |** $language[tr:Tuğlaları döşüyorsun.../**🧱 |** Eve sıva yapıyorsun.../**🏠 |** Mükemmel bir ev inşa ettin!;en:You are laying the bricks.../**🧱 |** You are plastering the house.../**🏠 |** You have built a perfect house!;de:Du verlegst Ziegel... /**🧱 |** Du verputzt das Haus... /**🏠 |** Du hast ein perfektes Haus gebaut!]
$let[text_2;**🏢 |** $language[tr:Markette müşterilerle ilgileniyorsun.../**🏢 |** Raflara ürünleri yerleştiriyorsun.../**🚶‍♂️ |** Bugünkü işin bitti. Evine dönüyorsun!;en:You take care of the customers in the supermarket.../**🏢 |** You place the products on the shelves.../**🚶‍♂️ |** You are done for the day. You're going home!;de:Du kümmerst dich um die Kunden im Supermarkt.../**🏢 |** Du räumst die Produkte in die Regale.../**🚶‍♂️ |** Dein Arbeitstag ist vorbei. Du gehst nach Hause!]]
$let[text_3;**🔧 |** $language[tr:Bozuk arabaları tamir ediyorsun.../**🔧 |** Arabaların motorlarını test ediyorsun.../**🚗 |** Arabayı tamir ettin. Sorunsuz bir şekilde çalışıyor!;en:You fix broken cars.../**🔧 |** You test car engines.../**🚗 |** You fixed the car. It runs smoothly!;de:Du reparierst kaputte Autos.../**🔧 |** Du testest die Motoren der Fahrzeuge.../**🚗 |** Du hast das Auto repariert. Es funktioniert einwandfrei!]]
$let[text_4;**🔥 |** $language[tr:Evde yangın çıkmış!! Hemen söndürmeye gidiyorsun.../**🔥 |** Eve ulaştın. Yangını söndürmeye çalışıyorsun.../**🏠 |** Yangını söndürmeyi başardın!;en:There's a fire in the house!!! You immediately go to put it out.../**🔥 |** You arrive home. You try to put out the fire.../**🏠 |** You managed to put out the fire!;de:Es brennt im Haus!! Du machst dich sofort auf den Weg zum Löschen.../**🔥 |** Du bist am Haus angekommen und versuchst, das Feuer zu löschen.../**🏠 |** Du hast es geschafft, das Feuer zu löschen!]] 
$let[text_5;**🏃‍♂️ |** $language[tr:Hırsız kaçıyor! Onu yakalamalısın.../**🏃‍♂️ |** Peşinden kovalıyorsun ama hırsız çok hızlı../**👮‍♂️ | Hırsızı nihayet yakaladın ve onu hapse attın!;en:The thief is running away! You have to catch him.../**🏃‍♂️ |** You chase after him, but the thief is too fast../**👮‍♂️ |** You finally caught the thief and put him in jail!;de:Der Dieb flieht! Du musst ihn fangen.../**🏃‍♂️ |** Du verfolgst ihn, aber der Dieb ist sehr schnell.../**👮‍♂️ |** Du hast den Dieb schließlich gefasst und ins Gefängnis gebracht!]]
$let[text_6;**💉 |** $language[tr:Ciddi bir ameliyata giriyorsun.../**💉 |** Ameliyat devam ediyor.../**💉 |** Ameliyat başarılı bir şekilde sonuçlandı!;en:You are undergoing a serious surgery.../**💉 |** Surgery is in progress.../**💉 |** Surgery successfully concluded!;de:Du gehst in eine ernsthafte Operation.../**💉 |** Die Operation ist im Gange.../**💉 |** Die Operation wurde erfolgreich abgeschlossen!]]
$let[text_7;**✈️ |** $language[tr:Türkiye'den $randomText[Washington'a;New York'a;Los Angeles'a;Londra'ya;San Francisco'ya] doğru bir uçuş gerçekleştiriyorsun.../**🌪 |** Büyük bir fırtınanın içinden geçiyorsun.../**🛬 |** Hedef bölgeye ulaştın ve başarılı bir iniş gerçekleştirdin!;en:You are on a flight from England to $randomText[Washington;New York;Los Angeles;London;San Francisco].../**🌪 |** You are flying through a huge storm.../**🛬 |** You have reached the target area and made a successful landing!;de:Du fliegst aus der Türkei in Richtung $randomText[Washington;New York;Los Angeles;London;San Francisco].../**🌪 |** Du fliegst durch einen heftigen Sturm.../**🛬 |** Du hast dein Zielgebiet erreicht und eine erfolgreiche Landung durchgeführt!]]
$let[text_8;**💻 |** $language[tr:Bir mobil oyunu geliştiriyorsun.../**📺 |** Oyununu tamamladın ve internette reklam yapıyorsun.../**📈 |** Oyunun büyük bir hızla gelişti ve herkes oynamaya başladı!;en:You're developing a mobile game.../**📺 |** You've finished your game and you're advertising it online.../**📈 |** Your game has grown by leaps and bounds and everyone is playing it!;de:Du entwickelst ein Mobile-Game.../**📺 |** Du hast dein Spiel abgeschlossen und machst Werbung im Internet.../**📈 |** Dein Spiel entwickelt sich rasant und plötzlich fangen alle an, es zu spielen!]]

$let[profName;$getObjectProperty[profData;[$get[currentProf]][0].name[$language[tr:0;en:1;de:2]]]]
$let[profEmoji;$getObjectProperty[profData;[$get[currentProf]][0].emoji]]
$let[currentProf;$getGlobalUserVar[profession;$authorID]]
$createObject[profData;$readFile[./data/professions.json]]

$globalCooldown[24h;$nonEscape[**$emoji[cooldown] | $userDisplayName**, $language[tr:Lütfen bekleyin ve **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** tekrar deneyin!;en:Please wait and try again **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>**!;de:Bitte warte und versuche es **<t:$sum[$truncate[$divide[$datestamp;1000]];$get[cooldownTime]]:R>** erneut!]] {deleteIn:$get[cooldownTime]s}]
$let[cooldownTime;$truncate[$divide[$getCooldownTime[24h;globalUser;work;$authorID];1000]]]

$onlyif[$getGlobalUserVar[profession;$authorid]>0;$nonEscape[**$emoji[error] | $userDisplayName**, $language[tr:Çalışabilmek için bir mesleğe sahip olmalısın!;en:You must have a profession to be able to work!;de:Du musst einen Beruf haben, um arbeiten zu können!]] {deleteIn:5s}]

$onlyif[$getVar[isMaintenance;important]==false||$guildID==$customGuildID[testing];{execute:maintenanceControl}]
$onlyIf[$getGlobalUserVar[botRules;$authorID;important]==true;{execute:botRulesControl}]
$onlyif[$getChannelVar[channelDisable;$channelID;important]==false;{execute:channelDisableControl}]
$onlyif[$getGlobalUserVar[isBlacklisted;$authorID;important]==false;{execute:blacklistControl}]
$suppressErrors[**⚠️ | $userDisplayName[$authorid]**, $language[tr:Bilinmeyen bir hata oluştu! Lütfen destek sunucumuza katılıp bildirin!;en:An unknown error occurred! Please join our support server and report!;de:Ein unbekannter Fehler ist aufgetreten! Bitte tritt unserem Support-Server bei und melde das Problem!]]
    `
  }
];