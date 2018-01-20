export const loadState = () => {
  try {
    const serializeState = localStorage.getItem('state');
    if (serializeState === null) {
      return undefined;
    }

    return JSON.parse(serializeState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializeState = JSON.stringify(state);
    localStorage.setItem('state', serializeState);
  } catch (e) {
    // Ignore write error
  }
};
