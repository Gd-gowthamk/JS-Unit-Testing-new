import { ApiService, UserService, User } from './index';

class StubApiService extends ApiService {
  private users: Record<string, User> = {
    '1': { id: '1', firstName: 'John', lastName: 'Doe' },
    '2': { id: '2', firstName: 'Alice', lastName: 'Smith' },
  };

  async fetchUser(userId: string): Promise<User> {
    if (userId === '1') return { id: '1', firstName: 'John', lastName: 'Doe' };
    if (userId === '2') return { id: '2', firstName: 'Alice', lastName: 'Smith' };
    return { id: userId, firstName: 'Default', lastName: 'User' };
  }
}

describe('UserService - getUserName', () => {
  let stubApi: StubApiService;
  let userService: UserService;

  beforeEach(() => {
    stubApi = new StubApiService();
    userService = new UserService(stubApi);
  });

  it('should return full name from stubbed ApiService', async () => {
    const fullName = await userService.getUserName('1');
    expect(fullName).toBe('John Doe');
  });

  it('should handle different userIds correctly', async () => {
    const fullName1 = await userService.getUserName('2');
    expect(fullName1).toBe('Alice Smith');

    const fullName2 = await userService.getUserName('unknown');
    expect(fullName2).toBe('Default User');
  });

  
});
