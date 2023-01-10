import { Formik, Form } from 'formik';
import { MySelect, MyTextInput } from '../components';
import formJson from '../data/custom-form.json';
import * as Yup from 'yup';

const initialValues: { [key: string]: any } = {};

const fieldsWithValidations: { [key: string]: any } = {};

for (const input of formJson) {
   initialValues[input.name] = input.value;
   if (!input.validations) continue;
   let schema = Yup.string();
   for (const rule of input.validations) {
      if (rule.type === 'required') {
         schema = schema.required('This fiedl is required')
      }
      if (rule.type === 'minLength') {
         schema = schema.min((rule as any).value || 2, `must contain min ${(rule as any).value || 2} characters`)
      }
      if (rule.type === 'email') {
         schema = schema.email('Invalid email address')
      }
      //*Otras reglas
   }
   fieldsWithValidations[input.name] = schema;
}

const validationSchema = Yup.object({ ...fieldsWithValidations });

export const DynamikForm = () => {
   return (
      <div>
         <h1>Dynamik Form</h1>
         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
               console.log(values)
            }}
         >
            {(formik) => (
               <Form noValidate>
                  {formJson.map(({ type, name, palceholder, label, options }) => {
                     if (type === 'input' || type === 'password' || type === 'email') {
                        return <MyTextInput
                           key={name}
                           type={type as any}
                           name={name}
                           label={label}
                           placeholder={palceholder}
                        />
                     } else if (type === 'select') {
                        return (
                           <MySelect
                              key={name}
                              label={label}
                              name={name}
                           >
                              <option value="">Select an Option</option>
                              {
                                 options?.map(({ id, label }) => (
                                    <option key={id} value={id}>{label}</option>
                                 ))
                              }
                           </MySelect>
                        )
                     }
                     throw new Error(`Type: ${type} is not supported`)
                  })}
                  <button type='submit'>Submit</button>
               </Form>
            )}
         </Formik>
      </div>
   )
}
