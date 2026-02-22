const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { PORT } = require('./helpers/constants');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

routes.connect(app);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
