---
layout: 'content'
image: 'Tutorial'
title: 'GOOGLE PLAY'
text: 'Did you know that more frozen bananas are sold right here on this boardwalk than anywhere in the OC?'
position: 4
---

**Define Your Economy in Google Play**
===

1. Create your app in Google Play Developer Console. If you’re not sure how to do this, please read Google’s tutorial [Android In-app Billing](http://developer.android.com/guide/google/play/billing/index.html) before continuing. 

2. Once you’ve created your app, go to the "Store Listing" tab and fill in all of the fields marked with *. Don’t forget to click “Save” when you’re done.
![image alt text](/img/docs/university/1_StoreListing.png)

3. Go to the "Pricing & Distribution" tab. SOOMLA is all about free-to-play mobile games, so make sure to choose the “Free” option. Then fill out the rest of the fields on that page. 
![image alt text](/img/docs/university/2_Priceng&Distribution.png)

4. Go to the "In-app Products" tab. 

- Click on "Add new product". Choose the type of the product you would like (Managed or Unmanaged). 

    > NOTE: SOOMLA currently does not support Subscription products, so do not choose this option. To learn more about Google’s Managed/Unmanaged products please see [In-app Billing Version 3 - Product Types](http://developer.android.com/google/play/billing/api.html).

- Insert a Product ID for your product. Notice that once you choose a product ID you cannot change it. 

    > NOTE: After this tutorial, you'll need to follow Part 2 of "Getting Started".
    > There you will need all of the product IDs that you defined in the Google Play Dev Console.

- Once you click "Continue" you will be transferred to a page where you’ll need to fill out more details for your product. Fill in all fields marked with *. Notice that under Pricing, you can click on “Auto-convert prices now” and that will automatically set local prices for all other countries based on the exchange rate. 
![image alt text](image_3.png)

- A new in-app product’s default status is "inactive". You will need to set it to “Active” in order to make it available throughout Google Play. Click on the "Save" button. Go back to the in-app products list.
![image alt text](image_4.png)

- Notice that there’s an Import/Export button at mid-top of the page. You can use this option if you would like to import/export in-app products from a CSV file. To read more, see [Adding a batch of items to a product list](http://developer.android.com/google/play/billing/billing_admin.html#billing-bulk-add).
![image alt text](image_5.png)

5. Go to the "Services & APIs" tab. Make note of your license key, you will need it soon when you get to Part 2 of the “Getting Started” tutorial. 
![image alt text](image_6.png)

6. **When you’re ready:** From any tab in your app, you can click on the "Unpublished" button at the top-right corner, and change it to “Publish”. This will make your game available throughout Google Play. 
![image alt text](image_7.png)


### Now you’re ready for Getting Started - PART 2!

