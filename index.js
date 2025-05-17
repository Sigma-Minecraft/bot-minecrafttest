const mineflayer = require('mineflayer');
const keep_alive = require('./keep_alive.js');

let login = false

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Wikleer.aternos.me',
    username: 'duzegojajca'
  });

  bot.on('spawn', () => {
    console.log('Bot spawned!');
    if (login == true) {
      bot.chat('/login password123');
    }
    if (login == false) {
      bot.chat('/register password123 password123');
      login = true;
    }
  });

  bot.on('end', async () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    createBot(); // Recursively restart bot
  });

  bot.on('error', err => {
    console.log('Bot error:', err);
  });
}

createBot();
