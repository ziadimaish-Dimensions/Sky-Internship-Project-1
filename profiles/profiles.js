document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("employee-container");
  const cardsPerPage = 15;
  let currentPage = 1;
  let employeesData = [];

  fetch("employee_card.html")
    .then((response) => response.text())
    .then((template) => {
      fetch("../data/employees.json")
        .then((response) => response.json())
        .then((data) => {
          employeesData = data.employees;
          displayPage(currentPage, template);
          setupPagination(employeesData.length, cardsPerPage, template);
        });
    });

  function displayPage(page, template) {
    container.innerHTML = "";
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const employeesToDisplay = employeesData.slice(start, end);

    employeesToDisplay.forEach((employee) => {
      let card = template
        .replace("{{image}}", employee.image)
        .replace("{{name}}", employee.name)
        .replace("{{submittedOn}}", employee.submittedOn)
        .replace("{{duration}}", employee.duration)
        .replace("{{salary}}", employee.salary);
      container.innerHTML += `<div class="col-md-4">${card}</div>`;
    });
  }

  function setupPagination(totalEmployees, cardsPerPage, template) {
    const totalPages = Math.ceil(totalEmployees / cardsPerPage);
    const paginationContainer = document.querySelector(
      ".pagination-container ul"
    );

    paginationContainer.innerHTML = "";

    const prevPageButton = document.createElement("li");
    prevPageButton.classList.add("page-item", "disabled");
    prevPageButton.innerHTML = `<a class="page-link" href="#">«</a>`;
    paginationContainer.appendChild(prevPageButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("li");
      pageButton.classList.add("page-item");
      if (i === currentPage) pageButton.classList.add("active");
      pageButton.innerHTML = `<a class="page-link" href="#">${i}</a>`;

      pageButton.addEventListener("click", (event) => {
        event.preventDefault();
        currentPage = i;
        displayPage(currentPage, template);
        updatePaginationControls(totalPages);
      });
      paginationContainer.appendChild(pageButton);
    }

    const nextPageButton = document.createElement("li");
    nextPageButton.classList.add("page-item");
    nextPageButton.innerHTML = `<a class="page-link" href="#">»</a>`;
    paginationContainer.appendChild(nextPageButton);

    nextPageButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage, template);
        updatePaginationControls(totalPages);
      }
    });

    prevPageButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage, template);
        updatePaginationControls(totalPages);
      }
    });

    updatePaginationControls(totalPages);
  }

  function updatePaginationControls(totalPages) {
    const prevPageButton = document.querySelector(
      ".pagination .page-item:first-child"
    );
    const nextPageButton = document.querySelector(
      ".pagination .page-item:last-child"
    );

    prevPageButton.classList.toggle("disabled", currentPage === 1);
    nextPageButton.classList.toggle("disabled", currentPage === totalPages);

    const paginationButtons = document.querySelectorAll(
      ".pagination .page-item"
    );
    paginationButtons.forEach((button, index) => {
      button.classList.toggle("active", index === currentPage);
    });
  }
});
