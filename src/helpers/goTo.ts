export const goToId = (hash: string): void => {
  try {
    const result = document.querySelector(`${hash}`);
    result?.scrollIntoView?.({
      behavior: 'smooth',
    });
  } catch (_) {}
};

export const goToTop = (): void =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
