---
layout: "content"
image: "InAppPurchase"
title: "Amazon In-app Billing"
text: "Amazon in-app-purchase setup and integration with SOOMLA - define your game's in-app products."
position: 3
theme: 'platforms'
collection: 'platforms_android'
---

#**Amazon IAB**

##Follow these steps

 1. Create your app in Amazon Appstore Developer Console. If you're not sure how to do this, please read [Amazon In-app Billing](https://developer.amazon.com/public/support/submitting-your-app/tech-docs/submitting-your-app) before continuing.

 2. Once you’ve created your app, fill out the mandatory fields under the "General Information" tab. Click “Save” when you’re done.

 3. Go to the "In-app Items" tab. Before you add any items you'll find an explanation of the different item types.
    - Click on "Add a Consumable" or "Add an Entitlement".
        <div class="warning-box">Please note that SOOMLA does not support Subscription products, so do not choose this option.</div>

        ![alt text](/img/tutorial_img/amazon_iab/.png "")

    - Fill in the mandatory fields.

    - Insert a Product ID for your product. If you followed the steps in the [Getting Started](/docs/platforms/unity3d/GettingStarted) tutorial, you created product IDs for the items you wanted to sell in Amazon App Store. Now you need to insert the EXACT product IDs here.

        ![alt text](/img/tutorial_img/ios_iab/productIDs.png "Product IDs")

    - Fill out the rest of the mandatory information. Don't forget to "Save".
    ![alt text](/img/tutorial_img/amazon_iab/.png "")

    <div class="info-box">SOOMLA is all about free-to-play mobile games, so we recommend you set your app's "Base list price" to 0.00 in the “Availability & Pricing” tab.</div>


##Newbie?

###Some useful tips and links

- Amazon provides a testing service you can find [here](https://developer.amazon.com/tya/welcome.html).

- Here is a guide on how to [export a project in Android Studio](http://stackoverflow.com/questions/16622843/how-do-i-export-a-project-in-the-android-studio/19876060#19876060) (generate a signed APK).
