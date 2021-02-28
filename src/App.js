import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { useSummary, SummaryProvider } from "./context/SummaryContext";
import { ReportProvider } from "./context/ReportContext";
import HomePage from "./pages/HomePage";
import { ProvinceProvider } from "./context/ProvinceContext";

function App() {
  return (
    <Router>
      <SummaryProvider>
        <ReportProvider>
          <ProvinceProvider>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
            </Switch>
          </ProvinceProvider>
        </ReportProvider>
      </SummaryProvider>
    </Router>
  );
}

export default App;
