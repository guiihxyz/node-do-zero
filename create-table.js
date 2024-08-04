import { sql } from './db.js'

// sql`DROP TABLE videos;`.then(() => {
//     console.log('acabou')
// })

sql`
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    duration INTEGER
);`.then(() => {
    console.log('acabou')
})