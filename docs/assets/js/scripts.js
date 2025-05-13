const agenciesPerPage = 10;

function downloadDataset() {
    var fiscalYear = document.getElementById("fiscal-year").value;

    var formattedFiscalYear = fiscalYear.replace(/\s+/g, '');
    var fileName = "FY" + formattedFiscalYear + "_Dataset.xlsx";
    console.log("fileName");
    var filePath = "/assets/files/" + fileName;

    // Create a temporary link to trigger the download
    var a = document.createElement("a");
    a.href = filePath;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function unclampExecutiveSummary() {
    var element = document.getElementById('executive-summary-text');
    element.classList.add('expanded');

    var button = document.getElementById('show-full-executive-summary');
    button.style.display = 'none';
}

document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', () => {
        const icon = button.querySelector('.toggle-icon');
        const isCollapsed = icon.getAttribute('src').includes('expand.svg');

        icon.setAttribute('src', isCollapsed ? '/assets/img/collapse.svg' : '/assets/img/expand.svg');
        icon.setAttribute('alt', isCollapsed ? 'Collapse' : 'Expand');
        button.setAttribute('aria-label', isCollapsed ? 'Collapse Agency' : 'Expand Agency');
        button.setAttribute('aria-expanded', isCollapsed);
  
        const agencyRow = button.closest('tr');
        let nextRow = agencyRow.nextElementSibling;

        while (nextRow && nextRow.classList.contains('program-row')) {
        nextRow.classList.toggle('hidden');
        nextRow = nextRow.nextElementSibling;
        }
    });
});

let currentPage = 1;

function updatePaginationButtons(totalAgencies) {
    const totalPages = Math.ceil(totalAgencies / agenciesPerPage);
    const container = document.querySelector('#pagination-container');
    container.innerHTML = '';

    const prev = document.createElement('li');
    prev.className = `usa-pagination__item usa-pagination__arrow ${currentPage === 1 ? 'hidden' : ''}`;
    prev.innerHTML = '<button id="pagination-prev" class="usa-pagination__link border-0 bg-white" aria-label="Previous page">&lt; Previous</button>';
    container.appendChild(prev);
  
    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'usa-pagination__item';
        li.innerHTML = `
            <button class="usa-pagination__button ${i === currentPage ? 'usa-current' : 'usa-not-current bg-white'}" data-page="${i}">
                ${i}
            </button>`;
        container.appendChild(li);
    }
  
    // Next button
    const next = document.createElement('li');
    next.className = `usa-pagination__item usa-pagination__arrow ${currentPage === totalPages ? 'hidden' : ''}`;
    next.innerHTML = '<button id="pagination-next" class="usa-pagination__link border-0 bg-white" aria-label="Next page">Next &gt;</button>';
    container.appendChild(next);
  
    document.querySelector('#pagination-prev')?.addEventListener('click', e => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            paginateAgencies();
        }
    });
  
    document.querySelector('#pagination-next')?.addEventListener('click', e => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            paginateAgencies();
        }
    });
  
    container.querySelectorAll('.usa-pagination__button[data-page]').forEach(button => {
        button.addEventListener('click', () => {
            currentPage = parseInt(button.dataset.page);
            paginateAgencies();
        });
    });
}

function paginateAgencies() {
    const allAgencyRows = document.querySelectorAll('.agency-row');
    const allProgramRows = document.querySelectorAll('.program-row');
    const totalAgencies = allAgencyRows.length;

    // Hide all agency and program rows
    allAgencyRows.forEach(row => row.classList.add('hidden'));
    allProgramRows.forEach(row => row.classList.add('hidden'));

    // Show only agencies for current page
    const start = (currentPage - 1) * agenciesPerPage;
    const end = start + agenciesPerPage;

    for (let i = start; i < end && i < totalAgencies; i++) {
        allAgencyRows[i].classList.remove('hidden');
    }

    // Update pagination UI
    updatePaginationButtons(totalAgencies);
}

document.addEventListener('DOMContentLoaded', () => {
    paginateAgencies();
});
