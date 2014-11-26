---
layout: "content"
image: "Modeling"
title: "STORE: Economy Model & Operations"
text: "Every game economy can be based on SOOMLA's economy model. The game economy entities that SOOMLA provides are virtual currencies, currency packs, and virtual items of all sorts."
position: 2
theme: 'platforms'
collection: 'unity_store'
module: 'store'
platform: 'unity'
---

#STORE: Economy Model & Operations

SOOMLA's unity3d-store provides a complete data model implementation for virtual economies. Every game economy has currencies, packs of currencies that can be sold, and items that can be sold either for money or in exchange for other items. And these are just the very basics, of course. This tutorial contains descriptions of each entity in the economy model, along with examples.

![alt text](/img/tutorial_img/soomla_diagrams/EconomyModel.png "Soomla Economy Model")

## PurchaseTypes
Purchase types are used to indicate whether an item will be purchased with money or with other virtual items.

<div class="info-box">In the examples below the declarations of purchase types are shown as a part of `PurchasableVirtualItem` declarations, because this is the most common use of purchase types.</div>


###[PurchaseWithMarket](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/purchaseTypes/PurchaseWithMarket.cs)

This type of purchase is with money. Items with this purchase type must be defined in the Market.

For more info see one of our tutorials on In-app Billing:

- For Android: [Google Play IAB](/android/store/Store_GooglePlayIAB) or [Amazon IAB](/android/store/Store_AmazonIAB)
- For iOS: [App Store IAB](/ios/store/Store_AppStoreIAB)

There are 2 ways to define this purchase type.

``` cs
public const string NO_ADDS_PRODUCT_ID   = "no_ads";

public static LifetimeVG NO_AD = new LifetimeVG(
    ...
    new PurchaseWithMarket(new MarketItem(
        NO_ADDS_PRODUCT_ID,                     // product ID
        MarketItem.Consumable.NONCONSUMABLE,    // product type
        1.99))                                  // initial price
);
```

OR

```  cs
public const string THOUSANDMUFF_PACK_PRODUCT_ID = "1000_pack";

public static VirtualCurrencyPack THOUSANDMUFF_PACK = new VirtualCurrencyPack(
    ...
    new PurchaseWithMarket(
        THOUSANDMUFF_PACK_PRODUCT_ID,           // product ID
         8.99)                                  // initial price
);
```

<div class="info-box">The `productId` that is used to define a new `MarketItem` must match the product ID defined in the Market (Google Play, Amazon Appstore, App Store, etc..).</div>

###[PurchaseWithVirtualItem](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/purchaseTypes/PurchaseWithVirtualItem.cs)

This type of purchase is with some amount of other virtual items.

```  cs
public const string MUFFIN_CURRENCY_ITEM_ID = "currency_muffin";

public static VirtualGood PAVLOVA_GOOD = new SingleUseVG(
    ...
    new PurchaseWithVirtualItem(
        MUFFIN_CURRENCY_ITEM_ID,                // item ID
        175));                                  // initial price
```

##Virtual Currencies

###[VirtualCurrency](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/domain/virtualCurrencies/VirtualCurrency.cs)

####**How to define**

``` cs
public static final String MUFFIN_CURRENCY_ITEM_ID = "currency_muffin";

public static final VirtualCurrency MUFFIN_CURRENCY = new VirtualCurrency(
    "Muffins",                                  // name
    "Muffin currency",                          // description
    MUFFIN_CURRENCY_ITEM_ID                     // item id
);
```

####**How to use**
A `VirtualCurrency` by itself is not very useful, because it cannot be sold individually. To sell currency, you need to use a `VirtualCurrencyPack` (see section below).

Use `VirtualCurrency` when defining `VirtualCurrencyPack`s:

``` cs
public static VirtualCurrencyPack TENMUFF_PACK = new VirtualCurrencyPack(
    "10 Muffins",                               // name
    "Pack of 10 muffin currency units",         // description
    "muffins_10",                               // item id
    10,                                         // number of currency units in this pack
    MUFFIN_CURRENCY_ITEM_ID,                    // the currency associated with this pack
    new PurchaseWithMarket(                     // purchase type
      TENMUFF_PACK_PRODUCT_ID,
      0.99)
);
```

