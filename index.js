const express = require('express');
const router = require("./app/routes/index");
const APP = express();

const PORT = process.env.PORT || 3001;
const WWW = process.env.WWW || './app/static';
APP.use(express.json());
APP.use('/reports',express.static(WWW));
APP.use('/api', router);

console.log(`static files ${WWW}`);
APP.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
