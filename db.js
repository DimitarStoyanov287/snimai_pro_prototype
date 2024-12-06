const { Pool } = require('pg');

// PostgreSQL connection setup
const pool = new Pool({
    user: 'snimaipr',
    host: '/var/run/postgresql	',
    database: 'snimaipr_db',
    password: '&!rejZHNZecNnv3',
    port: 5432, // Default PostgreSQL port
});

module.exports = pool;