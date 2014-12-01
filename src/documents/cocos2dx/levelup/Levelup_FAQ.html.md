---
layout: "content"
image: "Tutorial"
title: "FAQ"
text: "Frequently asked questions about cocos2dx-levelup"
position: 4
theme: 'platforms'
collection: 'cocos2dx_levelup'
module: 'levelup'
platform: 'cocos2dx'
---

# cocos2dx-levelup FAQ

<div class="info-box">In this document you'll find LevelUp-related questions & answers. For more FAQ questions, including integration questions and common errors, see our [cocos2dx-store FAQ](/cocos2dx/store/Store_FAQ) and [cocos2dx-profile FAQ](/cocos2dx/profile/Profile_FAQ).</div>

<br>

---

**I want to unlock a world in my game if the previous world is finished. How can I achieve this?**

You need to create a `CCWorldCompletionGate` for the `CCWorld` you want to unlock, and in the "associated world" parameter provide the PREVIOUS `CCworld`'s item ID.

For example,

``` cpp
CCWorld *prevWorld = CCWorld::create(CCString::create("prevWorld_ID"));

CCWorld *thisWorld = CCWorld::create(CCString::create("thisWorld_ID"));

soomla::CCGate *thisWorldGate = soomla::CCWorldCompletionGate::create(
   CCString::create("thisWorld_CompGate_ID"),   // Item ID
   prevWorld->getId()                           // Associated World
);

thisWorld->setGate(thisWorldGate);
```

Notice that this concept applies to `Score`s, as well, and not just to `CCWorldCompletionGate`. For example, "opening a level when the user reaches score X in the PREVIOUS level" is implemented the same way as above: Create a `RecordScore` for this `World` (or `Level`), and set its "associated score" to be the previous `World`'s score.

---

**I used `batchAddLevelsWithTemplates()` to create multiple levels with `RecordGate`s. How do I open the gate of the first level, so that the user can start with it as first launch of the game?**

You need to retrieve the `Gate` of the first `Level` of your main `World`, and force it open.

``` cpp
CCLevel *firstLevel = dynamic_cast<CCLevel*>(mainWorld->getInnerWorldAt(0));
firstLevel->getGate()->forceOpen(true);
```

---

**How can I reset `WorldStorage`?**

You shouldn't reset the storage as you want it to persist between game sessions. When the user uninstalls the game, the storage gets reset. But if, for some reason, you really need to clear something from the storage, you can use the key value storage which is lower in the stack (inside the core module): `CCKeyValueStorage::getInstance()->deleteKeyValue(...);`.

---

**In my code, I have a world that has a `CCPurchasableGate` - after I buy the "associated item" of the gate, `myWorld->canStart()` returns false! Why is this so?**

`CCPurchasableGate` has an associated item, that needs to be purchased in order to open the gate. However, in order for `CCPurchasableGate` to know that the purchase being performed is related to it, **it** has to perform the purchase, which is done in its `open` method. So, instead of buying the associated item manually (with `buyItem`), you need to call `gate->open()` (`buyItem` will be called for you).

---
