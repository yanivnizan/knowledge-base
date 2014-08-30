---
layout: "content"
image: "Modeling"
title: "Economy Model & Operations"
text: "Every game economy can be based on SOOMLA's economy model. The game economy entities that SOOMLA provides are virtual currencies, currency packs, and virtual items of all sorts."
position: 2
theme: 'platforms'
collection: 'platforms_cocos2dx'
---

#**Economy Model & Operations**

SOOMLA’s cocos2dx-store provides a complete data model implementation for virtual economies. Every game economy has currencies, packs of currencies that can be sold, and items that can be sold either for money or in exchange for other items.

This tutorial has brief descriptions of each entity in the economy model, but lots of examples. We recommend that you also read SOOMLA Economy Model, where you will find more detailed explanations for each of the different entities.

##PurchaseTypes

Purchase types are used to indicate whether an item will be purchased with money or with other virtual items.

<div class="info-box">In the examples below the declarations of purchase types are shown as a part of PurchasableVirtualItem declarations, because this is the most common use of purchase types.</div>

###[PurchaseWithMarket](https://github.com/soomla/cocos2dx-store/blob/master/Soomla/PurchaseTypes/CCPurchaseWithMarket.h)

This type of purchase is with money. Items with this purchase type must be defined in the Market (Google Play, App Store).
There are 2 ways to define this purchase type.

``` cpp
CCNonConsumableItem *noAdsNoncons = CCNonConsumableItem::create(
    ...
    CCPurchaseWithMarket::createWithMarketItem(             // purchase type
        CCMarketItem::create(
            CCString::create(NO_ADDS_NONCONS_PRODUCT_ID),   // product ID
            CCInteger::create(CCMarketItem::NONCONSUMABLE), // product type
            CCDouble::create(1.99))                         // initial price
));
```

OR

``` cpp
CCVirtualCurrencyPack *thousandmuffPack = CCVirtualCurrencyPack::create(
    ...
    CCPurchaseWithMarket::create(                           // purchase type
        CCString::create(THOUSANDMUFF_PACK_PRODUCT_ID),     // product ID
        CCDouble::create(8.99))                             // initial price
);
```

The `productId` that is used to define a new `MarketItem` must match the product ID defined in the Market (Google Play, App Store).

###[PurchaseWithVirtualItem](https://github.com/soomla/cocos2dx-store/blob/master/Soomla/PurchaseTypes/CCPurchaseWithVirtualItem.h)
This type of purchase is with some amount of other virtual items.

``` cpp
// A chocolate cake good can be purchased with 250 muffin currency units
CCVirtualGood *chocolatecakeGood = CCSingleUseVG::create(
    ...
    CCPurchaseWithVirtualItem::create(
        CCString::create(MUFFIN_CURRENCY_ITEM_ID),          // item ID
        CCInteger::create(250))                             // initial price
);
```

##Virtual Currencies
Virtual currencies need to be declared in your implementation of IStoreAssets.

###[VirtualCurrency](https://github.com/soomla/cocos2dx-store/blob/master/Soomla/domain/virtualCurrencies/CCVirtualCurrency.h)

####**How to define**

``` cpp
define MUFFIN_CURRENCY_ITEM_ID "currency_muffin"

CCVirtualCurrency *muffinCurrency = CCVirtualCurrency::create(
    CCString::create("Muffins"),                            // name
    CCString::create(""),                                   // description
    CCString::create(MUFFIN_CURRENCY_ITEM_ID)               // item ID
);
```

####How to use

A VirtualCurrency by itself is not very useful, because it cannot be sold individually. To sell currency, you need to use a VirtualCurrencyPack (see section below).

