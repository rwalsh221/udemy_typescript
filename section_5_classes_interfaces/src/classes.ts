class Department {
    // constructor(n: string) {
    //   this.name = n;
    // }
    // private id: string;
    // private name: string;
    constructor(protected readonly id: string, private name: string) {}
    private employees: string[] = [];
  
    describe() {
      console.log(`Department: ${this.id} ${this.name}`);
    }
  
    thisLog() {
      console.log(this);
    }
  
    addEmployee(employee: string) {
      this.employees.push(employee);
    }
  
    printEmployeeInformation() {
      console.log(this.employees.length);
      console.log(this.employees);
    }
  
    static createEmployee(name: string) {
      return { name: name };
    }
  }
  
  class ITDepartment extends Department {
    constructor(id: string, admins: string[]) {
      super(id, 'IT');
      this.admins = admins;
    }
  
    admins: string[];
  }
  
  class AccountingDepartment extends Department {
    constructor(id: string, private reports: string[]) {
      super(id, 'Accounting');
      this.lastReport = reports[0];
    }
  
    private lastReport: string;
  
    get getLastReport() {
      if (this.lastReport) {
        return this.lastReport;
      }
      throw new Error('no report found');
    }
  
    set setLastReport(value: string) {
      this.addReport(value);
    }
  
    addReport(report: string) {
      this.reports.push(report);
      this.lastReport = report;
      return this.reports;
    }
  }
  
  const emp1 = Department.createEmployee('max');
  console.log(emp1);
  
  const accounting2 = new AccountingDepartment('d3', []);
  const accounting = new Department('d1', 'Accounting');
  console.log(accounting);
  accounting.describe();
  accounting.thisLog();
  
  accounting.addEmployee('bill');
  accounting.addEmployee('bob');
  accounting.printEmployeeInformation();
  
  console.log(accounting2.addReport('something went wrong'));
  console.log(accounting2);
  
  const it = new ITDepartment('d2', ['john', 'phil']);
  it.describe();
  it.thisLog();
  
  it.addEmployee('bill');
  it.addEmployee('bob');
  it.printEmployeeInformation();
  