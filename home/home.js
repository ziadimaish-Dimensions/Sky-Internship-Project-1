document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("employee-container");
  const searchBar = document.getElementById("searchBar");
  let employeesData = [];

  fetch("../profiles/employee_card.html")
    .then((response) => response.text())
    .then((template) => {
      fetch("../data/employees.json")
        .then((response) => response.json())
        .then((data) => {
          employeesData = data.employees;
          displayEmployees(employeesData.slice(0, 3), template);

          searchBar.addEventListener("input", (e) => {
            const searchText = e.target.value.toLowerCase();
            const filteredEmployees = employeesData.filter((employee) =>
              employee.name.toLowerCase().includes(searchText)
            );
            displayEmployees(filteredEmployees.slice(0, 3), template);
          });
        });
    });

  function displayEmployees(employees, template) {
    container.innerHTML = "";
    employees.forEach((employee) => {
      let card = template
        .replace("{{image}}", employee.image)
        .replace("{{name}}", employee.name)
        .replace("{{submittedOn}}", employee.submittedOn)
        .replace("{{duration}}", employee.duration)
        .replace("{{salary}}", employee.salary);
      container.innerHTML += `<div class="col-md-4">${card}</div>`;
    });
  }
});
