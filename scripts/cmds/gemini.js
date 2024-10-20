const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

// Function to get response from the API
const b = async (c, d) => {
  try {
    const { data } = await axios.get(`https://gemini-ai-pearl-two.vercel.app/kshitiz?prompt=${encodeURIComponent(c)}&uid=${d}&apikey=kshitiz`);
    return data.answer;
  } catch (error) {
    throw error;
  }
};

// Function to get image URL
const i = async (c) => {
  try {
    const { data } = await axios.get(`https://sdxl-kshitiz.onrender.com/gen?prompt=${encodeURIComponent(c)}&style=3`);
    return data.url;
  } catch (error) {
    throw error;
  }
};

// Function to describe an image
const describeImage = async (prompt, photoUrl) => {
  try {
    const { data } = await axios.get(`https://sandipbaruwal.onrender.com/gemini2?prompt=${encodeURIComponent(prompt)}&url=${encodeURIComponent(photoUrl)}`);
    return data.answer;
  } catch (error) {
    throw error;
  }
};

// Function to handle the command
const handleCommand = async ({ api, message, event, args }) => {
  const senderID = event.senderID;
  const command = args.shift().toLowerCase();
  const prompt = args.join(' ').trim();

  try {
    if (!prompt) {
      return message.reply("hello I am 𝗞𝗣𝗛 𝗕𝗢𝗧𝗩𝟮 your personal assistance I was created by Kyle L. Bait-it. Please provide a prompt or reply to the image and you're own prompt\n\n𝗲𝘅𝗮𝗺𝗽𝗹𝗲: ai what is real love?");
    }

    if (command === "draw") {
      await drawImage(message, prompt);
    } else if (event.messageReply?.attachments?.length) {
      const photoUrl = event.messageReply.attachments[0].url;
      const description = await describeImage(prompt, photoUrl);
      return message.reply(`𝗞𝗣𝗛 𝗔.𝗜(𝗚𝗘𝗠𝗜𝗡𝗜-𝟰𝗞𝗙𝗟𝗔𝗦𝗛𝗖𝟰)\n━━━━━━━━━━━━━━━━\n➣ 𝗔𝗻𝘀𝘄𝗲𝗿: ${description}\n━━━━━━━━━━━━━━━━`);
    } else {
      const response = await b(prompt, senderID);
      message.reply(`𝗞𝗣𝗛 𝗔.𝗜(𝗚𝗘𝗠𝗜𝗡𝗜-𝟰𝗞𝗙𝗟𝗔𝗦𝗛𝗖𝟰)\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━`, (error, info) => {
        if (error) {
          console.error("Reply error:", error);
          return;
        }
        global.GoatBot.onReply.set(info.messageID, {
          commandName: a.name,
          uid: senderID
        });
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    message.reply("𝗞𝗣𝗛 𝗔.𝗜(𝗚𝗘𝗠𝗜𝗡𝗜-𝟰𝗞𝗙𝗟𝗔𝗦𝗛𝗖𝟰)\n━━━━━━━━━━━━━━━━\nAn error occurred while processing the request.\n━━━━━━━━━━━━━━━━");
  }
};

// Function to draw an image
const drawImage = async (message, prompt) => {
  try {
    const imageUrl = await i(prompt);
    const imagePath = path.join(__dirname, 'tmp', `image_${Date.now()}.png`);
    const writer = fs.createWriteStream(imagePath);

    const { data } = await axios({ url: imageUrl, method: 'GET', responseType: 'stream' });
    data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    message.reply({
      body: "𝗞𝗣𝗛 𝗔.𝗜(𝗚𝗘𝗠𝗜𝗡𝗜-𝟰𝗞𝗙𝗟𝗔𝗦𝗛𝗖𝟰)\n━━━━━━━━━━━━━━━━\nGenerated image:",
      attachment: fs.createReadStream(imagePath)
    });
  } catch (error) {
    console.error("Error:", error.message);
    message.reply("𝗞𝗣𝗛 𝗔.𝗜(𝗚𝗘𝗠𝗜𝗡𝗜-𝟰𝗞𝗙𝗟𝗔𝗦𝗛𝗖𝟰)\n━━━━━━━━━━━━━━━━\nAn error occurred while processing the request.\n━━━━━━━━━━━━━━━━");
  }
};

const a = {
  name: "ai",
  aliases: ["bard","gemini"],
  version: "4.0",
  author: "vex_kshitiz",
  countDown: 5,
  role: 0,
  longDescription: "Chat with gemini",
  category: "ai",
  guide: {
    en: "{p}gemini {prompt}"
  }
};

modorts = {
  config: a,
  handleCommand,
  onStart: handleCommand,
  onReply: handleCommand
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true }); 

