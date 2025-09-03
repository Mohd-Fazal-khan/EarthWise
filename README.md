# EarthWise - A Smart Monitoring App for Temperature and Moisture 🌿

EarthWise is a versatile cross-platform mobile application built with Expo and React Native, engineered for detailed environmental monitoring. It allows users to actively log, visualize, and analyze critical readings like temperature and moisture, providing valuable insights to support sustainable agriculture and gardening practices.

This app empowers both professional farmers and home gardeners to make data-driven decisions. By tracking these key metrics over time, you can optimize watering schedules, predict ideal planting times, and ensure the health of your crops and plants.
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
   git clone https://github.com/Mohd-Fazal-khan/EarthWise.git
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

### Features
---

### User Authentication

- Firebase Authentication is used for login and registration.
- Only authenticated users can log or view soil readings.

### Data Storage

- All soil readings are stored per user in Firebase Firestore under the `Readings` collection.

### Network Connectivity

- The app checks for internet connectivity before authentication and data operations.
- Offline mode is not supported; users must be online to use core features.

---
## b. Assumptions Made

### Bluetooth

- **No Bluetooth functionality is currently implemented.**
- The app assumes soil readings are either simulated or entered via Firebase, not received via Bluetooth from external hardware.
- If Bluetooth sensor integration is required, additional modules (e.g., [`react-native-ble-plx`](https://github.com/dotintent/react-native-ble-plx)) and permissions must be added, along with native code for device pairing and data acquisition.

  
## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Made By
Mohd Fazal Khan
