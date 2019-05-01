import fetch from 'node-fetch'

export async function handler(event, context) {
  const { query } = event.queryStringParameters
  const response = await fetch(
    `https://www.reddit.com/api/subreddit_autocomplete_v2.json?query=${query}&include_over_18=false&include_categories=false&include_profiles=false&limit=10`
  )
  const json = await response.json()
  const data = await json.data.children.map(({ data }) => data)
  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  }
}
