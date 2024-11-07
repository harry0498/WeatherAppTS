export default function useLocalStorage(key: string) {
  function setItem(value: unknown) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred with useLocalStorage.setItem");
      }
    }
  }

  function getItem() {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred with useLocalStorage.getItem");
      }
    }
  }

  function removeItem() {
    try {
      window.localStorage.removeItem(key);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred with useLocalStorage.removeItem");
      }
    }
  }

  return { setItem, getItem, removeItem };
}
