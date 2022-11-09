export const goToTop = (): void =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
