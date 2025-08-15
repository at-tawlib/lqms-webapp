import { createTable } from "./ui-utils/create-table.js";
import { showLoading } from "./ui-utils/show-loading.js";

const sectionNameRaw = "Environmental Conditions Check";
const sectionName = sectionNameRaw.toLowerCase().replace(/ /g, "-");
const headers = [
  "#",
  "Date",
  "Unit",
  "Name of Item requested",
  "Specification",
  "Has evaluation being done (if applicable)",
  "Result of evaluation",
  "Date Supplied",
  "Supplier Details",
  "Serial Number",
  "Lot/Model",
  "Receiving verification",
  "Actions",
];

let mockData = [
  {
    id: 1,
    number: 1,
    date: "2025-01-15",
    unit: "Microbiology",
    nameOfItem: "Incubator Temperature Monitor",
    specification: "35-37°C ±0.5°C",
    hasEvaluation: "Yes",
    evaluationResult: "Within acceptable range",
    dateSupplied: "2025-01-10",
    supplierDetails: "MedEquip Ghana Ltd",
    serialNumber: "ME-2025-001",
    lotModel: "ThermoControl-5000",
    receivingVerification: "Verified by Lab Supervisor",
  },
  {
    id: 2,
    number: 2,
    date: "2025-01-18",
    unit: "Haematology",
    nameOfItem: "Humidity Controller",
    specification: "45-65% RH",
    hasEvaluation: "Yes",
    evaluationResult: "Needs calibration",
    dateSupplied: "2025-01-12",
    supplierDetails: "Scientific Equipment Co.",
    serialNumber: "SEC-2025-015",
    lotModel: "HumidPro-300",
    receivingVerification: "Pending technical review",
  },
  {
    id: 3,
    number: 3,
    date: "2025-01-20",
    unit: "Chemistry",
    nameOfItem: "Air Quality Monitor",
    specification: "Class II Biosafety Cabinet",
    hasEvaluation: "No",
    evaluationResult: "Pending installation",
    dateSupplied: "2025-01-15",
    supplierDetails: "BioSafe Systems",
    serialNumber: "BS-2025-087",
    lotModel: "AirGuard-Plus",
    receivingVerification: "Documentation complete",
  },
  {
    id: 4,
    number: 4,
    date: "2025-01-22",
    unit: "PCR Laboratory",
    nameOfItem: "Temperature Data Logger",
    specification: "2-8°C storage monitoring",
    hasEvaluation: "Yes",
    evaluationResult: "Calibrated and functional",
    dateSupplied: "2025-01-18",
    supplierDetails: "ColdChain Solutions",
    serialNumber: "CCS-2025-045",
    lotModel: "DataLog-Pro-2K",
    receivingVerification: "Verified and operational",
  },
  {
    id: 5,
    number: 5,
    date: "2025-01-25",
    unit: "Blood Bank",
    nameOfItem: "Backup Power Monitor",
    specification: "UPS 2000VA capacity",
    hasEvaluation: "Yes",
    evaluationResult: "Load tested - Passed",
    dateSupplied: "2025-01-20",
    supplierDetails: "PowerTech Ghana",
    serialNumber: "PT-2025-112",
    lotModel: "BackupMax-2K",
    receivingVerification: "Installation verified",
  },
];

let currentEditId = null;

