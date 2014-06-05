#**Using the Economy Model**

SOOMLA android-store uses modelV3 which is a complete data model implementation for Virtual Economies. Every game economy has currencies, packs of currencies that can be sold, and items that can be sold either for money or in exchange for other items. And these are just the very basics, of course.

This tutorial has brief descriptions of each entity in the economy model, but lots of examples. We recommend that you also read [SOOMLA Economy Model](/docs/soomla/EconomyModel), where you will find more detailed explanations for each of the different entities.

## PurchaseTypes
Purchase types are used to indicate whether an item will be purchased with money or with other virtual items.

> **NOTE:** In the examples below the declarations of purchase types are shown as a part of `PurchasableVirtualItem` declarations, because this is the most common use of purchase types.



###[PurchaseWithMarket](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/purchaseTypes/PurchaseWithMarket.java)

There are 2 ways to define this purchase type.
``` java
public static final String NO_ADDS_NONCONS_PRODUCT_ID = "no_ads";

public static final NonConsumableItem NO_ADDS_NONCONS  = new NonConsumableItem(
    ...
    new PurchaseWithMarket(new MarketItem(
                   NO_ADDS_NONCONS_PRODUCT_ID,  // product ID
                   MarketItem.Managed.MANAGED,  // product type
                   1.99                         // initial price
   ))
);
```
OR
```  java
public static final String THOUSANDMUFF_PACK_PRODUCT_ID = "android.test.thousand_muffins";

public static final VirtualCurrencyPack THOUSANDMUFF_PACK = new VirtualCurrencyPack(
    ...
    new PurchaseWithMarket(
        THOUSANDMUFF_PACK_PRODUCT_ID,   // product ID
        8.99                            // initial price
    )
);
```

> **NOTE:** The `productId` that is used to define a new `MarketItem` must be defined in the Market (Google Play, Amazon Store, etc..).


###[PurchaseWithVirtualItem](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/purchaseTypes/PurchaseWithVirtualItem.java)

```  java
public static final String MUFFIN_CURRENCY_ITEM_ID = "currency_muffin";

public static final VirtualGood PAVLOVA_GOOD = new SingleUseVG(
    ...
    new PurchaseWithVirtualItem(
        MUFFIN_CURRENCY_ITEM_ID,    // item ID
        175                         // initial price
    )
);
```


##Virtual Currencies
Virtual currencies need to be declared in your implementation of `IStoreAssets`.

###[VirtualCurrency](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/domain/virtualCurrencies/VirtualCurrency.java)

####How to define

``` java
public static final String MUFFIN_CURRENCY_ITEM_ID = "currency_muffin";

public static final VirtualCurrency MUFFIN_CURRENCY = new VirtualCurrency(
    "Muffins",                                  // name
    "Muffin currency",                          // description
    MUFFIN_CURRENCY_ITEM_ID                     // item id
);
```

####How to use
A `VirtualCurrency` by itself is not very useful, because it cannot be sold individually. To sell currency, you need to use a `VirtualCurrencyPack` (see section below).

Use `VirtualCurrency` when defining `VirtualCurrencyPack`s:

``` java
public static final VirtualCurrencyPack TENMUFF_PACK = new VirtualCurrencyPack(
    "10 Muffins",                                          // name
    "A currency pack of 10 muffins",                       // description
    "muffins_10",                                          // item ID
    10,                                                    // number of currency units in this pack
    "currency_muffin",                                     // the currency associated with this pack
    new PurchaseWithMarket(TENMUFF_PACK_PRODUCT_ID, 0.99)  // purchase type
);
```

**Give:**
Give a `VirtualCurrency` and get nothing in return.
This is useful if you'd like to give your users some amount of currency to begin with when they first download your game.

``` java
// If this is the first time playing, give the user an initial balance of 1000 muffins.
StoreInventory.giveVirtualItem("currency_muffin", 1000);
```

####How to query
Get the balance of a specific `VirtualCurrency`.

``` java
StoreInventory.getVirtualItemBalance("currency_muffin");
```

###[VirtualCurrencyPack](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/domain/virtualCurrencies/VirtualCurrencyPack.java)

####How to define

``` java
public static final VirtualCurrencyPack FIFTYMUFF_PACK = new VirtualCurrencyPack(
    "50 Muffins",                                              // name
    "A currency pack of 50 muffins",                           // description
    "muffins_50",                                              // item ID
    50,                                                        // number of currency units in this pack
    MUFFIN_CURRENCY_ITEM_ID,                                   // the currency associated with this pack
    new PurchaseWithMarket(FIFTYMUFF_PACK_PRODUCT_ID, 1.99)    // purchase type
);
```

