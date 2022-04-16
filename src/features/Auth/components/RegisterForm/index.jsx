import React from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import { LockClockOutlined } from '@mui/icons-material';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import './rgForm.scss';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your fullname.')
      .test('should has at least tow words', 'Please enter at least tow words.', (value) => {
        return value.split(' ').length >= 2;
        // ở test đầu tiên ta định nghĩa cái name, sau đó là message
      }),

    email: yup.string().required('Please enter your email.').email('please enter a valid email address.'),

    password: yup.string().required('Please enter your password.').min(6, 'Please enter your password.'),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    // ),

    retypePassword: yup
      .string()
      .required('Please retype your password')
      .oneOf([yup.ref('password')], 'Password does not match'),
    // [yup.ref('password')] có nghĩa là nó phải giống với cái field password, còn nếu mà nó kh match thì show cái đoạn text ra
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
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
        Create An Account
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="form">
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />

        <Button className="submit" fullWidth size="large" type="submit" color="primary" variant="contained">
          Create An Acount
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
