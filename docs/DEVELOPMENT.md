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
## Run in Android emulator

Better to run in real phone because barcode scanning is easier. To run in emulator:

```
/android-sdk-linux_x86/emulator/emulator -list-avds
/android-sdk-linux_x86/emulator/emulator @Nexus_6_API_27
```

After that, choose "run on emulator" from browser

## Documentation for external libraries used

* Expo: https://docs.expo.io/versions/latest/react-native/
* Icons: https://oblador.github.io/react-native-vector-icons/
* Nativebase: https://docs.nativebase.io/Components.html
* "Easy" grid: https://github.com/GeekyAnts/react-native-easy-grid
* Hyperlinks: https://github.com/obipawan/react-native-hyperlink

## Other useful links

* Cheat sheet: https://github.com/vhpoet/react-native-styling-cheat-sheet

## Production release checklist

Before release
* Update `version` and `android.versionCode` in `app.js`
* Make sure to have version number also in `production-live-settings.json`
* Update release notes
* Tag the code: `git tag 1.0.1 && git push --tags`
* Test locally

To release:
1. Publish to expo from browser console
1. Make Android release if other than plain JS changes:  `expo build:android`
