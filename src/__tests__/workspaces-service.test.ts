import KeeperClient from '../index';
import { Workspace } from '../models/workspace';

let keeperClient: KeeperClient;
let workspaces: Workspace[] = [];
let originalNumberOfWorkspaces: number = 0;

describe('Workspaces Service Test', () => {
  beforeAll(() => {
    keeperClient = new KeeperClient('orans', process.env.TOKEN!);
  });

  test('KeeperClient', async () => {
    expect(keeperClient).toBeDefined();
  }, 10000);

  test('Get Workspaces', async () => {
    workspaces = await keeperClient.workspaces.list();
    originalNumberOfWorkspaces = workspaces.length;
  }, 10000);
});
