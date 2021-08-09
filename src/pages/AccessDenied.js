import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';

const AccessDenied = () => (
  <>
    <Helmet>
      <title>404 | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          403: You don&apos;t have permissions to view this page
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          You either tried some shady route or you came here by mistake.
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src="/static/images/access_denied.png"
            style={{
              marginTop: 50,
              display: 'inline-block',
              maxWidth: '100%',
              width: 200
            }}
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default AccessDenied;
