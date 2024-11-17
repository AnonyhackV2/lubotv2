const fonts = {
  a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂",
  j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋",
  s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
  A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
  J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
  S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
};

const axios = require('axios');
const moment = require("moment-timezone");
const manilaTime = moment.tz('Asia/Manila');
const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');

const Prefixes = [
  'gpt',
  'ai',
  'Robot',
  'bot',
  'Zephyrus',
];

module.exports = {
  config: {
    name: 'ai',
    version: '2.5.4',
    author: 'Kylepogi', // Credits to the owner of this API
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },

  langs: {
    en: {
      final: "🤖𝗞𝗬𝗟𝗘'𝗦 𝗕𝗢𝗧 ",
      loading: "⏳ 𝘱𝘭𝘦𝘢𝘴𝘦 𝘸𝘢𝘪𝘵...",
    },
  },

  onStart: async function () {},

  onChat: async function ({ api, event, args, getLang, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return;
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (!prompt) {
        await message.reply(
          "𝖧𝖾𝗅𝗅𝗈 𝖨'𝗆 𝗞𝘆𝗹𝗲'𝘀 𝗕𝗼𝘁 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌\n\nℹ️ 𝗲𝘅𝗮𝗺𝗽𝗹𝗲: ai what is handsome"
        );
        return;
      }

      const loadingMessage = getLang("loading");
      const loadingReply = await message.reply(loadingMessage);
      const url = "https://hercai.onrender.com/v3/hercai"; // Replace with the new API endpoint
      const response = await axios.get(`${url}?question=${encodeURIComponent(prompt)}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.reply.trim(); // Adjust according to the response structure of the new API
      const userName = getLang("final");
      const finalMsg = `${userName}\n\n${messageText}`
        .split('')
        .map((char) => fonts[char] || char)
        .join('');

      api.editMessage(finalMsg, loadingReply.messageID);

      console.log('Sent answer as a reply to user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `Error: ${error.message}.\n\nYou can try typing your question again or resending it, as there might be an issue with the server.`,
        event.threadID
      );
    }
  },
};
