var Nightmare = require('nightmare');       

// Helpdesk Management demo app
var url = 'https://sense-demo.qlik.com/single/?appid=133dab5d-8f56-4d40-b3e0-a6b401391bde&obj=a5e0f12c-38f5-4da9-8f3f-0e4566b28398'

var page = Nightmare({
        'show': true, // This will open a instance of electron on the screen. Toggle to false for production systems.
        'ignore-certificate-errors': true // Just in case
    })
    .viewport(600, 400)
    .goto(url, {
        'origin': 'https://sense-demo.qlik.com'
    })
    .wait(10000) // Wait 10 seconds for the page to render. You could perform sophisticated checks here
    .evaluate(function() {
        return new Promise(function(resolve, reject) {
            // Execute inside of the browser. Load up the capabilities api and perform some selections.
            require(['js/qlik'], function(qlik) {
                var app = qlik.currApp();
                app.field('[Case Owner Group]').selectMatch('Operations', true);

                resolve();
            })
        })
    })
    .wait(3000)
    .screenshot('chart.png') // Take a screenshot of the page.
    .run(function() { console.log('Done!'); process.exit(1); })
    .catch(function(err) {
        console.log(err);
        process.exit(1);
    })
