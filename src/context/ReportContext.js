import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ReportContext = createContext({});

const defaultValue = {
  dataPoints: [],
  loadingState: 'none',
};

const ReportProvider = ({ children, value, ...rest }) => {
  const [report, setReports] = useState(value || defaultValue);
  const [currentEndpoint, setCurrentEndpoint] = useState('reports');

  useEffect(async () => {
    const dataFetch = async () => {
      setReports((prevReport) => {
        const newReport = Object.assign({}, prevReport);
        newReport.loadingState = 'loading';
        return newReport;
      });
      const response = await axios.get(
        `/.netlify/functions/node-fetch/?endpoint=${currentEndpoint}`
      );
      console.log(currentEndpoint);
      const { data } = response;
      if (data) {
        const reportData = data.data;
        setTimeout(() => {
          setReports((prevReport) => {
            const newReport = Object.assign({}, prevReport, {
              dataPoints: reportData,
            });
            newReport.loadingState = 'complete';
            return newReport;
          });
        }, 1);
      }
    };
    dataFetch();
  }, [currentEndpoint]);

  return (
    <ReportContext.Provider
      value={{
        report,
        setReports,
        setCurrentEndpoint,
      }}
      {...rest}
    >
      {children}
    </ReportContext.Provider>
  );
};

const useReport = () => {
  const { report, setReports, setCurrentEndpoint } = useContext(ReportContext);
  return { report, setReports, setCurrentEndpoint };
};

export { ReportProvider, useReport };
