import React, { useState } from 'react'

export default function RedditFeed() {
  const [feed, setFeed] = useState([])
  const fetchData = async () => {
    const response = await fetch(`https://www.reddit.com/r/javascript/.json`)
    const json = await response.json()
    const data = await json.data
    if (!feed.length) {
      setFeed(data.children.slice(0, 10))
    }
  }
  fetchData()
  return (
    <ul>
      {feed.map(post => (
        <li>{post.data.title}</li>
      ))}
    </ul>
  )
}
