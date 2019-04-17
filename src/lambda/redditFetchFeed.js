import fetch from 'node-fetch'

export async function handler(event, context) {
  const { query } = event.queryStringParameters
  const response = await fetch(`https://www.reddit.com/r/${query}/.json`)
  const json = await response.json()
  const data = await json.data.children.map(({ data }) => ({ data: data }))
  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  }
}
