import React, { useState } from 'react'
import Unsplash from 'unsplash-js'
import styled from 'styled-components'

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
      .catch(err => unsplashFailImage)
  }

  return (
    <Modal
      backgroundImg={
        unsplashImage ? unsplashImage.urls.full : unsplashFailImage.urls.full
      }
    />
  )
}

const unsplashFailImage = {
  description: 'brown mountain during daytime',
  urls: {
    raw:
      'https://images.unsplash.com/photo-1550826922-6d09633993aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjYxNTM3fQ',
    full:
      'https://images.unsplash.com/photo-1550826922-6d09633993aa?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjYxNTM3fQ',
    regular:
      'https://images.unsplash.com/photo-1550826922-6d09633993aa?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjYxNTM3fQ',
    small:
      'https://images.unsplash.com/photo-1550826922-6d09633993aa?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYxNTM3fQ',
    thumb:
      'https://images.unsplash.com/photo-1550826922-6d09633993aa?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjYxNTM3fQ',
  },
  links: {
    self: 'https://api.unsplash.com/photos/vFqAiohv0F4',
    html: 'https://unsplash.com/photos/vFqAiohv0F4',
    download: 'https://unsplash.com/photos/vFqAiohv0F4/download',
    download_location: 'https://api.unsplash.com/photos/vFqAiohv0F4/download',
  },
  name: 'Anna Smith',
  userLinks: {
    self: 'https://api.unsplash.com/users/annasmith206',
    html: 'https://unsplash.com/@annasmith206',
    photos: 'https://api.unsplash.com/users/annasmith206/photos',
    likes: 'https://api.unsplash.com/users/annasmith206/likes',
    portfolio: 'https://api.unsplash.com/users/annasmith206/portfolio',
    following: 'https://api.unsplash.com/users/annasmith206/following',
    followers: 'https://api.unsplash.com/users/annasmith206/followers',
  },
}

const Modal = styled.div`
  background-size: cover;
  position: fixed;
  z-index: -1;
  top: 0;
  background-image: url(${({ backgroundImg }) => backgroundImg});
  color: white;
  font-size: 5em;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
