# Ionic 4 TrueJobs app for Android/IOS

## features
- for IOS & Android

## android & ios Apps
- https://play.google.com/store/apps/details?id=io.ionic.india.truejobs&hl=en
- https://itunes.apple.com/nl/app/truejobs-india/id1340430304?l=en&mt=8

##Publish android
- ionic cordova build android --prod --release
- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore c:/projects/truejobs_app/platforms/android/build/outputs/apk/release/android-release-unsigned.apk suk_keye
- C:\Users\chaha\AppData\Local\Android\sdk\build-tools\27.0.1\zipalign -v 4 c:/projects/truejobs_app/platforms/android/build/outputs/apk/release/android-release-unsigned.apk c:/projects/truejobs_app/platforms/android/build/outputs/apk/release/truejobs_app-release.apk

##Publish IOS
- ionic cordova emulate ios -- --buildFlag="-UseModernBuildSystem=0"
- rvm use system
- ionic cordova build ios --prod --release

