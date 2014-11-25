---
layout: "content"
image: "Modeling"
title: "Economy Model"
text: "Every game economy can be based on SOOMLA's economy model, with entities such as virtual currencies, currency packs, and virtual items of all sorts."
position: 3
theme: 'soomla'
collection: 'soomla_store'
---

#**Economy Model**

SOOMLA provides game developers with an economy model that every game economy can be based upon. Every game economy has currencies, packs of currencies that can be sold, and items that can be sold either for money or in exchange for other items. And these are just the very basics, of course. SOOMLA supplies you with many types of items, all explained in the overview below.

![alt text](/img/tutorial_img/soomla_diagrams/EconomyModel.png "Soomla Economy Model")

<div class="info-box">This document contains a few code examples. For the sake of brevity, they are given only in Java. To see examples for the various platforms SOOMLA supports, [choose your platform](/docs/platforms).</div>

##Virtual Items

Almost every entity in your virtual economy will be a Virtual Item. There are many types of Virtual Items and you can select the ones that fit your needs. Each one of the various types extends the class `VirtualItem` and adds its own behavior.

Almost all `VirtualItems` are `PurchasableVirtualItems`. Among other features, all Virtual items have 2 functions to help you easily interact with them: `give` and `take`. Preferably, you should use the two methods provided in `StoreInventory` for these purposes, called `giveVirtualItem` and `takeVirtualItem`. Use these functions to give or take from your users a specific amount of a specific Virtual Item.

Use `giveVirtualItem` when you want to give your user something and get nothing in return. (If you want to give something and get something in return, you need to use `buy`). Use `takeVirtualItem` when you want to take something from your user, for example in the case of a refund.

Every virtual item has an `itemId`, a unique string that we use to identify the different items.

##Purchase Types

As stated above, almost all Virtual Items are purchasable, or as we call them, `PurchasableVirtualItem`s. The only one that isn’t purchasable is `VirtualCurrency`, and we’ll get to why that is later on in this document.
Every `PurchasableVirtualItem` has the function `buy` that performs a purchase of a virtual item according to a given purchase type. There are 2 different purchase types: `PurchaseWithVirtualItem` and `PurchaseWithMarket`.

###PurchaseWithVirtualItem

Any item with purchase type `PurchaseWithVirtualItem` can be purchased with any `VirtualItem`, like a sort of trade. When creating an instance of `PurchaseWithVirtualItem`, you need to provide the ID of the virtual item that you want to be paid with and the amount of that virtual item.

####**For Example**
Suppose that in your game, you offer a “CHOCOLATECAKE_GOOD” that can be bought by paying 250 “Muffins”. The item being purchased is a “CHOCOLATECAKE_GOOD”, the item (virtual currency) to pay with is “Muffin”, and the amount is 250.

```
public static final VirtualGood NO_ADS_GOOD = new LifetimeVG(
    "No Ads",                                  // name
    "No More Ads!",                            // description
    "no_ads",                                  // item ID
    new PurchaseWithMarket(new MarketItem(     // purchase type
        NO_ADS_PRODUCT_ID,                        // product ID
        MarketItem.Managed.MANAGED,               // Managed type
        1.99))                                    // price

);
```

###PurchaseWithMarket

This kind of `PurchaseType` should be attached to items that you want to make available for purchase in the Market (App Store, Google Play Store, etc..) for real money. When you create an instance of `PurchaseWithMarket`, you need to define the associated `VirtualItem` in the Market, and insert the product ID of the item into the SOOMLA code (in your version of [IStoreAssets](/docs/soomla/store/IStoreAssets)).

####**For Example**
Suppose that in your game, you offer a “No-Ads” feature for $1.99 in the Market. You will need to declare the `PurchaseType` parameter of your “No-Ads” feature like so:

```
public static final NonConsumableItem NO_ADDS_NONCONS  = new NonConsumableItem(
    "No Ads",                                                 // name
    "Test purchase of MANAGED item.",                         // description
    "no_ads",                                                 // item ID
    new PurchaseWithMarket(                                   // purchase type
      new MarketItem(
        NO_ADDS_NONCONS_PRODUCT_ID,                           // product ID
        MarketItem.Managed.MANAGED,                           // product type
        1.99))                                                // initial price
);
```

