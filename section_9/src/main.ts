// PROJECT TYPE

enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// PROJECT STATE MANAGEMENT
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

// Validation
interface Validatable {
  value: string;
  required?: boolean;
}

interface ValidatableString extends Validatable {
  type: 'string';
  minLength?: number;
  maxLength?: number;
}

interface ValidatableNumber extends Validatable {
  type: 'number';
  min?: number;
  max?: number;
}

function validate(validatableInput: ValidatableString | ValidatableNumber) {
  let isValid = true;
  console.log(validatableInput);

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.trim().length !== 0;
    if (isValid === false) {
      return isValid;
    }
  }

  if (validatableInput.type === 'string') {
    if (
      validatableInput.minLength != null &&
      validatableInput.value.trim().length !== 0
    ) {
      isValid =
        isValid && validatableInput.value.length >= validatableInput.minLength;
    }

    if (
      validatableInput.maxLength != null &&
      validatableInput.value.trim().length !== 0
    ) {
      isValid =
        isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
  }

  if (validatableInput.type === 'number') {
    console.log(validatableInput.value);
    if (validatableInput.min != null) {
      isValid =
        isValid && Number(validatableInput.value) >= validatableInput.min;
    }

    if (validatableInput.max != null) {
      isValid =
        isValid && Number(validatableInput.value) <= validatableInput.max;
    }
  }

  console.log(isValid);
  return isValid;
}

// autobind decorator

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// COMPONENT BASE CLASS

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtStart ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

// PROJECT ITEM CLASS

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  private project: Project;

  get persons() {
    console.log(this.project.people);
    if (this.project.people === 1) {
      return '1 person';
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  configure(): void {}

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = `${this.persons} assigned`;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

// PROJECT LIST CLASS

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  configure() {
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((project) => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.Active;
        } else {
          return project.status === ProjectStatus.Finished;
        }
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector(
      'h2'
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;
    listEl.innerHTML = '';
    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
    }
  }
}

// PROECTINPUT CLASS
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }

  renderContent() {}

  private getUserInputs(): string[] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: ValidatableString = {
      value: enteredTitle,
      required: true,
      type: 'string',
    };

    const descriptionValidatable: ValidatableString = {
      value: enteredDescription,
      type: 'string',
      minLength: 5,
    };

    const peopleValidatable: ValidatableNumber = {
      value: enteredPeople,
      required: true,
      type: 'number',
      min: 1,
      max: 5,
    };

    this.clearInputs(
      this.titleInputElement,
      this.descriptionInputElement,
      this.peopleInputElement
    );

    if (
      validate(titleValidatable) &&
      validate(descriptionValidatable) &&
      validate(peopleValidatable)
    ) {
      return [enteredTitle, enteredDescription, enteredPeople];
    } else {
      alert('invalid input please try again');
    }
  }

  private clearInputs(...inputs: HTMLInputElement[]) {
    inputs.forEach((el) => {
      el.value = '';
    });
  }

  private inputValidation(
    ...inputs: (string | number)[]
  ): (string | number)[] | void {
    inputs.every((el) => {
      if (typeof el === 'number') {
        if (el <= 0) {
          return alert('invalid input please try again');
        }
      } else if (el.trim().length === 0) {
        return alert('invalid input please try again');
      }
      // console.log(inputs);
    });
    return inputs;
  }

  private submitHandler(event: Event) {
    event.preventDefault();

    const userInputs = this.getUserInputs();

    if (Array.isArray(userInputs)) {
      const [title, description, people] = userInputs;
      projectState.addProject(title, description, +people);
    }
  }
}

const projInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
