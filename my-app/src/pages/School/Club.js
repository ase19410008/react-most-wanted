import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(name, male, female, details) {
  return {
    name,
    male,
    female,
    details: details,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.male}</TableCell>
        <TableCell align="right">{row.female}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.name}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>学年</TableCell>
                    <TableCell>男子</TableCell>
                    <TableCell>女子</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailRow) => (
                    <TableRow key={detailRow.grade}>
                      <TableCell component="th" scope="row">
                        {detailRow.grade}
                      </TableCell>
                      <TableCell>{detailRow.male}</TableCell>
                      <TableCell align="right">{detailRow.female}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    male: PropTypes.number.isRequired,
    female: PropTypes.number.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        grade: PropTypes.number.isRequired,
        male: PropTypes.number.isRequired,
        female: PropTypes.number.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('ワープロ部', 159, 6.0, [
    {
      grade: 1,
      male: 10,
      female: 3,
    },
    {
      grade: 2,
      male: 3,
      female: 1,
    },
    {
      grade: 3,
      male: 4,
      female: 5,
    },
  ]),
  createData('バドミントン部', 237, 9.0, [
    {
      grade: 1,
      male: 100,
      female: 3,
    },
    {
      grade: 2,
      male: 5,
      female: 1,
    },
    {
      grade: 3,
      male: 7,
      female: 10,
    },
  ]),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>部活</TableCell>
            <TableCell align="right">男子</TableCell>
            <TableCell align="right">女子</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}