##MarketItem

MarketItem is a representation of an item in the Market. `MarketItem` is only used for `PurchaseWithMarket` purchase type.

<div class="info-box">When you define your items in the Market (App Store, Google Play, etc..) their product IDs should exactly match the product IDs of the corresponding `MarketItem`s. This is explained in detail in the platform-specific "In-app Billing" tutorials. </div>

**MarketItem Members:**

- `productId` - ID of the item in the Market (App Store, Google Play Store, etc..).
- `type` - The type of the item in the Market.
  (see [android-store’s MarketItem](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/domain/MarketItem.java) or [iOS-store’s MarketItem](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/domain/MarketItem.h)).
- `price` - The price of the item that you charge in the Market.

##VirtualCurrency

Every game that has an economy has at least one `VirtualCurrency`. Use this class to define your game's virtual currency.

####**For Example**

``` java
public static final String MUFFIN_CURRENCY_ITEM_ID = "currency_muffin";

public static final VirtualCurrency MUFFIN_CURRENCY = new VirtualCurrency(
    "Muffins",                                  // name
    "Muffin currency",                          // description
    MUFFIN_CURRENCY_ITEM_ID                     // item ID
);
```

`VirtualCurrency` is NOT a `PurchasableVirtualItem`. This is because in game stores, you never buy just a single "Gold Coin" or a "Muffin", but rather you buy a pack of them. Your users will be able to buy packs of your game’s `VirtualCurrency` by using `VirtualCurrencyPack` which is explained below.

If for some reason you want to sell a single “Gold Coin” or a single “Gem” you can do so by providing a `VirtualCurrencyPack` with one Coin or one Gem.

####**Real Game Examples:**

- Gold Coin
- Gem
- Muffin

##VirtualCurrencyPack

As we mentioned above, in game stores you never buy just a "Gold Coin" or a "Muffin", you always buy a pack of the game's `VirtualCurrency`. This class represents exactly that: a pack of `VirtualCurrency`. Use this class to define various currency packs in your game.

####**For Example**

``` java
public static final VirtualCurrencyPack FIFTYMUFF_PACK = new VirtualCurrencyPack(
    "50 Muffins",                              // name
    "A currency pack of 50 muffins",           // description
    "muffins_50",                              // item ID
    50,                                        // number of currency units in this pack
    MUFFIN_CURRENCY_ITEM_ID,                   // the currency associated with this pack
    new PurchaseWithMarket(FIFTYMUFF_PACK_PRODUCT_ID, 1.99)    // purchase type
);
```

####**Real Game Examples:**

- A pack of 100 “Gold Coins”
- A pack of 12 “Muffins”

##VirtualGoods

Every virtual good is a `PurchasableVirtualItem`. You can buy it with other `VirtualItem`s, or in the market with money. Virtual goods are the heart of every virtual economy. These are the game objects you’re going to want to sell in your game's store.

Every virtual good belongs to one of the following groups:
1. Single Use
2. Single Use Pack
3. Lifetime
4. Equippables
5. Upgradables

Below are detailed descriptions of each category.

###SingleUseVG

The most basic and common kind of a `VirtualGood` is a `SingleUseVG`. `SingleUseVG`s can be purchase by your users multiple times. No limits!

**The SingleUseVG's characteristics are:**

- Can be purchased an unlimited number of times.
- Has a balance that is saved in the database. Its balance goes up when you "give" it or "buy" it. The balance goes down when you “take” it (for example in the case of a refund).

####**For example:**

``` java
public static final VirtualGood PAVLOVA_GOOD = new SingleUseVG(
    "Pavlova",                                                      // name
    "Gives customers a sugar rush and they call their friends",     // description
    "pavlova",                                                      // item ID
    new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 175)       // purchase type
);
```

####**Real Game Examples:**

- Hat
- Sword
- Cake

###SingleUsePackVG

Sometimes, you'll want to to sell packs of `SingleUseVG`s. To support these cases, we've created `SingleUsePackVG`.

**The SingleUsePackVG's characteristics are:**

