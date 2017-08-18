var express = require('express');
var router = express.Router();
var employee = global.package.db.employee;

router.post('/employee/create', function (req, res) {
    
    var ed = readRequestData(req);
    
    employee
    .create(ed.name, ed.email, ed.dob, ed.department, ed.gender, ed.age)
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
        res.status(403);
        res.end(err);
    });

});

router.get('/employee', function (req, res) {
    employee
    .readAll()
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
        res.status(403);
        res.end(err);
    });
});

router.get('/employee/:id', function (req, res) {
    employee
    .readById(req.params.id)
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
        res.status(403);
        res.end(err);
    });
});

router.post('/employee/update', function (req, res) {
    
    var ed = readRequestData(req);
    employee
    .update(ed.id, ed.name, ed.email, ed.dob, ed.department, ed.gender, ed.age)
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
        res.status(403);
        res.end(err);
    });

});

router.get('/employee/delete/:id', function (req, res) {
    
    employee
    .delete(req.params.id)
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
        res.status(403);
        res.end(err);
    });

});

function readRequestData(req) {
    return {
        id: req.body._id,
        name : req.body.name,
        email : req.body.email,
        dob : req.body.dob,
        department : req.body.department,
        gender : req.body.gender,
        age : req.body.age
    }
}

module.exports = router;