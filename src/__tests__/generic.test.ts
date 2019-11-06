import KeeperClient from '../index';

let keeperClient: KeeperClient;

describe('Generic Tests', () => {
  beforeAll(() => {
    keeperClient = new KeeperClient('orans', process.env.TOKEN!);
  });

  test('KeeperClient', async () => {
    expect(keeperClient).toBeDefined();
  }, 10000);
});
