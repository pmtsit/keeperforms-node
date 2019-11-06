import KeeperClient from '../index';
import { Project, Workspace } from '../models/project';

let originalNumberOfProjects = 0;
let projects: Project[] = [];
let selectedWorkspace: Workspace | null = null;
let createdProject: Project | null = null;
let projectName: string;

let keeperClient: KeeperClient;

describe('Projects Service Tests', () => {
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

  test('Get projects', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      projects = await keeperClient.projects.list();
      originalNumberOfProjects = projects.length;
    }
  }, 10000);

  test('Create project', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      projectName =
        'project' +
        Math.floor((Math.random() + 1) * 1000)
          .toString()
          .padStart(4, '0');
      createdProject = await keeperClient.projects.create({
        name: projectName,
        workspace: selectedWorkspace.id,
        description: 'A project created from the test suite',
      });

      expect(createdProject).toHaveProperty('name', projectName);
      expect(createdProject).toHaveProperty('workspace.id', selectedWorkspace.id);
      expect(createdProject).toHaveProperty('description', 'A project created from the test suite');
    }
  }, 10000);

  test('Patch project', async () => {
    if (!createdProject) {
      throw new Error('cannot run test - createdProject is null');
    } else {
      createdProject = await keeperClient.projects.patch(createdProject.id, {
        description: 'Neo-Description from the test-suite',
      });

      expect(createdProject).toHaveProperty('name', projectName);
      expect(createdProject).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Get project again', async () => {
    if (!createdProject) {
      throw new Error('cannot run test - createdProject is null');
    } else {
      const project = await keeperClient.projects.get(createdProject.id);

      expect(project).toBeDefined();
      expect(createdProject).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Delete project', async () => {
    if (!createdProject) {
      throw new Error('cannot run test - createdProject is null');
    } else {
      const deleteResult = await keeperClient.projects.delete(createdProject.id);

      expect(deleteResult).toHaveProperty('id', createdProject.id);
      expect(deleteResult).toHaveProperty('result', true);
    }
  }, 10000);
});
