require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api/routes');
const db = require('./database/models');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

db.sequelize.sync().then(() => {
    console.log("Database synced");
    app.listen(process.env.PORT || 3000, () => console.log(`Server running`));
});
