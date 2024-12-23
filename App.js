
import {React,useEffect} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/redux/store/store';
import Navigation from './src/navigation/Navigation';
import { LogBox } from 'react-native';

export default function App() {

    useEffect(() => {
        LogBox.ignoreAllLogs(true);
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <Navigation />
            </PersistGate>
        </Provider>
    );
}

