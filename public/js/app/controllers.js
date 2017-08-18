
app.controller("EmployeeCtrl", function ($scope, $http) {
    
    function init() {
        $scope.employees = [];
        $scope.setEmployeeDefault();
        $scope.readAll();
    }
    
    $scope.setEmployeeDefault = function () {
        $scope.employee = {
            name: "",
            email: "",
            dob: "",
            age: 0,
            department: "",
            gender: "",
            _id: 0,
            editMode: 'off'
        };
        $scope.err = "";
    }
    
    $scope.calculateAge = function (dob) {
        var today = new Date();
        var dateOfBirth = new Date(dob);
        var diff = (today - dateOfBirth) / (1000 * 60 * 60 * 24 * 365);
        return Math.round(diff);
    }
    
    $scope.defineEmployeeAge = function (dob, employee) {
        var result = $scope.calculateAge(dob);
        if (!isNaN(result)) {
            employee.age = result;
        }
    }
    
    $scope.create = function (employee) {
        $http({
            url: "api/employee/create",
            method: 'POST',
            data: JSON.stringify(employee)
        }).then(function (employee) {
            $scope.employees.push(employee.data);
            $scope.turnOffEditMode();
            $scope.setEmployeeDefault();
        }).catch(function (err) {
            $scope.err = err.data;
        })
    }
    
    $scope.update = function (employee) {
        $http({
            url: "api/employee/update",
            method: 'POST',
            data: JSON.stringify(employee)
        }).then(function (employee) {
            $scope.readAll();
        }).catch(function (err) {
            $scope.err = err.data;
        })
    }
    
    $scope.readAll = function () {
        $http({
            method: 'GET',
            url: "api/employee"
        })
        .then(function (result) {
            $scope.employees = result.data;
            $scope.turnOffEditMode();
            $scope.setEmployeeDefault();
        }).catch(function (err) {
            $scope.err = err.data;
        })
    }
    
    $scope.turnOffEditMode = function () {
        $scope.employees.forEach(function (data) {
            data.editMode = 'off';
        })
    }
    
    
    $scope.edit = function (id) {
        $scope.turnOffEditMode();
        $scope.employee = $scope.employees.find(function (data) {
            return data._id == id;
        })
        $scope.employee.dob = new Date($scope.employee.dob);
        
        $scope.employee.editMode = 'on';
    }
    
    $scope.remove = function (id) {
        
        if (confirm("Confirm to delete this employee record??")) {
            $http({
                method: 'GET',
                url: "api/employee/delete/" + id
            }).then(function (result) {
                $scope.err = result.data;
                $scope.employees = $scope.employees.filter(function (data) {
                    return data._id != id
                })
            }).catch(function (err) {
                $scope.err = err.data;
            })
        }
    }
    
    init();
});

