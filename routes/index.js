var util = require('util');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'cash_it'
});

var errorStyle = 'border-color: #E5503F;';

function isPositiveInteger(str) {
    return /^\d+$/.test(str);
}

function isValidString(str) {
    return /^[\s\-a-zA-Z0-9!@#\+]+$/.test(str);
}

function formatString(str) {
    return "\'" + str + "\'";
}

function stripString(str) {
    return str.trim().toUpperCase().substring(0,100);
}

function processIndex(request, response) {

    var companyNames = {};
    var positions = {};
    var jobLocations = {};
    var searchResults = [];
    var showTable = 'none';

    var formData = {
        companyName: {value:'', style:''},
        position: {value:'', style:''},
        jobLocation: {value:'', style:''},
        salary: {value:'', style:''},
        experience: {value:'', style:''},
        hasDiploma: {value:'', style:''},
        isPFA: {value:'', style:''}

    };

    var message = {value:'', style:''};
    var searchMessage = '';
    var isValidForm = true;

    var done = after(4, finished);

    if (request.body['submit_salary']) {
        if (!isValidString(request.body.companyName) || request.body.companyName == '') {
            formData.companyName.style = errorStyle;
            formData.companyName.value = '';
            isValidForm = false;
        } 
        else {
            formData.companyName.value = request.body.companyName;
        }
        
        if (!isValidString(request.body.position) || request.body.position == '') {
            formData.position.style = errorStyle;
            formData.position.value = '';
            isValidForm = false;
        } 
        else {
            formData.position.value = request.body.position;
        }

        
        if (!isPositiveInteger(request.body.salary) || request.body.salary == '') {
            formData.salary.style = errorStyle;
            formData.salary.value = '';
            isValidForm = false;
        } 
        else {
            formData.salary.value = request.body.salary;
        }
        
        if (!isPositiveInteger(request.body.yearsOfExperience) || request.body.yearsOfExperience == '') {
            formData.experience.style = errorStyle;
            formData.experience.value = '';
            isValidForm = false;
        } 
        else {
            formData.experience.value = request.body.yearsOfExperience;
        }
        
        if (!isValidString(request.body.jobLocation) || request.body.jobLocation == '') {
            formData.jobLocation.style = errorStyle;
            formData.jobLocation.value = '';
            isValidForm = false;
        } 
        else {
            formData.jobLocation.value = request.body.jobLocation;
        }

        var companyName = stripString(request.body.companyName);
        var salary = stripString(request.body.salary);
        var position = stripString(request.body.position);
        var yearsOfExperience = stripString(request.body.yearsOfExperience);
        var jobLocation = stripString(request.body.jobLocation);
        var isPFA = (request.body.isPFA == 'on');
        var hasDiploma = (request.body.hasDiploma == 'on');
        var year = new Date().getFullYear();
        var submitterIP = '0'; //request.connection.remoteAddress 

        var query = util.format("INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP" 
                    + ")VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s);",
                    salary, formatString(companyName), formatString(position), formatString(jobLocation), yearsOfExperience, isPFA, hasDiploma, year, submitterIP);
        
        if (isValidForm == true) {   
            message.value = 'Salariul a fost salvat ✓';
            message.style = 'color:#00b386;';

            goToSection = '#add-salary-sec';

            connection.query(query, function(error, result) {
                if (error) {
                    console.log('An error has occcurred: %s', error);
                }

                done();
            });
        }
        else
        {
            message.value = 'Salariul contine date eronate';
            message.style = 'color:#cc0000;';

            goToSection = '#add-salary-sec';

            done();
        }
    } 
    else if (request.body['submit_search_query']) {

        var companyName = stripString(request.body.searchCompanyName);
        var location = stripString(request.body.searchLocation);
        var position = stripString(request.body.searchPosition);

        var executeQuery = false;

        query = "SELECT * FROM SALARIES WHERE ";

        if (companyName.length > 0 && isValidString(companyName)) {
            query += "companyName =" + formatString(companyName) + " ";

            executeQuery = true;
        }

        if (location.length > 0 && isValidString(location)) {
            if (companyName.length > 0) {
                query += "AND ";
            }

            query += "location =" + formatString(location) + " ";

            executeQuery = true;
        }

         if (position.length > 0 && isValidString(position)) {
            if (companyName.length > 0 || location.length > 0) {
                query += "AND ";
            }

            query += "position =" + formatString(position) + " ";

            executeQuery = true;
        }
        
        if(executeQuery == true)
        {
            connection.query(query, function(error, result) {
                if (error) {
                    console.log('An error has occcurred: %s', error);
                }

                searchResults = JSON.parse(JSON.stringify(result));
                
                if(searchResults.length == 0) {
                    showTable = 'none';
                    searchMessage = 'Nu s-au gasit rezultate!'
                }
                else {
                    showTable = '';
                    searchMessage = '';
                }

                done();
            });
        }
        else {
            done();
        }
    }
    else {
        done();
    }
    
    connection.query('SELECT DISTINCT companyName FROM salaries', function(error, result) {
        if (error) {
            console.log('An error has occcurred: %s', error);
        }

        companyNames = JSON.parse(JSON.stringify(result));
        done();
    });

    connection.query('SELECT DISTINCT position FROM salaries', function(error, result) {
        if (error) {
            console.log('An error has occcurred: %s', error);
        }

        positions = JSON.parse(JSON.stringify(result));
        done();
    });

      connection.query('SELECT DISTINCT location FROM salaries', function(error, result) {
        if (error) {
            console.log('An error has occcurred: %s', error);
        }

        jobLocations = JSON.parse(JSON.stringify(result));
        done();
    });
     
    function finished() {
        response.render('index', {
            error: '',
            submitMessage: message,
            companyNames : companyNames,
            positions : positions,
            jobLocations : jobLocations,
            searchResults : searchResults,
            searchMessage : searchMessage,
            showTable : showTable,
            formData : formData
        });

        console.log(message.style);
    }
}

function after(n, func) {
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    return function() {
        if (--n < 1) {
            return func.apply(this, arguments);
        }
    };
}

module.exports = function(app, EventEmitter) {
    app.route('/')
        .get(function(request, response) {
            processIndex(request, response, EventEmitter);
        })
        .post(function(request, response) {
            processIndex(request, response, EventEmitter);
        });
    app.route('/index')
        .get(function(request, response) {
            processIndex(request, response, EventEmitter);
        })
        .post(function(request, response) {
            processIndex(request, response, EventEmitter);
        });
};
