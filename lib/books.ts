import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookModel } from '../Models/Book';

export async function getBooks() : Promise<BookModel[]> {

    const books = await AsyncStorage.getItem("books");
    return books ? JSON.parse(books) : [];

}

export async function getBook(uuid : string) {

    const books = await getBooks();
    return books.find(book => book.uuid === uuid);

}

export async function saveBook(book : BookModel) {
    
    const books = await getBooks();
    books.push(book);
    return books;
    
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
            "type": "manga",
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
            "type": "manhwa",
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