/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
const {
  getAllReport,
  getHistoryByReportId,
  createdReport,
  deletedReport,
  updatedReportById,
  getHistoryByUserId,
} = require('../service/report.service');

class ReportController {
  static getAllReport = async (req, res) => {
    try {
      const report = await getAllReport();
      res.send(report);
    } catch (error) {
      res.status(400).send({
        status: false,
        message: 'Report is not found!!',
      });
    }
  };

  static postReport = async (req, res) => {
    try {
      // const data = req.body;
      // const file = req.file.path;
      // // eslint-disable-next-line radix
      // const userId = req.params.userId;
      // const createReport = await createdReport(data, userId, file);
      res.status(200).send({
        status: true,
        message: 'Report has been successfull created!!',
        // data: createReport,
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: 'Report is not found!!',
      });
      throw Error(error);
    }
  };

  static deleteReport = async (req, res) => {
    try {
      // eslint-disable-next-line radix
      const reportId = req.params.reportId;
      await deletedReport(reportId);
      res.status(200).send({
        status: true,
        message: 'Report has been successfull deleted',
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: 'Report is not found!!',
      });
    }
  };

  static updateAllDataReport = async (req, res) => {
    try {
      const data = req.body;
      const reportId = req.params.reportId;
      if (!(data.subject && data.description && data.file)) {
        res.status(400).send({
          status: false,
          message: 'Some field is missing',
        });
        return;
      }
      const updateReport = await updatedReportById(data, reportId);
      res.status(200).send({
        status: true,
        message: 'Report has been successfull updated',
        data: updateReport,
      });
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: 'Report is not found!!',
      });
    }
  };

  static getHistoryByReport = async (req, res) => {
    try {
      // eslint-disable-next-line radix
      const reportId = req.params.reportId;
      const getHistory = await getHistoryByReportId(reportId);
      if (!getHistory) {
        res.status(400).send({
          status: 400,
          message: 'Report is undefined',
        });
      }
      res.send(getHistory);
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: 'Report is not found!!',
      });
    }
  };

  static updateSingleDataReport = async (req, res) => {
    try {
      const data = req.body;
      // eslint-disable-next-line radix
      const reportId = req.params.reportId;
      const updateReport = await updatedReportById(data, reportId);
      res.send({
        message: 'Report has been successfull updated',
        data: updateReport,
        status: 200,
      });
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: 'Report is not found!!',
      });
    }
  };

  static getHistoryByUser = async (req, res) => {
    try {
      // eslint-disable-next-line radix
      const userId = req.params.userId;
      const getHistory = await getHistoryByUserId(userId);
      res.status(200).send({
        data: getHistory,
        status: true,
      });
    } catch (error) {
      res.status(400);
      res.send({
        status: false,
        message: 'Report is undefined!!',
      });
    }
  };
}

module.exports = ReportController;
