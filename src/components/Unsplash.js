import React, { useState } from 'react'
import Unsplash from 'unsplash-js'
const unsplash = new Unsplash({
  applicationId: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
  secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
})

export default ({ query }) => {
  const [unsplashImage, setUnsplashImage] = useState(null)
  const setDestructuredUnsplashImage = ({
    description,
    urls,
    links,
    user: { name, links: userLinks },
  }) => {
    setUnsplashImage({ description, urls, links, name, userLinks })
  }
  if (!unsplashImage) {
    unsplash.photos
      .getRandomPhoto({ query })
      .then(response => response.json())
      .then(json => setDestructuredUnsplashImage(json))
      .catch(err => console.log(err))
  }

  return (
    <div>
      Unsplash:{' '}
      {unsplashImage
        ? JSON.stringify(unsplashImage)
        : 'Need to add default unsplash image for failed fetch'}
    </div>
  )
}
