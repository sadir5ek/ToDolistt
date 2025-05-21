import React from 'react';
import { useTranslation } from 'react-i18next';

class ErrorBoundaryInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Ошибка в компоненте:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>{this.props.t('errors.somethingWentWrong')}</h2>;
    }
    return this.props.children;
  }
}

// Обертка для использования useTranslation с class component
function ErrorBoundary(props) {
  const { t } = useTranslation();
  return <ErrorBoundaryInner {...props} t={t} />;
}

export default ErrorBoundary;
