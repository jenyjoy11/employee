
module.exports = {
    initialize_defaults : function () {
        
        global.resource = {
            config : require('./config.json')
        };
        
        var database = require('./model/db.init.js');
        
        global.package = {
            db : {
                employee: require('./model/employee.js')
            }
        }
    }
}

//var configurePackage = function () {
//    global.package = {
//        config : require('./config.json'),
//        database : require('./model/db.init.js'),
//        db : {
//            employee: require('./model/employee.js')
//        }
//    }
//} 