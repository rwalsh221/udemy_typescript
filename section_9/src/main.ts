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

// PROECTINPUT CLASS
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;

    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = 'user-input';

    this.titleInputElement = this.formElement.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.formElement.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.formElement.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
  }

  private configure() {
    this.formElement.addEventListener('submit', this.submitHandler.bind(this));
  }

  private getUserInputs(): (string | number)[] | void {
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
    }
  }
}

// PROJECT LIST CLASS

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;

    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${type}-projects`;
    this.attach();
    this.renderContent();
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector(
      'h2'
    )!.textContent = `${this.type.toUpperCase()} projects`;
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

const projInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
