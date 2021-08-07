const express = require('express'); // import express module
const bodyParser = require('body-parser'); // import body parser module
const pug = require('pug'); // pug template engine 
const Mailchimp = require('mailchimp-api-v3'); // node js mailchimp wrapper library
const app = express(); // create express instance
app.use(bodyParser.json()); // register middleware to parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // with extended true you can post nested object.
 
app.set('views', './views'); // set views directory, this is defaults to the views directory in the application root directory.
app.set('view engine', 'pug'); // set view engine to pug
 
// home route
app.get('/', (req, res) => {
  res.render('email-subscribe'); // render pug template on home page. which is located at views/email-subscribe.pug
});
 
// handle subscribe form submit event
app.post('/subscribe', (req, res) => {
  const api_key = '8369aeb07804d8e878c0dae6a012633e-us5'; // api key -
  const list_id = 'adbc9c2bcb'; // list id
  const mailchimp = new Mailchimp(api_key); // create MailChimp instance
  mailchimp.post(`audience/${list_id}`, { members: [{ // send a post request to create new subscription to the list
      email_address:req.body.email_address,
      status: "subscribed"
  }]
  }).then((result) => {
    return res.send(result);
  }).catch((error) => {
    return res.send(error);
  });
});
 
// start server at 8080 port.
app.listen(8080, () => {
  console.log('App listening on port 8080');
});