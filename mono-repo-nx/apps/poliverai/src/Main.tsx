import './NativewindEnv';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { ReduxProvider } from '@poliverai/intl';

const WrappedApp = () => (
	ReduxProvider ? (
		<ReduxProvider>
			<App />
		</ReduxProvider>
	) : (
		<App />
	)
);

AppRegistry.registerComponent('PoliverAI', () => WrappedApp);
