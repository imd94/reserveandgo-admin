import React, { createContext, useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import axios from "axios";
import FlashMessage from "../FlashMessage";

const GlobalState = createContext();
const GlobalDispatch = createContext();

const initialState = {
  isLoggedIn: false,
  user: {
    id: ''
  },
  pageInfo: {
    title: '',
    description: ''
  },
  globalLoaderActive: true,
  flashMessages: {
    messages: [],
    class: ''
  }
}

function ourReducer(draft, action) {
  switch (action.type) {
    case "login":
      draft.isLoggedIn = true;
      return;
    case "getUser":
      draft.user.id = action.value;
      return;
    case "logout":
      draft.isLoggedIn = false;
      draft.user.id = '';
      return;
    case "setPageInfo":
      draft.pageInfo = action.value;
      return;
    case "globalLoaderActivate":
      draft.globalLoaderActive = true;
      return;
    case "globalLoaderDisable":
      draft.globalLoaderActive = false;
      return;
    case 'flashMessage':
      draft.flashMessages.messages.push(action.value);
      if(action.class == 'success') { draft.flashMessages.class = 'status-success' }
      if(action.class == 'danger') {   draft.flashMessages.class = 'status-danger' }
      if(action.class == 'warning') { draft.flashMessages.class = 'status-warning' }
      if(action.class == 'info') { draft.flashMessages.class = 'status-info' }
      return;
  }
}

function GlobalProvider({ children }) {
  const [appState, appDispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    //appDispatch({ type: 'globalLoaderActivate' });
    const ourRequest = axios.CancelToken.source();
    async function isUserLoggedIn() {
      try {
        const response = await axios.get("/auth-check", { cancelToken: ourRequest.token });
        if(response.data.user) {
          appDispatch({ type: 'login' });
          appDispatch({ type: "getUser", value: response.data.id });
        }
      } catch (e) {
        console.log("There was a problem or the request was cancelled.");
      } finally {
        appDispatch({ type: 'globalLoaderDisable' });
      }
    }
    isUserLoggedIn();

    return () => {
      ourRequest.cancel();
    }
  }, []);

  return (
    <GlobalState.Provider value={{ appState }}>
      <GlobalDispatch.Provider value={{ appDispatch }}>
        <BrowserRouter>
          <FlashMessage />
          {children}
        </BrowserRouter>
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