- Can be purchased an unlimited number of times.
- Doesn't have a balance in the database. The `SingleUseVG` that's associated with this pack has its own balance. When your users buy a `SingleUsePackVG`, the balance of the associated `SingleUseVG` goes up in the amount you defined for the pack.
*For Example:*
Suppose you offer a `SingleUsePackVG` of “10 Swords”. The `SingleUseVG` that’s associated with this Pack is “Sword”. When your user buys a “10 Sword” Pack, the balance of “Sword” is increased by 10 in the database.

####**For Example**

``` java
public static final VirtualGood 20_CHOCOLATECAKE_GOOD = new SingleUsePackVG(
    "CHOCOLATECAKE_ITEM_ID",                                  //good item ID
    20,                                                       //amount
    "20 Chocolate Cakes",                                     //name
    "A pack of 20 chocolate cakes",                           //description
    "20_chocolate_cakes_pack",                                //item ID
    new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 30)  //purchase type
);
```

###LifetimeVG

A `LifetimeVG` is a `VirtualGood` that is bought exactly once and kept forever.

**The LifetimeVG's characteristics are:**

- Can only be purchased once.
- Your users can't have more than one of this item. In other words, they can have either 0 or 1 of this item at any given time.

As mentioned in the beginning of this document, every virtual item has a purchase type of either `PurchaseWithVirtualItem` or `PurchaseWithMarket`.

In the case of a `LifetimeVG`, when created with a purchase type of `PurchaseWithMarket`, it represents a non-consumable item in the market, i.e., it cannot be consumed and is owned by the user forever.

On the other hand, when created with a purchase type of `PurchaseWithVirtualItem`, the user will own the `LifetimeVG` as long as the local storage of the game has **not** been deleted (the version has been updated, or the game was deleted and re-downloaded... Read more about [SOOMLA Storage]()), .

Confused? See the example below for clarification.

####**For Example**

There's an explanation after the code.

``` java
// A blue car that is purchased with virtual coins.
public static final VirtualGood BLUE_CAR = new LifetimeVG(
    "Blue Car",                                                            // name
    "This car is yours for as long as the game's storage doesn't change!", // description
    "blue_car",                                                            // item ID
    new PurchaseWithVirtualItem(COIN_CURRENCY_ITEM_ID, 3000)               // purchase type
);

// A red car that is purchased with money in the market.
public static final VirtualGood RED_CAR = new LifetimeVG(
    "Red Car",                                                             // name
    "This car is yours FOREVER!!!",                                        // description
    "red_car",                                                             // item ID
    new PurchaseWithMarket(RED_CAR_PRODUCT_ID, 4.99)                       // purchase type
);
```

As you probably noticed, the blue car can be purchased for 3000 **virtual coins**, and the red car can be purchased for **money** (4.99).

Let's say a user purchases both cars. Even if the game's local storage is deleted, the user will still own the red car and will receive it upon `refreshInventory` process. However, the user will not own the blue car any longer!

####**Real Game Examples:**

- No Ads
- Double Coins
- Characters in the game
- Vehicles or weapons, etc...

###EquippableVG

An `EquippableVG` is a special type of `LifetimeVG`. In addition to the fact that an `EquippableVG` can be purchased once, it can also be equipped by your users. Equipping means that the user decides to currently use a specific `EquippableVG`.

**The EquippableVG's characteristics are:**

- Can be purchased only once.
- Can be equipped by the user.
- Inherits the definition of `LifetimeVG`.

**There are 3 equipping models:**

- `LOCAL` - The current `EquippableVG`'s equipping status doesn't affect any other `EquippableVG`.
- `CATEGORY` - In the containing category, if this `EquippableVG` is equipped, all other `EquippableVG`s are unequipped.
- `GLOBAL` - In the whole game, if this `EquippableVG` is equipped, all other `EquippableVG`s are unequipped.

####**For Example**

``` java
public static final VirtualGood GEORGE_GOOD = new EquippableVG(
    EquippableVG.EquippingModel.CATEGORY,                       // equipping model
    "George",                                                   // name
    "George is the best muffin eater in the north",             // description
    "george_good",                                              // item ID
    new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 350)   // purchase type
);
```

####**Real Game Examples:**

- **LOCAL EquippableVG Example:** Say your game offers 3 weapons, all `EquippableVG`s: a sword, a gun, and an axe. Let’s suppose your user has already bought all 3. These are equippables that do not affect one another - your user can “carry” the sword, gun, and axe at the same time if he chooses to.

