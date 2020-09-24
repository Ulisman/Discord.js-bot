const randomWords = require('random-words')

module.exports = {
	name: 'yeet',
	description: 'yeet',
	execute(message, args) {
		message.channel.send(`${message.author.username} is a ${randomWords()}`);
	},
};


