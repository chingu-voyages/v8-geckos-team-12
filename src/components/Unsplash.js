import React, { useState } from 'react'
import Unsplash from 'unsplash-js'
import styled from 'styled-components'

// Unsplash API & IMGIX Image Sizing
const appName = 'placeholder'
const utmData = `?utm_source=${appName}&utm_medium=referral`
const rawPhotoParams = '&dpi=1&fit=clamp'
const collections = [225, 540518, 789734, 827743]
const query = (() => {
  let timeChunk = Math.floor(new Date().getHours() / 4)
  return ['midnight', 'sunrise', 'morning', 'day', 'sunset', 'night'][timeChunk]
})()
// LocalStorage
const currentTime = new Date()
const msDay = 86400000
const storageName = 'unsplashStoreData'
const storedData = JSON.parse(localStorage.getItem(storageName))
// Prevent multiple API calls
let count = 0

const unsplash = new Unsplash({
  applicationId: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
  secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
})

export default ({ setUnsplashData }) => {
  const [unsplashImage, setUnsplashImage] = useState(null)

  const setDestructuredUnsplashImage = ({
    urls,
    links,
    user: { name, links: userLinks },
  }) => {
    setUnsplashImage({ urls, links, name, userLinks })
  }

  const setDestructuredUnsplashData = ({
    user: { links: userLinks },
    user: { name },
  }) => {
    setUnsplashData({
      profileLink: userLinks.html + utmData,
      user: name,
      unsplashLink: 'https://unsplash.com/' + utmData,
    })
  }

  if (!unsplashImage && count === 0) {
    count++
    if (storedData && currentTime - new Date(storedData.timestamp) <= msDay) {
      setDestructuredUnsplashImage(storedData.data)
      setDestructuredUnsplashData(storedData.data)
    } else {
      unsplash.photos
        .getRandomPhoto({ query: query, collections: collections })
        .then(response => response.json())
        .then(json => {
          setDestructuredUnsplashImage(json)
          setDestructuredUnsplashData(json)
          localStorage.setItem(
            storageName,
            JSON.stringify({ timestamp: currentTime, data: json })
          )
        })
        .catch(err => {
          console.log(err)
          setDestructuredUnsplashData(unsplashFailImage)
        })
    }
  }

  return (
    <Modal
      backgroundimg={
        unsplashImage
          ? unsplashImage.urls.raw + rawPhotoParams
          : unsplashFailImage.urls.raw + rawPhotoParams
      }
    />
  )
}

const unsplashFailImage = {
  urls: {
    raw:
      'https://images.unsplash.com/photo-1552250550-6b157b10a60d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjYyMzk5fQ',
    full:
      'https://images.unsplash.com/photo-1552250550-6b157b10a60d?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjYyMzk5fQ',
    regular:
      'https://images.unsplash.com/photo-1552250550-6b157b10a60d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjYyMzk5fQ',
    small:
      'https://images.unsplash.com/photo-1552250550-6b157b10a60d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYyMzk5fQ',
    thumb:
      'https://images.unsplash.com/photo-1552250550-6b157b10a60d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjYyMzk5fQ',
  },
  links: {
    self: 'https://api.unsplash.com/photos/PwCFHWmjoGg',
    html: 'https://unsplash.com/photos/PwCFHWmjoGg',
    download: 'https://unsplash.com/photos/PwCFHWmjoGg/download',
    download_location: 'https://api.unsplash.com/photos/PwCFHWmjoGg/download',
  },
  user: {
    name: 'Javardh',
    links: {
      self: 'https://api.unsplash.com/users/_javardh_001',
      html: 'https://unsplash.com/@_javardh_001',
      photos: 'https://api.unsplash.com/users/_javardh_001/photos',
      likes: 'https://api.unsplash.com/users/_javardh_001/likes',
      portfolio: 'https://api.unsplash.com/users/_javardh_001/portfolio',
      following: 'https://api.unsplash.com/users/_javardh_001/following',
      followers: 'https://api.unsplash.com/users/_javardh_001/followers',
    },
  },
}

const Modal = styled.div`
  background-size: cover;
  position: fixed;
  z-index: -1;
  top: 0;
  background-image: url(${({ backgroundimg }) => backgroundimg});
  color: white;
  font-size: 5em;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
