function downloadDataset() {
    var fiscalYear = document.getElementById("fiscal-year").value;

    var formattedFiscalYear = fiscalYear.replace(/\s+/g, '');
    var fileName = "FY" + formattedFiscalYear + "_Dataset.xlsx";
    var filePath = "/payment-accuracy-temp-staging/assets/files/" + fileName;

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
