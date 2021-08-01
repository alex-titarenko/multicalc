export function removeLoader() {
  setTimeout(() => {
    document.getElementById('preloader')?.remove();
  }, 10);
}
