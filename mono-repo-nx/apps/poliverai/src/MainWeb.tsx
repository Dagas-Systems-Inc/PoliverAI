import React, { StrictMode, useEffect } from 'react';
import '../../../../frontend/src/index.css';
import FrontendApp from '../../../../frontend/src/App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from '../../../../frontend/src/store/store';
import { bootstrapLegacyLocalStorage } from '../../../../frontend/src/store/legacyBootstrap';

const persistor = persistStore(store);

function WebBootstrap() {
  useEffect(() => {
    bootstrapLegacyLocalStorage();
  }, []);

  return <FrontendApp />;
}

export default function MainWeb() {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WebBootstrap />
        </PersistGate>
      </Provider>
    </StrictMode>
  );
}
