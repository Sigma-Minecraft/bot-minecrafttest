const mineflayer = require('mineflayer');
const keep_alive = require('./keep_alive.js');
let login = true;
function createBot() {
  const bot = mineflayer.createBot({
    host: 'Wikleer.aternos.me',
    port: 27260,
    username: 'duzegojajca',
    version: '1.18.2'
  });

  bot.on('spawn', async () => {
    console.log('Bot spawned!');
    bot.chat('/login password123')
    await new Promise(resolve => setTimeout(resolve, 2500));
    setInterval(() => {
      // Random look direction (yaw and pitch)
      const yaw = Math.random() * 2 * Math.PI; // 0 to 2π
      const pitch = (Math.random() - 0.5) * Math.PI / 2; // -π/4 to π/4
      bot.look(yaw, pitch, true);

      // Random direction
      const directions = ['forward', 'back', 'left', 'right'];
      const dir = directions[Math.floor(Math.random() * directions.length)];

      // Random duration (500ms to 3000ms)
      const duration = 500 + Math.random() * 2000;

      console.log(`Walking ${dir} for ${Math.floor(duration)} ms`);

      bot.setControlState(dir, true);
      setTimeout(() => {
        bot.setControlState(dir, false);
      }, duration);

    }, 2500); // Repeat every 4 seconds
  });

  bot.on('end', async () => {
    console.log('Bot disconnected. Reconnecting in 1 seconds...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    createBot(); // Recursively restart bot
  });

  bot.on('error', err => {
    console.log('Bot error:', err);
  });
}

createBot();
