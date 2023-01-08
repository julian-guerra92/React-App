import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextInput, MySelect, MyCheckbox } from '../components';

import '../styles/styles.css';

export const FormikAbstractation = () => {

   return (
      <div>
         <h1>Formik Components</h1>

         <Formik
            initialValues={{
               firstName: '',
               lastName: '',
               email: '',
               terms: false,
               jobType: ''
            }}
            onSubmit={(values) => {
               console.log(values);
            }}
            validationSchema={
               Yup.object({
                  firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required Field'),
                  lastName: Yup.string().max(10, 'Must be 10 characters or less').required('Required Field'),
                  email: Yup.string().email('Invalid email address').required('Required Field'),
                  terms: Yup.boolean().oneOf([true], 'You Must Accept the Terms and Conditions'),
                  jobType: Yup.string().notOneOf(['it-jr'], 'This Option is not Allowed').required('Required Field')
               })
            }
         >
            {
               (formik) => (
                  <Form noValidate >

                     <MyTextInput
                        label="First Name"
                        name="firstName"
                        placeholder='First Name'
                     />

                     <MyTextInput
                        label="Last Name"
                        name="lastName"
                        placeholder='Last Name'
                     />

                     <MyTextInput
                        label="Email Address"
                        name="email"
                        placeholder='Email Addres'
                        type='email'
                     />

                     <MySelect label='Job Type' name='jobType'>
                        <option value="">Pick Something</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="it-sernior">It Sernior</option>
                        <option value="it-jr">It Jr</option>
                     </MySelect>

                     <MyCheckbox label='Terms & Conditions' name='terms' />

                     <button type='submit'>Submit</button>
                  </Form>
               )
            }
         </Formik>
      </div >
   )
}
