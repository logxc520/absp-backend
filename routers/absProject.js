const express = require('express');
const router = express.Router();
const log = require('../logger').getLogger('absProject');
const absFabricApi = require('../fabric/api/abs');

absFabricApi.enroll();

router.post('/createAbsProject', (req, res, next) => {
  log.debug(req.body);
  absFabricApi.createProject(req.body, (err, result) => {
    if (err) {
      res.end(JSON.stringify({ success: false, error: err }));
    } else {
      res.end(JSON.stringify({ success: true, projectId: result }));
    }
  });
});

router.post('/removeAbsProject', (req, res, next) => {
  const { projectId } = req.body;
  if (!projectId) {
    res.end(JSON.stringify({ success: false, error: 'no projectId' }));
  } else {
    absFabricApi.removeProject(projectId, err => {
      if (err) {
        res.end(JSON.stringify({ success: false, error: err }));
      } else {
        res.end(JSON.stringify({ success: true }));
      }
    });
  }
});

router.post('/modifyAbsProject', (req, res, next) => {
  log.debug(req.body);
  absFabricApi.modifyProjectInfo(req.body, err => {
    if (err) {
      res.end(JSON.stringify({ success: false, error: err }));
    } else {
      res.end(JSON.stringify({ success: true }));
    }
  });
});

router.get('/queryAbsProjectList', (req, res, next) => {
  absFabricApi.queryAllProjects((err, result) => {
    if (err) {
      res.end(JSON.stringify({ success: false, error: err }));
    } else {
      res.end(result);
    }
  });
});

router.get('/queryAbsProjectDetail', (req, res, next) => {
  const projectId = req.query.pid;
  console.log(req.query.pid);
  absFabricApi.queryProjectById(projectId, (err, result) => {
    if (err) {
      res.end(JSON.stringify({ success: false, error: err }));
    } else {
      res.end(result);
    }
  });
});

router.get('/hello', (req, res, next) => {
  res.end(JSON.stringify({ success: 'hello world' }));
});

module.exports = router;
