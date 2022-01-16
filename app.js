let express = require('express');
let app = express();
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('hello there');
});
app.set('port', process.env.PORT || 3000);
let server = app.listen(app.settings.port, () => {
    console.log('Server ready on ', app.settings.port);
});
