import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createAppointmentSlot } from 'apiSdk/appointment-slots';
import { appointmentSlotValidationSchema } from 'validationSchema/appointment-slots';
import { DoctorInterface } from 'interfaces/doctor';
import { getDoctors } from 'apiSdk/doctors';
import { AppointmentSlotInterface } from 'interfaces/appointment-slot';

function AppointmentSlotCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AppointmentSlotInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAppointmentSlot(values);
      resetForm();
      router.push('/appointment-slots');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AppointmentSlotInterface>({
    initialValues: {
      start_time: new Date(new Date().toDateString()),
      end_time: new Date(new Date().toDateString()),
      day_of_week: 0,
      doctor_id: (router.query.doctor_id as string) ?? null,
    },
    validationSchema: appointmentSlotValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Appointment Slots',
              link: '/appointment-slots',
            },
            {
              label: 'Create Appointment Slot',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Appointment Slot
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="start_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Start Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.start_time ? new Date(formik.values?.start_time) : null}
              onChange={(value: Date) => formik.setFieldValue('start_time', value)}
            />
          </FormControl>
          <FormControl id="end_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              End Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.end_time ? new Date(formik.values?.end_time) : null}
              onChange={(value: Date) => formik.setFieldValue('end_time', value)}
            />
          </FormControl>

          <NumberInput
            label="Day Of Week"
            formControlProps={{
              id: 'day_of_week',
              isInvalid: !!formik.errors?.day_of_week,
            }}
            name="day_of_week"
            error={formik.errors?.day_of_week}
            value={formik.values?.day_of_week}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('day_of_week', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<DoctorInterface>
            formik={formik}
            name={'doctor_id'}
            label={'Select Doctor'}
            placeholder={'Select Doctor'}
            fetcher={getDoctors}
            labelField={'first_name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/appointment-slots')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'appointment_slot',
    operation: AccessOperationEnum.CREATE,
  }),
)(AppointmentSlotCreatePage);
