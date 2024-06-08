import { CreateUserInput } from '../../../auth/dtos/createuser.dto';
import { User } from '../user.entity';

// Defined the contracts of the UserService which implements them. These makes the application loosely coupled, testable,
// and maintainable. So we can switch the implementation if need be without breaking the comsumers of the class.
export interface IUserService {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | undefined>;
  findOneByEmail(string): Promise<User | undefined>;
  create(UserData: CreateUserInput): Promise<User>;
  delete(id: number);
}
