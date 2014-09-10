---
layout: "content"
image: "Wrench"
title: "Debugging"
text: "Debugging methods and tips for unity3d-store and unity3d-profile."
position: 9
theme: 'platforms'
collection: 'platforms_unity'
---

#**Debugging**

##Unity Debug Messages

Unity debug messages will only be printed out if you build the project with Development Build checked.

![alt text](/img/tutorial_img/unity_debugging/devBuild.png "Developer build")

##Android & iOS Debug Messages

If you want to see full debug messages from android-store and iOS-store you just need to check the box that says "Debug Messages" in the SOOMLA Settings.

![alt text](/img/tutorial_img/unity_debugging/debugMsgs.png "Debug messages")

##Tips

- In Build Settings, when switching between one platform to another, after clicking on "Switch platform" **WAIT** until the circular motion icon at the bottom right corner of the editor disappears! Only then, click on "Build". If you click on "Build" too early you will be likely to run into problems.

- Click on "**Build**", NOT "Build & Run". SOOMLA has a post-build script that needs to run, and clicking on "Build & Run" doesn't give that script a chance.

![alt text](/img/tutorial_img/unity_debugging/switchPlatform.png "Tip")
