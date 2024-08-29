/*

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
            "lastRead": 1620000000000
        }

*/

export interface BookModel {
    uuid: string;
    title: string;
    state: string;
    score: number;
    chapter: number;
    volume: number;
    nsfw: boolean;
    type: string;
    comments: string[];
    image: string;
    lastRead: number;
}