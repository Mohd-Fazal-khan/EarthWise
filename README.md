# EarthWise – Smart Soil Monitoring App

EarthWise is a cross-platform mobile application built with [Expo](https://expo.dev) and React Native, designed for real-time soil monitoring. It enables users to log, visualize, and analyze soil temperature and moisture readings, supporting sustainable agriculture and gardening practices.

---

## a. Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- Firebase project credentials (already configured in [`firebase/firebaseconfig.ts`](firebase/firebaseconfig.ts))

### Installation

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd EarthWise
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the app:**
   ```sh
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

---

## b. Assumptions Made

### Bluetooth

- **No Bluetooth functionality is currently implemented.**
- The app assumes soil readings are either simulated or entered via Firebase, not received via Bluetooth from external hardware.
- If Bluetooth sensor integration is required, additional modules (e.g., [`react-native-ble-plx`](https://github.com/dotintent/react-native-ble-plx)) and permissions must be added, along with native code for device pairing and data acquisition.

### User Authentication

- Firebase Authentication is used for login and registration.
- Only authenticated users can log or view soil readings.

### Data Storage

- All soil readings are stored per user in Firebase Firestore under the `soilReadings` collection.

### Network Connectivity

- The app checks for internet connectivity before authentication and data operations.
- Offline mode is not supported; users must be online to use core features.

---

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
