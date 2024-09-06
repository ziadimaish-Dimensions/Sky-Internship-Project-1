document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("employee-container");

  fetch("employee_card.html")
    .then((response) => response.text())
    .then((template) => {
      fetch("../data/employees.json")
        .then((response) => response.json())
        .then((data) => {
          data.employees.forEach((employee) => {
            let card = template
              .replace("{{image}}", employee.image)
              .replace("{{name}}", employee.name)
              .replace("{{submittedOn}}", employee.submittedOn)
              .replace("{{duration}}", employee.duration)
              .replace("{{salary}}", employee.salary);
            container.innerHTML += card;
          });
        });
    });
});
