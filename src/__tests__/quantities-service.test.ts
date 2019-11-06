import KeeperClient from '../index';
import { Workspace, Supplier } from '../models/workspace';
import { Quantity } from '../models/quantity';
import { DocumentBlock } from '../models/document';
import { Item } from '../models/item';

let originalNumberOfQuantities = 0;
let quantities: Quantity[] = [];
let selectedWorkspace: Workspace | null = null;
let selectedSupplier: Supplier | null = null;
let selectedDocumentBlock: DocumentBlock | null = null;
let selectedItem: Item | null = null;
let createdQuantity: Quantity | null = null;

let keeperClient: KeeperClient;

describe('Quantities Service Tests', () => {
  beforeAll(async () => {
    keeperClient = new KeeperClient('orans', process.env.TOKEN!);
    const firstWorkspace = await keeperClient.workspaces.list(undefined, 1);

    selectedWorkspace = firstWorkspace.length === 1 ? firstWorkspace[0] : null;

    if (selectedWorkspace) {
      keeperClient.setWorkspace(selectedWorkspace!.id);
    }

    const firstSupplier = await keeperClient.suppliers.list(undefined, 1);
    selectedSupplier = firstSupplier.length === 1 ? firstSupplier[0] : null;

    const firstDocument = await keeperClient.documents.list(undefined, 1);
    const selectedDocument = firstDocument.length === 1 ? firstDocument[0] : null;

    if (selectedDocument) {
      selectedDocumentBlock = selectedDocument.documentBlocks.length > 0 ? selectedDocument.documentBlocks[0] : null;
    }

    const firstItem = await keeperClient.items.list(undefined, 1);
    selectedItem = firstItem.length === 1 ? firstItem[0] : null;
  });

  test('KeeperClient', async () => {
    expect(keeperClient).toBeDefined();
  }, 10000);

  test('Selected Workspace should be defined', async () => {
    expect(selectedWorkspace).toBeDefined();
  }, 10000);

  test('Get quantities', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      quantities = await keeperClient.quantities.list();
      originalNumberOfQuantities = quantities.length;
    }
  }, 10000);

  test('Create quantity', async () => {
    if (!selectedDocumentBlock) {
      throw new Error('cannot run test - selectedDocumentBlock is null');
    } else if (!selectedSupplier) {
      throw new Error('cannot run test - selectedSupplier is null');
    } else if (!selectedItem) {
      throw new Error('cannot run test - selectedItem is null');
    } else {
      createdQuantity = await keeperClient.quantities.create({
        documentBlock: selectedDocumentBlock.id,
        supplier: selectedSupplier.id,
        item: selectedItem.id,
        value: 0.0,
      });

      expect(createdQuantity).toBeDefined();
      expect(createdQuantity).toHaveProperty('value', 0.0);
    }
  }, 10000);

  test('Patch quantity', async () => {
    if (!createdQuantity) {
      throw new Error('cannot run test - createdQuantity is null');
    } else {
      createdQuantity = await keeperClient.quantities.patch(createdQuantity.id, {
        value: 1.0,
      });

      expect(createdQuantity).toBeDefined();
      expect(createdQuantity).toHaveProperty('value', 1.0);
    }
  }, 10000);

  test('Get quantity again', async () => {
    if (!createdQuantity) {
      throw new Error('cannot run test - createdQuantity is null');
    } else {
      const quantity = await keeperClient.quantities.get(createdQuantity.id);

      expect(quantity).toBeDefined();
      expect(createdQuantity).toHaveProperty('value', 1.0);
    }
  }, 10000);

  test('Delete quantity', async () => {
    if (!createdQuantity) {
      throw new Error('cannot run test - createdQuantity is null');
    } else {
      const deleteResult = await keeperClient.quantities.delete(createdQuantity.id);

      expect(deleteResult).toHaveProperty('id', createdQuantity.id);
      expect(deleteResult).toHaveProperty('result', true);
    }
  }, 10000);
});
