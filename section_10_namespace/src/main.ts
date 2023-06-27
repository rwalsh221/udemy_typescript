/// <reference path="models/drag_drop_interfaces.ts" />
/// <reference path="models/project_model.ts" />
/// <reference path="state/project_state.ts" />
/// <reference path="utilities/validation.ts" />
/// <reference path="decorators/autobind_decorator.ts" />
/// <reference path="components/project_list.ts" />
/// <reference path="components/project_input.ts" />
/// <reference path="components/project_item.ts" />

namespace App {
  const projInput = new ProjectInput();
  const activeProjectList = new ProjectList('active');
  const finishedProjectList = new ProjectList('finished');
  console.log('section10');
}
