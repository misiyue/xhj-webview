(function () {
  let fingerprintAgentPromise = null;

  function loadFingerprintAgent() {
    if (
      !window.FingerprintJS ||
      typeof window.FingerprintJS.load !== "function"
    ) {
      return Promise.reject(new Error("FingerprintJS is unavailable"));
    }

    if (!fingerprintAgentPromise) {
      fingerprintAgentPromise = window.FingerprintJS.load();
    }

    return fingerprintAgentPromise;
  }

  window.__xhjDeviceCode = {
    async getVisitorId() {
      const agent = await loadFingerprintAgent();
      const result = await agent.get();

      if (!result || !result.visitorId) {
        throw new Error("FingerprintJS did not return a visitorId");
      }

      return String(result.visitorId);
    },
  };
})();
