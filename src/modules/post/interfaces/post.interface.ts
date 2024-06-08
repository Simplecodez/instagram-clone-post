import { CreatePostInput } from '../dtos/createpost.dto';
import { UpdatePostInput } from '../dtos/update.dto';
import { Post } from '../entities/post.entity';

// Defined the contracts of the PostService which implements them. These makes the application loosely coupled, testable,
// and maintainable. So we can switch the implementation if need be without breaking the comsumers of the class.
export interface IPostService {
  findAll(): Promise<Post[]>;
  findById(id: number): Promise<Post | undefined>;
  findUserPosts(userId: number): Promise<Post[]>;
  create(postData: CreatePostInput, postedBy: number): Promise<Post>;
  update(id: number, userId: number, updateData: UpdatePostInput);
  delete(id: number, ID: number): Promise<null>;
}
