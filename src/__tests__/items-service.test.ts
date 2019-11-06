import KeeperClient from '../index';
import { Workspace } from '../models/workspace';
import { Item } from '../models/item';
import { ItemCategory } from '../models/item-category';

let originalNumberOfItems = 0;
let items: Item[] = [];
let selectedWorkspace: Workspace | null = null;
let selectedItemCategory: ItemCategory | null = null;
let createdItem: Item | null = null;
let itemName: string;

let keeperClient: KeeperClient;

describe('Items Service Tests', () => {
  beforeAll(async () => {
    keeperClient = new KeeperClient('orans', process.env.TOKEN!);
    const firstWorkspace = await keeperClient.workspaces.list(undefined, 1);

    selectedWorkspace = firstWorkspace.length === 1 ? firstWorkspace[0] : null;

    if (selectedWorkspace) {
      keeperClient.setWorkspace(selectedWorkspace!.id);
    }

    const firstItemCategory = await keeperClient.itemCategories.list(undefined, 1);

    selectedItemCategory = firstItemCategory.length === 1 ? firstItemCategory[0] : null;
  });

  test('KeeperClient', async () => {
    expect(keeperClient).toBeDefined();
  }, 10000);

  test('Selected Workspace should be defined', async () => {
    expect(selectedWorkspace).toBeDefined();
  }, 10000);

  test('Get items', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      items = await keeperClient.items.list();
      originalNumberOfItems = items.length;
    }
  }, 10000);

  test('Create item', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else if (!selectedItemCategory) {
      throw new Error('cannot run test - selectedItemCategory is null');
    } else {
      itemName =
        'item' +
        Math.floor((Math.random() + 1) * 1000)
          .toString()
          .padStart(4, '0');
      createdItem = await keeperClient.items.create({
        name: itemName,
        workspace: selectedWorkspace.id,
        itemCategory: selectedItemCategory.id,
        description: 'A item created from the test suite',
      });

      expect(createdItem).toHaveProperty('name', itemName);
      expect(createdItem).toHaveProperty('description', 'A item created from the test suite');
    }
  }, 10000);

  test('Patch item', async () => {
    if (!createdItem) {
      throw new Error('cannot run test - createdItem is null');
    } else {
      createdItem = await keeperClient.items.patch(createdItem.id, {
        description: 'Neo-Description from the test-suite',
      });

      expect(createdItem).toHaveProperty('name', itemName);
      expect(createdItem).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Get item again', async () => {
    if (!createdItem) {
      throw new Error('cannot run test - createdItem is null');
    } else {
      const item = await keeperClient.items.get(createdItem.id);

      expect(item).toBeDefined();
      expect(createdItem).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Delete item', async () => {
    if (!createdItem) {
      throw new Error('cannot run test - createdItem is null');
    } else {
      const deleteResult = await keeperClient.items.delete(createdItem.id);

      expect(deleteResult).toHaveProperty('id', createdItem.id);
      expect(deleteResult).toHaveProperty('result', true);
    }
  }, 10000);
});
