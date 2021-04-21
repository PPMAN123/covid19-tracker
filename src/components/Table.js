import React, { useState, useEffect } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
} from '@material-ui/core';
import { useProvinces } from '../context/ProvinceContext';
import styled from 'styled-components';

function createData(
  Province,
  Cases,
  ChangeCases,
  Deaths,
  ChangeDeaths,
  Tests,
  ChangeTests,
  Hospitalizations,
  ChangeHospitalizations,
  Criticals,
  ChangeCriticals,
  Recoveries,
  ChangeRecoveries,
  Vaccinated,
  ChangeVaccinated
) {
  return {
    Province,
    Cases,
    ChangeCases,
    Deaths,
    ChangeDeaths,
    Tests,
    ChangeTests,
    Hospitalizations,
    ChangeHospitalizations,
    Criticals,
    ChangeCriticals,
    Recoveries,
    ChangeRecoveries,
    Vaccinated,
    ChangeVaccinated,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'Province', numeric: false, disablePadding: false, label: 'Provinces' },
  { id: 'Cases', numeric: true, disablePadding: false, label: 'Cases' },
  { id: 'Deaths', numeric: true, disablePadding: false, label: 'Deaths' },
  { id: 'Tests', numeric: true, disablePadding: false, label: 'Tests' },
  {
    id: 'Hospitalizations',
    numeric: true,
    disablePadding: false,
    label: 'Hospitalizations',
  },
  { id: 'Criticals', numeric: true, disablePadding: false, label: 'Criticals' },
  {
    id: 'Recoveries',
    numeric: true,
    disablePadding: false,
    label: 'Recoveries',
  },
  {
    id: 'Vaccinated',
    numeric: true,
    disablePadding: false,
    label: 'Vaccinated',
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Stats by Province
      </Typography>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const ChangeCell = styled.span`
  color: ${(props) => (props.positive ? 'green' : 'red')};
  display: ${(props) => props.zero && 'none'};
`;

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const { province, provinceCodeMapping } = useProvinces();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (province) {
      const { dataPoints } = province;
      setRows(
        dataPoints.map((provinceData) => {
          return createData(
            provinceCodeMapping[provinceData.province],
            provinceData.total_cases,
            provinceData.change_cases,
            provinceData.total_fatalities,
            provinceData.change_fatalities,
            provinceData.total_tests,
            provinceData.change_tests,
            provinceData.total_hospitalizations,
            provinceData.change_hospitalizations,
            provinceData.total_criticals,
            provinceData.change_criticals,
            provinceData.total_recoveries,
            provinceData.change_recoveries,
            provinceData.total_vaccinations,
            provinceData.change_vaccinations
          );
        })
      );
    }
  }, [province]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.Province}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.Province}
                      </TableCell>
                      <TableCell align="left">
                        <span>{row.Cases}</span>
                        {/* prettier-ignore */}
                        <span> </span>
                        <ChangeCell
                          positive={row.ChangeCases && row.ChangeCases >= 0}
                          zero={row.ChangeCases === 0}
                        >
                          {new Intl.NumberFormat('en-us', {
                            signDisplay: 'always',
                          }).format(row.ChangeCases)}
                        </ChangeCell>
                      </TableCell>
                      <TableCell align="left">
                        <span>{row.Deaths}</span>
                        {/* prettier-ignore */}
                        <span> </span>
                        <ChangeCell
                          positive={row.ChangeDeaths && row.ChangeDeaths >= 0}
                          zero={row.ChangeDeaths === 0}
                        >
                          {new Intl.NumberFormat('en-us', {
                            signDisplay: 'always',
                          }).format(row.ChangeDeaths)}
                        </ChangeCell>
                      </TableCell>
                      <TableCell align="left">
                        <span>{row.Tests}</span>
                        {/* prettier-ignore */}
                        <span> </span>
                        <ChangeCell
                          positive={row.ChangeTests && row.ChangeTests >= 0}
                          zero={row.ChangeTests === 0}
                        >
                          {new Intl.NumberFormat('en-us', {
                            signDisplay: 'always',
                          }).format(row.ChangeTests)}
                        </ChangeCell>
                      </TableCell>
                      <TableCell align="left">
                        <span>{row.Hospitalizations}</span>
                        {/* prettier-ignore */}
                        <span> </span>
                        <ChangeCell
                          positive={
                            row.ChangeHospitalizations &&
                            row.ChangeHospitalizations >= 0
                          }
                          zero={row.ChangeHospitalizations === 0}
                        >
                          {new Intl.NumberFormat('en-us', {
                            signDisplay: 'always',
                          }).format(row.ChangeHospitalizations)}
                        </ChangeCell>
                      </TableCell>
                      <TableCell align="left">
                        <span>{row.Criticals}</span>
                        {/* prettier-ignore */}
                        <span> </span>
                        <ChangeCell
                          positive={
                            row.ChangeCriticals && row.ChangeCriticals >= 0
                          }
                          zero={row.ChangeCriticals === 0}
                        >
                          {new Intl.NumberFormat('en-us', {
                            signDisplay: 'always',
                          }).format(row.ChangeCriticals)}
                        </ChangeCell>
                      </TableCell>
                      <TableCell align="left">
                        <span>{row.Recoveries}</span>
                        {/* prettier-ignore */}
                        <span> </span>
                        <ChangeCell
                          positive={
                            row.ChangeRecoveries && row.ChangeRecoveries >= 0
                          }
                          zero={row.ChangeRecoveries === 0}
                        >
                          {new Intl.NumberFormat('en-us', {
                            signDisplay: 'always',
                          }).format(row.ChangeRecoveries)}
                        </ChangeCell>
                      </TableCell>
                      <TableCell align="left">
                        <span>{row.Vaccinated}</span>
                        {/* prettier-ignore */}
                        <span> </span>
                        <ChangeCell
                          positive={
                            row.ChangeVaccinated && row.ChangeVaccinated >= 0
                          }
                          zero={
                            row.ChangeVaccinated || row.ChangeVaccinated >= 0
                          }
                        >
                          {new Intl.NumberFormat('en-us', {
                            signDisplay: 'always',
                          }).format(row.ChangeDVaccinated)}
                        </ChangeCell>
                      </TableCell>
                      {/* Cases, Deaths, Tests, Hospitalizations, Criticals, Recoveries, Vaccinated */}
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
