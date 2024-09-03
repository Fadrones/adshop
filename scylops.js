const { Client, MessageAttachment, RichPresence, MessageEmbed } = require('discord.js-selfbot-v13');

const bot = new Client({
  checkUpdate: false
});

const config = {
  scy: {
    name: 'Custom Presence', // Text Top
    details: '{tanggal} {jam} {menit} {bulan}', // Text Middle
    state: 'Taixit.ID', // Text Bottom
    type: '0', // 0 : PLAYING, 1 : STREAMING, 2 : LISTENING, 3 : WATCHING (bisa nomer / text)
    largeImage: 'mp:', // GIF / IMG VIA LINK
    smallImage: 'mp:',// GIF / IMG VIA LINK
    largeText: 'MxT Store Trusted', // Text Di Gambar besar
    smallText: '', // text Di Gambar kecil
    buttons: [
      { label: 'MxT Store', url: 'https://youtube.com/channel/UCFmKhZEfWcLwq0K0cYll2Q' }, // button 1
      { label: 'Button 2', url: 'https://discord.gg/64kEQMhu4a' } // button 2
    ]
  },
  autoRespond: {
    enabled: true, // enable or disable the auto respond
    cooldown: 60 * 60 * 1000, // 1 hour
    response: 'Hello, {username}!', // Text Auto Respond
  }
};

const responseTimestamps = new Map();

// Validate config object
if (!config.scy || !config.scy.name || !config.scy.details || !config.scy.state || !config.scy.type) {
  throw new Error('Invalid config object');
}

if (typeof config.scy.type !== 'number' && typeof config.scy.type !== 'string') {
  throw new Error('Invalid type value in config object');
}

// Initialize presence data
let presenceData = {
  name: config.scy.name,
  details: config.scy.details,
  state: config.scy.state,
  type: config.scy.type,
  largeImage: config.scy.largeImage,
  smallImage: config.scy.smallImage,
  largeText: config.scy.largeText,
  smallText: config.scy.smallText,
  buttons: config.scy.buttons
};

// Function to update presence data
function updatePresenceData(newData) {
  if (!newData || typeof newData !== 'object' || Object.keys(newData).length === 0) {
    throw new Error('Invalid new data');
  }

  if (newData.name && typeof newData.name !== 'string') {
    throw new Error('Invalid name value in new data');
  }

  if (newData.details && typeof newData.details !== 'string') {
    throw new Error('Invalid details value in new data');
  }

  if (newData.state && typeof newData.state !== 'string') {
    throw new Error('Invalid state value in new data');
  }

  if (newData.type && typeof newData.type !== 'number' && typeof newData.type !== 'string') {
    throw new Error('Invalid type value in new data');
  }

  presenceData = { ...presenceData, ...newData };
  updatePresence();
}

// Function to update presence
function updatePresence() {
  const pr = new RichPresence()
    .setApplicationId("993210680859701369")
    .setName(presenceData.name)
    .setDetails(presenceData.details)
    .setState(presenceData.state)
    .setAssetsLargeImage(presenceData.largeImage)
    .setAssetsSmallImage(presenceData.smallImage)
    .setAssetsLargeText(presenceData.largeText)
    .setAssetsSmallText(presenceData.smallText);

  let typeValue;
  if (typeof presenceData.type === 'number') {
    // Map numerical values to their corresponding string values
    switch (presenceData.type) {
      case 0:
        typeValue = 'PLAYING';
        break;
      case 1:
        typeValue = 'STREAMING';
        break;
      case 2:
        typeValue = 'LISTENING';
        break;
      case 3:
        typeValue = 'WATCHING';
        break;
      default:
        throw new Error('Invalid type value');
    }
  } else if (typeof presenceData.type === 'string') {
    // If type is a string value, convert it to uppercase and use it
    typeValue = presenceData.type.toUpperCase();
  } else {
    // If type is neither a number nor a string, throw an error
    throw new Error('Invalid type value');
  }

  pr.setType(typeValue);

  presenceData.buttons.forEach(button => {
    pr.addButton(button.label, button.url);
  });

  bot.user.setActivity(pr.toJSON());
}

bot.on('ready', async () => {
  console.log(`${bot.user.tag}`);
  setInterval(() => {
    function getOrdinalNum(n) {
      return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    }

    const date = new Date();
    let tanggal = getOrdinalNum(date.getDate());
    let jam = date.getHours();
    let menit = date.getMinutes();
    let bulan = [
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
      "December"
    ][date.getMonth()];

    if (jam < 10) jam = `0${jam}`;
    if (menit < 10) menit = `0${menit}`;

    const presenceData = {
      name: config.scy.name.replace(/{tanggal}/g, tanggal).replace(/{jam}/g, jam).replace(/{menit}/g, menit).replace(/{bulan}/g, bulan),
      details: config.scy.details.replace(/{tanggal}/g, tanggal).replace(/{jam}/g, jam).replace(/{menit}/g, menit).replace(/{bulan}/g, bulan),
      state: config.scy.state.replace(/{tanggal}/g, tanggal).replace(/{jam}/g, jam).replace(/{menit}/g, menit).replace(/{bulan}/g, bulan),
      type: config.scy.type,
      largeImage: config.scy.largeImage,
      smallImage: config.scy.smallImage,
      largeText: config.scy.largeText,
      smallText: config.scy.smallText,
      buttons: config.scy.buttons
    };

    updatePresenceData(presenceData);
  }, 30 * 1000);
});

bot.on('messageCreate', async (msg) => {
  if (msg.content.includes(`<@${bot.user.id}>`) && !msg.author.bot) {
    if (!config.autoRespond.enabled) return;
    const user = msg.author;
    const userId = user.id;
    const currentTime = Date.now();
    if (responseTimestamps.has(userId) && responseTimestamps.get(userId) + config.autoRespond.cooldown > currentTime) {
      return;
    }
    const response = config.autoRespond.response.replace('{username}', user.username);
    msg.reply({ content: response });
    responseTimestamps.set(userId, currentTime);
  }
});

setInterval(() => {
  const currentTime = Date.now();
  responseTimestamps.forEach((timestamp, userId) => {
    if (timestamp + config.autoRespond.cooldown < currentTime) {
      responseTimestamps.delete(userId);
    }
  });
}, config.autoRespond.cooldown);


require('dotenv').config();
bot.login(process.env.TOKEN);
