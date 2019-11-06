import KeeperClient from '../index';
import { Workspace } from '../models/workspace';
import { Template } from '../models/template';

let originalNumberOfTemplates = 0;
let templates: Template[] = [];
let selectedWorkspace: Workspace | null = null;
let createdTemplate: Template | null = null;
let templateName: string;

let keeperClient: KeeperClient;

describe('Templates Service Tests', () => {
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

  test('Get templates', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      templates = await keeperClient.templates.list();
      originalNumberOfTemplates = templates.length;
    }
  }, 10000);

  test('Create template', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      templateName =
        'template' +
        Math.floor((Math.random() + 1) * 1000)
          .toString()
          .padStart(4, '0');
      createdTemplate = await keeperClient.templates.create({
        name: templateName,
        workspace: selectedWorkspace.id,
        description: 'A template created from the test suite',
      });

      expect(createdTemplate).toHaveProperty('name', templateName);
      expect(createdTemplate).toHaveProperty('description', 'A template created from the test suite');
    }
  }, 10000);

  test('Patch template', async () => {
    if (!createdTemplate) {
      throw new Error('cannot run test - createdTemplate is null');
    } else {
      createdTemplate = await keeperClient.templates.patch(createdTemplate.id, {
        description: 'Neo-Description from the test-suite',
      });

      expect(createdTemplate).toHaveProperty('name', templateName);
      expect(createdTemplate).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Get template again', async () => {
    if (!createdTemplate) {
      throw new Error('cannot run test - createdTemplate is null');
    } else {
      const template = await keeperClient.templates.get(createdTemplate.id);

      expect(template).toBeDefined();
      expect(createdTemplate).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Delete template', async () => {
    if (!createdTemplate) {
      throw new Error('cannot run test - createdTemplate is null');
    } else {
      const deleteResult = await keeperClient.templates.delete(createdTemplate.id);

      expect(deleteResult).toHaveProperty('id', createdTemplate.id);
      expect(deleteResult).toHaveProperty('result', true);
    }
  }, 10000);
});
