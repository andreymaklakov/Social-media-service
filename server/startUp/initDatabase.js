const professionMock = require("../mock/professions.json");
const qualitiesMock = require("../mock/qualities.json");
const Profession = require("../models/Profession");
const Quality = require("../models/Quality");

module.exports = async () => {
  const professions = await Profession.find();
  const qualities = await Quality.find();

  if (professions.length !== professionMock.length) {
    //if on server professions are not  the same as in mock
    await createInitialEntity(Profession, professionMock);
  }

  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntity(Quality, qualitiesMock);
  }
};

async function createInitialEntity(Model, mock) {
  await Model.collection.drop(); // clean collection befor putting in

  return Promise.all(
    mock.map(async (item) => {
      // save into collection each item

      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();

        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
