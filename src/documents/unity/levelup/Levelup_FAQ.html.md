---
layout: "content"
image: "Tutorial"
title: "FAQ"
text: "Frequently asked questions about unity3d-levelup"
position: 4
theme: 'platforms'
collection: 'unity_levelup'
module: 'levelup'
platform: 'unity'
---

# unity3d-levelup FAQ

<div class="info-box">In this document you'll find LevelUp-related questions & answers. For more FAQ questions, including integration questions and common errors, see our [unity3d-store FAQ](/unity/store/Store_FAQ) and [unity3d-profile FAQ](/unity/profile/Profile_FAQ).</div>

<br>

---

**Does the unity3d-levelup package include a method of loading up a Unity scene when starting a Level?**

LevelUp is not bound to any scenes you might have in your game, if anything it should be the other way around: when the scene loads, the level should start.

---

**Can I move LevelUp around multiple scenes?**

Yes, since `SoomlaLevelUp` methods are static, you can call them from anywhere in your code, thus you can obtain instances of worlds, levels, missions, gates, scores etc. from any scene. Just make sure you add our prefabs to your earliest loading scene and that you initialize LevelUp in that scene once.

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

**After setting a level as completed, at which point the level's `state` was `Completed`, I stopped the game and re-ran it. Now when I call `Level.State()`, I expect the
state to still be `Completed, but its state is `Idle`! Why is this so?**

`Level.State()` gives the state of the level on this play session. Instead, you should use `World.IsCompleted()`, which gives the *stored* state of the level.

---

**How can I reset `WorldStorage`?**

You shouldn't reset the storage as you want it to persist between game sessions. When the user uninstalls the game, the storage gets reset. But if, for some reason, you really need to clear something from the storage, you can use the key value storage which is lower in the stack (inside the core module): `KeyValueStorage.DeleteKeyValue`.

---

**In my code, I have a world that has a `PurchasableGate` - after I buy the "associated item" of the gate, `myWorld.CanStart()` returns false! Why is this so?**

`PurchasableGate` has an associated item, that needs to be purchased in order to open the gate. However, in order for `PurchasableGate` to know that the purchase being performed is related to it, **it** has to perform the purchase, which is done in its `Open` method. So, instead of buying the associated item manually (with `BuyItem`), you need to call `gate.Open()` (`BuyItem` will be called for you).

---