``` cpp
//Use VirtualCurrency when defining VirtualCurrencyPacks:

define TENMUFF_PACK_PRODUCT_ID "muffins_10"

CCVirtualCurrencyPack *tenmuffPack = CCVirtualCurrencyPack::create(
    CCString::create("10 Muffins"),                         // name
    CCString::create("Test refund of an item"),             // description
    CCString::create("muffins_10"),                         // item ID
    CCInteger::create(10),                                  // number of currency units in the pack
    CCString::create(MUFFIN_CURRENCY_ITEM_ID),              // the currency associated with this pack
    CCPurchaseWithMarket::create(CCString::create(          // purchase type
        TENMUFF_PACK_PRODUCT_ID),                           // product ID
        CCDouble::create(0.99))                             // initial price
);
```

**Give:**

Give a VirtualCurrency and get nothing in return.
This is useful if you’d like to give your users some amount of currency to begin with when they first download your game.

``` cpp
CCSoomlaError *soomlaError = NULL;

// If this is the first time playing, give the user an initial balance of 1000 muffins.
CCStoreInventory::sharedStoreInventory()->giveItem("currency_coin", 1000, &soomlaError);
```

####**Get the balance**

Get the balance of a specific VirtualCurrency.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->getItemBalance("currency_muffin", &soomlaError);
```

###[VirtualCurrencyPack](https://github.com/soomla/cocos2dx-store/blob/master/Soomla/domain/virtualCurrencies/CCVirtualCurrencyPack.h)

####**How to define**

``` cpp
CCVirtualCurrencyPack *fiftymuffPack = CCVirtualCurrencyPack::create(
    CCString::create("50 Muffins"),                         // name
    CCString::create("Test cancellation of an item"),       // description
    CCString::create("muffins_50"),                         // item id
    CCInteger::create(50),                                  // number of currencies in the pack
    CCString::create(MUFFIN_CURRENCY_ITEM_ID),              // the currency associated with this pack
    CCPurchaseWithMarket::create(CCString::create(          // purchase type
        FIFTYMUFF_PACK_PRODUCT_ID),                         // product ID
        CCDouble::create(1.99))                             // initial price
);
```

####**How to use**

**Buy:**

When your user buys a VirtualCurrencyPack of 50 muffins, his/her muffin currency balance will be increased by 50, and the payment will be deducted.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->buyItem("muffins_50", &soomlaError);
```

**Give:**

Give your users a 50-muffin pack for free. This is useful if you’d like to give your users a currency_pack to begin with when they first download your game.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->giveItem("muffins_50", 1, &soomlaError);
```

**Take:**

This function simply deducts the user’s balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.

Take back the 50-muffin pack that the user owns:

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->takeItem("muffins_50", 1, &soomlaError);
```

####**Get the balance**

VirtualCurrencyPacks do not have a balance of their own in the database. When a user purchases a VirtualCurrencyPack, the balance of the associated VirtualCurrency is increased.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->getItemBalance("currency_muffin", &soomlaError);
```

##Virtual Goods

Virtual goods need to be declared in your implementation of IStoreAssets.

###[SingleUseVG](https://github.com/soomla/cocos2dx-store/blob/master/Soomla/domain/virtualGoods/CCSingleUseVG.h)

####**How to define**

``` cpp
CCVirtualGood *fruitCakeGood = CCSingleUseVG::create(
    CCString::create("Fruit Cake"),                         // name
    CCString::create("Customers buy a double portion on each purchase of this cake"), // description
    CCString::create("fruit_cake"),                         // item id
    CCPurchaseWithVirtualItem::create(CCString::create(     // purchase type
        MUFFIN_CURRENCY_ITEM_ID),                           // product ID
        CCInteger::create(225))                             // initial price
);
```

####**How to use**

**Buy:**

When your user buys a SingleUseVG, for example “fruit_cake”, his/her “fruit_cake” balance will be increased by 1, and the payment will be deducted.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->buyItem("fruit_cake", &soomlaError);
```

**Give:**

Gives your user the given amount of the SingleUseVG with the given itemId(“fruit_cake” in our example) for free. This is useful if you’d like to give your users a SingleUseVG to start with when they first download your game.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->giveItem("fruit_cake", 1, &soomlaError);
```

**Take:**

This function simply deducts the user’s balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->takeItem("fruit_cake", 1, &soomlaError);
```

####**Get the balance**

