const txtgen = require('txtgen');

module.exports = {
	name: 'wisdom',
	description: 'wisdom',
	execute(message, args) {
        const sentence = txtgen.sentence()
		message.channel.send(sentence);
	},
};
