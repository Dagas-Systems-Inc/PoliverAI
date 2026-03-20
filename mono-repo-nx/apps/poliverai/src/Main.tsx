import './NativewindEnv';
import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import App from './App';
import { ReduxProvider } from '@poliverai/intl';

console.log('[startup] Main.tsx loaded', { platform: Platform.OS });

const globalErrorUtils = (globalThis as typeof globalThis & {
	ErrorUtils?: {
		getGlobalHandler?: () => ((error: unknown, isFatal?: boolean) => void) | undefined;
		setGlobalHandler?: (handler: (error: unknown, isFatal?: boolean) => void) => void;
	};
}).ErrorUtils;

if (globalErrorUtils?.setGlobalHandler) {
  const previousHandler = globalErrorUtils.getGlobalHandler?.();
  globalErrorUtils.setGlobalHandler((error, isFatal) => {
    console.log('[startup] GlobalErrorUtils caught', { isFatal, error });
    previousHandler?.(error, isFatal);
  });
}

type RuntimeErrorBoundaryState = {
  error: Error | null;
  info: string | null;
};

class RuntimeErrorBoundary extends React.Component<React.PropsWithChildren, RuntimeErrorBoundaryState> {
  override state: RuntimeErrorBoundaryState = {
    error: null,
    info: null,
  };

  static getDerivedStateFromError(error: Error): RuntimeErrorBoundaryState {
    return {
      error,
      info: null,
    };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('[startup] RuntimeErrorBoundary caught', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
    this.setState({
      error,
      info: errorInfo.componentStack ?? null,
    });
  }

  override render() {
    if (this.state.error == null) {
      return this.props.children;
    }

    return (
      <View style={styles.errorRoot}>
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>macOS Render Error</Text>
          <Text style={styles.errorSubtitle}>
            A JavaScript render failure was caught before DevTools attached.
          </Text>
          <ScrollView style={styles.errorScroll} contentContainerStyle={styles.errorScrollContent}>
            <Text style={styles.errorLabel}>Message</Text>
            <Text style={styles.errorBody}>{this.state.error.message || String(this.state.error)}</Text>
            {this.state.error.stack ? <Text style={styles.errorBody}>{this.state.error.stack}</Text> : null}
            {this.state.info ? (
              <>
                <Text style={styles.errorLabel}>Component Stack</Text>
                <Text style={styles.errorBody}>{this.state.info}</Text>
              </>
            ) : null}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const WrappedApp = () => (
	console.log('[startup] WrappedApp render', { platform: Platform.OS }),
	<RuntimeErrorBoundary>
		{ReduxProvider ? (
			<ReduxProvider>
				<App />
			</ReduxProvider>
		) : (
			<App />
		)}
	</RuntimeErrorBoundary>
);

AppRegistry.registerComponent('PoliverAI', () => WrappedApp);

const styles = StyleSheet.create({
  errorRoot: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorCard: {
    width: '100%',
    maxWidth: 900,
    maxHeight: '88%',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 20,
    padding: 24,
  },
  errorTitle: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  errorSubtitle: {
    color: '#475569',
    fontSize: 15,
    marginBottom: 16,
  },
  errorScroll: {
    flexGrow: 0,
  },
  errorScrollContent: {
    gap: 12,
  },
  errorLabel: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
  },
  errorBody: {
    color: '#111827',
    fontSize: 13,
    lineHeight: 20,
  },
});
