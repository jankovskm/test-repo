const {
  addPet,
  removePet,
  updatePet,
  getAllPets,
  getOnePet,
} = require("../pkg/pets/mongo");

const {Pet, PetPartial, validate} = require ("../pkg/pets/validate")

const create = async (req, res) => {
  try {
    await validate(req.body, Pet);
    console.log(req.body);
    await addPet(req.body);
    return res.status(201).send(req.body);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    await validate(req.body, PetPartial);
    console.log(req.params.id);
    console.log(req.body);
    await updatePet(req.params.id, req.body);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    await removePet(req.params.id);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const getAll = async (req, res) => {
  try {
    const pets = await getAllPets();
    return res.status(200).send(pets);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const getOne = async (req, res) => {
  try {
    const pet = await getOnePet(req.params.id);
    return res.status(200).send(pet);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