**Give:**

Give a `VirtualCurrency` and get nothing in return.
This is useful if you'd like to give your users some amount of currency to begin with when they first download your game.

``` cs
// Give the user an initial balance of 1000 muffins.
StoreInventory.GiveItem("currency_muffin", 1000);
```

####**Get the balance**
Get the balance of a specific `VirtualCurrency`.

``` cs
StoreInventory.GetItemBalance("currency_muffin");
```

###[VirtualCurrencyPack](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/domain/virtualCurrencies/VirtualCurrencyPack.cs)

####**How to define**

``` cs
public static VirtualCurrencyPack FIFTYMUFF_PACK = new VirtualCurrencyPack(
    "50 Muffins",                              // name
    "Pack of 50 muffin currency units",        // description
    "muffins_50",                              // item id
    50,                                        // number of currency units in this pack
    MUFFIN_CURRENCY_ITEM_ID,                   // the currency associated with this pack
    new PurchaseWithMarket(                    // purchase type
      FIFTYMUFF_PACK_PRODUCT_ID,
      1.99)
);
```

####**How to use**

**Buy:**

When your user buys a `VirtualCurrencyPack` of 50 muffins, his/her muffin currency balance will be increased by 50, and the payment will be deducted.

``` cs
StoreInventory.BuyItem("muffins_50");
```

**Give:**
Give your users a 50-muffin pack for free. This is useful if you’d like to give your users a currency_pack to begin with when they first download your game.

``` cs
StoreInventory.GiveItem("muffins_50", 1);
```

**Take:**

This function simply deducts the user's balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.

``` cs
StoreInventory.TakeItem("muffins_50", 1);
```

####**Get the balance**

`VirtualCurrencyPack`s do not have a balance of their own in the database. When a user purchases a `VirtualCurrencyPack`, the balance of the associated `VirtualCurrency` is increased.

``` cs
StoreInventory.GetItemBalance("currency_muffin");
```

##Virtual Goods
Virtual goods need to be declared in your implementation of `IStoreAssets`.

###[SingleUseVG](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/domain/virtualGoods/SingleUseVG.cs)

####**How to define**

``` cs
public static VirtualGood MUFFINCAKE_GOOD = new SingleUseVG(
    "Fruit Cake",                              // name
    "Customers buy a double portion!",         // description
    "fruit_cake",                              // item ID
    new PurchaseWithVirtualItem(               // purchase type
      MUFFIN_CURRENCY_ITEM_ID,
      225));
```

####**How to use**

**Buy:**

When your user buys a `SingleUseVG` ("fruit_cake" in our example) his/her "fruit_cake" balance will be increased by 1, and the payment will be deducted.

``` cs
StoreInventory.BuyItem("fruit_cake");
```

**Give:**

Gives your user the given amount of the `SingleUseVG` with the given `itemId` ("fruit_cake" in our example) for free. This is useful if you'd like to give your users a `SingleUseVG` to start with when they first download your game.

``` cs
StoreInventory.GiveItem("fruit_cake", 10);
```

**Take:**

This function simply deducts the user's balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.  

``` cs
StoreInventory.TakeItem("fruit_cake", 1);
```

####**Get the balance**
Get the balance of a specific `SingleUseVG`.

``` cs
StoreInventory.GetItemBalance("fruit_cake");
```

###[SingleUsePackVG](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/domain/virtualGoods/SingleUsePackVG.cs)

####**How to define**

``` cs
public const string FRUITCAKE_PACK_PRODUCT_ID = "fruitcake_5pack";

// Define a pack of 5 "Fruit cake" goods that costs $2.99.
public static VirtualGood FRUITCAKE_GOOD_PACK = new SingleUsePackVG(
    "fruit_cake",                                // item ID of associated good
    5,                                           // amount of goods in pack
    "Fruit Cake Pack",                           // name
    "A pack of 5 Fruit Cakes",                   // description
    "fruit_cake_5pack",                          // item ID
    new PurchaseWithMarket(                      // purchase type
      FRUITCAKE_PACK_PRODUCT_ID,
      2.99)
);
```

