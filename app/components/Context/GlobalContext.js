import React, { createContext, useContext } from "react";
import { BrowserRouter } from "react-router-dom"
import { useImmerReducer } from "use-immer"

const GlobalState = createContext();
const GlobalDispatch = createContext();

const initialState = {
  isLoggedIn: true,
  pageInfo: {
    title: '',
    description: ''
  }
}

function ourReducer(draft, action) {
  switch (action.type) {
    case "login":
      draft.isLoggedIn = action.value;
      return;
    case "setPageInfo":
      draft.pageInfo = action.value;
      return;
  }
}

function GlobalProvider({ children }) {
  const [appState, appDispatch] = useImmerReducer(ourReducer, initialState);

  return (
    <GlobalState.Provider value={{ appState }}>
      <GlobalDispatch.Provider value={{ appDispatch }}>
        <BrowserRouter>{children}</BrowserRouter>
      </GlobalDispatch.Provider>
    </GlobalState.Provider>
  );
}

function UseGlobalState() {
  const context = useContext(GlobalState);

  if(context === undefined) { throw new Error('Context was used outside provider.') }

  return context;
}

function UseGlobalDispatch() {
  const context = useContext(GlobalDispatch);

  if(context === undefined) { throw new Error('Context was used outside provider.') }

  return context;
}

export { GlobalProvider, UseGlobalState, UseGlobalDispatch };