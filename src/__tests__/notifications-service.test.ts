import KeeperClient from '../index';
import { Workspace } from '../models/workspace';
import { Notification } from '../models/notification';

let originalNumberOfNotifications = 0;
let notifications: Notification[] = [];
let selectedWorkspace: Workspace | null = null;
let selectedNotification: Notification | null = null;
// let notificationName: string;

let keeperClient: KeeperClient;

describe('Notifications Service Tests', () => {
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

  test('Get notifications', async () => {
    if (!selectedWorkspace) {
      throw new Error('cannot run test - selectedWorkspace is null');
    } else {
      notifications = await keeperClient.notifications.list();
      originalNumberOfNotifications = notifications.length;
      selectedNotification = notifications.length === 1 ? notifications[0] : null;
    }
  }, 10000);

  test('Mark notification as read', async () => {
    if (!selectedNotification) {
      throw new Error('cannot run test - selectedNotification is null');
    } else {
      const notificationResult = await keeperClient.notifications.markRead(selectedNotification.id);

      console.log(notificationResult);

      expect(notificationResult).toBeDefined();
      // expect(notificationResult).toHaveProperty('name', notificationName);
      expect(notificationResult).toHaveProperty('isRead', true);
    }
  }, 10000);

  test('Get notification again', async () => {
    if (!selectedNotification) {
      throw new Error('cannot run test - selectedNotification is null');
    } else {
      const notification = await keeperClient.notifications.get(selectedNotification.id);

      expect(notification).toBeDefined();
      expect(notification).toHaveProperty('isRead', true);
    }
  }, 10000);
});
