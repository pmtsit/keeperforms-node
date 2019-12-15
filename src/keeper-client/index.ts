import axios, { AxiosInstance } from 'axios';
import createDebug from 'debug';
import ClientsService from '../services/clients';
import ProjectsService from '../services/projects';
import WorkspacesService from '../services/workspaces';
import SuppliersService from '../services/suppliers';
import TemplatesService from '../services/templates';
import QuantitiesService from '../services/quantities';
import DocumentsService from '../services/documents';
import ItemCategoriesService from '../services/item-categories';
import ItemsService from '../services/items';
import TasksService from '../services/tasks';
import NotificationsService from '../services/notifications';
import PostsService from '../services/posts';
import BlocksService from '../services/blocks';
import PlacesService from '../services/places';
import AlertsService from '../services/alerts';
import ReportsService from '../services/reports';
import StreamsService from '../services/streams';

export default class KeeperClient {
  public readonly projects: ProjectsService;
  public readonly clients: ClientsService;
  public readonly workspaces: WorkspacesService;
  public readonly suppliers: SuppliersService;
  public readonly templates: TemplatesService;
  public readonly streams: StreamsService;
  public readonly quantities: QuantitiesService;
  public readonly documents: DocumentsService;
  public readonly itemCategories: ItemCategoriesService;
  public readonly items: ItemsService;
  public readonly tasks: TasksService;
  public readonly notifications: NotificationsService;
  public readonly posts: PostsService;
  public readonly blocks: BlocksService;
  public readonly places: PlacesService;
  public readonly alerts: AlertsService;
  public readonly reports: ReportsService;
  private readonly debug = createDebug('keeper-client');
  private readonly axios?: AxiosInstance;
  private readonly username: string;
  private apiKey: string;
  private workspace: string;

  constructor(username: string, apiKey: string, workspace: string = '') {
    this.username = username;
    this.apiKey = apiKey;
    this.workspace = workspace;
    const headers =
      this.workspace !== ''
        ? {
            Accept: 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'x-workspace': this.workspace,
          }
        : {
            Accept: 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          };

    this.axios = axios.create({
      baseURL: 'https://api4dev.keeperforms.com/v1',
      headers,
      timeout: 5000,
    });

    this.projects = new ProjectsService(this.axios);
    this.clients = new ClientsService(this.axios);
    this.workspaces = new WorkspacesService(this.axios);
    this.suppliers = new SuppliersService(this.axios);
    this.templates = new TemplatesService(this.axios);
    this.streams = new StreamsService(this.axios);
    this.quantities = new QuantitiesService(this.axios);
    this.documents = new DocumentsService(this.axios);
    this.itemCategories = new ItemCategoriesService(this.axios);
    this.items = new ItemsService(this.axios);
    this.tasks = new TasksService(this.axios);
    this.notifications = new NotificationsService(this.axios);
    this.posts = new PostsService(this.axios);
    this.blocks = new BlocksService(this.axios);
    this.places = new PlacesService(this.axios);
    this.alerts = new AlertsService(this.axios);
    this.reports = new ReportsService(this.axios);
  }

  public setBaseUrl(baseUrl: string): void {
    if (this.axios) {
      this.axios.defaults.baseURL = baseUrl;
    }
  }

  public setWorkspace(workspace: string): void {
    this.workspace = workspace;
    if (this.axios) {
      this.axios.defaults.headers['x-workspace'] = this.workspace;
    }
  }

  public setToken(token: string): void {
    this.apiKey = token;
    if (this.axios) {
      this.axios.defaults.headers.Authorization = `Bearer ${this.apiKey}`;
    }
  }
}
