const sql = require('mssql/msnodesqlv8');

const DBConfig = {
    server: 'mssql-166974-0.cloudclusters.net,10020',
    database: 'TMIncDB',
    user: 'JAM',
    password: 'Password123',
    options: {
        // trustedConnection: true
    }
}

const SQLQuery = async (queryString, Medhod = "GET") => {
    console.log(queryString);

    return new Promise((resolve, reject) => {
        let pool;

        try {
            sql.connect(DBConfig, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    var sqlRequest = new sql.Request();
                    sqlRequest.query(queryString, (errSQL, data) => {
                        if (errSQL) {
                            //console.error("Error executing query:", errSQL);
                            reject(errSQL);
                        } else {
                            //console.log("Query executed successfully!");
                            //console.log(data);
                            resolve(data.recordset);
                        }
                    });
                }
            });
        }
        catch (err) {
            console.error('Error connecting to database:', err.message);
        } finally {
            try {
                if (pool) {
                    pool.close(); // Close the connection pool
                    console.log('Connection pool closed.');
                }
            } catch (err) {
                console.error('Error closing connection pool:', err.message);
            }
        }
    });
};

module.exports = SQLQuery