Get the balance of a specific SingleUseVG.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->getItemBalance("fruit_cake", &soomlaError);
```

###[SingleUsePackVG](https://github.com/soomla/cocos2dx-store/blob/master/Soomla/domain/virtualGoods/CCSingleUsePackVG.h)

###**How to define**

``` cpp
CCVirtualGood *fiveFruitcakeGoods = CCSingleUsePackVG::create(
    CCString::create("fruit_cake"),                         // item ID of associated good
    CCInteger::create(10),                                  // amount of goods in pack
    CCString::create("10 Fruitcakes"),                      // name
    CCString::create("Pack of 5 fruitcakes"),               // description
    CCString::create("fruitcake_10"),                       // item ID
    CCPurchaseWithVirtualItem::create(                      // purchase type
        CCString::create(MUFFIN_CURRENCY_ITEM_ID),
        CCInteger::create(1750)));
```

####**How to use**

The explanations for buying, giving, and taking are the same as those in SingleUseVG.

**Buy:**

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->buyItem("fruit_cake_5pack", &soomlaError);
```

**Give:**

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->giveItem("fruit_cake_5pack", 1, &soomlaError);
```

**Take:**

```
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->takeItem("fruit_cake_5pack", 1, &soomlaError);
```

####**Get the balance**

SingleUsePackVGs do not have a balance of their own in the database. When a user buys a SingleUsePackVG, the balance of the associated SingleUseVG is increased. After buying a pack of 5 fruit cakes, your user’s fruit cake balance should be increased by 5.

Query the balance of the virtual good with item ID “fruit_cake”:

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->getItemBalance("fruit_cake_5pack", &soomlaError);
```

###[LifetimeVG](https://github.com/soomla/cocos2dx-store/blob/master/Soomla/domain/virtualGoods/CCLifetimeVG.h)

####**How to define**

``` cpp
CCVirtualGood *marriageGood =
    CCLifetimeVG::create(CCString::create("Marriage"),      // name
    CCString::create("This is a LIFETIME thing."),          // description
    CCString::create("marriage"),                           // item ID
    CCPurchaseWithVirtualItem::create(                      // purchase type
        CCString::create(MUFFIN_CURRENCY_ITEM_ID),
        CCInteger::create(100)));
```

####**How to use**

**Buy:**

Buying a LifetimeVG means that the user will now own the item for the rest of time, unless the game developer decides to explicitly take away the item from the user. Lifetime goods can be bought only once.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->buyItem("marriage", &soomlaError);
```

**Give:**

Give a LifetimeVG and get nothing in return.
This is useful if you’d like to give your users a LifetimeVG when they first download your game.

```cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->giveItem("marriage", 1, &soomlaError);
```

**Take:**

This function simply deducts the user’s balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.

```cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->takeItem("marriage", 1, &soomlaError);
```

####**Check ownership**

``` cpp
//If the balance is greater than 0, the user owns this LifetimeVG.

CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->getItemBalance("marriage", &soomlaError);
```
###[EquippableVG](https://github.com/soomla/cocos2dx-store/blob/master/Soomla/domain/virtualGoods/CCEquippableVG.h)

####**How to define**

There are 3 types of Equipping models: GLOBAL, CATEGORY, and LOCAL. Read a detailed description about them here. In this example we’re defining 2 characters, George and Kramer. These are CATEGORY equippable goods because the user can own both characters but can play only as one at a time.

``` cpp
// Character "Kramer" can be purchased for 350 Muffins.
CCVirtualGood *georgeGood = CCEquippableVG::create(
    CCInteger::create(CCEquippableVG::kCategory),           // equipping model
    CCString::create("George"),                             // name
    CCString::create("The best muffin eater in the north"), // description
    CCString::create("george"),                             // item ID
    CCPurchaseWithVirtualItem::create(                      // purchase type
        CCString::create(MUFFIN_CURRENCY_ITEM_ID),
        CCInteger::create(350)));

