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

const config3BB = {
  channelAccessToken: 'nezKTA5GMuKLlxdY+kvdWlhEpRaL9o+CC+shoZvtoBqfNppmBpGxx4LK4INhxxWM8Arb9J1YYQ/0J4awOfUjD3TAGCSLyNh4PYliqGkmk/cVWcxjGBQI/iM2FoY/w7DeMRO6UkxE9emUSNqCDVTmQgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '726564d0dd1ad16110d6dbabf9b93158'
}

const client = new Client(configDev);
const clien3bb = new Client(config3BB);

app.set('port', (process.env.PORT || 5000));

app.get('/msgdev/:groupId/:msg',(req, res) => {
  		
	client.pushMessage(req.params.groupId, {
  		type: 'text',
  		text: req.params.msg,
	});
	console.log("Group : "+req.params.groupId+" Message :"+req.params.msg);
	res.send("Group : "+req.params.groupId+" Message :"+req.params.msg);
});

app.get('/msg3bb/:groupId/:msg',(req, res) => {
  		
	client.pushMessage(req.params.groupId, {
  		type: 'text',
  		text: req.params.msg,
	});
	console.log("Group : "+req.params.groupId+" Message :"+req.params.msg);
	res.send("Group : "+req.params.groupId+" Message :"+req.params.msg);
});

app.post('/webhook3bb', middleware(config3BB), (req, res) => {
  console.log(req.body.events);
  res.json(req.body.events) // req.body will be webhook event object
  const event = req.body.events[0];
  if (event.type === 'message') {
    const message = event.message;
    if (message.type === 'text' && message.text === 'BotStatus') {
      console.log("USER ID:"+event.source.userId);
      clien3bb.replyMessage(event.replyToken, {
        type: 'text',
        text: 'I\'m Running'
      }).catch((err) => {
        if (err instanceof HTTPError) {
          console.error(err.statusCode);
        }
      });	    
    }
  }
});


app.post('/webhookdev', middleware(configDev), (req, res) => {
  console.log(req.body.events);
  res.json(req.body.events) // req.body will be webhook event object
  const event = req.body.events[0];
  if (event.type === 'message') {
    const message = event.message;
    if (message.type === 'text' && message.text === 'BotStatus') {
      console.log("USER ID:"+event.source.userId);
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'I\'m Running'
      }).catch((err) => {
        if (err instanceof HTTPError) {
          console.error(err.statusCode);
        }
      });
      client.pushMessage(event.source.userId, { 
        type: 'text', 
	text: 'I\'m Running'
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
  if (event.type === 'message') {
    const message = event.message;
    if (message.type === 'text' && message.text === 'BotStatus') {      
      console.log("USER ID:"+event.source.userId);
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'I\'m Running'
      }).catch((err) => {
        if (err instanceof HTTPError) {
          console.error(err.statusCode);
        }
      });
      client.pushMessage(event.source.userId, { 
        type: 'text', 
	text: 'I\'m Running'
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
