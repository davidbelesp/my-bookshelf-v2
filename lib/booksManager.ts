// React native sqlite manager
import * as SQLite from 'expo-sqlite';
import { BookModel } from '../Models/Book';

async function getConnection() : Promise<SQLite.SQLiteDatabase> {
    const db = await SQLite.openDatabaseAsync('books.db');
    await createTable(db);
    return db;
}

export async function createTable(db : SQLite.SQLiteDatabase) {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS books (
            uuid TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            state TEXT NOT NULL,
            score INTEGER NOT NULL,
            chapter INTEGER NOT NULL,
            volume INTEGER NOT NULL,
            nsfw INTEGER NOT NULL,
            type TEXT NOT NULL,
            comments TEXT,
            image TEXT,
            lastRead INTEGER NOT NULL
        );`
    );
}

export async function insertBook(book : BookModel) {
    let lastId = await getLastID() as {uuid: string};
    if (!lastId) {
        lastId = {uuid: "0"};
    }

    const newUUID = parseInt(lastId.uuid) + 1;
    
    const db = await getConnection();
    const statement = await db.prepareAsync(
        `INSERT INTO books (uuid, title, state, score, chapter, volume, nsfw, type, comments, image, lastRead) VALUES ($uuid, $title, $state, $score, $chapter, $volume, $nsfw, $type, $comments, $image, $lastRead)`
    );
    try {
        let result = await statement.executeAsync({
            $uuid: newUUID.toString(),
            $title: book.title,
            $state: book.state, 
            $score: book.score,
            $chapter: book.chapter, 
            $volume: book.volume, 
            $nsfw: book.nsfw ? 1 : 0, 
            $type: book.type, 
            $comments: JSON.stringify(book.comments), 
            $image: book.image, 
            $lastRead: book.lastRead
        });
    } finally {
        await statement.finalizeAsync();
    }
}

export async function saveBooks(books : BookModel[]) {
    for (const book of books) {
        await insertBook(book);
    }
}

export async function getLastID() : Promise<{uuid: string} | unknown> {
    const db = await getConnection();
    const result = await db.getFirstAsync(`SELECT uuid FROM books ORDER BY uuid DESC LIMIT 1;`);
    return result;
}

export async function deleteBooks() {
    const db = await getConnection();
    await db.runAsync(`DROP TABLE books;`);
}

export async function getBookByUuid(uuid : string) : Promise<BookModel | null> {
    const db = await getConnection();
    const result = await db.getFirstAsync<BookModel>(`SELECT * FROM books WHERE uuid = ?;`, uuid) ;
    return result;
}

export async function getFirstBook() {
    const db = await getConnection();
    const result = await db.getFirstAsync<BookModel>(`SELECT * FROM books`);
    return result;
}

export async function getBooks() {
    const db = await getConnection();
    const books = await db.getAllAsync<BookModel>(`SELECT * FROM books`);
    for (const book of books) {
        console.log(book.uuid);
    }
    return books;

}

export function getBooksEXAMPLE() {

    const books = [
        {
            "uuid": "",
            "title": "The Pragmatic Programmer",
            "state": ["Completed", "Reading", "On Hold", "Dropped"][Math.trunc(Math.random() * 4)],
            "score": Math.trunc(Math.random() * 10),
            "chapter": Math.trunc(Math.random() * 100),
            "volume": Math.trunc(Math.random() * 10),
            "nsfw": Math.random() > 0.5,
            "type": "Manga",
            "comments": [
                "I love this book",
                "It's a must-read"
            ],
            "image": "https://cdn.myanimelist.net/images/anime/1770/97704.jpg",
            "lastRead": 1620000000000 + Math.trunc(Math.random() * 1000000)
        },
    ];
    
    return books;

}