// Character "Kramer" can be purchased for 500 Muffins.
CCVirtualGood *kramerGood = CCEquippableVG::create(
    CCInteger::create(CCEquippableVG::kCategory),           // equipping model
    CCString::create("Kramer"),                             // name
    CCString::create("Knows how to get muffins"), // description
    CCString::create("kramer"),                             // item ID
    CCPurchaseWithVirtualItem::create(                      // purchase type
        CCString::create(MUFFIN_CURRENCY_ITEM_ID),
        CCInteger::create(500)));
```
####**How to use**

**Buy:**

Buying an EquippableVG is exactly like buying a LifetimeVG. The balance of “kramer” will be checked and if it is 0 buying will be allowed.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->buyItem("kramer", &soomlaError);
```

**Give:**

Give an EquippableVG and get nothing in return.
This is useful if you’d like to give your users a free character to begin with when they first download your game.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->giveItem("george", 1, &soomlaError);
```

**Take:**

This function simply deducts the user’s balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->takeItem("kramer", 1, &soomlaError);
```

**Equip & Unequip:**

``` cpp
CCSoomlaError *soomlaError = NULL;

// The user equips an owned good, George:
CCStoreInventory::sharedStoreInventory()->equipVirtualGood("george", &soomlaError);

// The user tries to equip Kramer (while he has George equipped):
CCStoreInventory::sharedStoreInventory()->equipVirtualGood("kramer", &soomlaError);
// Internally, George will be unequipped and Kramer will be equipped instead.

// The user unequips the currently equipped character (Kramer).
CCStoreInventory::sharedStoreInventory()->unEquipVirtualGood("kramer", &soomlaError);
```

####**Check ownership**

``` cpp
//Check if user owns Kramer:
CCSoomlaError *soomlaError = NULL;

//If the balance is greater than 0, the user owns Kramer.
CCStoreInventory::sharedStoreInventory()->getItemBalance("kramer", &soomlaError);
```

**Check equipping status:**

``` cpp
//Check if Kramer is currently equipped:
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->isVirtualGoodEquipped("kramer", &soomlaError);
```

###[UpgradeVG]()

####**How to define**

In the following example there is a SingleUseVG for “Muffin Cake” and 2 levels to upgrade the Muffin Cake.

``` cpp
// Create a SingleUseVG for "Muffin Cake"
CCVirtualGood *muffinCakeGood = CCSingleUseVG::create(
    CCString::create("Muffin Cake"),                        // name
    CCString::create("Customers buy a double portion on each purchase of this cake"), // description
    CCString::create("muffin_cake"),                        // item id
    CCPurchaseWithVirtualItem::create(                      // purchase type
        CCString::create(MUFFIN_CURRENCY_ITEM_ID),
        CCInteger::create(225))
);

// Create 2 UpgradeVGs that represent 2 levels for the Muffin Cake good.
CCVirtualGood *muffincakeLevel1 = CCUpgradeVG::create(
    CCString::create("muffin_cake"),                        // item ID of the associated good that is being upgraded
    NULL,                                                   // item ID of the upgrade good that comes before this one
    CCString::create("muffincake_level_2"),                 // item ID of the upgrade good that comes after this one
    CCString::create("Level 1"),                            // name
    CCString::create("Muffin Cake Level 1"),                // description
    CCString::create("muffincake_level_1"),                 // item ID
    CCPurchaseWithVirtualItem::create(                      // purchase type
        CCString::create(MUFFIN_CURRENCY_ITEM_ID),
        CCInteger::create(20)));

CCVirtualGood *muffincakeLevel2 = CCUpgradeVG::create(
    CCString::create("muffin_cake"),                        // item ID of the associated good that is being upgraded
    CCString::create("muffincake_level_1"),                 // item ID of the upgrade good that comes before this one
    NULL,                                                   // item ID of the upgrade good that comes after this one
    CCString::create("Level 2"),                            // name
    CCString::create("Muffin Cake Level 2"),                // description
    CCString::create("muffincake_level_2"),                 // item ID
    CCPurchaseWithVirtualItem::create(                      // purchase type
        CCString::create(MUFFIN_CURRENCY_ITEM_ID),
        CCInteger::create(20)));
```

