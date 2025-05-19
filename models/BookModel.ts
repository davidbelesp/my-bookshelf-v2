import { State } from './State';
import { Type } from './Type';

export interface BookModel {
    uuid: string;
    title: string;
    state: State;
    score: number;
    chapter: number;
    volume: number;
    nsfw: boolean;
    type: Type;
    comments: string[];
    image: string;
    lastRead: number;
}