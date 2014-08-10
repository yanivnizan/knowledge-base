---
layout: "content"
image: "Wrench"
title: "Debugging"
text: "Debugging methods and tips for cocos2dx-store."
position: 5
theme: 'platforms'
collection: 'platforms_cocos2dx'
---

#**Debugging**

##Enable cocos2dx-store debug logging

You can enable debug logging in cocos2dx-store by setting `SOOMLA_DEBUG` in `CCStoreUtils.h` to `true`. Debug logging can also be enabled at build time by doing the following:

###Android

Add `-DSOOMLA_DEBUG=1` to `APP_CPPFLAGS` in your `Application.mk`

###iOS

Set `SOOMLA_DEBUG=1` in your Build Settings `Preprocessor Macros`

![alt text](/img/tutorial_img/cocos2dx_debugging/debugging.png "Debugging")
