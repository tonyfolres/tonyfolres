import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/database';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router';
import useQueryString from 'src/hooks/useQueryString';
import useLoggedUser from 'src/hooks/useLoggedUser';
import * as Yup from 'yup';

const UnitDetails = ({ unitNameProp, unitSymbolProp, ...otherProps }) => {
  const queryString = useQueryString();
  const unitName = queryString.get('unitName') || unitNameProp;
  const unitSymbol = queryString.get('unitSymbol') || unitSymbolProp;
  const { unitId } = useParams('unitId');

  let ridirectUrl = `/app/unit`;
  if (unitId) {
    ridirectUrl += `/${unitId}`;
  }
  ridirectUrl += `?unitName=${unitName}&unitSymbol=${unitSymbol}`;

  const { userId, verifyLoggedUser } = useLoggedUser();
  verifyLoggedUser(ridirectUrl);

  const isSubmitDisabled = (isSubmitting, errors) =>
    !!(isSubmitting || errors.unitName || errors.unitSymbol || errors.form);

  const onSubmit = (values, { setSubmitting, setFieldError, setValues }) => {
    setFieldError('form', null);
    let firebasePromise;
    if (unitId) {
      firebasePromise = firebase
        .database()
        .ref(`unit/${userId}/${unitId}`)
        .update({
          unitName: values.unitName,
          unitSymbol: values.unitSymbol
        });
    } else {
      firebasePromise = firebase.database().ref(`unit/${userId}`).push({
        unitName: values.unitName,
        unitSymbol: values.unitSymbol
      });
    }
    firebasePromise
      .then(() => {
        setValues({
          unitName: '',
          unitSymbol: ''
        });
      })
      .catch(() => {
        setFieldError('form', 'Operation failed');
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Formik
      initialValues={{
        unitName,
        unitSymbol
      }}
      initialErrors={{
        form: null
      }}
      validationSchema={Yup.object().shape({
        unitName: Yup.string().required('Unit name is required'),
        unitSymbol: Yup.string().required('Unit symbol is required')
      })}
      onSubmit={onSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form autoComplete="off" onSubmit={handleSubmit} {...otherProps}>
          <Card>
            <CardHeader subheader="Product unit information" title="Unit" />
            {errors.form && (
              <Typography color="error" gutterBottom variant="body2">
                {errors.form}
              </Typography>
            )}
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.unitName && errors.unitName)}
                    fullWidth
                    helperText="Please specify the name of the Unit"
                    label="Unit name"
                    name="unitName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.unitName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.unitSymbol && errors.unitSymbol)}
                    fullWidth
                    helperText="Symbol of the Unit"
                    label="Unit symbol"
                    name="unitSymbol"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.unitSymbol}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                color="primary"
                disabled={isSubmitDisabled(isSubmitting, errors)}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {unitId ? `Update unit` : `Create unit`}
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

UnitDetails.propTypes = {
  unitNameProp: PropTypes.string,
  unitSymbolProp: PropTypes.string
};

UnitDetails.defaultProps = {
  unitNameProp: '',
  unitSymbolProp: ''
};

export default UnitDetails;
