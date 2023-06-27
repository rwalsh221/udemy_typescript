/// <reference path="base_component.ts"/>

namespace App {
  // PROECTINPUT CLASS
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
}
