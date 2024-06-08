import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { IPostService } from '../interfaces/post.interface';
import { UpdatePostInput } from '../dtos/update.dto';

// "@Injectable()" Makes this class as injectable. A singleton of this class is created and
// used across the application since the class is stateless.
// As it does not any state between the method calls.
// This is efficient.
@Injectable()
// The class implement the IPostService interface, providing concrete implemenation for all its methods.
export class PostService implements IPostService {
  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {}

  // Creates and returns a new post
  create(createPostData: Post, postedBy: number) {
    const postData = { userId: postedBy, ...createPostData };
    const newPost = this.postRepository.create(postData);
    return this.postRepository.save(newPost);
  }
  // Finds and returns a post whose "id" is provided.
  findById(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id, isDeleted: false }, relations: ['userId'] });
  }

  // Finds and returns all posts.
  findAll(): Promise<Post[]> {
    return this.postRepository.find({ where: { isDeleted: false }, relations: ['userId'] });
  }

  // Finds and returns posts associated with a user
  findUserPosts(userId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { userId: { id: userId }, isDeleted: false },
      relations: ['userId']
    });
  }

  // Updates and returns the post, making sure the post belongs to the user.
  async update(id: number, userId: number, updateData: UpdatePostInput): Promise<Post> {
    try {
      const postToUpdate = await this.postRepository.findOne({
        where: { id, userId: { id: userId }, isDeleted: false },
        relations: ['userId']
      });

      if (!postToUpdate) throw new HttpException('Not found.', 404);

      await this.postRepository.update({ id, userId: { id: userId } }, updateData);

      return postToUpdate;
    } catch (err) {
      throw err;
    }
  }

  // Changes the "isDeleted" field to true, making the post inaccessible to the user but accessible to the admin.
  // This helps the database stay consistent and aid auditing.
  async delete(id: number, ID: number): Promise<null> {
    try {
      const postToDelete = await this.postRepository.findOne({
        where: { id, userId: { id: ID }, isDeleted: false },
        relations: ['userId']
      });

      if (!postToDelete) throw new HttpException('Not found.', 404);

      await this.postRepository.update(id, { isDeleted: true });
      return null;
    } catch (err) {
      throw err;
    }
  }
}
