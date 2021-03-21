const fetch = require('node-fetch');

const handler = async function (event) {
  try {
    const { queryStringParameters } = event;
    const { endpoint, type } = queryStringParameters;

    let response = null;
    if (type === 'joke') {
      response = await fetch(
        'https://raw.githubusercontent.com/amoudgl/short-jokes-dataset/master/shortjokes.csv',
        {
          headers: { Accept: 'plain/text' },
        }
      );
    } else {
      response = await fetch(`https://api.covid19tracker.ca/${endpoint}/`, {
        headers: { Accept: 'application/json' },
      });
    }

    let data = null;
    if (type === 'joke') {
      data = await response.text();
      const jokeLines = data.split('\n');
      const randomJokeLineNumber = Math.floor(
        Math.random() * (jokeLines.length - 1) + 1
      );
      const selectedJoke = jokeLines[randomJokeLineNumber];
      const startIndexOfJoke = selectedJoke.indexOf(',');
      const actualJoke = selectedJoke.substring(startIndexOfJoke + 1);
      return { statusCode: 200, body: actualJoke };
    } else {
      data = await response.json();
      return { statusCode: 200, body: JSON.stringify(data) };
    }
  } catch (error) {
    // output to netlify function log
    console.log(error);
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