- **GLOBAL EquippableVG Example:** Suppose your game offers multiple characters (`LifetimeVG`s): RobotX and RobotY, and your user owns both. He/she can only play as (i.e. Equip) one character at a time, either RobotX or RobotY, but never both at the same time!

- **CATEGORY EquippableVG Example:** Suppose your game offers “shirts” and “hats”. Let’s say there are 4 available shirts and 2 available hats, and your user has purchased all of the items available. He/she can can equip at most one of each category (0 or 1 shirts AND 0 or 1 hats). (`VirtualCategory` is explained below).

###UpgradeVG

An `UpgradeVG` is a `VirtualGood` in a series of `UpgradeVG`s that define an upgrade sequence for a given `VirtualGood`. The associated `VirtualGood` can be of any type (`SingleUseVG`, `EquippableVG`, etc..).

**An `UpgradeVG` is best explained with an example:**
Say you have a strength attribute in your game and that strength is upgradeable on a scale of 1-5.  This is what you'll need to create:

1. SingleUseVG for 'strength'
2. UpgradeVG for strength 'level 1'
3. UpgradeVG for strength 'level 2'
4. UpgradeVG for strength 'level 3'
5. UpgradeVG for strength 'level 4'
6. UpgradeVG for strength 'level 5'

When the user buys an`UpgradeVG`, a check is performed to make sure the appropriate conditions are met (which actually means the associated `VirtualGood` is upgraded).

**The UpgradeVG's characteristics are:**

- Can be purchased whenever it's not the current upgrade.
- Doesn't have a balance in the database.

**UpgradeVG class members that are worth mentioning:**

- `goodItemId` - the itemId of the `VirtualGood` associated with this upgrade.
- `prevItemId` - the itemId of the `UpgradeVG` that comes before this one, or if this is the first `UpgradeVG` in the scale then this value is null.
- `nextItemId` - the itemId of the `UpgradeVG` that comes after this one, or if this is the last `UpgradeVG` in the scale then the value is null.

####**For Example:**

``` java
public static final VirtualGood LEVEL_1_GOOD = new UpgradeVG(
    "MUFFIN_CAKE_GOOD_ITEM_ID",                               //goodItemId
    null,                                                     //prevItemId
    "LEVEL_2_GOOD_ITEM_ID",                                   //nextItemId
    "Level 1",                                                //name
    "Muffin Cake Level 1",                                    //description
    "LEVEL_1_GOOD_ITEM_ID",                                   //item ID
    new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 50)  //purchase type
);

public static final VirtualGood LEVEL_2_GOOD = new UpgradeVG(
    "MUFFIN_CAKE_GOOD_ITEM_ID",                               //goodItemId
    "LEVEL_1_GOOD_ITEM_ID",                                   //prevItemId
    null,                                                     //nextItemId
    "Level 2",                                                //name
    "Muffin Cake Level 2",                                    //description
    "LEVEL_2_GOOD_ITEM_ID",                                   //item ID
    new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 250) //purchase type
);
```

##VirtualCategory

A `VirtualCategory` is used to categorize `VirtualGood`s. Categories are helpful for organizational purposes, but especially come in handy when you have Equippable Virtual Goods.

<div class="info-box">If you don’t have any need for categories, you can just define all of your virtual goods in one category and call it something like “General”.</div>

####**Real Game Examples:**
Let’s suppose your game has the following categories of virtual goods: "Power Ups", "Weapons", and  "Hats". Say you decide to make “Weapons” and “Hats” `CATEGORY` `EquippableVG`s. You can easily implement this functionality once the goods are divided into virtual categories.


##**Usage Example**

An example that contains most or all of the economy objects we described above:

- **Android:** [MuffinRushAssets](https://github.com/soomla/android-store/blob/master/SoomlaAndroidExample/src/com/soomla/example/MuffinRushAssets.java)

- **iOS:** [MuffinRushAssets](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStoreExample/SoomlaiOSStoreExample/MuffinRushAssets.h)

- **Unity3d:** [MuffinRushAssets](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Examples/MuffinRush/MuffinRushAssets.cs)

- **Cocos2d-x:** [MuffinRushAssets](https://github.com/soomla/cocos2dx-store-example/blob/master/Classes/MuffinRushAssets.h)
