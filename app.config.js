import "dotenv/config"

const projectName = "Panttipullo"
const packageName = "fi.mvestola.panttipullo"
const versionNumber = "1.1.0"
const androidVersionCode = 11
const googleMobileAdsAppId = "ca-app-pub-0260854390576047~9146307330"

export default {
  expo: {
    name: projectName,
    description: "React Native application for Android to scan barcode from Finnish beverage package to check if you get deposit or not",
    slug: projectName,
    privacy: "public",
    platforms: [
      "ios",
      "android",
    ],
    version: versionNumber,
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    androidStatusBar: {
      barStyle: "light-content",
      backgroundColor: "#004521",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: [
      "**/*",
    ],
    ios: {
      bundleIdentifier: packageName,
      supportsTablet: true,
      config: {
        googleMobileAdsAppId,
      },
    },
    android: {
      package: packageName,
      versionCode: androidVersionCode,
      playStoreUrl: "https://play.google.com/store/apps/details?id=fi.mvestola.panttipullo",
      permissions: [
        "CAMERA",
        "VIBRATE",
      ],
      config: {
        googleMobileAdsAppId,
      },
    },
    githubUrl: "https://github.com/mvestola/panttipullo-react-native",
    packagerOpts: {
      sourceExts: [
        "js",
        "json",
        "ts",
        "tsx",
        "jsx",
      ],
    },
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
  },
}
