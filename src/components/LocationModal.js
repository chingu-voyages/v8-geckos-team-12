import React from 'react'
import AlgoliaPlaces from 'algolia-places-react'

export default ({ setLocation }) => {
  return (
    <AlgoliaPlaces
      placeholder={`Couldn't get location from browser. Please enter address.`}
      options={{
        appId: 'plXV2SVUGKZD',
        apiKey: 'e61b88fadade9c8c8ef06ada54b45cc2',
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
  )
}
