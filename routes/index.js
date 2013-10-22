var http = require('http');
/*
 * GET home page.
 */

exports.index = function(req, res){
    
    var options = {
        host: 'api.uptimerobot.com',
        path: '/getMonitors?format=json&noJsonCallback=1&apiKey=' + process.env.APIKEY
    };

    http.request(options, function(response) {

        var str = '';

        response.on('data', function(chunk) {
            str += chunk;
        });

        response.on('end', function() {

            var info = JSON.parse(str).monitors.monitor[0];

            res.render('index', {
                title: 'MDG Technik Status',
                status: parseInt(info.status),
                uptime: info.alltimeuptimeratio
            });
        });

    }).end();

    
};