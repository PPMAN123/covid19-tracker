import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProvinceSummaryContext = createContext({});

const defaultValue = {
  loadingState: 'none',
  data: {},
};

const ProvinceSummaryProvider = ({ children, value, ...rest }) => {
  const [summary, setSummary] = useState(value || defaultValue);
  const [selectedProvince, setSelectedProvince] = useState();
  const [currentProvinceData, setCurrentProvinceData] = useState({});

  useEffect(() => {
    const dataFetch = async () => {
      setSummary((prevSummary) => {
        const newSummary = Object.assign({}, prevSummary);
        newSummary.loadingState = 'loading';
        return newSummary;
      });
      const response = await axios.get(
        '/.netlify/functions/node-fetch/?endpoint=summary/split'
      );
      const { data } = response;
      if (data) {
        const summaryData = data.data;
        const modifiedSummaryData = {};
        summaryData.forEach((provinceData) => {
          modifiedSummaryData[provinceData.province] = provinceData;
        });
        setSummary((prevSummary) => {
          const newSummary = Object.assign({}, prevSummary, {
            data: modifiedSummaryData,
          });
          newSummary.loadingState = 'complete';
          return newSummary;
        });
      }
    };
    dataFetch();
  }, []);

  useEffect(() => {
    if (summary.loadingState === 'complete') {
      setCurrentProvinceData(summary.data[selectedProvince]);
    }
  }, [selectedProvince]);

  return (
    <ProvinceSummaryContext.Provider
      value={{
        setSelectedProvince,
        currentProvinceData,
        selectedProvince,
      }}
      {...rest}
    >
      {children}
    </ProvinceSummaryContext.Provider>
  );
};

const useProvinceSummary = () => {
  const {
    currentProvinceData,
    setSelectedProvince,
    selectedProvince,
  } = useContext(ProvinceSummaryContext);
  return { currentProvinceData, setSelectedProvince, selectedProvince };
};

export { ProvinceSummaryProvider, useProvinceSummary };
