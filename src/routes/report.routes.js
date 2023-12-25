/* eslint-disable linebreak-style */
const express = require('express');

const auth = require('../middleware/auth.midleware');

const router = express.Router();

const ReportController = require('../controllers/report.controller');

const uploadFile = require('../middleware/uploadFile.midleware');

router.get('/', auth, ReportController.getAllReport);

router.post('/:userId', uploadFile, ReportController.postReport);

router.delete('/:reportId', auth, ReportController.deleteReport);

router.put('/:reportId', ReportController.updateAllDataReport);

router.get('/:reportId', ReportController.getHistoryByReport);

router.patch('/:reportId', ReportController.updateSingleDataReport);

router.get('/history/:userId', auth, ReportController.getHistoryByUser);

module.exports = router;
