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
      window.localStorage.setItem(storageKey, normalizedToken);
      window.localStorage.removeItem(logoutMarkerKey);
      window.dispatchEvent(new CustomEvent(tokenEventName));
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

  window.addEventListener("message", function (event) {
    if (!isTrustedParent(event) || typeof event.data !== "string") {
      return;
    }

    let message;
    try {
      message = JSON.parse(event.data);
    } catch (_) {
      return;
    }

    if (!message ||
        message.channel !== bridgeChannel ||
        message.version !== bridgeVersion) {
      return;
    }

    if (message.type === "TOKEN") {
      window.receiveTokenFromApp(message.token);
    } else if (message.type === "LOGOUT") {
      clearTokenFromApp();
    }
  });

  if (window.parent !== window) {
    window.parent.postMessage(JSON.stringify({
      channel: bridgeChannel,
      version: bridgeVersion,
      type: "READY",
    }), "*");
  }
})();
