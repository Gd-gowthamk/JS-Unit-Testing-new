import { getUtcStringDate } from 'tasks/task3';
import { setupMockDate, MockDateSetup } from './testUtils';

describe('getUtcStringDate', () => {
  let mockDate: MockDateSetup;

  beforeEach(() => {
    mockDate = setupMockDate();
  });

  afterEach(() => {
    mockDate.reset();
  });

  it('should return ISO8601 string for current date when no argument is passed', () => {
      mockDate.set({ isoDate: '2026-01-26T12:00:00Z' });

    const result = getUtcStringDate();
    expect(result).toBe('2026-01-26T12:00:00.000Z');
  });

  it('should return ISO8601 string for a provided Date object', () => {
    const input = new Date('2026-01-26T15:30:00+03:00'); // UTC+3
    const result = getUtcStringDate(input);

    // Convert to UTC string
    expect(result).toBe('2026-01-26T12:30:00.000Z');
  });

  it('should handle different time zones correctly', () => {
    // For UTC-5
    const input = new Date('2026-01-26T07:00:00-05:00'); 
    const result = getUtcStringDate(input);
    expect(result).toBe('2026-01-26T12:00:00.000Z');
  });

  it('should include milliseconds in the output', () => {
    const input = new Date('2026-01-26T12:34:56.789Z');
    const result = getUtcStringDate(input);
    expect(result).toBe('2026-01-26T12:34:56.789Z');
  });

  it('should return consistent results for repeated calls', () => {
    const fixedDate = '2026-01-26T10:00:00Z';
    mockDate.set({ isoDate: fixedDate });

    const firstCall = getUtcStringDate();
    const secondCall = getUtcStringDate();
    expect(firstCall).toBe(secondCall);
  });
});


describe('setupMockDate', () => {
  let mockDate: MockDateSetup;

  beforeEach(() => {
    mockDate = setupMockDate();
  });

  afterEach(() => {
    mockDate.reset();
  });

  it('sets isoDate only', () => {
    mockDate.set({ isoDate: '2026-01-26T12:00:00Z' });
    expect(getUtcStringDate()).toBe('2026-01-26T12:00:00.000Z');
  });

  it('sets offset only', () => {
  mockDate.set({ offset: 5 });
  const now = new Date('2026-01-26T12:00:00');
  expect(now).toBeInstanceOf(Date); 
});

  it('sets neither isoDate nor offset', () => {
    mockDate.set({});
    const now = new Date();
    expect(now).toBeInstanceOf(Date);
  });
});

