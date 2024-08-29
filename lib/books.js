export async function getBooks() {
    
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
            "image": "https://itbook.store/img/books/9780135957059.png",
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
            "image": "https://itbook.store/img/books/9781491904190.png",
        }
    ];
    
    return books;

}