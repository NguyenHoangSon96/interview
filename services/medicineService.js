// const Medicine = require('../models/User');
//
// async function addOrUpdateMedicine(medicine) {
//   await Medicine.updateOne({ name: medicine.name }, medicine, { upsert: true });
// };
//
// async function removeMedicineByName(medicineName) {
//   const result = await Medicine.deleteOne({ name: medicineName });
//   if (!result.deletedCount) {
//     throw Error('Medicine name not exist');
//   }
// };
//
// async function findMedicineByName(medicineName) {
//   const results = await Medicine.find({ name: new RegExp(medicineName, "i") }).lean();
//   if (!results || !results.length) {
//     throw Error('Medicine name not exist');
//   }
//   return results;
// }
//
// module.exports = {
//   addOrUpdateMedicine,
//   removeMedicineByName,
//   findMedicineByName
// };
