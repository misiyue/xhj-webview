(function () {
  let deferredPrompt = null;
  let installed = false;

  function getUserAgent() {
    return String(window.navigator.userAgent || "").toLowerCase();
  }

  function isIos() {
    return /iphone|ipad|ipod/.test(getUserAgent());
  }

  function isAndroid() {
    return /android/.test(getUserAgent());
  }

  function isSafari() {
    const ua = getUserAgent();
    return /safari/.test(ua) && !/crios|fxios|edgios|opios|mercury/.test(ua);
  }

  function isStandalone() {
    const standaloneMedia =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(display-mode: standalone)").matches;

    return Boolean(window.navigator.standalone) || Boolean(standaloneMedia);
  }

  function isSecureInstallContext() {
    return Boolean(window.isSecureContext) || window.location.hostname === "localhost";
  }

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
  });

  window.addEventListener("appinstalled", function () {
    installed = true;
    deferredPrompt = null;
  });

  window.__xhjPwaInstall = {
    isStandalone() {
      return isStandalone();
    },

    isIosSafari() {
      return isIos() && isSafari();
    },

    isIosNonSafari() {
      return isIos() && !isSafari();
    },

    canPromptInstall() {
      return (
        isAndroid() &&
        isSecureInstallContext() &&
        !isStandalone() &&
        !!deferredPrompt
      );
    },

    hasInstalled() {
      return installed || isStandalone();
    },

    async promptInstall() {
      if (!this.canPromptInstall()) {
        return "unavailable";
      }

      const promptEvent = deferredPrompt;
      deferredPrompt = null;

      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        const outcome = choice && choice.outcome ? String(choice.outcome) : "dismissed";

        if (outcome === "accepted") {
          installed = true;
        }

        return outcome;
      } catch (error) {
        console.warn("promptInstall failed", error);
        return "failed";
      }
    },
  };
})();
