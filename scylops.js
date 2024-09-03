const { Client, RichPresence } = require('discord.js-selfbot-v13');

const bot = new Client({
  checkUpdate: false
});

const config = {
  scy: {
    name: 'Custom Presence', // Text Top
    details: '{tanggal} {jam} {menit} {bulan}', // Text Middle
    state: 'Taixit.ID', // Text Bottom
    type: 'LISTENING', // PLAYING, LISTENING, WATCHING, STREAMING ( besar )
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

// Settings Rich Presence 
bot.on('ready', async () => {
  setInterval(() => {
    let pr = new RichPresence()
      .setApplicationId("993210680859701369")
      .setName(config.scy.name)
      .setDetails(config.scy.details);
      .setState(config.scy.state)
      .setType(config.scy.type.toUpperCase())
      .setAssetsLargeImage(config.scy.largeImage)
      .setAssetsSmallImage(config.scy.smallImage)
      .setAssetsLargeText(config.scy.largeText)
      .setAssetsSmallText(config.scy.smallText)
      
    config.scy.buttons.forEach(button => {
      pr.addButton(button.label, button.url);
    });
    
    bot.user.setActivity(pr.toJSON());
  }, 30 * 1000);
  console.log(`${bot.user.tag}`);
});

bot.login(process.env.TOKEN);
