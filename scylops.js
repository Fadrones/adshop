const { Client, MessageAttachment, RichPresence, MessageEmbed } = require('discord.js-selfbot-v13');
const exp = require('express');
const sc = exp();
const config = require('./scoot.json'); // Import the config.json file

const bot = new Client({
  checkUpdate: false
});

const ganti = config.achange;
const textUtama = config.tone;
const textDua = config.tdua;
const textTiga = config.tgia;
const textEmpat = config.tfour;
const type = config.type;
const gambarGede = config.largeImg;
const gambarKecil = config.smallImg;
const labelButtonSatu = config.bone;
const labelButtonDua = config.bdua;
const linkButtonSatu = config.linkbone;
const linkButtonDua = config.linkbdua;

sc.all('/', (req, res) => { // Build The Express Server
  res.send("Bot Online") // Results
})

sc.listen(8080, () => { // Make The Express Servers Listen To 8080 Port
  console.log("Port : 8080") // Console "Port : 8080"
})

bot.on('debug', (a) => {
  if(a.startsWith("Hit a 429")) process.kill(1)
})

bot.on('ready', async () => {
  setInterval(() => {
    function dim(m, y) { // Create "dim" Function
      return new Date(y, m, 0).getDate() // Get The Day Count On Specific Month
    }
    function getOrdinalNum(n) { // Create New Function
      return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : ''); // Get The Ordinal Of Number
    }
    const gonta = ganti[Math.floor(Math.random() * ganti.length)]; // Pick Random Value From The Array
    const date = new Date() // Get New Date
    let tanggal = getOrdinalNum(date.getDate()) // Get The Current Dates
    let lD = dim(date.getMonth() + 1, date.getFullYear()) // Define The Day Counts On Current Month
    let H = date.getHours() // Get The Current Hours
    let hours = (H + 7) % 24// Convert Current Hours To WIB
    let M = date.getMinutes() // Get The Current Minutes
    let minutes = (M + 0) // Do Absolutely Nothing
    let months = date.getMonth()
    let dy = date.getDate()
    let year = date.getFullYear()
    let monthst = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Desember"
    ]
    let month = monthst[months]
    if (hours < 10) hours = `0${hours}` // If The Hours Length Is 1 Digit, It Add Zero Behind It
    if (minutes < 10) minutes = `0${minutes}` // If The Minutes Length Is 1 Digit, It Add Zero Behind It
    if (dy == lD) tanggal = `Last` // If Current Dates And Last Dates Is Same, It Will Change The Dates To "Last"
    let hasilSatu = textUtama.replace(/{tanggal}/g, tanggal).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year)
    let hasilDua = textDua.replace(/{tanggal}/g, tanggal).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year)
    let hasilTiga = textTiga.replace(/{tanggal}/g, tanggal).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year)
    let hasilEmpat = textEmpat.replace(/{tanggal}/g, tanggal).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year)
    let pr = new RichPresence()
      .setName(`${hasilSatu}`)
      .setType(`${type}`.toUpperCase())
      .setApplicationId(config.ID)
      .setAssetsLargeImage(`${gambarGede}`)
      .setAssetsSmallImage(`${gambarKecil}`)
      .setAssetsLargeText(`${hasilEmpat}`)
      .setAssetsSmallText(`DC - ${bot.user.tag}`)
      .setState(`${hasilDua}`)
      .setDetails(`${hasilTiga}`)
      .setStartTimestamp(Date.now())
      .addButton(`${labelButtonSatu}`, `${linkButtonSatu}`)
      .addButton(`${labelButtonDua}`, `${linkButtonDua}`)
    bot.user.setActivity(pr.toJSON())
  }, 30 * 1000)
  console.log(`${bot.user.tag} Is Ready!`)
})

bot.login(process.env.token)