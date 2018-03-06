const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const Client = require('@line/bot-sdk').Client;

const app = express()

const config = {
  channelAccessToken: 'p5lgfavV9OOvKaVfuST/I2hUoxUyghh02ErUY7d1eyrrLGNzNFmWMha2K1Xd/xv19Bjh1wTfpNFDuwqAtJ9dW25EjwjIGZM+ayNGqb6dU5pXnuN7S8aqr2yzpWYtlMnKCxkkeOmWVtpH0F7pu33ilQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '17bd5614fefc02b11e78ad145173b22b'
}


const configDev = {
  channelAccessToken: '3NI2H6cTit07WzGMjeT+eVuT6XTCmJ887/h7MaGxZPywSwVTXDyqiDP5J7vYtQmzXD02341vXEGVnjzm6mM4x54asOM5Ebe9O/jtGMyIWwTVOaQIuz8Kb2DI+77XsoKvbqInRA8QWiPcVsgVlHgaSgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'ed4470bbaf9d7871bfbb1b2666fdd52f'
}

const client = new Client(configDev);

app.set('port', (process.env.PORT || 5000));

app.post('/msgdev', middleware(configDev), (req, res) => {
  console.log(req.body.events);
  res.json(req.body.events) // req.body will be webhook event object
  const event = req.body.events[0];
  console.log(event);
	/*
	client.pushMessage('Cdac78612063d56cf72edde22bfbb7513', {
  		type: 'text',
  		text: 'hello, world DEV',
	});
	*/
});	

app.post('/msg', middleware(config), (req, res) => {
  console.log(req.body.events);
  res.json(req.body.events) // req.body will be webhook event object
  const event = req.body.events[0];
  console.log(event);
	/*
	client.pushMessage('Cdac78612063d56cf72edde22bfbb7513', {
  		type: 'text',
  		text: 'hello, world DEV',
	});
	*/
});


app.post('/webhookdev', middleware(configDev), (req, res) => {
  console.log(req.body.events);
  res.json(req.body.events) // req.body will be webhook event object
  const event = req.body.events[0];
  console.log(event);
  if (event.type === 'message') {
    const message = event.message;
    if (message.type === 'text' && message.text === 'bye') {
      console.log("USER ID:"+event.source.userId);
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'FROM REPLY TOKEN'
      }).catch((err) => {
        if (err instanceof HTTPError) {
          console.error(err.statusCode);
        }
      });
      client.pushMessage(event.source.userId, { 
        type: 'text', 
	text: 'FROM PUSH MESSAGE' 
      }).catch((err) => {
        if (err instanceof HTTPError) {
          console.error(err.statusCode);
        }
      });
    }
  }

});

app.post('/webhook', middleware(config), (req, res) => {
  console.log(req.body.events);
  res.json(req.body.events) // req.body will be webhook event object
  const event = req.body.events[0];
  console.log(event);
  if (event.type === 'message') {
    const message = event.message;
    if (message.type === 'text' && message.text === 'bye') {      
      console.log("USER ID:"+event.source.userId);
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'FROM REPLY TOKEN'
      }).catch((err) => {
        if (err instanceof HTTPError) {
          console.error(err.statusCode);
        }
      });
      client.pushMessage(event.source.userId, { 
        type: 'text', 
	text: 'FROM PUSH MESSAGE' 
      }).catch((err) => {
        if (err instanceof HTTPError) {
          console.error(err.statusCode);
        }
      });
    }
  }

});

app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