export const renderSupplyPlanner = () => {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  setTimeout(() => {
    contentDiv.innerHTML = `
            <div class="bg-green-600 text-white p-4 rounded-t-lg mb-0">
              <h2 class="text-2xl font-bold">CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
              <p class="text-green-100 text-sm">ENVIRONMENTAL CONDITIONS CHECK-FKBTH-CL/PI/1001</p>
            </div>

            <div class="bg-white p-6 rounded-b-lg shadow-lg">
            <!-- Action Buttons -->
            <div class="flex gap-2 mb-4">
                <button
                id="addEntryBtn"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                + Add Environmental Check
                </button>
                <button
                id="exportBtn"
                class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                Export CSV
                </button>
                <button id="exportExcelBtn" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Export Excel
                </button>
                <button id="printBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Print
                </button>
            </div>

            <div
                id="table-container"
                class="overflow-x-auto rounded-lg shadow-md border border-gray-200"
            ></div>
            </div>

            <!-- Add/Edit Entry Modal -->
            <div
            id="entryModal"
            class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
            >
            <div class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="bg-blue-600 text-white p-4 rounded-t-lg">
                <h3 id="entryModalTitle" class="text-lg font-bold">Add New Environmental Check</h3>
                </div>
                <form id="entryForm" class="p-4 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                        id="date"
                        type="date"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                        <select
                        id="unit"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        >
                        <option value="">Select Unit</option>
                        <option value="Microbiology">Microbiology</option>
                        <option value="Haematology">Haematology</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="PCR Laboratory">PCR Laboratory</option>
                        <option value="Blood Bank">Blood Bank</option>
                        <option value="Immunology">Immunology</option>
                        <option value="Parasitology">Parasitology</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Date Supplied</label>
                        <input
                        type="date"
                        id="dateSupplied"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Name of Item Requested</label>
                    <input
                    type="text"
                    id="nameOfItem"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Specification</label>
                    <textarea
                    id="specification"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                    required
                    ></textarea>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Has evaluation being done?</label>
                        <select
                        id="hasEvaluation"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        >
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Pending">Pending</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Result of evaluation</label>
                        <input
                        type="text"
                        id="evaluationResult"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Supplier Details</label>
                        <input
                        type="text"
                        id="supplierDetails"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                        <input
                        type="text"
                        id="serialNumber"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Lot/Model</label>
                        <input
                        type="text"
                        id="lotModel"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Receiving Verification</label>
                        <input
                        type="text"
                        id="receivingVerification"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div class="flex gap-2 pt-4">
                    <button
                    type="submit"
                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                    Save Entry
                    </button>
                    <button
                    type="button"
                    id="cancelEntryBtn"
                    class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                    >
                    Cancel
                    </button>
                </div>
                </form>
            </div>
            </div>
    `;

    renderTable();

    // Event listeners
    document.getElementById("addEntryBtn").addEventListener("click", openAddEntryModal);
    document.getElementById("exportBtn").addEventListener("click", exportData);
    document.getElementById("exportExcelBtn").addEventListener("click", exportToExcel);
    document.getElementById("printBtn").addEventListener("click", quickPrintTable);
    document.getElementById("entryForm").addEventListener("submit", handleFormSubmit);
    document.getElementById("cancelEntryBtn").addEventListener("click", closeEntryModal);
  }, 500);
};

const renderTable = () => {
  const tableContainer = document.getElementById("table-container");

  if (mockData.length === 0) {
    tableContainer.innerHTML = `
      <div class="text-center p-8 text-gray-500">
        <p class="text-lg">No environmental check entries found.</p>
        <p class="text-sm mt-2">Add your first environmental check using the form above.</p>
      </div>
    `;
  } else {
    // Transform data to include actions and format for table
    const tableData = mockData.map((entry) => ({
      ...entry,
      "#": entry.number,
      Date: formatDate(entry.date),
      Unit: entry.unit,
      "Name of Item requested": entry.nameOfItem,
      Specification: entry.specification,
      "Has evaluation being done (if applicable)": entry.hasEvaluation,
      "Result of evaluation": entry.evaluationResult,
      "Date Supplied": formatDate(entry.dateSupplied),
      "Supplier Details": entry.supplierDetails,
      "Serial Number": entry.serialNumber,
      "Lot/Model": entry.lotModel,
      "Receiving verification": entry.receivingVerification,
      Actions: getActionButtonsHTML(entry.id),
    }));

    tableContainer.innerHTML = "";
    const table = createTable(headers, tableData);
    tableContainer.appendChild(table);

    // Apply HTML formatting after table is created
    applyTableFormatting();

    // Add event listeners for action buttons
    attachActionListeners();
  }
};

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
}

