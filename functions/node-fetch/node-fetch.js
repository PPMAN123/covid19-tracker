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
      return { statusCode: 200, body: data };
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
