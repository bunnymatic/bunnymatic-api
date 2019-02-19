const mockStore = (defaultState) => {
  return {
    getState: () => (defaultState),
    subscribe: () => {},
    dispatch: () => {},
  };
}
export default mockStore;
