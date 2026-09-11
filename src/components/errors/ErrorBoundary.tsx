import { Component, type ReactNode } from "react";
import ErrorFallback from "./ErrorFallback";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          onBack={() => {
            if (window.history.length > 1) {
              window.history.back();
              return;
            }
            window.location.assign("/");
          }}
          onHome={() => window.location.assign("/")}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
