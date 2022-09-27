const { Client } = require("pg");
const client = new Client({
    host: "tiny.db.elephantsql.com",
    user: "ygxvpnte",
    port: "5432",
    password: "Z76TPbkGhluY1P4yj_ZuERcNC3HuiMcQ",
    database: "ygxvpnte",
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
});

client.connect();
console.log("Connected!");

client.query("Select * from BookData").then((res) => {
    // if(!err) console.log(res);
    console.log(res.rows);
    client.end();
});

// client.query("Insert into test(name) values($1)",["test1"]).then(res => {
//     console.log(res.rows[0]);
//     // client.end();
//     // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
//   })

// const res = await client.query('SELECT * from UserInfo');
// console.log(res);
