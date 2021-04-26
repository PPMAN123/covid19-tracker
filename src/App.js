import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useSummary, SummaryProvider } from './context/SummaryContext';
import { ReportProvider } from './context/ReportContext';
import HomePage from './pages/HomePage';
import { ProvinceProvider } from './context/ProvinceContext';
import ProvincePage from './pages/ProvincePage';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ProblemPage';
import { ThemeProvider } from '@material-ui/styles/';
import { useTheme } from './context/ThemeContext';
import { ProvinceSummaryProvider } from './context/ProvinceSummaryContext';
function App() {
  const { theme } = useTheme();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SummaryProvider>
          <ReportProvider>
            <ProvinceProvider>
              <ProvinceSummaryProvider>
                <Switch>
                  <Route exact path="/">
                    <HomePage />
                  </Route>
                  <Route exact path="/provinces">
                    <ProvincePage />
                  </Route>
                  <Route exact path="/about">
                    <AboutPage />
                  </Route>
                  <Route>
                    <ErrorPage />
                  </Route>
                </Switch>
              </ProvinceSummaryProvider>
            </ProvinceProvider>
          </ReportProvider>
        </SummaryProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
