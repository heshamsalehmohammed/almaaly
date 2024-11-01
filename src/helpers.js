export function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.startsWith('/ar')) {
      return 'ar';
    } else {
      return 'en';
    }
  }