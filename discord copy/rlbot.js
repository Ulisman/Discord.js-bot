const fs = require('fs')
const Discord = require('discord.js')
const {token_roulette, prefix, uri} = require('./config.json')
const client = new Discord.Client(); //client samme som bot
client.commands = new Discord.Collection()



const mongoose = require('mongoose');
//uri = "mongodb+srv://mongo1:mongo1@cluster0.gsyaz.mongodb.net/Test1?retryWrites=true&w=majority"
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err) console.log(err);
    console.log('Connected')
})

client.once('ready', ()=>{
    console.log('Roulett bot ready!')
})

client.login(token_roulette)


const commandFiles = fs.readdirSync('./rl-commands').filter(file => file.endsWith('.js'));
for (file of commandFiles){
    console.log(file)
    const command = require(`./rl-commands/${file}`)

    client.commands.set(command.name, command)
}

client.on('message', async message=>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    console.log("ARGS ", args[0])

    client.commands.get(command).func1(message, args)   //execute(client, message, args)


})

function x(){
    console.log('X')
}


exports.x = x;



//mongodb+srv://mongo1:<password>@cluster0.gsyaz.mongodb.net/<dbname>?retryWrites=true&w=majority