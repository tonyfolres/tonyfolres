import { Box, Container, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import UnitDetails from 'src/components/unit/UnitDetails';

const Unit = () => {
  const unitId = useParams('unitId');

  return (
    <>
      <Helmet>
        <title>Unit | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <UnitDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Unit;
