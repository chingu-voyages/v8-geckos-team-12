import fetch from 'node-fetch'

export async function handler(event, context) {
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
