import KeeperClient from '../index';
import { Workspace } from '../models/workspace';
import { ItemCategory } from '../models/item-category';

let originalNumberOfItemCategories = 0;
let itemCategories: ItemCategory[] = [];
let selectedWorkspace: Workspace | null = null;
let createdItemCategory: ItemCategory | null = null;
let itemCategoryName: string;

let keeperClient: KeeperClient;

describe('ItemCategories Service Tests', () => {
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

  test('Get itemCategories', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      itemCategories = await keeperClient.itemCategories.list();
      originalNumberOfItemCategories = itemCategories.length;
    }
  }, 10000);

  test('Create itemCategory', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      itemCategoryName =
        'itemCategory' +
        Math.floor((Math.random() + 1) * 1000)
          .toString()
          .padStart(4, '0');
      createdItemCategory = await keeperClient.itemCategories.create({
        name: itemCategoryName,
        workspace: selectedWorkspace.id,
        description: 'A itemCategory created from the test suite',
      });

      expect(createdItemCategory).toHaveProperty('name', itemCategoryName);
      expect(createdItemCategory).toHaveProperty('description', 'A itemCategory created from the test suite');
    }
  }, 10000);

  test('Patch itemCategory', async () => {
    if (!createdItemCategory) {
      throw new Error('cannot run test - createdItemCategory is null');
    } else {
      createdItemCategory = await keeperClient.itemCategories.patch(createdItemCategory.id, {
        description: 'Neo-Description from the test-suite',
      });

      expect(createdItemCategory).toHaveProperty('name', itemCategoryName);
      expect(createdItemCategory).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Get itemCategory again', async () => {
    if (!createdItemCategory) {
      throw new Error('cannot run test - createdItemCategory is null');
    } else {
      const itemCategory = await keeperClient.itemCategories.get(createdItemCategory.id);

      expect(itemCategory).toBeDefined();
      expect(createdItemCategory).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Delete itemCategory', async () => {
    if (!createdItemCategory) {
      throw new Error('cannot run test - createdItemCategory is null');
    } else {
      const deleteResult = await keeperClient.itemCategories.delete(createdItemCategory.id);

      expect(deleteResult).toHaveProperty('id', createdItemCategory.id);
      expect(deleteResult).toHaveProperty('result', true);
    }
  }, 10000);
});
