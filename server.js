const express = require('express');
const server = express();
server.use(express.json());
const tags = [];
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/rfid.db');

server.get('/tags', (req, res) => {
    let sql = 'SELECT * FROM rfid';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else {
            console.log(rows.length);
            rows.forEach((row) => {
                // tags.push(row.tag_id);
                console.log(row.tag_id);
            });
            return res.status(201).send('Retornou todas as Tags')
        }
    });
});

server.get('/tags/:index', (req, res) => {
    const { index } = req.params;
    return res.json(tags[index]);
});

server.post('/tags', (req, res) => {
    const { id } = req.body;
    
    db.run(`INSERT into rfid(tag_id) VALUES (?)`, id, function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`tag_id: ${id}`)
        console.log(`A row has been inserted with rowid ${this.lastID}`)
        // db.close();
        return res.status(201).send('Tag inserida com sucesso')
    })
});

server.put('/tags/:index', (req, res) => {
    const { index } = req.params;
    const { id } = req.body;
    tags[index] = id;
    return res.json(tags)
})

server.delete('/tags/:index', (req, res) => {
    const { index } = req.params;
    // tags.splice(index, 1);
    // return res.send();
    let sql = "DELETE FROM rfid WHERE tag_id = ?"
    db.run(sql, index, (err) => {
        if (err) {
            console.log(err.message)
        } else {
            return res.status(201).send('Tag excluída com sucesso');
        }
    });
});

server.delete('/tags', (req, res) => {
    // tags.length = 0;
    let sql = "DELETE FROM rfid"
    db.run(sql, (err) => {
        if (err) {
            console.log(err.message)
        } else {
            return res.status(201).send('Linhas da tabela excluídas com sucesso');
        }
    });
})

server.listen(3000, '0.0.0.0', () => {
    console.log('Server is now running!')
});