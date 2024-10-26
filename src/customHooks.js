import { useSyncExternalStore, useEffect, useState } from 'react';
import { proxy, subscribe } from 'valtio';

// Helper function to safely access nested properties with a dot-separated path
function getNestedValue(obj, keyPath) {
  return keyPath
    .split('.')
    .reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
      obj
    );
}

// Main store creator for use with useSyncExternalStore and Valtio
function createRefStore(ref, keyPath) {
  // Proxy for the ref's current value
  let proxyState;

  const initializeProxy = () => {
    if (ref.current) {
      proxyState = proxy(ref.current); // Initialize proxy with ref's current structure
    }
  };

  initializeProxy(); // Attempt to initialize

  const getSnapshot = () =>
    proxyState ? getNestedValue(proxyState, keyPath) : undefined;

  const subscribeToChanges = (callback) => {
    if (proxyState) {
      let prevValue = getSnapshot();

      const unsubscribe = subscribe(proxyState, () => {
        const newValue = getSnapshot();

        if (newValue !== prevValue) {
          prevValue = newValue;
          callback();
        }
      });

      return () => unsubscribe(); // Cleanup when unsubscribed
    }
    return () => {};
  };

  return {
    getSnapshot,
    subscribeToChanges,
    initializeProxy, // Expose for manual initialization if needed
    get proxyState() {
      return proxyState;
    },
  };
}

// Custom hook to use the ref store with useSyncExternalStore
export function useRefStore(ref, keyPath) {
  const [store, setStore] = useState(() => createRefStore(ref, keyPath));

  useEffect(() => {
    // Re-initialize the proxy once ref.current becomes available
    if (!store.proxyState && ref.current) {
      store.initializeProxy();
      setStore(createRefStore(ref, keyPath)); // Trigger re-render with updated store
    }
  }, [ref, store]);

  return useSyncExternalStore(
    store.subscribeToChanges,
    store.getSnapshot
  );
}