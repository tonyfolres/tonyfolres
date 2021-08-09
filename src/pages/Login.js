import {
  Box,
  Button,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { Formik } from 'formik';
import { Helmet } from 'react-helmet';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import firebase from 'firebase/app';
import useQueryString from 'src/hooks/useQueryString';
import localUser from 'src/utils/localUser';

const Login = () => {
  localUser.clear();
  const queryString = useQueryString();
  const emailInit = queryString.get('email') || '';
  const navigate = useNavigate();

  const isSubmitDisabled = (isSubmitting, errors) =>
    !!(isSubmitting || errors.email || errors.password || errors.form);

  const onSubmitHandler = async (
    { email, password },
    { setSubmitting, setFieldError }
  ) => {
    try {
      setFieldError('signIn', null);
      const {
        user: { uid }
      } = await firebase.auth().signInWithEmailAndPassword(email, password);

      if (uid) {
        const userSnapshot = await firebase
          .database()
          .ref(`users/${uid}`)
          .once('value');
        if (userSnapshot.exists()) {
          setFieldError('signIn', 'User info missing');
        }
        const { firstName, lastName, type } = userSnapshot.val();
        localUser.set({ uid, email, firstName, lastName, type });
        setSubmitting(false);
        if (type === 'admin') navigate('/app/dashboard', { replace: true });
        else navigate('/app/appointments', { replace: true });
      }
    } catch (error) {
      setSubmitting(false);
      if (error.message) {
        setFieldError('signIn', error.message);
      } else {
        setFieldError('signIn', 'Sign In failed');
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
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
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: emailInit,
              password: ''
            }}
            initialErrors={{
              signIn: null
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={onSubmitHandler}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setFieldError
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body1"
                  >
                    Sign in on the Simple Product Manager
                  </Typography>
                  {errors.form && (
                    <Typography color="error" gutterBottom variant="body2">
                      {errors.form}
                    </Typography>
                  )}
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitDisabled(isSubmitting, errors)}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                {Boolean(errors.signIn) && (
                  <FormHelperText error>{errors.signIn}</FormHelperText>
                )}
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{' '}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
