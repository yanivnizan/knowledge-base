#**Getting Started**

##Get unity3d-store

1. Download the unity3d-store project file you want and double-click on it. It'll import all the necessary files into your project.

  - **unity3d-store v1.4.4 (release version):**

    [Unity 4.x - unity3d-store v1.4.4](http://bit.ly/1ir2odn)

  - **unity3d-store v1.4.4 example:**

    [Unity 4.x - unity3d-store v1.4.4 example](http://bit.ly/SDcsGS)

    The example project is mostly what we have in the [Github repo](https://github.com/soomla/unity3d-store). You can either download it or clone unity3d-store:

    `git clone https://github.com/soomla/unity3d-store.git`

2. Drag the "StoreEvents" Prefab from `../Assets/Soomla/Prefabs` into your scene. You should see it listed in the "Hierarchy" panel.

    ![alt text](/img/tutorial_img/unity_getting_started/hierarchyPanel.png "Store Listing")

3. On the menu bar click "Soomla -> Edit Settings" and change the values for "Custom Secret", "Public Key" and "Soom Sec":

  - *Public Key* - is the public key given to you from Google. (iOS doesn't have a public key).
  - *Custom Secret* - is an encryption secret you provide that will be used to secure your data.
  - *Soom Sec* - is a special secret SOOMLA uses to increase your data protection.

      **Choose both secrets wisely. You can't change them after you launch your game!**

      ![alt text](/img/tutorial_img/unity_getting_started/soomlaSettings.png "Store Listing")

4. Create your own implementation of `IStoreAssets` in order to describe your game's specific assets.
  - For a brief example, see the [example](#example) at the bottom.
  - For a more detailed example, see our MuffinRush [example](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Examples/MuffinRush/MuffinRushAssets.cs).

5. Initialize `StoreController` with the class you just created:

    ``` cs
    StoreController.Initialize(new YourStoreAssetsImplementation());
    ```

    <div class="info-box">Initialize StoreController ONLY ONCE when your application loads.</div>

    <div class="info-box">Initialize StoreController in the `Start` function of `MonoBehaviour` and NOT in the `Awake` function. SOOMLA has its own `MonoBehaviour` and it needs to be "Awakened" before you initialize.</div>

5. You'll need an event handler in order to be notified about in-app purchasing related events. Refer to the [Event Handling](/docs/platforms/unity3d/Events) section for more information.

That's it! You now have storage and in-app purchasing capabilities ALL-IN-ONE!

## Example

``` cs
//Create your implementation of IStoreAssets
public class ExampleAssets : IStoreAssets{
    ...

    /** Virtual Currencies **/
    public static VirtualCurrency COIN_CURRENCY = new VirtualCurrency(
        ...
        "currency_coin"                     // item id
	);

    /** Virtual Currency Packs **/
    public static VirtualCurrencyPack TEN_COIN_PACK = new VirtualCurrencyPack(
        ...
        10,                                 // number of currencies in the pack
        "currency_coin",                    // the currency associated with this pack
        new PurchaseWithMarket(             // purchase type
            TEN_COIN_PACK_PRODUCT_ID,       // product ID
            0.99)                           // initial price
    );

    /** Virtual Goods **/

    // Shield that can be purchased for 150 coins.
    public static VirtualGood SHIELD_GOOD = new SingleUseVG(
        ...
        new PurchaseWithVirtualItem(        // purchase type
            "currency_coin",                // virtual item to pay with
            150)                            // payment amount
    );

    // Pack of 5 shields that can be purchased for $2.99.
    public static VirtualGood 5_SHIELD_GOOD = new SingleUsePackVG(
        ...
        new PurchaseWithMarket(             // purchase type
            SHIELD_PACK_PRODUCT_ID,         // product ID
            2.99)                           // initial price
    );

    ...
}

// Initialize StoreController
public class ExampleWindow : MonoBehaviour {
    ...
    void Start () {
		...
		StoreController.Initialize(new ExampleAssets());
		...
	}
}
```
