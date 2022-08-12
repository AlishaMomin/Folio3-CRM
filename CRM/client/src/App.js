
import { useRoutes } from 'react-router-dom';

// theme
import ThemeProvider from './theme';
// components
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
// import { AuthProvider } from './contexts/JWTAuthContext';
// routes
import routes from './routes';

// ----------------------------------------------------------------------

export default function App() {
  const content = useRoutes(routes);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {content}
      {/* <Router /> */}
      {/* <ProtectedAdminRouter/> */}
      {/*  */}
    </ThemeProvider>
  );
}
