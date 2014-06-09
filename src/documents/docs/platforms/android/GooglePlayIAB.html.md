---
layout: "content"
image: "Tutorial"
title: "Google Play In-app Billing"
text: "Google Play in-app-purchase setup and integration with SOOMLA - define your game's in-app products."
position: 2
---

#**IAB: Google Play**

##Follow these steps

 1. Create your app in Google Play Developer Console. If you’re not sure how to do this, please read Google’s tutorial [Android In-app Billing](http://developer.android.com/guide/google/play/billing/index.html) before continuing.

 2. Once you’ve created your app, go to the “Store Listing” tab and fill in all of the mandatory fields marked with ‘*’. Don’t forget to click “Save” when you’re done.

    ![alt text](/img/tutorial_img/google_play_iab/soomlaStoreEx.png "Store Listing")

 3. Go to the “In-app Products” tab.

  - Click on “Add new product”.

  - Choose Managed product.

          <div class="warning-box">Please note that SOOMLA does not support Subscription products, so do not choose this option.</div>

          <div class="info-box">Google’s in-app billing v3 treats Unmanaged products as Managed products. Therefore we recommend you make all of your in-app products Managed. If your game already contains Unmanaged products see [Google’s documentation](http://developer.android.com/google/play/billing/billing_overview.html#migration).</div>

          ![alt text](/img/tutorial_img/google_play_iab/managedProduct.png "In-app products")

          To learn more about Google’s Managed/Unmanaged products please see [In-app Billing Version 3 - Product Types](http://developer.android.com/google/play/billing/api.html).

  - Insert a Product ID for your product. In the [Getting Started](/docs/platforms/android/GettingStarted) tutorial you were to define product IDs for the products you wanted to sell in Google Play. Now, when you define the product IDs in Google Play, they should be exactly the same as you defined them in the code.

  - Once you click “Continue” you will be transferred to a page where you’ll need to fill out more details for your product. Fill in all of the mandatory fields marked with ‘*’. Notice that under Pricing, you can click on “Auto-convert prices now” and that will automatically set local prices for all other countries based on the exchange rate.

          ![alt text](/img/tutorial_img/google_play_iab/autoConvertPrices.png "In-app products pricing")

  - Click on the “Save” button. Go back to the in-app products list.

 4. Go to the “Services & APIs” tab and make note of your license key. You need to insert it into the code.

    ![alt text](/img/tutorial_img/google_play_iab/licenseKey.png "License key")

<div class="info-box">SOOMLA is all about free-to-play mobile games, so we recommend you choose the “Free” option in the “Pricing & Distribution” tab.</div>

##Newbie?

###Some useful tips and links

- Make sure you have a test account defined in Google Play and a device using that test account.

- Make sure you know the difference between sandbox testing and real testing. To learn more read [Google’s Testing In-app Billing](developer.android.com/google/play/billing/billing_testing.html).

- Here is a guide on how to [export a project in Android Studio](http://stackoverflow.com/questions/16622843/how-do-i-export-a-project-in-the-android-studio/19876060#19876060) (generate a signed APK).
