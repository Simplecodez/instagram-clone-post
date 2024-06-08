import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { IUserService } from './interfaces/user.interface';
import { CreateUserInput } from '../../auth/dtos/createuser.dto';

// "@Injectable()" Makes this class as injectable. A singleton of this class is created and
// used across the application since the class is stateless.
// As it does not any state between the method calls.
// This is efficient.
@Injectable()
// The class implement the IUserService interface, providing concrete implemenation for all its methods.
export class UserService implements IUserService {
  // Injecting "User" dependency and mark it as "readonly" so it is immutable.
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  // creates new users
  create(UserData: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(UserData);
    return this.userRepository.save(newUser);
  }

  // Get the user whose id is provided.
  findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id, isDeleted: false },
      select: ['id', 'email', 'firstName', 'lastName']
    });
  }

  // Get user whose email is provided. It is used for the log in process
  // When retrieved, the password provided will be compared against that of the users retrieved.
  findOneByEmail(email: any): Promise<User> {
    return this.userRepository.findOne({
      where: { email, isDeleted: false },
      select: ['id', 'email', 'firstName', 'lastName', 'password']
    });
  }

  // Retrieves all users for administrative purposes.
  findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { isDeleted: false },
      select: ['id', 'email', 'firstName', 'lastName']
    });
  }

  // Makes the users account inaccessible to them but accessble to the admin.
  // Maintain database consistency and aids auditing.
  async delete(id: number) {
    try {
      const userToDelete = await this.userRepository.findOne({
        where: { id, isDeleted: false }
      });

      if (!userToDelete) throw new HttpException('Not found.', HttpStatus.NOT_FOUND);

      await this.userRepository.update(id, { isDeleted: true });
      return null;
    } catch (err) {
      throw err;
    }
  }
}
