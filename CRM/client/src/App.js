
import { useRoutes } from 'react-router-dom';

// theme
import ThemeProvider from './theme';
// components
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { AuthProvider } from './context/JWTAuthContext';

// routes
import routes from './routes';

// ----------------------------------------------------------------------

export default function App() {
  const content = useRoutes(routes);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <AuthProvider>
        {content}
        </AuthProvider>
    </ThemeProvider>
  );
}
