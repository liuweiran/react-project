const express = require('express'),
      app = express();

const default_port = 3002;

app.use('/', express.static('./', { redirect:false }));

const index = process.argv.indexOf('--port'),
    port = index > -1 ? (process.argv[index + 1] || default_port) : default_port;

app.listen(port, function () {
    console.log('Server start at http://localhost:%s', port);
});

app.post('/logonJson', function (req, res) {

    res.json({
        "code": 0,
        "msg": "登陆成功"
    })

});