'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"app_token_bridge.js": "f3bbfc6bae1dfdffde2977e42fbdf74c",
"assets/AssetManifest.bin": "c38866b247f883bf7cf65fdfb1f97af4",
"assets/AssetManifest.bin.json": "16a68086de4d530dfc8ebdcc380bf2da",
"assets/assets/icons/login_brand_mark.svg": "682821c96052a5635318c2cb66f67009",
"assets/assets/icons/logo.jpg": "9ccea5e1d993858e38656c1285fcc21e",
"assets/assets/icons/play.png": "e719edc97e1df1d69ddd520a02a5e855",
"assets/assets/icons/pwa_install_add.svg": "a3da998a50b89b464d7de91f64d7ec09",
"assets/assets/icons/pwa_install_phone.svg": "19b0d2453d5e6b2185085ad51e5a9c90",
"assets/assets/icons/pwa_install_share.svg": "74c2deb2dcd03218c266e53e108b157b",
"assets/assets/icons/rtc_call_video.svg": "ef4bd2b078d0abb34080ad962ad97208",
"assets/assets/icons/rtc_call_voice.svg": "77cf425ec09bb1b7383c42031d4df5d8",
"assets/assets/icons/splash.svg": "682821c96052a5635318c2cb66f67009",
"assets/assets/icons/splash2.svg": "4a108965468213f2e5d83eebeecdaf3d",
"assets/assets/icons/url.svg": "8b471b0bc5a3b92099bc00fb5f20ac59",
"assets/assets/images/c2c/chat/bg_new_messages_pill.svg": "09fb367bae01feae70ca8ec93cba79c8",
"assets/assets/images/c2c/chat/icon_chevrons_up.svg": "7f6f397e46e5688f812f0e7896bbb540",
"assets/assets/images/c2c/chat/icon_input_emoji.svg": "cc5038bf4353149e0d3bc5e63348fb95",
"assets/assets/images/c2c/chat/icon_input_more.svg": "5c1ae45b8dc7a9c61066eada412f16cd",
"assets/assets/images/c2c/chat/icon_input_voice.svg": "fe4bc285417018db5f9d1aec18fe9009",
"assets/assets/images/c2c/chat/icon_menu_copy.svg": "9006e189ea2c9169a6094ff7c22ca98d",
"assets/assets/images/c2c/chat/icon_menu_delete.svg": "93ebfc2fcfeb2d27ff87f735678b8a59",
"assets/assets/images/c2c/chat/icon_menu_favorite.svg": "f5ad93b6b7ffaa2290dd420e303d6a84",
"assets/assets/images/c2c/chat/icon_menu_forward.svg": "c58cb94269b1e3ad1e29dcb927cc8dd1",
"assets/assets/images/c2c/chat/icon_menu_multi.svg": "1af70b0597949e0dca11ae10cd03ff9f",
"assets/assets/images/c2c/chat/icon_menu_quote.svg": "96e4378fe75f2dfdd3e15f97793685d5",
"assets/assets/images/c2c/chat/icon_nav_back.svg": "d185d2db2b0ece730a807344b70251b6",
"assets/assets/images/c2c/chat/icon_nav_more.svg": "cc880240e5fe379ff228cd8d06a1bafb",
"assets/assets/images/c2c/chat/icon_tool_camera.svg": "209f84d152d698b440f9ac82bdd12ac4",
"assets/assets/images/c2c/chat/icon_tool_photo.svg": "f9a6c847aada9fd65c939b165fd39272",
"assets/assets/images/c2c/chat/icon_voice_wave.svg": "1f20c3c3d90dc09ebe8a7678915001d7",
"assets/assets/images/c2c/merchant/brand_badge_bg.svg": "5bf2eae63c2586ae79a8def98d3b026e",
"assets/assets/images/c2c/merchant/brand_badge_rocket.svg": "9840bfd14347ebb78267d9a76b648b44",
"assets/assets/images/c2c/merchant/cancel.svg": "f012418c8665b8166bb0a5db8006ce23",
"assets/assets/images/c2c/merchant/check_circle_active.svg": "83d97a2f9a201ae7ddc24cc6db19b1fd",
"assets/assets/images/c2c/merchant/check_circle_inactive.svg": "22e2463ce11442e532d9f83c8a2d35dc",
"assets/assets/images/c2c/merchant/chevron_back_nav.svg": "b8d94dd79a376f3687ec8cf6d736b087",
"assets/assets/images/c2c/merchant/chevron_step.svg": "b58bae500eb6964d9424cae2e74396fd",
"assets/assets/images/c2c/merchant/customerService.svg": "59841d63443764e104df134cd96b54ab",
"assets/assets/images/c2c/merchant/customer_service_qr.png": "0228da4bc56c40297476a78e30c507dd",
"assets/assets/images/c2c/merchant/hero_rocket.svg": "e0fba217341d09283e43402b04aa223a",
"assets/assets/images/c2c/merchant/hero_scene_mask.svg": "36bf13698f80c9cdaaa18bd5cfb5136a",
"assets/assets/images/c2c/merchant/hero_scene_mask1.svg": "a848576ab26e8133505195a9b1e9bb76",
"assets/assets/images/c2c/merchant/icon_paytype_checkbox_on.svg": "26417dacc71e0bce63c363339c8e60aa",
"assets/assets/images/c2c/merchant/icon_paytype_edit.svg": "c3bbdd16de9d4577d935967e49c5934a",
"assets/assets/images/c2c/merchant/icon_paytype_empty.svg": "b74b749d591f610b45ae2b9c817bc661",
"assets/assets/images/c2c/merchant/qcodekefu.png": "6ac62a491e50438eb0ce7b0ba98509c0",
"assets/assets/images/c2c/merchant/qcodekefu.svg": "65de55cd44ce2b7f298f9040bd8e26e9",
"assets/assets/images/c2c/merchant/upload_plus.svg": "2dfbf8b77c59c18c04ce80af2b9641fc",
"assets/assets/images/c2c/messages/icon_mute.svg": "eee406a5e81f9d3936e457cc18408d59",
"assets/assets/images/c2c/messages/icon_system_notice.svg": "3c6398399aa3207dd62c1e811302a049",
"assets/assets/images/c2c/mine/chevron_back.svg": "c9e792e9caa530a27bb980fb0faf6363",
"assets/assets/images/c2c/mine/chevron_profile.svg": "15135d2287f02ced1ab395368934b37b",
"assets/assets/images/c2c/mine/chevron_right.svg": "1a102a64c05a54c604dc1fa26c4f8656",
"assets/assets/images/c2c/mine/divider_line.svg": "571f5a3b89331621d4ca31a6d120a2a4",
"assets/assets/images/c2c/mine/tab_c2c.svg": "56ef01cab67b8428e357e0f5d974d2ee",
"assets/assets/images/c2c/mine/tab_c2c_active.svg": "5863e96f6afdd43654770243f90a179a",
"assets/assets/images/c2c/mine/tab_c2c_main.svg": "93e896b412c30fc16136d83122cbdea0",
"assets/assets/images/c2c/mine/tab_message.svg": "44c47974acfe806f8e5f91327105d1bb",
"assets/assets/images/c2c/mine/tab_message_active.svg": "526e173194ad07a9a51d315f87a407c6",
"assets/assets/images/c2c/mine/tab_message_main.svg": "d1630d656dbcceb3cb9f6abce90454cd",
"assets/assets/images/c2c/mine/tab_mine_active.svg": "972443bda0a01f0eea8ef389ac62c235",
"assets/assets/images/c2c/mine/tab_mine_main.svg": "49a824a7aa2ee8f2275c13d1c79813dd",
"assets/assets/images/c2c/mine/tab_order.svg": "1b96944446a32436113b305855c01b80",
"assets/assets/images/c2c/mine/tab_order_active.svg": "63e4f2c2a9e0f0dc218e467546a99074",
"assets/assets/images/c2c/mine/tab_order_main.svg": "b45df5e391eb16d9de2e9684a29007a1",
"assets/assets/images/c2c/orders/chevron_right_small.svg": "b8b3017b79e29625211c2aa6654bf884",
"assets/assets/images/c2c/orders/chevron_seller.svg": "5e465c2da1cb2389ade33c5edb351260",
"assets/assets/images/c2c/orders/icon_search.svg": "7f3bf9c9f42ee3b6691c4807bcdd359d",
"assets/assets/images/c2c/orders/icon_status_chevron.svg": "176117157af0d043df7d047de28d5d27",
"assets/assets/images/c2c/order_appeal/icon_close.svg": "ac285a13a6ef5492273525f0a67e63f4",
"assets/assets/images/c2c/order_appeal/icon_plus.svg": "80f2ee04f0e8a606bb18eb85888852f1",
"assets/assets/images/c2c/order_appeal/icon_remove.svg": "f5d03a513925eb16951ef803750dc501",
"assets/assets/images/c2c/order_cancel/icon_radio_selected.svg": "64db3c65a6924b58ba2e9be4f01502e5",
"assets/assets/images/c2c/order_cancel/icon_radio_unselected.svg": "2e5db3452b2016f46bb2468532bbaac8",
"assets/assets/images/c2c/order_confirm/icon_copy.svg": "bc5f7a23019f9cc0f15e645cb31f182b",
"assets/assets/images/c2c/order_confirm/icon_nav_back.svg": "b8d94dd79a376f3687ec8cf6d736b087",
"assets/assets/images/c2c/order_detail/bg_action_circle_muted.svg": "66e90202615a6e4e98e4668fc6b00c6b",
"assets/assets/images/c2c/order_detail/bg_action_circle_primary.svg": "f32a11bbc0c35b258693100630b9a97d",
"assets/assets/images/c2c/order_detail/icon_copy.svg": "bc5f7a23019f9cc0f15e645cb31f182b",
"assets/assets/images/c2c/order_detail/icon_copy_filled.svg": "3c6eaa7b54a4a6b55b0ab1e43a51430d",
"assets/assets/images/c2c/order_detail/icon_external_link.svg": "71565213d840fc77e04f68f870404e52",
"assets/assets/images/c2c/order_detail/icon_eye.svg": "1006cde565989591d50c236200058eb9",
"assets/assets/images/c2c/order_detail/icon_loading_spinner.svg": "6bc99ce7f9c9582f9e96470105b0dcb6",
"assets/assets/images/c2c/order_detail/icon_nav_back.svg": "b8d94dd79a376f3687ec8cf6d736b087",
"assets/assets/images/c2c/order_detail/icon_refresh.svg": "50adf286622d9b7983f4434bd7e8406e",
"assets/assets/images/c2c/paytype/icon_paytype_alipay.svg": "1352623c3ebadfbfa1cf9266f166dc79",
"assets/assets/images/c2c/paytype/icon_paytype_bankcard.svg": "ebed247e098cad7ef4f7cf8cc32983cb",
"assets/assets/images/c2c/paytype/icon_paytype_hongda.svg": "dcdf8daa1a01d26ff7285345debbb40c",
"assets/assets/images/c2c/paytype/icon_paytype_huimei.svg": "e410f76cfcc23c2bcf5fa32c8e95328c",
"assets/assets/images/c2c/paytype/icon_paytype_wechat.svg": "35aee0306aa4daef8b582e3e7bebff8e",
"assets/assets/images/c2c/purchase/icon_checkbox_selected.svg": "2f2bf82cad67662aeb04eaa668c70a4c",
"assets/assets/images/c2c/purchase/icon_checkbox_unselected.svg": "dc8fe2628926ea4ba41c93e9e14679bc",
"assets/assets/images/c2c/purchase/icon_close.svg": "b93ea6b86cafca462a2a27da1ae268e8",
"assets/assets/images/c2c/task_orders/divider_line.svg": "212eadcdc1f8ec7653eac7b6985ef02a",
"assets/assets/images/c2c/task_orders/icon_nav_back.svg": "45043c13798cfee74249c8b5fd4f00a0",
"assets/assets/images/c2c/task_orders/icon_payment_chevron.svg": "0a8ac92e2490e78599d49822f1e5f7e0",
"assets/assets/images/logo.png": "a55e447484961eeac5c0b598cd7d3d65",
"assets/assets/images/profile/account_eye_open.svg": "6ab58c271027d9499cc2d6b1841557f1",
"assets/assets/images/profile/account_eye_outline.svg": "e349345dea12df74e48e6b4aa600cc4f",
"assets/assets/images/profile/account_eye_pupil.svg": "5d2529185f1562f641bab7ae94723c53",
"assets/assets/images/profile/change_account_nav_back.svg": "fd3da0d45b06865f8174df437ec84900",
"assets/assets/images/profile/icon_forgot_code.svg": "975511d9b8acbfcf181d2c77955e7f48",
"assets/assets/images/profile/icon_forgot_email.svg": "b3abcf719605c9e6260ddbfe9c3f13a4",
"assets/assets/images/profile/icon_forgot_lock_body.svg": "eb4098102d8b4bb65d765d01eb12ae9e",
"assets/assets/images/profile/icon_forgot_lock_keyhole.svg": "e043351b0d2bd88feb8970823fb2210d",
"assets/assets/images/profile/invite.png": "75bda822b220a38e8059f0b8cda3e2bd",
"assets/assets/images/profile/my_account_hero.svg": "6ca61b8b365f2d4be3c1bc57b61af851",
"assets/assets/images/profile/wallet.png": "b19ea20be71758c1466af7225eb2c1d6",
"assets/assets/images/wallet/c2c.png": "2f93c98124c831d1f5a98fe2f22d9f9b",
"assets/assets/images/wallet/c2c_active.png": "ae1396cfb28fbfa57eb7f8da5cbbb4f6",
"assets/assets/images/wallet/card.png": "9acd22db5e4185193edafff2fe095e8b",
"assets/assets/images/wallet/chat.png": "e9b72c28de0d58a477a52aa285842057",
"assets/assets/images/wallet/chat_active.png": "e43ed64ec871f2f47e97779b35133dfd",
"assets/assets/images/wallet/eye_close.svg": "3e2c51dd29a5b11f87fb3c2db3649ddd",
"assets/assets/images/wallet/huimei.png": "7ada16ef4f670c32867171db009376cb",
"assets/assets/images/wallet/icon_action_c2c.svg": "a868921ca1152b997ce29b91435fdd7e",
"assets/assets/images/wallet/icon_action_recharge.svg": "bc610fff4073cfbb3eb633b8c2118359",
"assets/assets/images/wallet/icon_action_recharge_arrow.svg": "04094b833f31cb25227cc94ec131b2cd",
"assets/assets/images/wallet/icon_action_recharge_ring.svg": "a9ff22397ff0137afd4763edec15bc7d",
"assets/assets/images/wallet/icon_action_transfer.svg": "71565213d840fc77e04f68f870404e52",
"assets/assets/images/wallet/icon_bill_c2c.svg": "0dfe5ae94bcc63e00788f14a12483a9a",
"assets/assets/images/wallet/icon_bill_recharge.svg": "0c7ed4bbe8146335557ce479ba6f2fd8",
"assets/assets/images/wallet/icon_bill_recharge_arrow.svg": "58d5eb12cd9afc875c70c6de845c969d",
"assets/assets/images/wallet/icon_bill_recharge_ring.svg": "624d48a2d26832e5364c2e496a0ae37e",
"assets/assets/images/wallet/icon_bill_recharge_wallet.svg": "c735ed50e7943b682a070fbe7acdde1e",
"assets/assets/images/wallet/icon_bill_ring.svg": "19ce0800996c0507ead1f7b0f9064758",
"assets/assets/images/wallet/icon_bill_transfer.svg": "979574166de015a73a695a7928bf3415",
"assets/assets/images/wallet/icon_bill_transfer_bg.svg": "19ce0800996c0507ead1f7b0f9064758",
"assets/assets/images/wallet/icon_bill_transfer_wallet.svg": "1abe29e9b8b67327ca06ed6dcd346a42",
"assets/assets/images/wallet/icon_copy.svg": "3c6eaa7b54a4a6b55b0ab1e43a51430d",
"assets/assets/images/wallet/icon_copy_back.svg": "ca2f0727ea820b8c34d690ca9d505937",
"assets/assets/images/wallet/icon_copy_front.svg": "8a4bb2c2fa1d854d66513855e8e987be",
"assets/assets/images/wallet/icon_divider.svg": "53c35f719dd018f451c1ef752a34c0ed",
"assets/assets/images/wallet/icon_eye.svg": "a54c965e53d6398add7350c85109d4c9",
"assets/assets/images/wallet/icon_eye_inner.svg": "d789af9bc67e1b92f717f785d2be1d23",
"assets/assets/images/wallet/icon_eye_outer.svg": "dbb2914cc108cbb65ed303282b6c9f10",
"assets/assets/images/wallet/icon_nav_back.svg": "b8d94dd79a376f3687ec8cf6d736b087",
"assets/assets/images/wallet/icon_refresh.svg": "50adf286622d9b7983f4434bd7e8406e",
"assets/assets/images/wallet/icon_refresh_part1.svg": "6dec8e10edd6b03907dba760787e82ae",
"assets/assets/images/wallet/icon_refresh_part2.svg": "2eff53cfc2678ee3cbe9bb59fae467ce",
"assets/assets/images/wallet/icon_usdt_chevron.svg": "f21c863b6973440b30addea55f3e0060",
"assets/assets/images/wallet/my.png": "ef27ac748a856c32d19cc9f7911bb041",
"assets/assets/images/wallet/my_active.png": "f93bf1c4992c22a08873b7636e5985d7",
"assets/assets/images/wallet/order.png": "82f1f96d84a1345d133064571b5814d5",
"assets/assets/images/wallet/order_active.png": "ea23e84c81f3c13b8d5273de8c5b971c",
"assets/assets/images/wallet/USDT.png": "f7b20fbe3de24a0e19f3e6b7f18dcdb0",
"assets/assets/images/wallet/walletBg.svg": "8fb72e225c48692372333d610cbb11e8",
"assets/assets/images/wallet/wechat.png": "ebb6c7eaae3eaac6cf47d539ebe1c697",
"assets/assets/images/wallet/zfb.png": "9333400399eda68e3c44150af0b80ebe",
"assets/assets/images/xhjPlaylet.png": "adf5682f39062862d40b6e36ccdb61d8",
"assets/assets/images/xhjVideo.png": "02d4c40505f6673c294191914f9c66e5",
"assets/assets/sounds/notice.mp3": "17ccc6b78388c9e0733f49653ab6f6dc",
"assets/FontManifest.json": "df7941d7f1471ba664695d864ca1b139",
"assets/fonts/MaterialIcons-Regular.otf": "3b287c6fae92d246b9d408b7579bafc6",
"assets/fonts/Roboto-Bold.ttf": "a0dfeb5d15101b6933df056d25bf1f3d",
"assets/fonts/Roboto-Regular.ttf": "c967730c06373ac1b27c087a3b3a0d06",
"assets/NOTICES": "ab83c913142d3b0e838d52fdd3e7c04e",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "d7d83bd9ee909f8a9b348f56ca7b68c6",
"assets/packages/wakelock_plus/assets/no_sleep.js": "74499cf34f37daae14b51e3a23cd9f7a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01",
"device_code_bridge.js": "cf3dbc98920a0b5e750e6de1d3931431",
"favicon.png": "d91237e87c23368ba999c4ee14bb1aab",
"fingerprintjs.iife.min.js": "821bd9886fad96a6678f4f16bfcb649d",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"flutter_bootstrap.js": "665cefa1d114e6720783e98e0b462e82",
"icons/Icon-192.png": "b621b43203e72be1a1b657f17707b94e",
"icons/Icon-512.png": "fd63c6a9cbb864911424dd5e021fad52",
"icons/Icon-maskable-192.png": "b621b43203e72be1a1b657f17707b94e",
"icons/Icon-maskable-512.png": "fd63c6a9cbb864911424dd5e021fad52",
"index.html": "8953ede50b59945908272b527a6b2eb1",
"/": "8953ede50b59945908272b527a6b2eb1",
"logo.png": "e6656ba073ce3649fec1e6f735f0b5d0",
"main.dart.js": "d30744d0525371439c2c2d0e6a603748",
"manifest.json": "379172929dbebe32fd25b1e5fdf340fd",
"popop_client_shell.html": "60cdbb3254b10f1dfabb9a35407ef05e",
"pwa_install_bridge.js": "048d6e153ad188c2efae7a98b2fa930d",
"version.json": "7dd956f38d7ed229c1255924c1864732"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
