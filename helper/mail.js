const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const smtpTransport = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: "arthurmtamm@gmail.com",
        pass: "XFJqD8QLAkSN9BrH"
    }
})

async function run() {
    let sendResult = await smtpTransport.sendMail({
        from: 'contato.tocket@gmail.com',
        to: 'contato.tocket@gmail.com',
        subject: 'Teste de envio de email',
        text: 'Olá, este é um teste de envio de email.',
        html: '<body><h1> Olá! </h1> <p> Este é um teste de envio de email. </p> </body>'
    })

    console.log(sendResult);
}

run().catch(err => console.log(err))