const commandInfoMap = {
	ai: {
			name: "ai",
			description: "AI Based on GPT-4",
			guide: "%1ai what is life?"
	},
	alldl: {
			name: "alldl",
			description: "Download video content using links from Facebook, Instagram, Tiktok, Youtube, Twitter, and Spotify audio",
			guide: "%1alldl [link]"
	},
	blackbox: {
			name: "blackbox",
			description: "An artificial Intelligence you can ask for anything.",
			guide: "%1blackbox what is life?"
	},
	dalle: {
			name: "dalle",
			description: "Creates an image based on your imagination",
			guide: "%1dalle cat with wings"
	},
	font: {
			name: "font",
			description: "Changes your font text",
			guide: "%1font list\n%1font <font name> <text>"
	},
	join: {
			name: "join",
			description: "to join other existing gc",
			guide: "chat %1join and reply number 1 to 5 in the list."
	},
	gemini: {
			name: "gemini",
			description: "Google Gemini LLM",
			guide: "%1gemini what is life?"
	},
	gmage: {
			name: "gmage",
			description: "Search Google Images online",
			guide: "%1gmage cat"
	},
	help: {
			name: "help",
			description: "View all commands",
			guide: "%1help\n%1help <command name>"
	},
	lyrics: {
			name: "lyrics",
			description: "Fetches lyrics of a song",
			guide: "%1lyrics perfect by ed sheeran"
	},
	pinterest: {
			name: "pinterest",
			description: "Searches images on Pinterest",
			guide: "%1pinterest cat -10"
	},
	prefix: {
			name: "prefix",
			description: "View some commands and shows bot's prefix",
			guide: "%1prefix"
	},
	remini: {
			name: "remini",
			description: "Enhances your image to lessen the blur",
			guide: "Reply to an image and type %1remini"
	},
	removebg: {
			name: "removebg",
			description: "Remove background of an image",
			guide: "Reply to an image and type\n%1removebg or %1rbg"
	},
	spotify: {
			name: "spotify",
			description: "Plays a song available on Spotify",
			guide: "%1spotify perfect by ed sheeran"
	},
	tempmail: {
			name: "tempmail",
			description: "Get Temporary Emails and its Inbox messages",
			guide: "%1tempmail create\n%1tempmail inbox <email>"
	},
	translate: {
			name: "translate",
			description: "Translate to any language",
			guide: "Reply to the text you want to translate and type\n%1translate <language>"
	},
	unsend: {
			name: "unsend",
			description: "Deletes bot messages",
			guide: "Reply to bot message and type %1unsend"
	}
};

module.exports = {
	config: {
			name: "help2",
			aliases: ["help2"],
			version: 1.0,
			author: "LiANE&Coffee",
			shortDescription: { en: "View all commands" },
			category: "members",
	},
	onStart: async function({ message, args }) {
			const prefix = global.GoatBot.config.prefix; // Access the global prefix

			if (args[0]) {
					const command = args[0].toLowerCase();
					if (commandInfoMap[command]) {
							const { name, description, guide } = commandInfoMap[command];
							const response = `━━━━━━━━━━━━━━━━\n𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝙽𝚊𝚖𝚎: ${name}\n𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${description}\n𝙶𝚞𝚒𝚍𝚎: ${guide.replace(/%1/g, prefix)}\n━━━━━━━━━━━━━━━━`;
							return message.reply(response);
					} else {
							return message.reply("Command not found.");
					}
			} else {
					const commandsList = `━━━━━━━━━━━━━━━━
𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀:
╭─╼━━━━━━━━╾─╮
│  📖 | 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻
│ %1 𝑨𝒊
│ %1 𝑩𝒍𝒂𝒄𝒌𝒃𝒐𝒙
│ %1 𝑮𝒆𝒎𝒊𝒏𝒊
│ %1 𝑻𝒓𝒂𝒏𝒔𝒍𝒂𝒕𝒆
╰─━━━━━━━━━╾─╯
╭─╼━━━━━━━━╾─╮
│  🖼 | 𝗜𝗺𝗮𝗴𝗲
│ %1 𝑫𝒂𝒍𝒍𝒆
│ %1 𝑮𝒎𝒂𝒈𝒆
│ %1 𝑷𝒊𝒏𝒕𝒆𝒓𝒆𝒔𝒕
│ %1 𝑹𝒆𝒎𝒊𝒏𝒊
│ %1 𝑹𝒆𝒎𝒐𝒗𝒆𝒃𝒈
╰─━━━━━━━━━╾─╯
╭─╼━━━━━━━━╾─╮
│  🎧 | 𝗠𝘂𝘀𝗶𝗰
│ %1 𝑳𝒚𝒓𝒊𝒄𝒔
│ %1 𝑺𝒑𝒐𝒕𝒊𝒇𝒚
╰─━━━━━━━━━╾─╯
╭─╼━━━━━━━━╾─╮
│  👥 | 𝗠𝗲𝗺𝗯𝗲𝗿𝘀
│ %1 𝑨𝒍𝒍𝒅𝒍
│ %1 𝑭𝒐𝒏𝒕
│ %1 𝑱𝒐𝒊𝒏
│ %1 𝑯𝒆𝒍𝒑2
│ %1 𝑯𝒆𝒍𝒑
│ %1 𝑯𝒆𝒍𝒑𝒂𝒍𝒍
│ %1 𝑷𝒓𝒆𝒇𝒊𝒙
│ %1 𝑻𝒆𝒎𝒑𝒎𝒂𝒊𝒍
│ %1 𝑼𝒏𝒔𝒆𝒏𝒅
╰─━━━━━━━━━╾─╯
%1help <command name>
𝚃𝚘 𝚜𝚎𝚎 𝚑𝚘𝚠 𝚝𝚘 𝚞𝚜𝚎
𝚝𝚑𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜.

ℹ️𝗘𝘅𝗮𝗺𝗽𝗹𝗲: %1help gemini
━━━━━━━━━━━━━━━━`;

					return message.reply(commandsList.replace(/%1/g, prefix));
			}
	}
};
