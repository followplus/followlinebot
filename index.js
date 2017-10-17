const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const Client = require('@line/bot-sdk').Client;

const app = express()

const config = {
  channelAccessToken: 'p5lgfavV9OOvKaVfuST/I2hUoxUyghh02ErUY7d1eyrrLGNzNFmWMha2K1Xd/xv19Bjh1wTfpNFDuwqAtJ9dW25EjwjIGZM+ayNGqb6dU5pXnuN7S8aqr2yzpWYtlMnKCxkkeOmWVtpH0F7pu33ilQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '17bd5614fefc02b11e78ad145173b22b'
}

const client = new Client({
  channelAccessToken: 'p5lgfavV9OOvKaVfuST/I2hUoxUyghh02ErUY7d1eyrrLGNzNFmWMha2K1Xd/xv19Bjh1wTfpNFDuwqAtJ9dW25EjwjIGZM+ayNGqb6dU5pXnuN7S8aqr2yzpWYtlMnKCxkkeOmWVtpH0F7pu33ilQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '17bd5614fefc02b11e78ad145173b22b'
});

app.set('port', (process.env.PORT || 5000));

app.post('/webhook', middleware(config), (req, res) => {
  console.log(req.body.events);
  res.json(req.body.events) // req.body will be webhook event object
  const event = req.body.events[0];

  if (event.type === 'message') {
    const message = event.message;
    if (message.type === 'text' && message.text === 'bye') {
      console.log("USER ID:"+event.source.userId);
      client.pushMessage(event.source.userId, { type: 'text', text: 'hello, world' });
    }
  }


});

app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
