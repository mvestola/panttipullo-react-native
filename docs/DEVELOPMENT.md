# Development instructions

## Requirements

Following software is recommended for development:
* Operating system: Ubuntu
* IDE: IntelliJ IDEA
* Version control: Git

Install following software for development:
* [NVM](https://github.com/creationix/nvm)
* [Expo client and Expo App](https://docs.expo.io/versions/latest/introduction/installation)

## Setup


```
git clone git@github.com:mvestola/panttipullo-react-native.git
npm install
npm start
```

## Documentation for external libraries used

* Expo: https://docs.expo.io/versions/latest/react-native/
* Icons: https://oblador.github.io/react-native-vector-icons/
* Nativebase: https://docs.nativebase.io/Components.html

## Production release checklist

Before release
* Update version number and version code in `app.js` and `AppSettingsDomainStore.js`
* Make sure to have version number also in `production-live-settings.json`
* Update release notes
* Test locally

To release:
1. Publish to expo from browser console
1. Make Android release if other than plain JS changes:  `expo build:android`