####**How to use**
The explanations for buying, giving, and taking are the same as those in [SingleUseVG](#singleusevg).

**Buy:**

``` cs
StoreInventory.BuyItem("fruit_cake_5pack");
```

**Give:**

``` cs
StoreInventory.GiveItem("fruit_cake_5pack", 1);
```

**Take:**

``` cs
StoreInventory.TakeItem("fruit_cake_5pack", 1);
```

####**Get the balance**
`SingleUsePackVG`s do not have a balance of their own in the database. When a user buys a `SingleUsePackVG`, the balance of the associated `SingleUseVG` is increased. After buying a pack of 5 cream cup goods, your user's cream cup balance should be increased by 5.

Query the balance of the virtual good with item ID "cream_cup":

``` cs
StoreInventory.getVirtualItemBalance("fruit_cake");
```

###[LifetimeVG](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/domain/virtualGoods/LifetimeVG.cs)

A LifetimeVG is a VirtualGood that is bought exactly once and kept forever.

<div class="info-box">Notice: When defining a `LifetimeVG` in the App Store (iTunesConnect), you MUST define its type as a Non-Consumable! For more information see our [guide](/ios/store/Store_AppStoreIAB) for defining IAP products in the App Store.</div>

<br>

####**How to define**

``` cs
public static VirtualGood MARRIAGE_GOOD = new LifetimeVG(
    "Marriage",                                  // name
    "This is a lifetime thing",                  // description
    "marriage",                                  // item ID
    new PurchaseWithMarket(                      // purchase type
      MARRIAGE_PRODUCT_ID,
      7.99)
);
```

####**How to use**

**Buy:**

Buying a `LifetimeVG` means that the user will now own the item for the rest of time. Lifetime goods can be bought only once.

``` cs
StoreInventory.BuyItem("marriage");
```

**Give:**

Give a `LifetimeVG` and get nothing in return.
This is useful if you’d like to give your users a `LifetimeVG` when they first download your game.

``` cs
StoreInventory.GiveItem("marriage", 1);
```

**Take:**

This function simply deducts the user's balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.

``` cs
StoreInventory.TakeItem("marriage", 1);
```


####**Check ownership**
Check the ownership of a lifetime good:

``` cs
int balance = StoreInventory.GetItemBalance("marriage");

if (balance > 0) {
    ...
    // User owns a marriage lifetime good!
}
```

###[EquippableVG](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/domain/virtualGoods/EquippableVG.cs)

####**How to define**
There are 3 types of Equipping models: `GLOBAL`, `CATEGORY`, and `LOCAL`. In this example we're defining 2 characters, George and Kramer. These are `CATEGORY` equippable goods because the user can own both characters but can play only as one at a time.

``` cs
// Character "George" can be purchased for 350 Muffins.
public static VirtualGood GEORGE_GOOD = new EquippableVG(
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

####**How to use**

**Buy:**

Buying an `EquippableVG` is exactly like buying a [`LifetimeVG`](#lifetimevg). The balance of "kramer" will be checked and if it is 0 buying will be allowed.

``` cs
StoreInventory.BuyItem("kramer");
```

**Give:**

Give an `EquippableVG` and get nothing in return.
This is useful if you’d like to give your users a free character to begin with when they first download your game.

``` cs
StoreInventory.GiveItem("george", 1);
```

**Take:**

This function simply deducts the user's balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid.

``` cs
StoreInventory.TakeItem("kramer", 1);
```

**Equip & Unequip:**

``` cs
// The user equips an owned good, George:
StoreInventory.EquipVirtualGood("george");

// The user tries to equip Kramer (while he has George equipped):
StoreInventory.EquipVirtualGood("kramer");
// Internally, George will be unequipped and Kramer will be equipped instead.

// The user unequips the currently equipped character (Kramer).
StoreInventory.UnEquipVirtualGood("kramer");
```

####**Check ownership**

Check if user owns Kramer:

``` cs
int balance = StoreInventory.GetItemBalance("kramer");

if (balance > 0) {
    ...
    // User owns Kramer!
}
```

####**Check equipping status**

Check if Kramer is currently equipped:

``` cs
StoreInventory.IsVirtualGoodEquipped("kramer");
```


###[UpgradeVG](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/domain/virtualGoods/UpgradeVG.cs)

####**How to define**

Suppose you offer a "Strength" attribute to one of the characters in your game and you want to make it upgradeable with 2 levels.

``` cs
// Create a SingleUseVG for "Strength"
public static VirtualGood STRENGTH_ATTR = new SingleUseVG(
    "Strength",                                                 // name
    "Makes Kramer stronger so he can kick more muffins",        // description
    "strength",                                                 // item ID
    new PurchaseWithMarket(STRENGTH_PRODUCT_ID, 1.99)           // purchase type
);

// Create 2 UpgradeVGs that represent 2 levels for the Strength attribute.
public static VirtualGood STRENGTH_UPGRADE_1 = new UpgradeVG(
    "strength",                   // item ID of the associated good that is being upgraded
    null,                         // item ID of the upgrade good that comes before this one
    "strength_upgrade_2",         // item ID of the upgrade good that comes after this one
    "Strength Upgrade Level 1",                                 // name
    "Kramer will be able to kick twice as many muffins!",       // description
    "strength_upgrade_1",                                       // item ID
    new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 50)    // purchase type
);

