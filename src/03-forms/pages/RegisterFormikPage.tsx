import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../components';

import '../styles/styles.css';

export const RegisterFormikPage = () => {

   return (
      <div>
         <Formik
            initialValues={{
               name: '',
               email: '',
               password1: '',
               password2: ''
            }}
            onSubmit={(values) => {
               console.log(values);
            }}
            validationSchema={
               Yup.object({
                  name: Yup.string()
                     .min(2, 'must contain between 2 and 15 characters')
                     .max(15, 'must contain between 2 and 15 characters')
                     .required('Required Field'),
                  email: Yup.string()
                     .email('Invalid email address')
                     .required('Required Field'),
                  password1: Yup.string()
                     .min(6, 'Password must be at least 6 characters')
                     .required('Required Field'),
                  password2: Yup.string()
                     .oneOf([Yup.ref('password1'), null], 'Password must match')
                     .required('Required Field'),
               })
            }
         >
            {
               ({ handleReset }) => (
                  <Form noValidate >

                     <MyTextInput
                        label="Name"
                        name="name"
                        placeholder='Name'
                     />

                     <MyTextInput
                        label="Email Address"
                        name="email"
                        placeholder='Email Addres'
                        type='email'
                     />

                     <MyTextInput
                        label="Password"
                        name="password1"
                        placeholder='Password'
                        type='password'
                     />

                     <MyTextInput
                        label="Repeat Password"
                        name="password2"
                        placeholder='Repeat Password'
                        type='password'
                     />

                     <button type='submit'>Submit</button>
                     <button type='button' onClick={handleReset}>Reset Form</button>
                  </Form>
               )
            }

         </Formik>
      </div >
   )
}
