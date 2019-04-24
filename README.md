# v8-geckos-team-12

Chingu Voyage-8 | https://chingu.io/

Dashboard App that gets the user's current location and displays the weather forcast, relevant news, reddit feed from a selected subreddit, user's location, and a background photo based on the location.

We are still adding more features so this will be updated later on.

## To get started

Clone repo
```shell
git clone https://github.com/chingu-voyages/v8-geckos-team-12.git
```

Install node packages

```shell
npm install
```

Get any API keys that you are missing.

* [Angolia Search](https://www.algolia.com/users/sign_up "Get Angolia Search API key")
* [Open Weather Maps](https://openweathermap.org/api "Get Open Weather Maps API key")
* [Unsplash](https://unsplash.com/developers "Get Unsplash API key")
* [News API](https://newsapi.org/ "Get News API key")

Save a .env in root of project with your API keys.

```shell
REACT_APP_ANGOLIA_APP_ID=[Angolia API ID]
REACT_APP_ANGOLIO_API_KEY=[Angolia API key]
REACT_APP_OWM_API_KEY=[Open Weather Map API key]
REACT_APP_UNSPLASH_ACCESS_KEY=[Unsplash access key]
REACT_APP_UNSPLASH_SECRET_KEY=[Unsplash secret key]
REACT_APP_NEWS_API_KEY=[News API key]
```

## To start development server

```shell
npm start
```

## Open in browser

http://localhost:3000

## To test lambda endpoints in development

http://localhost:3000/.netlify/functions/[function name here]

## Notes for deploying to netlify

Make sure to add your API keys into your netlify build's environment variables.

## Production Deployment

https://geckos.netlify.com/

## Development Deployment

https://development--geckos.netlify.com/

## Branch Deployments

To view branch deploy, prefix production url with branch name.

https://[BranchNameHere]--geckos.netlify.com/
