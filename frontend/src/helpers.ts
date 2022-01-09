export const isPersistedState = (stateName: string): any => {
  const sessionState: string | null = sessionStorage.getItem(stateName);
  return sessionState && JSON.parse(sessionState);
};
