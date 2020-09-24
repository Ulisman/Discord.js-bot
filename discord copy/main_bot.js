//Trenger ikke å bruke express her
//hadde lastet ned discord.js i den første package.json....
const fs = require('fs')
const Discord = require('discord.js')
const {token_main, prefix} = require('./config.json')
const client = new Discord.Client();
client.commands = new Discord.Collection()


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.once('ready', ()=>{
    console.log('Ready!')
})

client.login(token_main)

for (file of commandFiles){
    console.log(file)
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

client.on('message', message=>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

    client.commands.get(command).execute(message, args)

})


//const {x} = require('./rlbot')
//x()