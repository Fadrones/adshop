const { Client, RichPresence } = require('discord.js-selfbot-v13');
const exp = require('express');
const logger = require('morgan');
const http = require('http');
const scoot = require('./scoot.json');
const dotenv = require('dotenv');

dotenv.config();

const app = exp();
app.use(logger('dev'));

app.all('/', (req, res) => {
  res.send('RPC by Scylops');
});

const server = http.createServer(app);
server.listen(3000, () => {
  console.log('Server Scylops is ready !.');
}).on('error', (err) => {
  console.error('Server error:', err);
  // Restart the process after a short delay
  setTimeout(() => {
    process.exit(1);
  }, 5000); // Wait for 5 seconds before restarting
});

const rpc = new Client({
  checkUpdate: false
});

const ganti = scoot.ganti;
const tone = scoot.tone;
const tdua = scoot.tdua;
const tgia = scoot.tgia;
const tfour = scoot.tfour;
const type = scoot.type;
const largeImg = scoot.largeImg;
const smallImg = scoot.smallImg;
const labelone = scoot.labelone;
const labeldua = scoot.labeldua;
const linkone = scoot.linkone;
const linkdua = scoot.linkdua;

let startTime = Date.now(); // Simpan timestamp awal

rpc.on('ready', async () => {
  setInterval(() => {
    function dim(m, y) {
      return new Date(y, m, 0).getDate()
    }
    function getOrdinalNum(n) {
      return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    }
    const gonta = ganti[Math.floor(Math.random() * ganti.length)];
    const date = new Date()
    let day = getOrdinalNum(date.getDate())
    let lD = dim(date.getMonth() + 1, date.getFullYear())
    let H = date.getHours()
    let hours = (H + 7) % 24
    let M = date.getMinutes()
    let minutes = (M + 0)
    let months = date.getMonth()
    let dy = date.getDate()
    let year = date.getFullYear()
    let months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    let month = monthst[months]
    if (hours < 10) hours = `0${hours}`
    if (minutes < 10) minutes = `0${minutes}`
    if (dy == lD) tanggal = `Last`
    let hone =  tone.replace(/{tanggal}/g, day).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year)
    let hdua = tdua.replace(/{tanggal}/g, day).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year)
    let htiga = tgia.replace(/{tanggal}/g, day).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year)
    let hfour = tfour.replace(/{tanggal}/g, day).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year)
    let pr = new RichPresence()
      .setApplicationId("993210680859701369")
      .setName(`${hone}`)
      .setType(`${type}`.toUpperCase())
      .setAssetsLargeImage(`${largeImg}`)
      .setAssetsSmallImage(`${smallImg}`)
      .setAssetsLargeText(`${hfour}`)
      .setAssetsSmallText(`DC - ${rpc.user.tag}`)
      .setState(`${htiga}`)
      .setDetails(`${hdua}`)
      .setStartTimestamp(startTime)
      .addButton(`${labelone}`, `${linkone}`)
      .addButton(`${labeldua}`, `${linkdua}`)
    rpc.user.setActivity(pr.toJSON())
  }, 30 * 1000)
  console.log(`Username : ${rpc.user.tag}`)
})

rpc.on('messageCreate', async (message) => {
  try {
    const attachmentConfig = scootConfig.discord.messageCreate.attachment;
    const embedConfig = scootConfig.discord.messageCreate.embed;

    const attachment = new Discord.MessageAttachment(attachmentConfig.path, attachmentConfig.filename);
    const embed = new Discord.MessageEmbed()
      .setTitle(embedConfig.title)
      .setDescription(embedConfig.description)
      .setImage(embedConfig.image)
      .setColor(embedConfig.color);

    message.channel.send({ embeds: [embed], files: [attachment] });
  } catch (error) {
    console.error('Error sending message:', error);
    message.channel.send('Error sending message!');
  }
});

rpc.on('error', (err) => {
  console.error('Error occurred:', err);
  // Log the error to a file or a logging service
  // Restart the process after a short delay
  setTimeout(() => {
    process.exit(1);
  }, 5000); // Wait for 5 seconds before restarting
});

rpc.login(process.env.token); // Put token on .env / Secrets

      
