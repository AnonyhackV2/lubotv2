const moment = require('moment-timezone');
const axios = require('axios');
const cron = require('node-cron'); // Added require for cron

module.exports.config = {
  name: "Autoquotes",
  version: "3.0.0",
  role: 0,
  author: "Kylepogi", // lol don't change the author if you change it i will hack your Facebook account👿
  description: "",
  category: "Autoquotes",
  countDown: 50
};

module.exports.onLoad = async ({ api, getLang, utils }) => {
  const getQuote = async () => {
    try {
      const response = await axios.get('https://api.forismatic.com/api/1.0/', {
        params: {
          method: 'getQuote',
          lang: 'en',
          format: 'jsonp',
          jsonp: '?'
        }
      });
      const quote = response.data.quoteText;
      const author = response.data.quoteAuthor || 'Unknown';

      return `📌 𝖱𝖠𝖭𝖣𝖮𝖬 𝖰𝖴𝖮𝖳𝖤𝖲:\n"${quote}" - ${author}`;
    } catch (error) {
      console.error('Error fetching quote:', error);
      return 'Could not fetch a quote at the moment!';
    }
  };

  cron.schedule('0 */15 * * * *', async function() { // This cron job runs every 15 minutes
    const now = moment().tz('Asia/Manila');
    const currentTime = now.format('HH:mm:ss'); // 24-hour format for consistency

    // Get the quote message
    const message = await getQuote();

    // Get all thread IDs
    const threadIDs = global.db.allThreadData.map(i => i.threadID);

    // Send the message to all threads
    threadIDs.forEach(threadID => {
      api.sendMessage(message, threadID);
    });
  });
};

module.exports.onStart = () => {
  console.log(`${module.exports.config.name} module started!`);
};
