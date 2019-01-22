const express = require('express');

// Router Imports
const zooRoutes = require('./zooRoutes');
const bearRoutes = require('./bearRoutes');

// Router Decleration
const router = express.Router();

// Sub-Routers
router.use('/zoos', zooRoutes);
router.use('/bears', bearRoutes);


router.use('/', (req, res) => {
    res.send('Welcome to the API');
});

// Export
module.exports = router;