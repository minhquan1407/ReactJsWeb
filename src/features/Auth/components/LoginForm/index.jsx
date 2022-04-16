import React from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import { LockClockOutlined } from '@mui/icons-material';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import './index.scss';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const schema = yup.object().shape({
    identifier: yup.string().required('Please enter your fullname.').email('please enter a valid email address'),
    // ở test đầu tiên ta định nghĩa cái name, sau đó là message
    password: yup.string().required('Please enter your password.'),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    // ),
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };

  const { isSubmitting } = form.formState;
  return (
    <div className="root">
      {isSubmitting && <LinearProgress className="linear" />}

      <Avatar className="avatar">
        <LockClockOutlined></LockClockOutlined>
      </Avatar>

      <Typography className="title" variant="h6" component="h3">
        Sign in
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="form">
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />

        <Button
          disabled={isSubmitting}
          className="submit"
          fullWidth
          size="large"
          type="submit"
          color="primary"
          variant="contained"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