function applyTableFormatting() {
  const table = document.querySelector("#table-container table");
  if (!table) return;

  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row, index) => {
    const entry = mockData[index];
    if (!entry) return;

    const cells = row.querySelectorAll("td");

    // Format evaluation status
    if (cells[5]) {
      cells[5].innerHTML = getEvaluationBadgeHTML(entry.hasEvaluation);
    }
  });
}

const getEvaluationBadgeHTML = (status) => {
  const statusClasses = {
    Yes: "bg-green-100 text-green-800",
    No: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  return `<span class="px-2 py-1 rounded-full text-xs font-medium ${
    statusClasses[status] || "bg-gray-100 text-gray-800"
  }">${status}</span>`;
};

const getActionButtonsHTML = (id) => {
  return `
    <div class="flex gap-1">
      <button data-edit="${id}" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors">Edit</button>
      <button data-delete="${id}" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors">Delete</button>
    </div>
  `;
};

function attachActionListeners() {
  // Edit buttons
  document.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-edit"));
      openEditEntryModal(id);
    });
  });

  // Delete buttons
  document.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-delete"));
      deleteEntry(id);
    });
  });
}

function openAddEntryModal() {
  currentEditId = null;
  document.getElementById("entryModalTitle").textContent = "Add New Environmental Check";
  resetForm();
  document.getElementById("entryModal").classList.remove("hidden");
}

function openEditEntryModal(id) {
  currentEditId = id;
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  document.getElementById("entryModalTitle").textContent = "Edit Environmental Check";

  document.getElementById("date").value = entry.date;
  document.getElementById("unit").value = entry.unit;
  document.getElementById("nameOfItem").value = entry.nameOfItem;
  document.getElementById("specification").value = entry.specification;
  document.getElementById("hasEvaluation").value = entry.hasEvaluation;
  document.getElementById("evaluationResult").value = entry.evaluationResult;
  document.getElementById("dateSupplied").value = entry.dateSupplied;
  document.getElementById("supplierDetails").value = entry.supplierDetails;
  document.getElementById("serialNumber").value = entry.serialNumber;
  document.getElementById("lotModel").value = entry.lotModel;
  document.getElementById("receivingVerification").value = entry.receivingVerification;

  document.getElementById("entryModal").classList.remove("hidden");
}

function closeEntryModal() {
  document.getElementById("entryModal").classList.add("hidden");
  resetForm();
}

function resetForm() {
  document.getElementById("entryForm").reset();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    date: document.getElementById("date").value,
    unit: document.getElementById("unit").value,
    nameOfItem: document.getElementById("nameOfItem").value,
    specification: document.getElementById("specification").value,
    hasEvaluation: document.getElementById("hasEvaluation").value,
    evaluationResult: document.getElementById("evaluationResult").value,
    dateSupplied: document.getElementById("dateSupplied").value,
    supplierDetails: document.getElementById("supplierDetails").value,
    serialNumber: document.getElementById("serialNumber").value,
    lotModel: document.getElementById("lotModel").value,
    receivingVerification: document.getElementById("receivingVerification").value,
  };

  if (currentEditId) {
    // Edit existing entry
    const index = mockData.findIndex((item) => item.id === currentEditId);
    if (index !== -1) {
      mockData[index] = { ...mockData[index], ...formData };
    }
  } else {
    // Add new entry
    const maxId = mockData.length > 0 ? Math.max(...mockData.map((item) => item.id)) : 0;
    const maxNumber = mockData.length > 0 ? Math.max(...mockData.map((item) => item.number)) : 0;
    const newEntry = {
      id: maxId + 1,
      number: maxNumber + 1,
      ...formData,
    };
    mockData.push(newEntry);
  }

  closeEntryModal();
  renderTable();
}

function deleteEntry(id) {
  if (confirm("Are you sure you want to delete this environmental check entry?")) {
    const index = mockData.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData.splice(index, 1);
      // Renumber remaining entries
      mockData.forEach((item, idx) => {
        item.number = idx + 1;
      });
      renderTable();
    }
  }
}

