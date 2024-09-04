const { Client, RichPresence, MessageAttachment, MessageEmbed } = require('discord.js-selfbot-v13');
const exp = require('express');
const morgan = require('morgan');
const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();  // Load environment variables from .env file

const TOKEN = process.env.token;
if (!TOKEN) {
  console.error('No token found in environment variables.');
  process.exit(1);
}
// Check if scoot.json exists and is valid
const scootPath = path.join(__dirname, 'scoot.json');
if (!fs.existsSync(scootPath)) {
  console.error('scoot.json file is missing.');
  process.exit(1);
}
// Final check
const scoot = require(scootPath);

const app = exp();
app.use(morgan('dev'));

app.all('/', (req, res) => {
  res.send('RPC by Scylops');
});

const server = http.createServer(app);
server.listen(3000, () => {
  console.log('Server Scylops is ready !.');
}).on('error', (err) => {
  console.error('Server error:', err);
  setTimeout(() => {
    process.exit(1);
  }, 5000); // Wait for 5 seconds before restarting
});

const rpc = new Client({ checkUpdate: false });

const { id, ganti, tone, tdua, tgia, tfour, type, largeImg, smallImg, labelone, labeldua, linkone, linkdua } = scoot;
let startTime = Date.now(); // Save the initial timestamp

rpc.on('ready', async () => {
  console.log(`Logged in as ${rpc.user.tag}`);
  setInterval(() => {
    function dim(m, y) {
      return new Date(y, m, 0).getDate();  // Get the number of days in a month
    }
    function getOrdinalNum(n) {
      return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    }
    const gonta = ganti[Math.floor(Math.random() * ganti.length)];  // Randomly pick from the 'ganti' array
    const date = new Date();
    let day = getOrdinalNum(date.getDate());
    let lD = dim(date.getMonth() + 1, date.getFullYear());
    let hours = (date.getHours() + 7) % 24;  // Adjust for timezone (e.g., UTC+7)
    let minutes = date.getMinutes();
    let currentMonth = date.getMonth();
    let year = date.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = monthNames[currentMonth];
    // Formatting the time and date
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (day === lD) day = `Last`;
    // Replace placeholders in the templates
    let hone = tone.replace(/{tanggal}/g, day).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year);
    let hdua = tdua.replace(/{tanggal}/g, day).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year);
    let htiga = tgia.replace(/{tanggal}/g, day).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year);
    let hfour = tfour.replace(/{tanggal}/g, day).replace(/{menit}/g, minutes).replace(/{ganti}/g, gonta).replace(/{jam}/g, hours).replace(/{bulan}/g, month).replace(/{tahun}/g, year);
    // Create the rich presence
    try {
      let pr = new RichPresence()
        .setApplicationId(id)
        .setName(hone)
        .setType(type.toUpperCase())  // Ensure type is correct
        .setAssetsLargeImage(largeImg)
        .setAssetsSmallImage(smallImg)
        .setAssetsLargeText(hfour)
        .setAssetsSmallText(`DC - ${rpc.user.tag}`)
        .setState(htiga)
        .setDetails(hdua)
        .setStartTimestamp(startTime)
      if (!scoot.button.enabled) {
        pr.addButton(labelone, linkone);
        pr.addButton(labeldua, linkdua);
      }
      rpc.user.setActivity(pr.toJSON());  // Set the presence activity
      console.log('Rich Presence updated successfully');
    } catch (error) {
      console.error('Error setting rich presence:', error);
    }
  }, 60 * 1000);  // Update every 1 minute
  try {
    rpc.user.setPresence(scoot.presence);  // Set initial presence
  } catch (error) {
    console.error('Error setting initial presence:', error);
  }
});

rpc.on('error', (err) => {
  console.error('Error occurred:', err);
  setTimeout(() => {
    process.exit(1);
  }, 5000);  // Wait for 5 seconds before restarting
});

rpc.login(TOKEN);  // Login using the token from the .env file
