const yup = require("yup");

async function validateSignUp(data) {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(2)
      .max(50)
      .required("First name is required")
      .label("First name"),
    lastName: yup
      .string()
      .min(2)
      .max(50)
      .required("Last name is required")
      .label("Last name"),
    contact: yup
      .string()
      .min(10)
      .max(15)
      .required("Phone number is required")
      .label("Phone number"),
    email: yup
      .string()
      .email("Provide a valid email")
      .required("Email is required")
      .label("Email"),
    password: yup
      .string()
      .min(5)
      .max(20)
      .required("Password is required")
      .label("password"),
  });
  try {
    const validateData = await schema.validate(data);
    return null;
  } catch (error) {
    return error?.errors[0];
  }
}
async function validateHotel(data) {
  const schema = yup.object().shape({
    name: yup.string().required("Hotel name is required"),
    address: yup.string().required("Hotel address is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    phone: yup
      .string()
      .matches(/^\+?[0-9\s\-]+$/, "Phone number is not valid")
      .nullable(),
    email: yup.string().email("Email is not valid").nullable(),
    website: yup.string().url("Website is not valid").nullable(),
  });
  try {
    const validateData = await schema.validate(data);
    return null;
  } catch (error) {
    return error?.errors[0];
  }
}

async function validateReservation() {
  const schema = yup.object().shape({
    roomId: yup.number().required("Room ID is required"),
    checkInDate: yup.date().required("Check-in date is required"),
    checkOutDate: yup.date().required("Check-out date is required"),
    totalPrice: yup
      .number()
      .required("Total price is required")
      .positive("Total price must be positive"),
  });
  try {
    const validateData = await schema.validate(data);
    return null;
  } catch (error) {
    return error?.errors;
  }
}

async function validateLogin(data) {
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").label("Email"),
    password: yup.string().required("Password is required").label("Password"),
  });
  try {
    const validateData = await schema.validate(data);
  } catch (error) {
    return error?.errors[0];
  }
}

async function validateRoom(data) {
  const schema = yup.object().shape({
    hotelId: yup.number().required("Hotel ID is required"),
    roomNumber: yup.string().required("Room number is required"),
    roomType: yup.string().required("Room type is required"),
    capacity: yup
      .number()
      .required("Capacity is required")
      .positive()
      .integer(),
    price: yup.number().required("Price is required").positive(),
  });

  try {
    const validateData = await schema.validate(data);
  } catch (error) {
    return error?.errors[0];
  }
}

async function validateParentHotel(data) {
  const schema = yup.object().shape({
    description: yup.string().required("Description is required"),
    name: yup.string().required("Name is required"),
    phone: yup.string().nullable(), // Optional field
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    website: yup.string().url("Invalid URL format").nullable(), // Optional field
  });

  try {
    const validateData = await schema.validate(data);
  } catch (error) {
    return error?.errors[0];
  }
}

module.exports = {
  validateSignUp,
  validateHotel,
  validateReservation,
  validateLogin,
  validateParentHotel,
  validateRoom,
};
