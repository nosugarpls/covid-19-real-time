const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;
const session = require('./session');
const message = require('./message');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  if(!sid) {
    res.status(401).json({ error: 'session-required' });
    return;
  }
  if(!session.isValid(sid)) {
    res.status(403).json({ error: 'session-invalid' });
    return;
  }
  res.status(200).json(session.details[sid]);
});

app.post('/api/session', (req, res) => {
  const username = req.body.username;
  const { sid, error } = session.create({ username });
  if(error) {
    res.status(400).json(error);
    return;
  }
  res.cookie('sid', sid);
  res.status(200).json(session.details[sid]);
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  session.remove(sid);
  res.clearCookie('sid');
  res.status(200).json({ sid, status: 'removed' });
});

app.get('/api/messages', (req, res) => {
  const sid = req.cookies.sid;
  if( !sid) {
    res.status(401).json({ error: 'session-required' });
    return;
  }
  if( !session.isValid(sid) ) {
    res.clearCookie('sid');
    res.status(403).json({ error: 'session-invalid' });
    return;
  }
  res.status(200).json(message.messages);
});

app.post('/api/messages', (req, res) => {
  const sid = req.cookies.sid;
  if( !sid) {
    res.status(401).json({ error: 'session-required' });
    return;
  }
  if( !session.isValid(sid) ) {
    res.clearCookie('sid');
    res.status(403).json({ error: 'session-invalid' });
    return;
  }
  message.addMessage(
    session.details[sid], 
    new Date(), 
    req.body.text
  );
  res.status(200).json(message.messages);
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
}); 