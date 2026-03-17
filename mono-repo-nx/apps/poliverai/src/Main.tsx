import './NativewindEnv';
import '../../../node_modules/react-native-gesture-handler/lib/commonjs/index.js';
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
