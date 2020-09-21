// var createError = require('http-errors')
//
// const { addOrUpdateMedicine, removeMedicineByName, findMedicineByName } = require('../services/medicineService');
// const { validationResult } = require('express-validator');
//
//
// async function addOrUpdateMedicineController(req, res, next) {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return next(createError(400, 'Bad request', { error: errors.array() }));
//     }
//     await addOrUpdateMedicine(req.body);
//     res.send('Add new medicine success');
//   } catch (e) {
//     next(e)
//   }
// }
//
// async function removeMedicineByNameController(req, res, next) {
//   try {
//     await removeMedicineByName(req.query.name);
//     res.send('Remove medicine success');
//   } catch (e) {
//     next(e)
//   }
// }
//
// async function findMedicineByNameController(req, res, next) {
//   try {
//     const results = await findMedicineByName(req.query.name);
//     res.json(results);
//   } catch (e) {
//     next(e)
//   }
// }
//
// module.exports = {
//   addOrUpdateMedicineController,
//   removeMedicineByNameController,
//   findMedicineByNameController
// }
