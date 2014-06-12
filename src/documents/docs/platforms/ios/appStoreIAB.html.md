---
layout: "content"
image: "Tutorial"
title: "In-app Billing"
text: "iTunes Connect in-app-purchase setup and integration with SOOMLA - define your game's in-app products."
position: 2
---

#**IAB: App Store**

1. Create your app in Apple’s IAP for Developers. If you’re not sure how to do this, please read Apple's [In-App Purchase for Developers](https://developer.apple.com/in-app-purchase/) before continuing.

2. Go to the "Manage In-App Purchases" tab.

    ![alt text](/img/tutorial_img/ios_iab/manageIAP.png "manage IAP")

    - Click on "Create New".

    - Choose the type of the product you would like (Consumable or Non-Consumable).

        <div class="warning-box">Please note that SOOMLA does not support Subscription products, so do not choose this option.</div>

        <div class="info-box">To learn more about Apples’s Consumable/Non-Consumable products please see [Getting Started with In-App Purchase on iOS and OS X](https://developer.apple.com/in-app-purchase/In-App-Purchase-Guidelines.pdf).</div>

        ![alt text](/img/tutorial_img/ios_iab/productTypes.png "Product Types")

    - Insert a Product ID for your product. In the [Getting Started](/docs/platforms/ios/GettingStarted) tutorial you were to define product IDs for the products you wanted to sell in the App Store. Now, when you define the product IDs in the App Store, they should be exactly the same as you defined them in the code.
    ![alt text](/img/tutorial_img/ios_iab/productIDs.png "Product IDs")

    - Fill out the rest of the mandatory information. Don't forget to "Save".

3. When you're done defining your in-app purchase products, click on "View or generate a shared secret". A shared secret is a unique code that you should use when you need to make the call to Apple's servers for your In-App Purchase receipts.

<div class="info-box">SOOMLA is all about free-to-play mobile games, so we recommend you choose the “Free” option in the "Rights and Pricing" tab.</div>

![alt text](/img/tutorial_img/ios_iab/free2play.png "Free-to-play")

##Newbie?

###Some useful tips and links

- Make sure to be using the correct type of user account. While your game is in development mode you'll need to use a test user. Read more about that [here](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnectInAppPurchase_Guide/Chapters/TestingInAppPurchases.html) or [here](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SettingUpUserAccounts.html).

- Make sure to use the correct Bundle ID. Read more about that [here](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/ConfiguringYourApp/ConfiguringYourApp.html).
