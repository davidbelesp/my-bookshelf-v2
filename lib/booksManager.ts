// React native sqlite manager

import { BookModel } from "../Models/Book";
import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

export const getDBConnection = async () => {
    const db = await openDatabase({ name: 'books.db' , location: 'default' });
    await createTables(db);
    return db;
}

const createTables = async (db : SQLiteDatabase) => {
    db.transaction(function(tx) {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS books (uuid TEXT PRIMARY KEY, title TEXT, state TEXT, score INTEGER, chapter INTEGER, volume INTEGER, nsfw BOOLEAN, type TEXT, comments TEXT, image TEXT, lastRead INTEGER)",
            [],
            function(tx, res) {
                console.log('Table created successfully');
            },
            function(tx, error) {
                console.log('Error: ', error);
            }
        );
    });
}

export function saveBook(book : BookModel) {
    getDBConnection().then((db) => {
        db.transaction(function(tx) {
            tx.executeSql(
                "INSERT INTO books (uuid, title, state, score, chapter, volume, nsfw, type, comments, image, lastRead) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                [book.uuid, book.title, book.state, book.score, book.chapter, book.volume, book.nsfw, book.type, JSON.stringify(book.comments), book.image, book.lastRead],
                function(tx, res) {
                    console.log('Book saved successfully');
                },
                function(tx, error) {
                    console.log('Error: ', error);
                }
            );
        });
    });
}

export function saveBooks(books : BookModel[]) {
    getDBConnection().then((db) => {
        db.transaction(function(tx) {
            books.forEach(book => {
                tx.executeSql(
                    "INSERT INTO books (uuid, title, state, score, chapter, volume, nsfw, type, comments, image, lastRead) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                    [book.uuid, book.title, book.state, book.score, book.chapter, book.volume, book.nsfw, book.type, JSON.stringify(book.comments), book.image, book.lastRead],
                    function(tx, res) {
                        console.log('Book saved successfully');
                    },
                    function(tx, error) {
                        console.log('Error: ', error);
                    }
                );
            });
        });
    });
}

export function getBookByUUID(uuid : string) : Promise<BookModel> {
    return new Promise<BookModel>((resolve, reject) => {
        getDBConnection().then((db) => {
            db.transaction(function(tx) {
                tx.executeSql(
                    "SELECT * FROM books WHERE uuid = ?",
                    [uuid],
                    function(tx, res) {
                        resolve(res.rows.item(0));
                    },
                    function(tx, error) {
                        console.log('Error: ', error);
                        reject(error);
                    }
                );
            });
        });
    });
}

export function deleteBooks() {
    getDBConnection().then((db) => {
        db.transaction(function(tx) {
            tx.executeSql(
                "DELETE FROM books",
                [],
                function(tx, res) {
                    console.log('Books deleted successfully');
                },
                function(tx, error) {
                    console.log('Error: ', error);
                }
            );
        });
    });
}

export function deleteBookByUUID(uuid : string) {
    getDBConnection().then((db) => {
        db.transaction(function(tx) {
            tx.executeSql(
                "DELETE FROM books WHERE uuid = ?",
                [uuid],
                function(tx, res) {
                    console.log('Book deleted successfully');
                },
                function(tx, error) {
                    console.log('Error: ', error);
                }
            );
        });
    });
}

export function getBooksEXAMPLE() : BookModel[] {

    const books = [
        {
            "uuid": "1",
            "title": "The Pragmatic Programmer",
            "state": "Reading",
            "score": 5,
            "chapter": 150,
            "volume": 1,
            "nsfw": false,
            "type": "Manga",
            "comments": [
                "I love this book",
                "It's a must-read"
            ],
            "image": "https://cdn.myanimelist.net/images/anime/1770/97704.jpg",
            "lastRead": 1620000000000
        },
        {
            "uuid": "2",
            "title": "You Don't Know JS Yet",
            "state": "Completed",
            "score": 7,
            "chapter": 12,
            "volume": 1,
            "nsfw": false,
            "type": "Manhwa",
            "comments": [
                "I love this book",
                "It's a must-read"
            ],
            "image": "https://cdn.myanimelist.net/images/anime/1770/97704.jpg",
            "lastRead": 1620000000000
        }
    ];
    
    return books;

}