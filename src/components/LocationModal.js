import React from 'react'
import AlgoliaPlaces from 'algolia-places-react'
import styled from 'styled-components'

export default ({ setLocation }) => {
  return (
    <Modal>
      <StyledAngoliaBox
        placeholder={`Couldn't get location from browser. Please enter address.`}
        options={{
          appId: process.env.REACT_APP_ANGOLIA_APP_ID,
          apiKey: process.env.REACT_APP_ANGOLIO_API_KEY,
        }}
        onChange={({
          query,
          rawAnswer,
          suggestion: {
            latlng: { lat, lng },
          },
          suggestionIndex,
        }) => setLocation({ latitude: lat, longitude: lng, available: true })}
        // onSuggestions={({ rawAnswer, query, suggestions }) =>
        //   console.log(
        //     'Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed.'
        //   )
        // }
        // onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) =>
        //   console.log('Fired when arrows keys are used to navigate suggestions.')
        // }
        // onClear={() => console.log('Fired when the input is cleared.')}
        // onLimit={({ message }) =>
        //   console.log('Fired when you reached your current rate limit.')
        // }
        // onError={({ message }) =>
        //   console.log(
        //     'Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.'
        //   )
        // }
      />
    </Modal>
  )
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  background: navy;
  color: white;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledAngoliaBox = styled(AlgoliaPlaces)`
  width: 75vw;
`
