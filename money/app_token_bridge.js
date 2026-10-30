(function () {
  const storageKey = "my_token";
  const logoutMarkerKey = "my_token_logout_pending";
  const tokenEventName = "xhj-app-token-received";
  const logoutEventName = "xhj-app-logout-received";
  const bridgeChannel = "xhj-auth-bridge";
  const bridgeVersion = 1;
  const defaultTrustedParentOrigins = [
    "https://app.xhj.im",
    "https://testapp.xhj.im",
    "https://h5.xhjim.app",
  ];
  const configuredTrustedParentOrigins = Array.isArray(
    window.XHJ_AUTH_BRIDGE_TRUSTED_PARENT_ORIGINS,
  )
    ? window.XHJ_AUTH_BRIDGE_TRUSTED_PARENT_ORIGINS
    : [];
  const trustedParentOrigins = [
    ...defaultTrustedParentOrigins,
    ...configuredTrustedParentOrigins,
    readLocalDevelopmentParentOrigin(),
  ].filter(function (origin) {
    return typeof origin === "string" && /^https?:\/\/[^/]+$/i.test(origin);
  }).map(function (origin) {
    return origin.toLowerCase();
  });

  function readLocalDevelopmentParentOrigin() {
    const rawOrigin = new URLSearchParams(window.location.search)
      .get("xhj_parent_origin");
    if (typeof rawOrigin !== "string") {
      return "";
    }

    try {
      const origin = new URL(rawOrigin);
      const isLocalHost = origin.hostname === "localhost" ||
        origin.hostname === "127.0.0.1";
      return origin.protocol === "http:" && isLocalHost
        ? origin.origin
        : "";
    } catch (_) {
      return "";
    }
  }

  function normalizeToken(token) {
    if (typeof token !== "string") {
      return "";
    }

    return token.trim();
  }

  window.receiveTokenFromApp = function (token) {
    const normalizedToken = normalizeToken(token);
    if (!normalizedToken) {
      return false;
    }

    try {
      const previousToken = window.localStorage.getItem(storageKey);
      const hadPendingLogout =
        window.localStorage.getItem(logoutMarkerKey) === "1";
      window.localStorage.setItem(storageKey, normalizedToken);
      window.localStorage.removeItem(logoutMarkerKey);
      // The parent retries until it sees an ACK. Do not restart Flutter's
      // auth import queue for an identical session delivery.
      if (previousToken !== normalizedToken || hadPendingLogout) {
        window.dispatchEvent(new CustomEvent(tokenEventName));
      }
      return true;
    } catch (error) {
      console.warn("Unable to receive App token", error);
      return false;
    }
  };

  function clearTokenFromApp() {
    try {
      window.localStorage.removeItem(storageKey);
      window.localStorage.setItem(logoutMarkerKey, "1");
      window.dispatchEvent(new CustomEvent(logoutEventName));
      return true;
    } catch (error) {
      console.warn("Unable to clear App token", error);
      return false;
    }
  }

  window.clearTokenFromApp = clearTokenFromApp;

  function isTrustedParent(event) {
    return event.source === window.parent &&
      trustedParentOrigins.indexOf(event.origin.toLowerCase()) !== -1;
  }

  function logWalletBridge(message, detail) {
    console.warn("[xhj-auth-bridge][wallet]", message, detail || "");
  }

  function postBridgeMessage(target, message, targetOrigin) {
    try {
      target.postMessage(JSON.stringify(message), targetOrigin);
      return true;
    } catch (error) {
      logWalletBridge("向父页面发送消息失败", {
        type: message.type,
        targetOrigin: targetOrigin,
        error: error,
      });
      return false;
    }
  }

  function acknowledgeSessionDelivery(event, deliveryId) {
    if (typeof deliveryId !== "string" || !deliveryId) {
      logWalletBridge("缺少 deliveryId，未回 ACK", {
        origin: event.origin,
      });
      return;
    }

    postBridgeMessage(event.source, {
      channel: bridgeChannel,
      version: bridgeVersion,
      type: "ACK",
      deliveryId: deliveryId,
    }, event.origin);
  }

  window.addEventListener("message", function (event) {
    if (typeof event.data !== "string") {
      return;
    }

    let message;
    try {
      message = JSON.parse(event.data);
    } catch (_) {
      if (event.data.indexOf(bridgeChannel) !== -1) {
        logWalletBridge("无法解析父页面消息", { origin: event.origin });
      }
      return;
    }

    if (!message || message.channel !== bridgeChannel) {
      return;
    }

    if (!isTrustedParent(event)) {
      logWalletBridge("父页面来源不受信任，已忽略 token", {
        origin: event.origin,
        trustedParentOrigins: trustedParentOrigins,
        type: message.type,
      });
      return;
    }

    if (message.version !== bridgeVersion) {
      logWalletBridge("协议版本不匹配", {
        origin: event.origin,
        expectedVersion: bridgeVersion,
        actualVersion: message.version,
        type: message.type,
      });
      return;
    }

    if (message.type === "TOKEN") {
      if (window.receiveTokenFromApp(message.token)) {
        acknowledgeSessionDelivery(event, message.deliveryId);
      } else {
        logWalletBridge("写入登录态失败，未回 ACK", {
          origin: event.origin,
          deliveryId: message.deliveryId,
        });
      }
    } else if (message.type === "LOGOUT") {
      if (clearTokenFromApp()) {
        acknowledgeSessionDelivery(event, message.deliveryId);
      } else {
        logWalletBridge("清除登录态失败，未回 ACK", {
          origin: event.origin,
          deliveryId: message.deliveryId,
        });
      }
    } else {
      logWalletBridge("收到无法处理的父页面消息", {
        origin: event.origin,
        type: message.type,
      });
    }
  });

  if (window.parent !== window) {
    postBridgeMessage(window.parent, {
      channel: bridgeChannel,
      version: bridgeVersion,
      type: "READY",
    }, "*");
  }
})();
