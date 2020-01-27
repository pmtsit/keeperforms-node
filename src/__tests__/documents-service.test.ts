import KeeperClient from '../index';
import { Project } from '../models/project';
import { Document } from '../models/document';
import { Template } from '../models/template';
import { Workspace } from '../models/workspace';

let originalNumberOfDocuments = 0;
let documents: Document[] = [];
let selectedWorkspace: Workspace | null = null;
let selectedProject: Project | null = null;
let selectedTemplate: Template | null = null;
let createdDocument: Document | null = null;

let keeperClient: KeeperClient;

describe('Documents Service Tests', () => {
  beforeAll(async () => {
    keeperClient = new KeeperClient('orans', process.env.TOKEN!);
    const firstWorkspace = await keeperClient.workspaces.list(undefined, 1);

    selectedWorkspace = firstWorkspace.length === 1 ? firstWorkspace[0] : null;

    if (selectedWorkspace) {
      keeperClient.setWorkspace(selectedWorkspace!.id);
    }

    const firstProject = await keeperClient.projects.list(undefined, 1);

    selectedProject = firstProject.length === 1 ? firstProject[0] : null;

    const firstTemplate = await keeperClient.templates.list(undefined, 1);

    selectedTemplate = firstTemplate.length === 1 ? firstTemplate[0] : null;
  });

  test('KeeperClient', async () => {
    expect(keeperClient).toBeDefined();
  }, 10000);

  test('Selected Project should be defined', async () => {
    expect(selectedProject).toBeDefined();
  }, 10000);

  test('Get documents', async () => {
    if (!selectedProject) {
      throw new Error('cannot run test - selectedProject is null');
    } else {
      documents = await keeperClient.documents.list();
      originalNumberOfDocuments = documents.length;
    }
  }, 10000);

  test('Create document', async () => {
    if (!selectedProject) {
      throw new Error('cannot run test - selectedProject is null');
    } else if (!selectedTemplate) {
      throw new Error('cannot run test - selectedTemplate is null');
    } else {
      console.log('template - ' + JSON.stringify(selectedTemplate));

      const dt = new Date(2020, 2, 1);

      createdDocument = await keeperClient.documents.create({
        template: selectedTemplate.id,
        project: selectedProject.id,
        date: selectedTemplate.requiresDate ? dt : undefined,
      });

      expect(createdDocument).toHaveProperty('template.name', selectedTemplate.name);
      expect(createdDocument).toHaveProperty('date');
    }
  }, 10000);

  test('Patch document', async () => {
    if (!createdDocument) {
      throw new Error('cannot run test - createdDocument is null');
    } else if (!selectedTemplate) {
      throw new Error('cannot run test - selectedTemplate is null');
    } else {
      const dt = new Date(2020, 2, 2);
      createdDocument = await keeperClient.documents.patch(createdDocument.id, {
        date: selectedTemplate!.requiresDate ? dt : undefined,
      });

      expect(createdDocument).toHaveProperty('template.name', selectedTemplate.name);
      if (selectedTemplate.requiresDate) {
        expect(createdDocument).toHaveProperty('date', dt);
      }
    }
  }, 10000);

  test('Get document again', async () => {
    if (!createdDocument) {
      throw new Error('cannot run test - createdDocument is null');
    } else if (!selectedTemplate) {
      throw new Error('cannot run test - selectedTemplate is null');
    } else {
      const document = await keeperClient.documents.get(createdDocument.id);

      expect(document).toBeDefined();
      expect(createdDocument).toHaveProperty(
        'description',
        selectedTemplate!.requiresDate ? new Date(new Date().getDate() + 1) : undefined,
      );
    }
  }, 10000);

  test('Delete document', async () => {
    if (!createdDocument) {
      throw new Error('cannot run test - createdDocument is null');
    } else {
      const deleteResult = await keeperClient.documents.delete(createdDocument.id);

      expect(deleteResult).toHaveProperty('id', createdDocument.id);
      expect(deleteResult).toHaveProperty('result', true);
    }
  }, 10000);
});