####**How to use**

**Buy:**

When a user buys an upgrade, the buy method checks that the upgrade that’s being purchased is valid.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->buyItem(LEVEL_1_GOOD_ITEM_ID, &soomlaError);
```

**Upgrade:**

When you upgrade a virtual good, the method performs a check to see that this upgrade is valid.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->upgradeGood(LEVEL_1_GOOD_ITEM_ID, &soomlaError);
```

**Remove upgrades:**

Remove all upgrades from the virtual good with the given ID (Muffin cake in our example).

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->removeGoodUpgrades(MUFFIN_CAKE_GOOD_ITEM_ID, &soomlaError);
```

**Give:**

Give a free upgrade.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->giveItem(LEVEL_1_GOOD_ITEM_ID, 1, &soomlaError);
```

**Take:**

This function simply deducts the user’s balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid. Essentially, taking an upgrade is the same as a downgrade.

``` cpp
// The parameter amount is not used in this method.
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->takeItem(LEVEL_1_GOOD_ITEM_ID, 1, &soomlaError);
```

####**Get current upgrade**

To get the current upgrade of a virtual good use getGoodCurrentUpgrade. If the good has no upgrades, the method will return null.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->getGoodCurrentUpgrade(MUFFIN_CAKE_GOOD_ITEM_ID, &soomlaError);
```

####**Get current upgrade level**

To find out the upgrade level of a virtual good use getGoodUpgradeLevel. If the good has no upgrades, the method returns 0.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->getGoodUpgradeLevel(MUFFIN_CAKE_GOOD_ITEM_ID, &soomlaError);
```

##Other Entities

###[NonConsumableItem]()

A NonConsumableItem is a representation of a non-consumable item in the App Store. These kinds of items are bought by the user once and kept forever.

####How to define

NonConsumableItems need to be declared in your implementation ofIStoreAssets.

``` cpp
CCNonConsumableItem *noAdsNoncons = CCNonConsumableItem::create(
    CCString::create("No Ads"),
    CCString::create("Test purchase of MANAGED item."),
    CCString::create("no_ads"),
    CCPurchaseWithMarket::createWithMarketItem(CCMarketItem::create(
        CCString::create(NO_ADDS_NONCONS_PRODUCT_ID),
        CCInteger::create(CCMarketItem::NONCONSUMABLE),
        CCDouble::create(1.99))));
```

####How to use

**Buy:**

Non-consumables can only be purchased once and are kept forever for the user. When a user buys a non-consumable item, a check is performed to see that he/she doesn’t already own this item.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->buyItem("no_ads", &soomlaError);
```

**Give:**

Give your users the “No Ads” feature for free.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->giveItem("no_ads", 1, &soomlaError);
```

**Take:**

This function simply deducts the user’s balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->takeItem("no_ads", 1, &soomlaError);
```

####**Check existence**

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInventory::sharedStoreInventory()->nonConsumableItemExists("no_ads", &soomlaError);
```

###[VirtualCategory]()

Divide your store’s virtual goods into categories. Virtual categories become essential when you want to include CATEGORY EquippableVGs in your game.

####How to define

``` cpp
CCVirtualCategory *cakes = CCVirtualCategory::create(
    CCString::create("Cakes"),
    CCArray::create(
        CCString::create(MUFFINCAKE_ITEM_ID),
        CCString::create(PAVLOVA_ITEM_ID),
        CCString::create("pavlova_10"),
        CCString::create(CHOCLATECAKE_ITEM_ID),
        CCString::create(CREAMCUP_ITEM_ID),
        CCString::create("cream_cup_10"),
        NULL));
```

####Get category

**Check which category an item belongs to:**

``` cpp
CCSoomlaError *soomlaError = NULL;

CCStoreInfo::sharedStoreInfo()->getCategoryForVirtualGood(MUFFIN_CAKE_GOOD_ITEM_ID, &soomlaError);
```
