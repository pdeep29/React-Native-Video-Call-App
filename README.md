# React-Native-Video-Call-App
Demo of an video call and audio call app created with zegocloud

## 📱 **Technical Specifications**

- **buildToolsVersion:** 36.0.0
- **Minimum SDK Version:** 24
- **compileSdkVersion Version:** 36
- **Target SDK Version:** 36
- **ndkVersion Version:** 27.1.12297006
- **kotlinVersion Version:** 27.1.12297006
- **Minimum JDK Version:** 17.0.15.6 & above


---
## 🛠️ Getting Started

Follow these steps to set up the project:

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/pdeep29/React-Native-Video-Call-App.git
```

### 2. Install Dependencies

```bash
#For Android
npm install

#For IOS
npm install
cd ios && pod install && cd ..

```
### 3. patch for react-native-keep-awake

open node modules inside react-native-keep-awake
open android => build.gradle
replace repositories {} 
with
repositories {
        google()
        mavenCentral()
}

### 4. Run the App

```bash
# For Debug mode
#For Android
react-native run-android  or  npm run android

#For IOS
react-native run-ios  or  npm run ios

# For Release mode
#For Android
npx react-native run-android --mode release

#For IOS
npx react-native run-ios --mode release

```




## 📄 **License**

This project is licensed under the MIT License.
For questions or suggestions, reach out to [Deep Patel <pdeep7546@gmail.com>](mailto:pdeep7546@gmail.com).