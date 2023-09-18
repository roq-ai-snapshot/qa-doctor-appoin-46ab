import * as yup from 'yup';

export const doctorValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  specialization: yup.string().required(),
  experience_years: yup.number().integer().required(),
  organization_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
