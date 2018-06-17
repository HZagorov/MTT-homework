import {Post, PostStatus} from './blog.model';

export default [
    new Post("1", new Date(1994, 8 , 9), "Hristo", "Birth Date", "This is the author's birthdate!!!", ["birth"],"https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"), 
    new Post("2", new Date(1999, 5, 11), "Ivan", "Blog post", "Some random blog post by Ivan!", ["tag"],"", 2 ),
    new Post("3", new Date(1939, 8, 1), "Adolf", "WW2", "Poland invaded!", ["war, natzi"])
]