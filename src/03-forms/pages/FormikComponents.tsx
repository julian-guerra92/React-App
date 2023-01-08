import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import '../styles/styles.css';

export const FormikComponents = () => {

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

                     <label htmlFor="firstName">First Name</label>
                     <Field name="firstName" type="text" />
                     <ErrorMessage name="firstName" component="span" />

                     <label htmlFor="lastName">Last Name</label>
                     <Field name="lastName" type="text" />
                     <ErrorMessage name="lastName" component="span" />

                     <label htmlFor="email">Email Address</label>
                     <Field name="email" type="email" />
                     <ErrorMessage name="email" component="span" />

                     <label htmlFor="jobType">Job Type</label>
                     <Field name="jobType" as="select">
                        <option value="">Pick Something</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="it-sernior">It Sernior</option>
                        <option value="it-jr">It Jr</option>
                     </Field>
                     <ErrorMessage name="jobType" component="span" />

                     <label>
                        <Field name="terms" type="checkbox" />
                        Terms and Conditions
                     </label>
                     <ErrorMessage name="terms" component="span" />

                     <button type='submit'>Submit</button>
                  </Form>
               )
            }
         </Formik>
      </div >
   )
}
