# Development instructions

## Requirements

Following software is recommended for development:
* Operating system: Ubuntu
* IDE: IntelliJ IDEA
* Version control: Git

Install following software for development:
* [NVM](https://github.com/creationix/nvm)
* [Expo client and Expo App](https://docs.expo.io/versions/latest/introduction/installation)

## Initial setup


```
git clone git@github.com:mvestola/panttipullo-react-native.git
npm install
cp example.env .env
```

Provide proper Sentry details in `.env` file for JS error reporting.

## Development

```
npm run eslint
npm start
```

## Run in Android emulator

Better to run in real phone because barcode scanning is easier. To run in emulator:

```
/android-sdk-linux_x86/emulator/emulator -list-avds
/android-sdk-linux_x86/emulator/emulator @Nexus_6_API_27
```

After that, choose "run on emulator" from browser

## Upgrading

Upgrade expo and other packages:
```
npm i -g expo-cli
expo upgrade
git commit
npm i -g npm-check-updates && ncu -u
# Check that expo/react packages were not upgraded too much
rm -rf node_modules && rm package-lock.json
npm install
```

## Documentation for external libraries used

* Expo: https://docs.expo.io/versions/latest/react-native/
* Icons: https://oblador.github.io/react-native-vector-icons/
* Nativebase: https://docs.nativebase.io/Components.html
* "Easy" grid: https://github.com/GeekyAnts/react-native-easy-grid
* Hyperlinks: https://github.com/obipawan/react-native-hyperlink

## Third party services used

* Amplitude for analytics: https://amplitude.com/
* Sentry for error reporting: https://sentry.io/

## Other useful links

* Cheat sheet: https://github.com/vhpoet/react-native-styling-cheat-sheet

## Production release checklist

Before release
* Update `versionNumber` and `androidVersionCode` in `app.config.js`
* Make sure to have version number also in `production-live-settings.json`
* Update release notes
* Tag the code: `git tag 1.0.1 && git push --tags`
* Test locally

To release:
1. Publish to expo: `npm run publish`
1. Make Android release if other than plain JS changes:  `npm run build-android`
