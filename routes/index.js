var util = require('util');
var mysql = require('mysql');

var Ddos = require('ddos')
var ddos = new Ddos;
var express = require('express')
var app = express();
app.use(ddos.express)

var config = require(__dirname + "/../config.json");
var connection = mysql.createConnection({
    host: config.databaseInformation.host,
    user: config.databaseInformation.user,
    password: config.databaseInformation.password,
    database: config.databaseInformation.database,
});

var second_connection = mysql.createConnection({
    host: config.databaseInformation2.host,
    user: config.databaseInformation2.user,
    password: config.databaseInformation2.password,
    database: config.databaseInformation2.database,
});

var errorStyle = 'border-color: #E5503F;';

function isPositiveInteger(str) {
    return /^\d+$/.test(str);
}

function isValidString(str) {
    return /^[\s\-a-zA-Z0-9!@#\+\.\&\-]+$/.test(str);
}

function formatString(str) {
    return "\'" + str + "\'";
}

function stripString(str) {
    return str.trim().toUpperCase().substring(0,100);
}

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; 
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = yyyy+'-'+mm+'-'+dd;

    return today;
}

function processIndex(request, response) {

    var tags = [];
    var companyNames = {};
    var positions = {};
    var jobLocations = {};
    var searchResults = [];
    var showTable = 'none';

    var searchData = {
        searchLocation :'',
        searchCompanyName : '',
        searchPosition : ''
    };

    var formData = {
        companyName: {value:'', style:''},
        position: {value:'', style:''},
        jobLocation: {value:'', style:''},
        salary: {value:'', style:''},
        experience: {value:'', style:''},
        hasDiploma: {value:'', style:''},
        isPFA: {value:'', style:''}

    };

    var done = after(1, finished);
    var message = {value:'', style:''};
    var searchMessage = '';
    var isValidForm = true;

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

        var jobTags = request.body.jobTags.split(',');

        var companyName = stripString(request.body.companyName);
        var salary = stripString(request.body.salary);
        var position = stripString(request.body.position);
        var yearsOfExperience = stripString(request.body.yearsOfExperience);
        var jobLocation = stripString(request.body.jobLocation);
        var isPFA = (request.body.isPFA == 'on');
        var hasDiploma = (request.body.hasDiploma == 'on');
        var year = getCurrentDate();
        var submitterIP = formatString(request.connection.remoteAddress);
        
        if(companyName=='PENTALOG' && salary=='24000') {
            isValidForm = false;
        }

        var query = util.format("INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP" 
                    + ")VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s);",
                    salary, formatString(companyName), formatString(position), formatString(jobLocation), yearsOfExperience, isPFA, hasDiploma, formatString(year), submitterIP);
        
        console.log(query);

        if (parseInt(salary) > 50000) {
            isValidForm = false;
        }
        if (parseInt(yearsOfExperience) > 70) {
            isValidForm = false;
        }
        if (parseInt(salary) % 10 != 0) {
            isValidForm = false;
        }        

        if (isValidForm == true) {   
            message.value = 'Salariul a fost salvat si va fi afisat dupa o aprobare de catre un administrator ✓';
            message.style = 'color:#00b386;';

            goToSection = '#add-salary-sec';

            formData = {
                companyName: {value:'', style:''},
                position: {value:'', style:''},
                jobLocation: {value:'', style:''},
                salary: {value:'', style:''},
                experience: {value:'', style:''},
                hasDiploma: {value:'', style:''},
                isPFA: {value:'', style:''}

            };

            second_connection.query(query, function(error, result) {
                if (error) {
                    console.log('An error has occcurred: %s', error);
                } 
                else {

                    done = after(1 + jobTags.length * 2, finished);

                    for (var index = 0; index < jobTags.length; index++) {
                        if (isValidString(jobTags[index]) && jobTags[index] != '') {

                            query = "INSERT INTO tags(name) VALUES (\'" + stripString(jobTags[index]) + "\');";
                        
                            second_connection.query(query, function(error, result) {
                                done();
                            });
                           
                            query = "INSERT INTO salaries_cross_tags (salary_id, tag_id) SELECT " + formatString(result.insertId) + 
                                ", t.id FROM tags AS t WHERE t.name=" + formatString(stripString(jobTags[index])) + ";";
                            console.log(query);
                            second_connection.query(query, function(error, result) {
                                if (error) {
                                    console.log('An error has occcurred: %s', error);
                                } 
                               
                                done();
                            });
                        }
                        else {
                            done();
                            done();
                        }
                    }
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

        query = "SELECT * FROM salaries WHERE ";

        if (companyName.length > 0 && isValidString(companyName)) {
            query += "companyName LIKE" + formatString('%' + companyName + '%') + " ";

            executeQuery = true;

            searchData.searchCompanyName = companyName;
        }

        if (location.length > 0 && isValidString(location)) {
            if (companyName.length > 0) {
                query += "AND ";
            }

            query += "location LIKE" + formatString('%' + location + '%') + " ";

            executeQuery = true;

            searchData.searchLocation = location;
        }

        if (position.length > 0 && isValidString(position)) {
            if (companyName.length > 0 || location.length > 0) {
                query += "AND ";
            }

            query += "position LIKE" + formatString('%' + position + '%') + " ";

            executeQuery = true;

            searchData.searchPosition = position;
        }

        query += "ORDER BY salary DESC;";

        if(companyName.length == 0 && location.length == 0 && position.length == 0) {
            executeQuery = true;
            query = "SELECT * FROM salaries;";

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
                    searchMessage = 'Nu s-au gasit rezultate!';

                    
                }
                else {
                    showTable = '';
                    searchMessage = '';

                    done = after(1 + searchResults.length, finished);

                    for (var index = 0; index < searchResults.length; index++) {

                       

                        query = "SELECT name FROM tags WHERE id IN (SELECT tag_id FROM salaries_cross_tags WHERE salary_id =" 
                            + formatString(searchResults[index].id) + ");";

                        connection.query(query, function(error, result) {
                            if (error) {
                                console.log('An error has occcurred: %s', error);
                                tags.push([]);
                            } 
                            else
                            {
                               tags.push(JSON.parse(JSON.stringify(result)));
                            }
                               
                            done();
                        });
                    }
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
    
    function finished() {

        for (var index = 0; index < tags.length; index++) {
            if (tags[index].length > 0)
            {
                searchResults[index].tags = '';

                for (var i = 0; i < tags[index].length; i++) {
                    searchResults[index].tags += tags[index][i].name + " ";
                }
            }
            else
            {
                searchResults[index].tags = ' - ';
            }
        }


       response.render('index', {
            error: '',
            submitMessage: message,
            searchResults : searchResults,
            searchMessage : searchMessage,
            showTable : showTable,
            formData : formData,
            searchData : searchData
        });
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
