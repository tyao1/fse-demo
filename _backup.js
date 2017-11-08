/*

  A simple redux implementation

*/

function createStore(rdc, initialState) {
  var listeners = [];
  var state = initialState || {};
  var reducer = rdc;
  var working = false;

  function listen(fn) {
    listeners.push(fn);
    return () => {
      var idx = listeners.indexOf(fn);
      if (idx > -1) {
        listeners.splice(idx, 1);
      }
    }
  }

  function dispatch(action) {
    if (working) return;
    working = true;

    state = reducer(state, action);

    for (let fn of listeners) {
      fn();
    }

    working = false;
  }

  function getState() {
    return state;
  }

  return {
    listen,
    dispatch,
    getState,
  };
}


/*
  middleware:
  ({dispatch, getState}) => (next) => patchedDispatchFunction
*/

function enhancer(store, middlewares) {
  if (!middlewares || middlewares.length == 0) return store;
  const api = {
    dispatch: store.dispatch,
    getState: store.getState,
  };
  const mids = middlewares.map(mid => mid(api));
  let fn = store.dispatch;
  for (var mid of mids) {
    fn = mid(fn);
  }
  return {
    getState: store.getState,
    listen: store.listen,
    dispatch: fn,
  };
}
