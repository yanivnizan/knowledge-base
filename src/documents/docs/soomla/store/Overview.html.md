---
layout: "content"
image: "Tutorial"
title: "Overview"
text: "SOOMLA is the first store creation platform for mobile games. Use our open-source framework to easily create your in-game economy."
position: 1
theme: 'soomla'
collection: 'soomla_store'
---

#**SOOMLA's Store Module**

SOOMLA is the first store creation platform for mobile games. SOOMLA helps you easily create your in-game economy.

##Open Source
The SOOMLA Project is an open source framework for mobile game economies. Its goal is to allow mobile game developers easier implementation of virtual currencies, virtual goods and in-app purchases. SOOMLA has decided to create and freely support The SOOMLA Project in order to provide the ultimate game economy solution for the mobile game dev community. [Learn more...](http://soom.la/)

Through our open source project you get a lot of game economy features like: economy data model, local storage, in-app purchasing interfaces to 3rd party providers, and various easy-to-use store related operations.

SOOMLA's open source code is currently available for Android, iOS, Unity3d, and Cocos2d-x. In the near future, SOOMLA will be available for additional game engines.

![alt text](/img/tutorial_img/soomla_diagrams/SoomlaBuildingBlocks.png "Soomla Building Blocks")

##The Building Blocks

###Economy Model
Every game economy includes virtual currencies and virtual goods that can be purchased. The Economy Model guide explains the different entities that can be found throughout the economy. [Learn more...](/docs/soomla/store/EconomyModel)

###IStoreAssets
This interface represents your game's economy. You will need to implement your version of IStoreAssets. [Learn more...](/docs/soomla/store/IStoreAssets)

###Local Storage
You users get access to their data even when there’s no internet around. Our encrypted local storage is designed just for that. [Learn more...](/docs/soomla/store/Storage)

###Event Handling
Throughout the SOOMLA SDK events are fired and need to be handled with your game-specific behavior. [Learn more...](/docs/soomla/store/Events)

###One API in various platforms
Each link to every one of the different platforms will lead you to tutorials on how to get started including in-app billing integration, as well as guides that explain the building blocks of SOOMLA platform-specifically with lots of examples.  

[android-store](/docs/platforms/android)

[iOS-store](/docs/platforms/ios)

[unity3d-store](/docs/platforms/unity)

[cocos2dx-store](/docs/platforms/cocos2dx)

###Platform-specific IAP

Android: [Google Play](/docs/platforms/android/GooglePlayIAB) and [Amazon App Store](/docs/platforms/android/AmazonIAB)

iOS: [App Store](/docs/platforms/ios/AppStoreIAB)
