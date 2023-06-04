const sqlite3 = require('sqlite3').verbose();

//open database in memory
// let db = new sqlite3.Database('./db/rfid.db', sqlite3.OPEN_CREATE, (err) => {
//     if (err) {
//         return console.error(err.message);
//     }

//     console.log('Connected to the in-memory SQLite database.')
// });

let db = new sqlite3.Database('./db/rfid.db');
let tag_id = '456'
let tags = []
let index = 2

// db.run('CREATE TABLE rfid(tag_id)');

db.run(`INSERT into rfid(tag_id) VALUES (?)`, tag_id, function(err) {
    if (err) {
        return console.log(err.message);
    }
    console.log(`tag_id: ${tag_id}`)
    console.log(`A row has been inserted with rowid ${this.lastID}`)
})

// let sql = 'SELECT * FROM rfid';
// db.all(sql, [], (err, rows) => {
//     if (err) {
//         throw err;
//     }

//     rows.forEach((row) => {
//         tags.push(row.tag_id)
//     });

//     console.log(tags)
// });

// let sql = 'SELECT * FROM rfid WHERE tag_id = ?';
// db.get(sql, index, (err, row) => {
//     if (err) {
//         return console.log(err.message)
//     }
//     return row
//         ? console.log(row.tag_id)
//         : console.log(`No tag found with the id ${tags[index]}`)
// })


// db.serialize(() => {
//     db.each(`SELECT * from rfid`, (err, row) => {
//         if (err) {
//             console.error(err.message);
//         }

//         console.log(row)
//     });
// });


//close database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Closed the database connection.')
});