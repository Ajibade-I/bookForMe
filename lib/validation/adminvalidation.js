const yup = require("yup");

async function validateAdmin(data) {
  const schema = yup.object().shape({
    userName: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    parentHotelId: yup
      .number()
      .integer()
      .required("Parent Hotel ID is required"),
  });

  try {
    const validateData = await schema.validate(data);
  } catch (error) {
    return error?.errors[0];
  }
}

module.exports = { validateAdmin };
