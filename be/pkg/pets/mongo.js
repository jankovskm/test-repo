const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        minLength: 2,
    },
    age: {
        type: Number,
        // required: true,
        // validate: {
        //   validator: (fieldParam) => fieldParam < 0,
        //   message: (props) => `Pet needs to be born first!`,
        // }
    },
    breed: {
        type: String,
        // required: false,
    },
    // owner: [mongoose.SchemaTypes.ObjectId],
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    }
})

const Pet = mongoose.model("pets", PetSchema);

const addPet = async(pet) => {
    try {
        const newCar = new Pet(pet);
    return await newCar.save();
    } catch (error) {
        throw error;
    }
}

const removePet = async (id) => {
    return await Pet.deleteOne({ _id: id });
  };
  

const updatePet = async (id, pet) => {
    return await Pet.updateOne({ _id: id}, pet );
};
  
const getAllPets = async () => {
return await Pet.find({});
};
  
const getOnePet = async (id) => {
return await Pet.findOne({ _id: id });
};

module.exports = {
    addPet,
    removePet,
    updatePet,
    getAllPets,
    getOnePet,
  };