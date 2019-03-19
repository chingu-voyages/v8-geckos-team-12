const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  const body = await fetch(`http://colormind.io/api/`, {
    method: 'POST',
    body: JSON.stringify({ model: `ui` }),
  })
    .then(response => response.json())
    .then(json => json.result)
  console.log(body)
  return {
    statusCode: 200,
    body: JSON.stringify({
      body,
    }),
  }
}
