function isValidUrl(string) {
    console.log("asdfgds")
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
  
    return true;
  }

  export { isValidUrl }