var util = require('util');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'cash_it'
});

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

function processData(request, response) {

	var companyNames = {};
	var positions = {};
	var jobLocations = {};

	var done = after(3, finished);

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
        response.send({
            companyNames: companyNames,
            positions: positions,
            jobLocations: jobLocations
        });
    }
}

module.exports = function(app, EventEmitter) {
    app.route('/data')
        .get(function(request, response) {
            processData(request, response, EventEmitter);
        })
        .post(function(request, response) {
            processData(request, response, EventEmitter);
        });
};
