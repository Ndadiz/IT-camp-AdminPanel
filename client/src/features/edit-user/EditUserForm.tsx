import { useFormik } from "formik";
import * as yup from "yup";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ruRU } from "@mui/x-date-pickers/locales";
import { ru } from "date-fns/locale";
import { useEffect } from "react";
import { Autocomplete } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import type { User } from "@entities/model/users";


type Props = {
  user?: User;
  onSave: (data: User) => void;
  flag: 'edit' | 'create';
};
/**
 * Выводит форму проводит валидацию, отправляет в UserEditor данные
 * @param user Данные пользователя для редактирования
 * @param OnSave Функция для сохранения данных в компоненте UserEditor
 * @param flag Помогает отличать создание пользователя и редактирование
 * 
 */
export default function EditUserForm({ user, onSave, flag }: Props) {

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Имя обязательно")
      .max(64, "Имя должно быть меньше 64 символов"),
    surName: yup
      .string()
      .required("Фамилия обязательно")
      .max(64, "Фамилия должно быть меньше 64 символов"),
    fullName: yup
      .string()
      .required("Полное имя обязательная")
      .max(130, "Полное имя должно быть меньше 130 символов"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email обязательный"),
    password:
    flag !== "edit"
      ? yup.string()
          .min(8, "Пароль должен быть минимум 8 символов")
          .required("Пароль обязательный")
      : yup.string()
          .min(8, "Пароль должен быть минимум 8 символов")
          .notRequired(),
    telephone: yup
      .string()
      .matches(/^\+7\d{10}$/, "Введите номер в формате +7XXXXXXXXXX"),
    employment: yup.string(),
    userAgreement: yup.boolean(),
  });

  interface SubmitPayload extends Omit<User, "birthDate"> {
    birthDate: Date | null;
  }

  const formik = useFormik<SubmitPayload>({
    initialValues: {
      email: user?.email ?? "",
      password: user?.password ?? "",
      name: user?.name ?? "",
      surName: user?.surName ?? "",
      fullName: user?.fullName ?? "",
      telephone: user?.telephone ?? "+7",
      birthDate: user?.birthDate ? new Date(user.birthDate) : null,
      employment: user?.employment ?? "",
      userAgreement: user?.userAgreement ?? false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formattedBirthDate = values.birthDate
        ? values.birthDate.toISOString()
        : null;
      const payload = {
        ...values,
        birthDate: formattedBirthDate,
      };
      console.log(payload);
      onSave(payload);
    },
  });

  type FieldName = keyof typeof formik.values;

  interface Field {
    name: FieldName;
    label: string;
    type: string;
    disabled: boolean;
    size: number;
  }

  const fields: Field[] = [
    {
      name: "name",
      label: "Имя",
      type: "text",
      disabled: false,
      size: 6,
    },
    {
      name: "surName",
      label: "Фамилия",
      type: "text",
      disabled: false,
      size: 6,
    },
    {
      name: "fullName",
      label: "Полное имя",
      type: "text",
      disabled: true,
      size: 12,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      disabled: flag == "edit" ? true : false,
      size: 6,
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
      disabled: flag == "edit" ? true : false,
      size: 6,
    },
    {
      name: "telephone",
      label: "Телефон",
      type: "telephone",
      disabled: false,
      size: 6,
    },
  ];

  const employmentOptions = [
    { value: "full-time", label: "Полная занятость" },
    { value: "part-time", label: "Частичная занятость" },
    { value: "freelance", label: "Фриланс" },
    { value: "intern", label: "Стажировка" },
  ];
  useEffect(() => {
    const full = `${formik.values.name} ${formik.values.surName}`.trim();
    formik.setFieldValue("fullName", full);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.name, formik.values.surName]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={(theme) => ({
    p: "25px",
    [theme.breakpoints.down("sm")]: {
      p: 0,
    },})}
        >
          {fields.map((field) => (
            <Grid size={field.size} key={field.name}>
              <TextField
                fullWidth
                id={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                disabled={field.disabled}
                value={
                  field.name == "fullName"
                    ? `${formik.values.name} ${formik.values.surName}`
                    : formik.values[field.name]
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched[field.name] &&
                  Boolean(formik.errors[field.name])
                }
                helperText={
                  formik.touched[field.name] && formik.errors[field.name]
                }
              />
            </Grid>
          ))}
          <Grid size={6}>
            <LocalizationProvider
              localeText={
                ruRU.components.MuiLocalizationProvider.defaultProps.localeText
              }
              dateAdapter={AdapterDateFns}
              adapterLocale={ru}
            >
              <DatePicker
                label="Дата рождения"
                value={formik.values.birthDate}
                onChange={(value) => formik.setFieldValue("birthDate", value)}
                slotProps={{
                  textField: {
                    onBlur: () => formik.setFieldTouched("birthDate", true),
                    error: Boolean(
                      formik.touched.birthDate && formik.errors.birthDate
                    ),
                    helperText:
                      formik.touched.birthDate && formik.errors.birthDate,
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={6}>
            <Autocomplete
              freeSolo
              options={employmentOptions.map((option) => option.label)}
              value={formik.values.employment}
              onChange={(_event, newValue) => {
                formik.setFieldValue("employment", newValue || "");
              }}
              onInputChange={(_event, newInputValue) => {
                formik.setFieldValue("employment", newInputValue);
              }}
              onBlur={() => formik.setFieldTouched("employment", true)} // чтобы touched сработал
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Должность"
                  name="employment"
                  error={
                    formik.touched.employment &&
                    Boolean(formik.errors.employment)
                  }
                  helperText={
                    formik.touched.employment && formik.errors.employment
                  }
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <FormControlLabel
              control={
                <Checkbox
                  id="userAgreement"
                  name="userAgreement"
                  color="primary"
                  checked={formik.values.userAgreement}
                  onChange={(e) =>
                    formik.setFieldValue("userAgreement", e.target.checked)
                  }
                  onBlur={formik.handleBlur}
                />
              }
              label="Я согласен с пользовательским соглашением"
            />
          </Grid>
          <Grid size={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Подтвердить
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
