const fs = require('fs')
const Discord = require('discord.js')
const BotSchema = require('../schema/schema')
const mongooose = require('mongoose')
let spawn = require('child_process').spawn


async function display(message, money, arg, resultMsg, rslt){

	let win_or_loss = ''
	if(resultMsg == 1){
		win_or_loss = `You won: ${rslt} `
	} else {
		win_or_loss = `You lost: ${rslt}`
	}

	const userEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Roulette')
		.setURL('https://discord.js.org/')
		.setAuthor(message.author.username, 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		.setDescription(`Balance: ${money}`)

		if(arg){
			userEmbed.addFields(
				{ name: 'Result: ', value: win_or_loss, inline: true }
			)
			await message.channel.send(userEmbed)
		} else{
			userEmbed.addFields(
				{ name: '\u200B', value: '\u200B' },
				{ name: '!roulette red "amount" ', value: 'Bet on red color (1:1) ', inline: true },
				{ name: '!roulette black "amount" ', value: 'Bet on black color (1:1) ', inline: true },
				{ name: '\u200B', value: '\u200B' },
				{ name: '!roulette 1-18 "amount" ', value: 'Bet 1-18 (1:1) ', inline: true},
				{ name: '!roulette 19-36 "amount" ', value: 'Bet on 19-36 (1:1) ', inline: true },
				{ name: '\u200B', value: '\u200B' },
				{ name: '!roulette "single number" "amount"" ', value: 'Bet on single number 1-36 (35:1) ', inline: true }
				)
			await message.channel.send(userEmbed)
		}

		console.log("test", money)
}

async function func1(message, args){
	let bs = await BotSchema.findOne({userID: message.author.id})
		
	let result = ''
	
	if(args[0]){ //selve spillet
		const pythonProcess = spawn('python3.8',['./rl-commands/t1.py', args[0], args[1]]); //args[0] = type spill, args[1] = hvor mye penger
		pythonProcess.stdout.on('data', (data) => {
			result = ''
			result += JSON.parse(data)
		});
		pythonProcess.on('close', async function (code) {
			console.log("RES: ", result); //log
			console.log(result.split(','))

			result = result.split(',')
			resultMsg = result[1]
			console.log(resultMsg)
			
			let new_money = Number(parseInt(bs.money) + parseInt(result[0]))
			console.log("new_m: ", new_money)
			
			await bs.updateOne({"money": new_money.toString()})
			
			display(message, new_money, args[0], resultMsg, result[0])
		});
	} else if(!bs){ //hvis brukeren skriver !roulette for første gang
		bs = new BotSchema({
			userID: message.author.id,
			money: 500  
		})
		bs.save();
		display(message, bs.money) 
	} else{ //ingen arguments, brukes bare for å vise brukerens info
		display(message, bs.money)
	}

		
}


module.exports = {
	name: 'roulette',
	description: 'roulette',
	'func1': func1
};



