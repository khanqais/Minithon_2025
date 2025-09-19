import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
          <div className="max-w-md w-full mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 mb-4">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              
              <div className="space-y-2">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full"
                >
                  Refresh Page
                </button>
                
                <button
                  onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors w-full"
                >
                  Try Again
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    Error Details (Development)
                  </summary>
                  <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded border max-h-32 overflow-y-auto">
                    <div className="font-semibold">Error:</div>
                    <div className="mb-2">{this.state.error.toString()}</div>
                    <div className="font-semibold">Stack Trace:</div>
                    <div className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</div>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;