import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(name, male, female, detail) {
  return { name, male, female, detail };
}

const rows = [
  createData(
    '情報電子科',
    159,
    60,
    [{
        "grade": 1,
        "male": 10,
        "female": 1
    },
    {
        "grade": 2,
        "male": 20,
        "female": 2
    },
    {
        "grade": 3,
        "male": 30,
        "female": 3
    }]
  ),
  createData(
    '電子機械科',
    237,
    90,
    [{
        "grade": 1,
        "male": 5,
        "female": 2
    },
    {
        "grade": 2,
        "male": 10,
        "female": 3
    },
    {
        "grade": 3,
        "male": 15,
        "female": 4
    }]
  ),
  createData(
    '情報処理科',
    262,
    160,
    [{
        "grade": 1,
        "male": 10,
        "female": 1
    },
    {
        "grade": 2,
        "male": 10,
        "female": 1
    },
    {
        "grade": 3,
        "male": 10,
        "female": 1
    }]
  ),
  createData(
    '情報会計科',
    305,
    37,
    [{
        "grade": 1,
        "male": 10,
        "female": 1
    },
    {
        "grade": 2,
        "male": 10,
        "female": 1
    },
    {
        "grade": 3,
        "male": 10,
        "female": 1
    }]
  ),
];

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

export default function SimpleTable() {
  // const classes = useStyles();

  return (
    <Paper>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>学科</TableCell>
            <TableCell align="right">男子</TableCell>
            <TableCell align="right">女子</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <ExpandableTableRow
              key={row.name}
              expandComponent={<Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>学科</TableCell>
                  <TableCell>男子</TableCell>
                  <TableCell>女子</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.detail.map((historyRow) => (
                  <TableRow key={historyRow.grade}>
                    <TableCell component="th" scope="row">
                      {historyRow.grade}
                    </TableCell>
                    <TableCell>{historyRow.male}</TableCell>
                    <TableCell align="right">{historyRow.female}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.male}</TableCell>
              <TableCell align="right">{row.female}</TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

// https://codesandbox.io/s/expandable-table-row-material-ui-tr3ut?file=/demo.js:0-4235