const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios'); 
const PastebinAPI = require('pastebin-js');
const fs = require('fs');
const path = require('path');

module.exports = {
 config: {
 name: "bin",
 version: "1.0",
 author: "Morgan",
 countDown: 5,
 role: 2,
 shortDescription: {
 en: "Upload files to pastebin and sends link"
 },
 longDescription: {
 en: "This command allows you to upload files to pastebin and sends the link to the file."
 },
 category: "Utility",
 guide: {
 en: "To use this command, type !pastebin <filename>. The file must be located in the 'cmds' folder."
 }
 },

 onStart: async function({ api, event, args }) {
 const permission = ["100088286122703","100087975355210"];
 if (!permission.includes(event.senderID)) {
 return api.sendMessage(
 "Only owner can use this command",
 event.threadID,
 event.messageID
 );
 }

 const pastebin = new PastebinAPI({
 api_dev_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
 api_user_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
 });

 const fileName = args[0];
 const filePathWithoutExtension = path.join(__dirname, '..', 'cmds', fileName);
 const filePathWithExtension = path.join(__dirname, '..', 'cmds', fileName + '.js');

 if (!fs.existsSync(filePathWithoutExtension) && !fs.existsSync(filePathWithExtension)) {
 return api.sendMessage('File not found!', event.threadID);
 }

 const filePath = fs.existsSync(filePathWithoutExtension) ? filePathWithoutExtension : filePathWithExtension;

 fs.readFile(filePath, 'utf8', async (err, data) => {
 if (err) throw err;

 try {
 const paste = await pastebin.createPaste({
 text: data,
 title: fileName,
 format: null,
 privacy: 1,
 });

 const rawPaste = paste.replace("pastebin.com", "pastebin.com/raw");
 api.sendMessage(rawPaste, event.threadID);
 } catch (error) {
 console.error(error);
 api.sendMessage('An error occurred while uploading the file to Pastebin.', event.threadID);
 }
 });
 }
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true }); 