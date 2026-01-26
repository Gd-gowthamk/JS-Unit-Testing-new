import { validateUserName } from './index';
import * as api from './fetchIsUserNameValid';

// Mock the API function
jest.mock('./fetchIsUserNameValid', () => ({
  fetchIsUserNameAvailable: jest.fn(),
}));

const mockedFetch = jest.mocked(api.fetchIsUserNameAvailable);

describe('validateUserName - invalid usernames', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns false if username is less than 3 characters', async () => {
    const result = await validateUserName('ab');
    expect(result).toBe(false);
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it('returns false if username contains non-alphanumeric characters', async () => {
    const result = await validateUserName('ab@c');
    expect(result).toBe(false);
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it('returns false if username contains spaces', async () => {
    const result = await validateUserName('ab c');
    expect(result).toBe(false);
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it('returns false if username starts with a number', async () => {
    const result = await validateUserName('1abc');
    expect(result).toBe(false);
    expect(mockedFetch).not.toHaveBeenCalled();
  });
});

describe('validateUserName - valid usernames', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns true when username is available', async () => {
    mockedFetch.mockResolvedValue(true);
    const result = await validateUserName('abcUser');
    expect(result).toBe(true);
    expect(mockedFetch).toHaveBeenCalledWith('abcUser');
    expect(mockedFetch).toHaveBeenCalledTimes(1);
  });

  it('returns false when username is NOT available', async () => {
    mockedFetch.mockResolvedValue(false);
    const result = await validateUserName('abcUser');
    expect(result).toBe(false);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
  });

  it('returns false when API throws an error', async () => {
    mockedFetch.mockRejectedValue(new Error('Network error'));
    const result = await validateUserName('abcUser');
    expect(result).toBe(false);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
  });
});
