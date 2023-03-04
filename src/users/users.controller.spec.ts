import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const userList: User[] = [
  new User({
    _id: '',
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    city: '',
    country: '',
    email: '',
    password: '',
  }),
];

describe('UsersController', () => {
  let userController: UsersController;
  let usersService: UsersService;
  let createUserDto: CreateUserDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(userList),
            update: jest.fn(),
            updatePassword: jest.fn(),
            refreshToken: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should return a user', async () => {
      const result = await userController.create(createUserDto);

      expect(typeof result).toEqual('object');
    });
  });
});
