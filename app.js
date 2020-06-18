const express = require('express');
const morgan = require('morgan');
const { text, response } = require('express');
const app = express();
app.use(morgan('tiny'));

app.get('/',(req,res) => {
    res.send('Hello Express!');
});

app.get('/echo', (req,res) => {
    const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    Body: ${req.body}
    IP: ${req.ip}
    `;
    res.send(responseText);
});

app.get('/queryViewer', (req,res) => {
    console.log(req.query);
    res.end();
});

function cipherFun(text){
   let cipherstring = '';
    for (let i=0; i<text.length; i++) {
    let newNumber = text[i].charCodeAt(0);
    newNumber++
     cipherstring += String.fromCharCode(newNumber);
        
    }
    return cipherstring
}

app.get('/lotto',(req,res) => {
    const { numbers } = req.query;

    if(!numbers){ 
        return res 
        .status(400)
        .send("numbers is required");
    }

    if (!Array.isArray(numbers)){
        return res
        .status(400)
        .send("numbers must be an array");
    }
    const guesses = numbers
        .map(n => parseInt(n))
        .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20 ));

    if (guesses.length =! 6) {
        return res 
        .status(400)
        .send("numbers must contain 6 integers between 1 and 20");
    }

    const stockNumbers = Array(20).fill(1).map((_,i) => i + 1);
    const winningNumbers = [];
    for (let i=0; i < 6; i++) {
        const ran = Math.floor(Math.random() * stockNumbers.length);
        winningNumbers.push(stockNumbers[ran]);
        stockNumbers.splice(ran,1);
    } 

    let diff = winningNumbers.filter(n => !guesses.includes(n));

    let responseText;

    switch(diff.length){
        case 0:
            responseText= 'Wow! Unbelievable! You could have won the mega millions';
            break;
        case 1:
            responseText = 'Congratulations! You win 100$';
            break;
        case 2:
            responseText ='Congratulations, you win a free ticket!';
            break;
            default:
                responseText = 'Sorry, you lose';
    }

    res.send(responseText);
});


app.get('/cipher', (req,res) => {
    const text = req.query.text
    const shift = cipherFun(text);

    res.send(shift);

})





app.get('/sum', (req,res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    const c = a + b; 

    if(!a){
        return res.status(400).send('Please provide your first number');
    }

    if (!b) {
        return res.status(400).send('Please provide your second number');
    }

    const Displayresult = `Greetings, ${a} + ${b} = ${c} `;

    res.send(Displayresult);
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

app.get('/burgers',(req,res) => {
    res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req,res) => {
    res.send('Your pizza is on the way!');
});

app.get('/pizza/pineapple', (req,res) => {
    res.send('Sure we arent jerks and understand that some people like pineapple on pizza');
});