import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProvinceContext = createContext({});

const defaultValue = {
  dataPoints: [],
  loadingState: 'none',
};
const provinceCodeMapping = {
  AB: 'Alberta',
  BC: 'British Columbia',
  MB: 'Manitoba',
  NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador',
  NT: 'Northwest Territories',
  NS: 'Nova Scotia',
  NU: 'Nunavut',
  ON: 'Ontario',
  PE: 'Prince Edward Island',
  QC: 'Quebec',
  SK: 'Saskatchewan',
  YT: 'Yukon',
};

const ProvinceProvider = ({ children, value, ...rest }) => {
  const [province, setProvince] = useState(value || defaultValue);

  useEffect(() => {
    const dataFetch = async () => {
      setProvince((prevReport) => {
        const newReport = Object.assign({}, prevReport);
        newReport.loadingState = 'loading';
        return newReport;
      });
      const response = await axios.get(
        `/.netlify/functions/node-fetch/?endpoint=summary/split`
      );
      const { data } = response;
      if (data) {
        const provincesData = data.data;
        setTimeout(() => {
          setProvince((prevReport) => {
            const newReport = Object.assign({}, prevReport, {
              dataPoints: provincesData,
            });
            newReport.loadingState = 'complete';
            return newReport;
          });
        }, 1);
      }
    };
    dataFetch();
  }, []);

  return (
    <ProvinceContext.Provider
      value={{
        province,
        setProvince,
      }}
      {...rest}
    >
      {children}
    </ProvinceContext.Provider>
  );
};

const useProvinces = () => {
  const { province, setProvince } = useContext(ProvinceContext);
  return { province, setProvince, provinceCodeMapping };
};

export { ProvinceProvider, useProvinces };