####How to use

**Buy:**
When your user buys a `VirtualCurrencyPack` of 50 muffins, his/her muffin currency balance will be increased by 50, and the payment will be deducted.

``` java
StoreInventory.buy("muffins_50");
```

**Give:**
Give your users a 50-muffin pack for free. This is useful if you’d like to give your users a currency_pack to begin with when they first download your game.
``` java
StoreInventory.giveVirtualItem("muffins_50", 1);
```

**Take:**
This function simply deducts the user's balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.

Take back the 50-muffin pack that the user owns:
``` java
StoreInventory.takeVirtualItem("muffins_50", 1);
```

####How to query
`VirtualCurrencyPack`s do not have a balance of their own in the database. When a user purchases a `VirtualCurrencyPack`, the balance of the associated `VirtualCurrency` is increased.

``` java
StoreInventory.getVirtualItemBalance("currency_muffin");
```


##Virtual Goods
Virtual goods need to be declared in your implementation of `IStoreAssets`.

###[SingleUseVG](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/domain/virtualGoods/SingleUseVG.java)

####How to define

``` java
public static final VirtualGood MUFFINCAKE_GOOD = new SingleUseVG(
    "Fruit Cake",                                                   // name
    "Customers buy a double portion on each purchase of this cake", // description
    "fruit_cake",                                                   // item ID
    new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 225)       // purchase type
);
```

####How to use

**Buy:**
When your user buys a `SingleUseVG`, for example "fruit_cake", his/her "fruit_cake" balance will be increased by 1, and the payment will be deducted.

``` java
StoreInventory.buy("fruit_cake");
```

**Give:**
Gives your user the given amount of the `SingleUseVG` with the given `itemId` ("fruit_cake" in our example) for free. This is useful if you'd like to give your users a `SingleUseVG` to start with when they first download your game.

``` java
StoreInventory.giveVirtualItem("fruit_cake", 10);
```

**Take:**
This function simply deducts the user's balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.

``` java
StoreInventory.takeVirtualItem("fruit_cake", 1);
```


####How to query
Get the balance of a specific `SingleUseVG`.

``` java
StoreInventory.getVirtualItemBalance("fruit_cake");

```


###[SingleUsePackVG](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/domain/virtualGoods/SingleUsePackVG.java)

####How to define

``` java
// Define a pack of 5 "Cream cup" goods that costs $2.99.
public static final VirtualGood CREAMCUP_GOOD_PACK = new SingleUsePackVG(
    "cream_cup",                                            // item ID of associated good
    5,                                                      // amount of goods in pack
    "Cream Cup Pack",                                       // name
    "A pack of 5 Cream Cups",                               // description
    "cream_cup_5pack",                                      // item ID
    new PurchaseWithMarket(CREAMCUP_PACK_PRODUCT_ID, 2.99)  // purchase type
);
```

