export function validate(prop, value, errors, setErrors) {
  switch (prop) {
    case "aadhar":
      var re = new RegExp("^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$");
      setErrors({
        ...errors,
        [prop]: re.test(value) ? "" : "Invalid Aadhar number!",
      });
      break;
    case "otp":
      re = new RegExp("^[0-9]{4}");
      setErrors({
        ...errors,
        [prop]: re.test(value) ? "" : "Invalid OTP!",
      });
      break;
    case "password":
      setErrors({
        ...errors,
        [prop]: value.length >= 8 ? "" : "Password too short",
      });
    default:
      break;
  }
}
