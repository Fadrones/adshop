const { Client, RichPresence } = require('discord.js-selfbot-v13');

const bot = new Client({
  checkUpdate: false
});

const config = {
  scy: {
    name: 'Custom Presence', // Text Top
    details: '{tanggal} {jam} {menit} {bulan}', // Text Middle
    state: 'Taixit.ID', // Text Bottom
    type: '0', // 0 : PLAYING, 1 : STREAMING, 2 : LISTENING, 3 : WATCHING ( bisa nomer / text )
    largeImage: 'mp:attachments/1042215433174003762/1043167476046893066/20221029_171840.png', // GIF / IMG VIA LINK
    smallImage: 'mp:attachments/1042215433174003762/1043167476046893066/20221029_171840.png',// GIF / IMG VIA LINK
    largeText: 'MxT Store Trusted', // Text Di Gambar besar
    smallText: 'DC - ${bot.user.tag}', // text Di Gambar kecil
    buttons: [
      { label: 'MxT Store', url: 'https://youtube.com/channel/UCFmKhZEfWcLwq0K0cYll2Q' }, // button 1
      { label: 'Button 2', url: 'https://discord.gg/64kEQMhu4a' } // button 2
    ]
  }
};

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

// Update presence data every 30 seconds (optional)
setInterval(() => {
  updatePresence();
}, 30 * 1000);

// Event listener for ready event
bot.on('ready', async () => {
  console.log(`${bot.user.tag}`);
  updatePresence();
});

// Example usage: Update presence data dynamically
// updatePresenceData({ name: 'New Name', details: 'New Details' });

bot.login(process.env.TOKEN);
