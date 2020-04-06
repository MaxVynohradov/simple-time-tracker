export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    console.log('JSON.parse(serializedState)', JSON.parse(serializedState))
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state) => localStorage.setItem('state', JSON.stringify(state));
