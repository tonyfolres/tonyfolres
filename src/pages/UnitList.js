import { Box, Container } from '@material-ui/core';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import UnitListResults from 'src/components/unit/UnitListResults';
import UnitListToolbar from 'src/components/unit/UnitListToolbar';
import useLoggedUser from 'src/hooks/useLoggedUser';
import getNormalizedSnapshot from 'src/utils/getNormalizedSnapshot';
import customers from 'src/__mocks__/customers';

const UnitList = () => {
  const { userId, verifyLoggedUser } = useLoggedUser();
  verifyLoggedUser('/app/unit/all');

  const [units, setUnits] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref(`unit/${userId}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.exists) {
          setUnits(getNormalizedSnapshot(snapshot));
        }
      })
      .catch(() => {});
  }, [userId]);

  return (
    <>
      <Helmet>
        <title>Units</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <UnitListToolbar />
          <Box sx={{ pt: 3 }}>
            <UnitListResults units={units} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UnitList;
