import KeeperClient from '../index';
import { Workspace } from '../models/workspace';
import { Stream } from '../models/stream';

let originalNumberOfStreams = 0;
let streams: Stream[] = [];
let selectedWorkspace: Workspace | null = null;
let createdStream: Stream | null = null;
let streamName: string;

let keeperClient: KeeperClient;

describe('Streams Service Tests', () => {
  beforeAll(async () => {
    keeperClient = new KeeperClient('orans', process.env.TOKEN!);
    const firstWorkspace = await keeperClient.workspaces.list(undefined, 1);

    selectedWorkspace = firstWorkspace.length === 1 ? firstWorkspace[0] : null;

    if (selectedWorkspace) {
      keeperClient.setWorkspace(selectedWorkspace!.id);
    }
  });

  test('KeeperClient', async () => {
    expect(keeperClient).toBeDefined();
  }, 10000);

  test('Selected Workspace should be defined', async () => {
    expect(selectedWorkspace).toBeDefined();
  }, 10000);

  test('Get streams', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      streams = await keeperClient.streams.list();
      originalNumberOfStreams = streams.length;
    }
  }, 10000);

  test('Create stream', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      streamName =
        'stream' +
        Math.floor((Math.random() + 1) * 1000)
          .toString()
          .padStart(4, '0');
      createdStream = await keeperClient.streams.create({
        name: streamName,
        workspace: selectedWorkspace.id,
        description: 'A stream created from the test suite',
      });

      expect(createdStream).toHaveProperty('name', streamName);
      expect(createdStream).toHaveProperty('description', 'A stream created from the test suite');
    }
  }, 10000);

  test('Patch stream', async () => {
    if (!createdStream) {
      throw new Error('cannot run test - createdStream is null');
    } else {
      createdStream = await keeperClient.streams.patch(createdStream.id, {
        description: 'Neo-Description from the test-suite',
      });

      expect(createdStream).toHaveProperty('name', streamName);
      expect(createdStream).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Get stream again', async () => {
    if (!createdStream) {
      throw new Error('cannot run test - createdStream is null');
    } else {
      const stream = await keeperClient.streams.get(createdStream.id);

      expect(stream).toBeDefined();
      expect(createdStream).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Delete stream', async () => {
    if (!createdStream) {
      throw new Error('cannot run test - createdStream is null');
    } else {
      const deleteResult = await keeperClient.streams.delete(createdStream.id);

      expect(deleteResult).toHaveProperty('id', createdStream.id);
      expect(deleteResult).toHaveProperty('result', true);
    }
  }, 10000);
});
