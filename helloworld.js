
var clc= require('cli-color');

var contatore;
console.log('Hello World, nodejs');

console.log(clc.red('"Ciao Mondo" in rosso'));
console.log(clc.yellow('agragar'));
for (contatore=0; contatore <100 ; contatore++){
	/*console.log('il contatore ora è');
	console.log(contatore);*/
	console.log('il contatore ora è ' + contatore);
}