public static VirtualGood STRENGTH_UPGRADE_2 = new UpgradeVG(
    "strength",                   // item ID of the associated good that is being upgraded
    "strength_upgrade_1",         // item ID of the upgrade good that comes before this one
    null,                         // item ID of the upgrade good that comes after this one
    "Strength Upgrade Level 2",                                 // name
    "Kramer will be able to kick 4 times as many muffins!",     // description
    "strength_upgrade_2",                                       // item ID
    new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 250)   // purchase type
);
```

####**How to use**

**Buy:**

When a user buys an upgrade, the `buy` method checks that the upgrade that's being purchased is valid.

``` cs
StoreInventory.BuyItem("strength_upgrade_2");
```

**Upgrade:**

When you upgrade a virtual good, the method performs a check to see that this upgrade is valid.

``` cs
StoreInventory.UpgradeGood("strength");
```

**Remove upgrades:**

Remove all upgrades from the virtual good with the given id (Strength in our example).

``` cs
StoreInventory.RemoveGoodUpgrades("strength");
```

**Give:**

Give a free upgrade:

``` cs
StoreInventory.GiveItem("strength_upgrade_2");
```

**Take:**

This function simply deducts the user's balance. In case of a refund request, it is your responsibility to give the user back whatever he/she paid. Essentially, taking an upgrade is the same as a downgrade.

``` cs
// The parameter amount is not used in this method.
StoreInventory.TakeItem("strength_upgrade_2", 1);
```

####**Get current upgrade**

To get the current upgrade of a virtual good use `GetGoodCurrentUpgrade`. If our Strength attribute is currently upgraded to level 2, this method will return "strength_upgrade_2". (If the good has no upgrades, the method returns null).

``` cs
StoreInventory.GetGoodCurrentUpgrade("strength");
```

####**Get current upgrade level**

To find out the upgrade level of a virtual good use `GetGoodUpgradeLevel`. If our Strength attribute is currently upgraded to level 2, this method will return 2. (If the good has no upgrades, the method returns 0).

``` cs
StoreInventory.GetGoodUpgradeLevel("strength");
```

##[VirtualCategory](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/domain/VirtualCategory.cs)

Divide your store's virtual goods into categories. Virtual categories become essential when you want to include `CATEGORY` `EquippableVG`s in your game.

####**How to define**

``` cs
// Assume that MUFFINCAKE_ITEM_ID, PAVLOVA_ITEM_ID, etc.. are item ids of virtual goods that have been declared.
public static VirtualCategory SWEETS_CATEGORY = new VirtualCategory(
    "Cakes and Sweets",                         // name
    new List<string>(new string[]               // list of item IDs
        { MUFFINCAKE_ITEM_ID,
          PAVLOVA_ITEM_ID,
          CHOCLATECAKE_ITEM_ID,
          CREAMCUP_ITEM_ID })
);
```

####**Get category**

Check which category an item belongs to:

``` cs
StoreInfo.GetCategoryForVirtualGood(MUFFINCAKE_ITEM_ID);
```
