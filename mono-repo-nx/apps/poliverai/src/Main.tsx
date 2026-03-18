import './NativewindEnv';
import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { ReduxProvider } from '@poliverai/intl';

console.error('[startup] Main.tsx loaded', { platform: Platform.OS });

const globalErrorUtils = (globalThis as typeof globalThis & {
	ErrorUtils?: {
		getGlobalHandler?: () => ((error: unknown, isFatal?: boolean) => void) | undefined;
		setGlobalHandler?: (handler: (error: unknown, isFatal?: boolean) => void) => void;
	};
}).ErrorUtils;

if (globalErrorUtils?.setGlobalHandler) {
	const previousHandler = globalErrorUtils.getGlobalHandler?.();
	globalErrorUtils.setGlobalHandler((error, isFatal) => {
		console.error('[startup] GlobalErrorUtils caught', { isFatal, error });
		previousHandler?.(error, isFatal);
	});
}

const WrappedApp = () => (
	console.error('[startup] WrappedApp render', { platform: Platform.OS }),
	Platform.OS === 'web' && ReduxProvider ? (
		<ReduxProvider>
			<App />
		</ReduxProvider>
	) : (
		<App />
	)
);

AppRegistry.registerComponent('PoliverAI', () => WrappedApp);
