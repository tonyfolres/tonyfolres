import {
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PropTypes from 'prop-types';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router';

const UnitListResults = ({ units, ...rest }) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    console.log({ newPage });
    setPage(newPage);
  };

  const onEditClick = ({ id, unitName, unitSymbol }) => {
    navigate(`/app/unit/${id}?unitName=${unitName}&unitSymbol=${unitSymbol}`);
  };

  const { length } = units;
  const start = page * limit;
  const end = (page + 1) * limit;

  return (
    <Card {...rest}>
      {console.log({ page })}
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050, width: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {units.slice(start, end).map((unit) => (
                <TableRow hover key={unit.id}>
                  <TableCell>{unit.unitName}</TableCell>
                  <TableCell>{unit.unitSymbol}</TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        alignItems: 'end',
                        justifyContent: 'flex-end',
                        display: 'flex'
                      }}
                    >
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          onEditClick(unit);
                        }}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UnitListResults.propTypes = {
  units: PropTypes.array.isRequired
};

export default UnitListResults;
