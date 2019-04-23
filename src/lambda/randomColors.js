import fetch from 'node-fetch'

export async function handler(event, context) {
  const response = await fetch(`http://colormind.io/api/`, {
    method: 'POST',
    body: JSON.stringify({ model: `ui` }),
  })
  const json = await response.json()
  console.log(json)
  return {
    statusCode: 200,
    body: JSON.stringify({
      colors: json.result,
    }),
  }
}
