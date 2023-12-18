/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');

const {
  findReport,
  sendReport,
  findReportByReportId,
  findReportByUserId,
  editReport,
  removeReport,
} = require('../repository/report.repository');

const getAllReport = async () => {
  const allReport = await findReport();
  return allReport;
};

const createdReport = async (data, userId, _file) => {
  // eslint-disable-next-line radix
  const createReport = await sendReport(data, userId, _file);
  return createReport;
};

const getHistoryByReportId = async (reportId) => {
  const report = await findReportByReportId(reportId);
  if (!report) {
    throw Error('Report is not found!!');
  }
  return report;
};

const deletedReport = async (reportId) => {
  await getHistoryByReportId(reportId);

  const deleteReport = await removeReport(reportId);
  return deleteReport;
};

const updatedReportById = async (newData, reportId) => {
  const updateReport = await editReport(newData, reportId);
  return updateReport;
};

const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../../../../tmp'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

// eslint-disable-next-line consistent-return
const filesFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.pdf' && ext !== '.jpeg') {
    return cb(new Error('Invalid file extension!!', {
      status: 400,
      message: 'File extension is invalid!!',
    }));
  }
  cb(null, true);
};

const getHistoryByUserId = (_userId) => {
  const userId = _userId;

  const getHistory = findReportByUserId(userId);
  if (!getHistory) {
    throw Error('History is not found!!');
  }
  return getHistory;
};

module.exports = {
  getAllReport,
  createdReport,
  deletedReport,
  updatedReportById,
  getHistoryByReportId,
  diskStorage,
  filesFilter,
  getHistoryByUserId,
};
