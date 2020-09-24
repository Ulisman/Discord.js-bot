const Discord = require('discord.js');
const BotSchema = require('../schema/schema')
const mongooose = require('mongoose')
let spawn = require('child_process').spawn

function func1(message, a, b){
    console.log('xXx', a)
    let result = ''

    const pythonProcess = spawn('python',['./rl-commands/t1.py', a, b]);
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString()
    });

    pythonProcess.on('close', function (code) {
        console.log("RES: ", result);
    });

    message.reply(a)
}


module.exports = {
    name: 'user',
    description: 'user',
    'func1': func1













        // const userbot = new BotSchema({
        //     userID: message.author.id,
        //     money: 500
        // })
        
        // userbot.save()
        // .then(result => console.log(result))
        // .catch(err => console.log(err))

        // BotSchema.findOne(
        //     {userID: message.author.id},
        //     (err, foo)=>{
        //         console.log("yeet", foo)
        //         message.reply(`Db saved id: ${foo.userID}`)
        //     }
        // )
        
    //}




}
