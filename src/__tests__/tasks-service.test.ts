import KeeperClient from '../index';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { Workspace } from '../models/workspace';

let originalNumberOfTasks = 0;
let tasks: Task[] = [];
let selectedWorkspace: Workspace | null = null;
let selectedProject: Project | null = null;
let createdTask: Task | null = null;
let taskName: string;

let keeperClient: KeeperClient;

describe('Tasks Service Tests', () => {
  beforeAll(async () => {
    keeperClient = new KeeperClient('orans', process.env.TOKEN!);
    const firstWorkspace = await keeperClient.workspaces.list(undefined, 1);

    selectedWorkspace = firstWorkspace.length === 1 ? firstWorkspace[0] : null;

    if (!selectedWorkspace) {
      throw new Error('cannot run test suite - selectedWorkspace is null');
    } else {
      keeperClient.setWorkspace(selectedWorkspace.id);
    }

    const firstProject = await keeperClient.projects.list(undefined, 1);

    selectedProject = firstProject.length === 1 ? firstProject[0] : null;
  });

  test('KeeperClient', async () => {
    expect(keeperClient).toBeDefined();
  }, 10000);

  test('Selected Project should be defined', async () => {
    expect(selectedProject).toBeDefined();
  }, 10000);

  test('Get tasks', async () => {
    if (!selectedProject) {
      throw new Error('cannot run test - selectedProject is null');
    } else {
      tasks = await keeperClient.tasks.list();
      originalNumberOfTasks = tasks.length;
    }
  }, 10000);

  test('Create task', async () => {
    if (!selectedProject) {
      throw new Error('cannot run test - selectedProject is null');
    } else {
      taskName =
        'task' +
        Math.floor((Math.random() + 1) * 1000)
          .toString()
          .padStart(4, '0');
      createdTask = await keeperClient.tasks.create({
        name: taskName,
        project: selectedProject.id,
        description: 'A task created from the test suite',
      });

      expect(createdTask).toHaveProperty('name', taskName);
      expect(createdTask).toHaveProperty('description', 'A task created from the test suite');
    }
  }, 10000);

  test('Patch task', async () => {
    if (!createdTask) {
      throw new Error('cannot run test - createdTask is null');
    } else {
      createdTask = await keeperClient.tasks.patch(createdTask.id, {
        description: 'Neo-Description from the test-suite',
      });

      expect(createdTask).toHaveProperty('name', taskName);
      expect(createdTask).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Get task again', async () => {
    if (!createdTask) {
      throw new Error('cannot run test - createdTask is null');
    } else {
      const task = await keeperClient.tasks.get(createdTask.id);

      expect(task).toBeDefined();
      expect(createdTask).toHaveProperty('description', 'Neo-Description from the test-suite');
    }
  }, 10000);

  test('Delete task', async () => {
    if (!createdTask) {
      throw new Error('cannot run test - createdTask is null');
    } else {
      const deleteResult = await keeperClient.tasks.delete(createdTask.id);

      expect(deleteResult).toHaveProperty('id', createdTask.id);
      expect(deleteResult).toHaveProperty('result', true);
    }
  }, 10000);
});