function exportData() {
  const csvHeaders = [
    "#",
    "Date",
    "Unit",
    "Name of Item requested",
    "Specification",
    "Has evaluation being done",
    "Result of evaluation",
    "Date Supplied",
    "Supplier Details",
    "Serial Number",
    "Lot/Model",
    "Receiving verification",
  ];

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += csvHeaders.join(",") + "\n";

  mockData.forEach((entry) => {
    const row = [
      `"${entry.number}"`,
      `"${formatDate(entry.date)}"`,
      `"${entry.unit}"`,
      `"${entry.nameOfItem}"`,
      `"${entry.specification}"`,
      `"${entry.hasEvaluation}"`,
      `"${entry.evaluationResult}"`,
      `"${formatDate(entry.dateSupplied)}"`,
      `"${entry.supplierDetails}"`,
      `"${entry.serialNumber}"`,
      `"${entry.lotModel}"`,
      `"${entry.receivingVerification}"`,
    ];
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "environmental_conditions_check_FKBTH_CL_PI_1001.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportToExcel() {
  // Check if XLSX library is available
  if (typeof XLSX === "undefined") {
    alert("Excel export requires XLSX library. Please include it in your HTML.");
    return;
  }

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();

  // Prepare data for Excel (clean format without HTML)
  const excelData = mockData.map((entry) => ({
    "#": entry.number,
    Date: formatDate(entry.date),
    Unit: entry.unit,
    "Name of Item requested": entry.nameOfItem,
    Specification: entry.specification,
    "Has evaluation being done": entry.hasEvaluation,
    "Result of evaluation": entry.evaluationResult,
    "Date Supplied": formatDate(entry.dateSupplied),
    "Supplier Details": entry.supplierDetails,
    "Serial Number": entry.serialNumber,
    "Lot/Model": entry.lotModel,
    "Receiving verification": entry.receivingVerification,
  }));

  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const colWidths = [
    { wch: 5 }, // #
    { wch: 12 }, // Date
    { wch: 15 }, // Unit
    { wch: 25 }, // Name of Item
    { wch: 20 }, // Specification
    { wch: 15 }, // Has evaluation
    { wch: 20 }, // Result of evaluation
    { wch: 12 }, // Date Supplied
    { wch: 20 }, // Supplier Details
    { wch: 15 }, // Serial Number
    { wch: 15 }, // Lot/Model
    { wch: 20 }, // Receiving verification
  ];
  ws["!cols"] = colWidths;

  // Add title rows
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL"],
      ["ENVIRONMENTAL CONDITIONS CHECK-FKBTH-CL/PI/1001"],
      [""], // Empty row
    ],
    { origin: "A1" }
  );

  // Shift data down to accommodate title
  XLSX.utils.sheet_add_json(ws, excelData, { origin: "A4" });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Environmental Conditions");

  // Generate filename with current date
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const filename = `Environmental_Conditions_Check_FKBTH_CL_PI_1001_${dateStr}.xlsx`;

  // Save file
  XLSX.writeFile(wb, filename);
}

function quickPrintTable() {
  // Get the current table element
  const tableContainer = document.getElementById("table-container");
  const table = tableContainer.querySelector("table");

  if (!table) {
    alert("No data to print");
    return;
  }

  // Clone table and remove action buttons column for printing
  const printTable = table.cloneNode(true);
  const actionCells = printTable.querySelectorAll("th:last-child, td:last-child");
  actionCells.forEach((cell) => cell.remove());

  // Create print content with current table
  const printContent = `
    <html>
    <head>
      <title>Environmental Conditions Check</title>
      <style>
        @media print {
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 4px; text-align: left; font-size: 7px; }
          th { background-color: #f0f0f0; font-weight: bold; }
          .status-badge { padding: 2px 4px; border-radius: 8px; font-size: 6px; }
        }
        @page { size: A4 landscape; margin: 0.3in; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
        <h3>ENVIRONMENTAL CONDITIONS CHECK-FKBTH-CL/PI/1001</h3>
      </div>
      ${printTable.outerHTML}
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
}
