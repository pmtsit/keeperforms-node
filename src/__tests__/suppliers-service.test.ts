import KeeperClient from '../index';
import { Supplier, Workspace } from '../models/workspace';

let originalNumberOfSuppliers = 0;
let suppliers: Supplier[] = [];
let selectedWorkspace: Workspace | null = null;
let createdSupplier: Supplier | null = null;
let supplierName: string;

let keeperClient: KeeperClient;

describe('Suppliers Service Tests', () => {
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

  test('Get suppliers', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      suppliers = await keeperClient.suppliers.list();
      originalNumberOfSuppliers = suppliers.length;
    }
  }, 10000);

  test('Create supplier', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      supplierName =
        'supplier' +
        Math.floor((Math.random() + 1) * 1000)
          .toString()
          .padStart(4, '0');
      createdSupplier = await keeperClient.suppliers.create({
        name: supplierName,
        workspace: selectedWorkspace.id,
        description: 'A supplier created from the test suite',
      });

      expect(createdSupplier).toHaveProperty('name', supplierName);
      expect(createdSupplier).toHaveProperty('description', 'A supplier created from the test suite');
    }
  }, 10000);

  test('Patch supplier', async () => {
    if (!createdSupplier) {
      throw new Error('cannot run test - createdSupplier is null');
    } else {
      createdSupplier = await keeperClient.suppliers.patch(createdSupplier.id, {
        description: 'Neo-Description from the test-suite',
      });

      expect(createdSupplier).toHaveProperty('name', supplierName);
      expect(createdSupplier).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Get supplier again', async () => {
    if (!createdSupplier) {
      throw new Error('cannot run test - createdSupplier is null');
    } else {
      const supplier = await keeperClient.suppliers.get(createdSupplier.id);

      expect(supplier).toBeDefined();
      expect(createdSupplier).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Delete supplier', async () => {
    if (!createdSupplier) {
      throw new Error('cannot run test - createdSupplier is null');
    } else {
      const deleteResult = await keeperClient.suppliers.delete(createdSupplier.id);

      expect(deleteResult).toHaveProperty('id', createdSupplier.id);
      expect(deleteResult).toHaveProperty('result', true);
    }
  }, 10000);
});
