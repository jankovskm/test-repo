const { Validator } = require("node-input-validator");

const Pet = {
  name: "required|string",
  breed: "required|string",
  age: "integer",
};

const PetPartial = {
  name: "string",
  breed: "string",
  age: "integer",
};

const validate = async (data, schema) => {
  let v = new Validator(data, schema);
  let e = await v.check();
  if (!e) {
    throw v.errors;
  }
};

module.exports = {
  Pet,
  PetPartial,
  validate,
};
