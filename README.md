# Ionic 4 TrueJobs app for Android/IOS

## features
- for IOS & Android

## android & ios Apps
- https://play.google.com/store/apps/details?id=io.ionic.india.truejobs&hl=en
- https://itunes.apple.com/nl/app/truejobs-india/id1340430304?l=en&mt=8

##Publish android
- ionic cordova build android --prod --release
- cd "C:\Program Files\Java\jdk1.8.0_191\bin\"
- .\jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore C:\projects\truejobs_app2\my-release-key.keystore C:\projects\truejobs_app2\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk suk_keye
- C:\Users\chaha\AppData\Local\Android\sdk\build-tools\27.0.1\zipalign -v 4 C:\projects\truejobs_app2\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk c:/projects/truejobs_app2/platforms/android/app/build/outputs/apk/release/truejobs_app-release.apk

##Publish IOS
- ionic cordova emulate ios -- --buildFlag="-UseModernBuildSystem=0"
- rvm use system
- ionic cordova build ios --prod --release
