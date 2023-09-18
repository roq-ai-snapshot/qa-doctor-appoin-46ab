import * as yup from 'yup';

export const guestValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required(),
  phone_number: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
