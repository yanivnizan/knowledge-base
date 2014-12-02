---
layout: "content"
image: "Tutorial"
title: "Getting Started"
text: "Get started with ios-profile. Here you can find integration instructions and a basic example of initialization."
position: 1
theme: 'platforms'
collection: 'ios_profile'
module: 'profile'
platform: 'ios'
---

#Getting Started

<div class="info-box">Profile depends on SOOMLA's Core module. This document assumes that you are new to SOOMLA and have not worked with any of the other SOOMLA modules. If this is not the case, and you already have Core & Store, please follow these directions only for the Profile module.</div>

##General Instructions

###Facebook


###Google+

###Twitter













##Example

Below is an example of initializing Profile, logging the user into Facebook, and sharing a story on the user's Facebook wall. To see a full example, please see [cocos2dx-profile-example](https://github.com/soomla/cocos2dx-profile-example). To learn about the different entities and functionality of Profile, see [Main Classes & Operations](/docs/platforms/cocos2dx/Profile_MainClasses).

<br>

Initialize ServiceManager and Profile in `AppDelegate.cpp`.

``` cpp
__Dictionary *commonParams = __Dictionary::create();
commonParams->setObject(__String::create("ExampleCustomSecret"), "customSecret");
soomla::CCServiceManager::getInstance()->setCommonParams(commonParams);

...

__Dictionary *profileParams = __Dictionary::create();
soomla::CCProfileService::initShared(profileParams);
```

<br>
Initialize your event handler (in this example say your event handler class is called MyEventHandler).

``` cpp
soomla::CCMyEventHandler *myHandler = new MyEventHandler();
...
soomla::CCProfileEventDispatcher::getInstance()->addEventHandler(myHandler);
```

<br>
Log the user into Facebook.

``` cpp
soomla::CCProfileController::getInstance()->login(soomla::FACEBOOK, &profileError);
```

<br>
Share a story on the user's Facebook wall.

``` cpp
soomla::CCProfileController::getInstance()->updateStory(
    soomla::FACEBOOK,
    "Check out this great story by SOOMLA!",
    "SOOMLA is 2 years young!",
    "SOOMLA Story",
    "soomla_2_years",
    "http://blog.soom.la/2014/08/congratulations-soomla-is-2-years-young.html",
    "http://blog.soom.la/wp-content/uploads/2014/07/Birthday-bot-300x300.png",
    soomla::CCBadgeReward::create("sheriff", "Sheriff"), &profileError  
);
```

And that's it! cocos2dx-profile knows how to contact the social provider (Facebook, Twitter, Google+ etc.) and perform social actions with the information you provide.
