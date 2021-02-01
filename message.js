const messages = [
  {
    sender: "Robot",
    timestamp: new Date("2020-10-01 19:20:00"),
    text: "Welcome to the COVID-19 real-time discussion forum."
  },
  {
    sender: "Robot",
    timestamp: new Date("2020-11-01 19:21:00"),
    text: "Hi, how's everything going?"
  }
];

function addMessage(sender, timestamp, text) {
  messages.push({
    sender: sender,
    timestamp: timestamp,
    text: text
  });
}

const message = {
  messages,
  addMessage
};

module.exports = message; 