####How to use
The explanations for buying, giving, and taking are the same as those in [SingleUseVG](#singleusevg).

**Buy:**
``` java
StoreInventory.buy("cream_cup_5pack");
```

**Give:**
``` java
StoreInventory.giveVirtualItem("cream_cup_5pack", 1);
```

**Take:**
``` java
StoreInventory.takeVirtualItem("cream_cup_5pack", 1);
```

####How to query
`SingleUsePackVG`s do not have a balance of their own in the database. When a user buys a `SingleUsePackVG`, the balance of the associated `SingleUseVG` is increased. After buying a pack of 5 cream cup goods, your user's cream cup balance should be increased by 5.

Query the balance of the virtual good with item id cream_cup:
``` java
VirtualGood creamCup = (VirtualGood)StoreInfo.getVirtualItem("cream_cup");
int creamCupBalance = StorageManager.getVirtualGoodsStorage().getBalance(creamCup);
```


###[LifetimeVG](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/domain/virtualGoods/LifetimeVG.java)

####How to define

``` java
public static final VirtualGood MARRIAGE_GOOD = new LifetimeVG(
    "Marriage",                                         // name
    "This is a lifetime thing",                         // description
    "marriage",                                         // item ID
    new PurchaseWithMarket(MARRIAGE_PRODUCT_ID, 7.99)   // purchase type
);
```

####How to use

**Buy:**
Buying a `LifetimeVG` means that the user will now own the item for the rest of time, unless the game developer decides to *explicitly* take away the item from the user. Lifetime goods can be bought only once.
``` java
StoreInventory.buy("marriage");
```

**Give:**
Give a `LifetimeVG` and get nothing in return.
This is useful if you’d like to give your users a `LifetimeVG` when they first download your game.
``` java
StoreInventory.giveVirtualItem("marriage", 1);
```

**Take:**
This function simply deducts the user's balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.
``` java
StoreInventory.takeVirtualItem("marriage", 1);
```


####How to query
Check the ownership of a lifetime good:
``` java
int balance = StoreInventory.getVirtualItemBalance("marriage");

if (balance > 0) {
    ...
    // User owns a marriage lifetime good!
}
```


###[EquippableVG](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/domain/virtualGoods/EquippableVG.java)

####How to define
There are 3 types of Equipping models: `GLOBAL`, `CATEGORY`, and `LOCAL`. Read a detailed description about them [here](/docs/soomla/EconomyModel#equippablevg). In this example we're defining 2 characters, George and Kramer. These are `CATEGORY` equippable goods because the user can own both characters but can play only as one at a time.
``` java
// Character "George" can be purchased for 350 Muffins.
public static final VirtualGood GEORGE_GOOD = new EquippableVG(
    EquippableVG.EquippingModel.CATEGORY,                       // equipping model
    "George",                                                   // name
    "George is the best muffin eater in the north",             // description
    "george_good",                                              // item ID
    new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 350)   // purchase type
);

// Character "Kramer" can be purchased for 500 Muffins.
public static final VirtualGood KRAMER_GOOD = new EquippableVG(
    EquippableVG.EquippingModel.CATEGORY,                       // equipping model
    "Kramer",                                                   // name
    "Kramer kicks muffins like a super hero",                   // description
    "kramer_good",                                              // item ID
    new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 500)   // purchase type
);
```

####How to use
**Buy:**
Buying an `EquippableVG` is exactly like buying a [`LifetimeVG`](#lifetimevg). The balance of "kramer" will be checked and if it is 0 buying will be allowed.
``` java
StoreInventory.buy("kramer");
```

**Give:**
Give an `EquippableVG` and get nothing in return.
This is useful if you’d like to give your users a free character to begin with when they first download your game.
``` java
StoreInventory.giveVirtualItem("george", 1);
```

**Take:**
This function simply deducts the user's balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.
``` java
StoreInventory.takeVirtualItem("kramer", 1);
```

**Equip & Unequip:**
``` java
// The user equips an owned good, George:
StoreInventory.equipVirtualGood("george");

//The user tries to equip Kramer (while he has George equipped):
StoreInventory.equipVirtualGood("kramer");
//Internally, George will be unequipped and Kramer will be equipped instead.

//The user unequips the currently equipped character (Kramer).
StoreInventory.unEquipVirtualGood("kramer");
```

####How to query
**Check ownership:**
Check if user owns Kramer:
``` java
int balance = StoreInventory.getVirtualItemBalance("kramer");

if (balance > 0) {
    ...
    // User owns Kramer!
}
```
**Check equipping status:**
Check if Kramer is currently equipped:
``` java
StoreInventory.isVirtualGoodEquipped("kramer");
```


###[UpgradeVG](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/domain/virtualGoods/UpgradeVG.java)

####How to define
Suppose you offer a "Strength" attribute to one of the characters in your game and you want to make it upgradeable with 2 levels.

``` java
// Create a SingleUseVG for "Strength"
public static final VirtualGood STRENGTH_ATTR = new SingleUseVG(
    "Strength",                                                 // name
    "Makes Kramer stronger so he can kick more muffins",        // description
    "strength",                                                 // item ID
    new PurchaseWithMarket(STRENGTH_PRODUCT_ID, 1.99)           // purchase type
);

// Create 2 UpgradeVGs that represent 2 levels for the Strength attribute.
public static final VirtualGood STRENGTH_UPGRADE_1 = new UpgradeVG(
    "strength",                   // item ID of the associated good that is being upgraded
    null,                         // item ID of the upgrade good that comes before this one
    "strength_upgrade_2",         // item ID of the upgrade good that comes after this one
    "Strength Upgrade Level 1",                                 // name
    "Kramer will be able to kick twice as many muffins!",       // description
    "strength_upgrade_1",                                       // item ID
    new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 50)    // purchase type
);

public static final VirtualGood STRENGTH_UPGRADE_2 = new UpgradeVG(
    "strength",                   // item ID of the associated good that is being upgraded
    "strength_upgrade_1",         // item ID of the upgrade good that comes before this one
    null,                         // item ID of the upgrade good that comes after this one
    "Strength Upgrade Level 2",                                 // name
    "Kramer will be able to kick 4 times as many muffins!",     // description
    "strength_upgrade_2",                                       // item ID
    new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 250)   // purchase type
);
```

####How to use
**Buy:**
When a user buys an upgrade, the `buy` method checks that the upgrade that's being purchased is valid.
``` java
StoreInventory.buy("strength_upgrade_2");
```

**Upgrade:**
When you upgrade a virtual good, the method performs a check to see that this upgrade is valid.
``` java
StoreInventory.upgradeVirtualGood("strength");
```

**Remove upgrades:**
Remove all upgrades from the virtual good with the given id (Strength in our example).
``` java
StoreInventory.removeUpgrades("strength");
```

**Give:**
To give a free upgrade use `forceUpgrade`.
``` java
StoreInventory.forceUpgrade("strength_upgrade_2");
```

**Take:**
This function simply deducts the user's balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid. Essentially, taking an upgrade is the same as a downgrade.
``` java
// The parameter amount is not used in this method.
StoreInventory.takeVirtualItem("strength_upgrade_2", 1);
```

####How to query
**Get current upgrade:**
To get the current upgrade of a virtual good use `getGoodCurrentUpgrade`. If our Strength attribute is currently upgraded to level 2, this method will return "strength_upgrade_2". (If the good has no upgrades, the method returns null).
``` java
StoreInventory.getGoodCurrentUpgrade("strength");
```
**Get current upgrade level:**
To find out the upgrade level of a virtual good use `getGoodUpgradeLevel`. If our Strength attribute is currently upgraded to level 2, this method will return 2. (If the good has no upgrades, the method returns 0).
``` java
StoreInventory.getGoodUpgradeLevel("strength");
```

##Other Entities



###[NonConsumableItem](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/domain/NonConsumableItem.java)

A `NonConsumableItem` is a representation of a non-consumable (MANAGED) item in Google Play. These kinds of items are bought by the user once and kept forever in the market. A `NonConsumableItem` is different from a `LifetimeVG` in that it is never consumed from the market. We recommend using `LifetimeVG`s.

####How to define
`NonConsumableItem`s need to be declared in your implementation of `IStoreAssets`.
``` java
public static final NonConsumableItem NO_ADS_NONCONS  = new NonConsumableItem(
    "No Ads",                                                       // name
    "Buy this once and ads will disappear forever!",                // description
    "no_ads",                                                       // item ID
    new PurchaseWithMarket(new MarketItem(                          // purchase type
        NO_ADDS_NONCONS_PRODUCT_ID,             // product ID
        MarketItem.Managed.MANAGED,             // product type
        1.99)                                   // initial price
    )
);
```

####How to use

**Buy:**
Non-consumables can only be purchased once and are kept forever for the user. When a user buys a non-consumable item, a check is performed to see that he/she doesn't already own this item.
``` java
StoreInventory.buy("no_ads");
```

**Give:**
Give your users the "No Ads" feature for free.
``` java
StoreInventory.giveVirtualItem("no_ads", 1);
```

**Take:**
This function simply deducts the user's balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.
``` java
StoreInventory.takeVirtualItem("no_ads", 1);
```

####How to query
**Check existence:**
``` java
StoreInventory.nonConsumableItemExists("no_ads");
```



###[VirtualCategory](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/domain/VirtualCategory.java)

Divide your store's virtual goods into categories. Virtual categories become essential when you want to include `CATEGORY` `EquippableVG`s in your game.

####How to define
``` java
// Assume that MUFFINCAKE_ITEM_ID, PAVLOVA_ITEM_ID, etc.. are item ids of virtual goods that have been declared.
public static final VirtualCategory SWEETS_CATEGORY = new VirtualCategory(
    "Cakes and Sweets",                                                                     // name
    new ArrayList<String>(Arrays.asList(new String[]
        {MUFFINCAKE_ITEM_ID, PAVLOVA_ITEM_ID, CHOCOLATECAKE_ITEM_ID, CREAMCUP_ITEM_ID}))    //list of good IDs
);
```

####How to query
Check which category an item belongs to:
``` java
StoreInfo.getCategory(MUFFINCAKE_ITEM_ID);
```
