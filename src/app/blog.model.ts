export class Post {
    constructor(
        //public id: number,
        public publicationDate : Date,
        public author: string,
        public title: string,
        public content: string,
        public tags: string[],
        public imageURL?: string,
        public status: PostStatus = PostStatus.ACTIVE
    ) {}

}

export enum PostStatus {
    ACTIVE = 1, INACTIVE = 2
}