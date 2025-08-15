import { createTable } from "./ui-utils/create-table.js";
import { showLoading } from "./ui-utils/show-loading.js";

const sectionNameRaw = "SERVICE INTERRUPTION RECORDS-FKBTH-CL/CS/0703";
const sectionName = sectionNameRaw.toLowerCase().replace(/ /g, "-");
const headers = [
  "#",
  "Date",
  "Time of Service Interruption",
  "Service Affected",
  "Reason for Interruption",
  "Duration of Interruption",
  "Has Information of Interruption Communicated to Stakeholders",
  "Status",
  "Actions",
];

let mockData = [
  {
    id: 1,
    "#": "SI-001",
    Date: "2025-01-15",
    "Time of Service Interruption": "09:30:00",
    "Service Affected": "Hematology Testing",
    "Reason for Interruption": "Hematology analyzer malfunction - calibration error",
    "Duration of Interruption": "2 hours 30 minutes",
    "Has Information of Interruption Communicated to Stakeholders": "Yes",
    Status: "Resolved",
    "Stakeholders Notified": "Lab Manager, Clinicians, Nursing Units",
    "Resolution Details": "Recalibrated analyzer, ran quality controls, service restored",
    "Reported By": "Mr. Joseph Boateng",
    "Resolved By": "Dr. Kwame Asante",
  },
  {
    id: 2,
    "#": "SI-002",
    Date: "2025-01-20",
    "Time of Service Interruption": "14:15:00",
    "Service Affected": "Chemistry Panel Testing",
    "Reason for Interruption": "Power outage affecting chemistry department",
    "Duration of Interruption": "45 minutes",
    "Has Information of Interruption Communicated to Stakeholders": "Yes",
    Status: "Resolved",
    "Stakeholders Notified": "All Clinical Departments, Hospital Administration",
    "Resolution Details": "Power restored, equipment restarted and verified operational",
    "Reported By": "Mrs. Akosua Mensah",
    "Resolved By": "Facilities Management Team",
  },
  {
    id: 3,
    "#": "SI-003",
    Date: "2025-02-02",
    "Time of Service Interruption": "11:00:00",
    "Service Affected": "Microbiology Culture Processing",
    "Reason for Interruption": "Incubator temperature control failure",
    "Duration of Interruption": "4 hours 15 minutes",
    "Has Information of Interruption Communicated to Stakeholders": "Yes",
    Status: "Resolved",
    "Stakeholders Notified": "Infectious Disease Team, ICU, Emergency Department",
    "Resolution Details": "Backup incubator used, temperature control unit replaced",
    "Reported By": "Ms. Ama Darko",
    "Resolved By": "Biomedical Engineering",
  },
  {
    id: 4,
    "#": "SI-004",
    Date: "2025-02-10",
    "Time of Service Interruption": "08:45:00",
    "Service Affected": "Phlebotomy Services",
    "Reason for Interruption": "Staff shortage due to emergency situation",
    "Duration of Interruption": "1 hour 20 minutes",
    "Has Information of Interruption Communicated to Stakeholders": "Yes",
    Status: "Resolved",
    "Stakeholders Notified": "Nursing Units, Outpatient Clinics",
    "Resolution Details": "Additional staff called in, normal operations resumed",
    "Reported By": "Mr. Kofi Amponsah",
    "Resolved By": "Dr. Grace Owusu",
  },
  {
    id: 5,
    "#": "SI-005",
    Date: "2025-02-12",
    "Time of Service Interruption": "16:20:00",
    "Service Affected": "Blood Bank Services",
    "Reason for Interruption": "Network connectivity issues affecting blood bank software",
    "Duration of Interruption": "Ongoing",
    "Has Information of Interruption Communicated to Stakeholders": "Yes",
    Status: "In Progress",
    "Stakeholders Notified": "Surgery Department, Emergency Department, ICU",
    "Resolution Details":
      "IT team working on network connectivity, manual backup procedures activated",
    "Reported By": "Dr. Mary Osei",
    "Resolved By": "IT Department",
  },
  {
    id: 6,
    "#": "SI-006",
    Date: "2025-02-05",
    "Time of Service Interruption": "13:30:00",
    "Service Affected": "Molecular Diagnostics",
    "Reason for Interruption": "PCR machine thermal block failure",
    "Duration of Interruption": "6 hours 45 minutes",
    "Has Information of Interruption Communicated to Stakeholders": "Yes",
    Status: "Resolved",
    "Stakeholders Notified": "Infectious Disease, Oncology, Emergency Department",
    "Resolution Details": "Thermal block replaced, instrument calibrated and verified",
    "Reported By": "Mrs. Akosua Mensah",
    "Resolved By": "Service Engineer + Lab Staff",
  },
];

let currentEditId = null;

export const renderServiceInterruptions = () => {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  setTimeout(() => {
    document.getElementById("sectionTitle").textContent = sectionNameRaw;

    contentDiv.innerHTML = `
        <div>
          <!-- Action Buttons -->
          <div class="flex gap-2 mb-4">
            <button
              id="addInterruptionBtn"
              class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              + Add Service Interruption
            </button>
            <button
              id="exportBtn"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Export CSV
            </button>
            <button
              id="exportExcelBtn"
              class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Export Excel
            </button>
            <button
              id="printBtn"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Print Interruption Log
            </button>
            <button
              id="interruptionSummaryBtn"
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Interruption Summary
            </button>
          </div>

          <div
            id="table-container"
            class="overflow-x-auto rounded-lg shadow-md border border-gray-200"
          ></div>
        </div>

        <!-- Add/Edit Service Interruption Modal -->
        <div
          id="interruptionModal"
          class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
          style="overflow-y: auto"
        >
          <div class="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div class="fixed bg-blue-600 text-white p-4 rounded-t-lg max-w-lg w-full h-12">
              <h3 id="interruptionModalTitle" class="text-lg font-bold">Add New Service Interruption</h3>
            </div>
            <form id="interruptionForm" class="p-4 mt-12 space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Interruption ID</label>
                  <input
                    type="text"
                    id="interruptionId"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="e.g., SI-001"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    id="interruptionDate"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Time of Service Interruption</label
                  >
                  <input
                    type="time"
                    id="interruptionTime"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Service Affected</label>
                  <select
                    id="serviceAffected"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="Hematology Testing">Hematology Testing</option>
                    <option value="Chemistry Panel Testing">Chemistry Panel Testing</option>
                    <option value="Microbiology Culture Processing">Microbiology Culture Processing</option>
                    <option value="Blood Bank Services">Blood Bank Services</option>
                    <option value="Molecular Diagnostics">Molecular Diagnostics</option>
                    <option value="Phlebotomy Services">Phlebotomy Services</option>
                    <option value="Immunology Testing">Immunology Testing</option>
                    <option value="Histopathology Services">Histopathology Services</option>
                    <option value="Point of Care Testing">Point of Care Testing</option>
                    <option value="Sample Processing">Sample Processing</option>
                    <option value="Result Reporting">Result Reporting</option>
                    <option value="Quality Control">Quality Control</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Reason for Interruption</label>
                <textarea
                  id="reasonForInterruption"
                  rows="3"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Describe the cause of the service interruption in detail..."
                  required
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Duration of Interruption</label
                  >
                  <input
                    type="text"
                    id="durationOfInterruption"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="e.g., 2 hours 30 minutes or Ongoing"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    id="status"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Reported">Reported</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Under Investigation">Under Investigation</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Partially Resolved">Partially Resolved</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Stakeholders Communicated</label
                >
                <div class="flex gap-4">
                  <label class="flex items-center">
                    <input type="radio" name="stakeholdersCommunicated" value="Yes" class="mr-2" required />
                    Yes
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="stakeholdersCommunicated" value="No" class="mr-2" required />
                    No
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      name="stakeholdersCommunicated"
                      value="Partial"
                      class="mr-2"
                      required
                    />
                    Partial
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Stakeholders Notified (specify)</label
                >
                <textarea
                  id="stakeholdersNotified"
                  rows="2"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="List specific stakeholders who were notified (e.g., Lab Manager, Clinicians, Nursing Units...)"
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Reported By</label>
                  <input
                    type="text"
                    id="reportedBy"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="e.g., Mr. Joseph Boateng"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Resolved By</label>
                  <input
                    type="text"
                    id="resolvedBy"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="e.g., Dr. Kwame Asante"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Resolution Details</label>
                <textarea
                  id="resolutionDetails"
                  rows="3"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Describe the steps taken to resolve the interruption..."
                ></textarea>
              </div>

              <div class="flex gap-2 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Save Service Interruption
                </button>
                <button
                  type="button"
                  id="cancelInterruptionBtn"
                  class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Service Interruption Summary Modal -->
        <div
          id="interruptionSummaryModal"
          class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
          style="overflow-y: auto"
        >
          <div class="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div class="fixed bg-blue-600 text-white p-4 rounded-t-lg max-w-lg w-full h-12">
              <h3 class="text-lg font-bold">Service Interruption Summary Report</h3>
            </div>
            <div id="interruptionSummaryContent" class="p-4 mt-12"></div>
            <div class="p-4 border-t">
              <button
                id="closeSummaryBtn"
                class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <!-- View Service Interruption Details Modal -->
        <div
          id="viewInterruptionModal"
          class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
          style="overflow-y: auto"
        >
          <div class="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div class="fixed bg-blue-600 text-white p-4 rounded-t-lg max-w-lg w-full h-12">
              <h3 class="text-lg font-bold">Service Interruption Details</h3>
            </div>
            <div id="viewInterruptionContent" class="p-4 mt-12"></div>
            <div class="p-4 border-t">
              <button
                id="closeViewBtn"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
    `;

    renderTable();

    // Event listeners
    document
      .getElementById("addInterruptionBtn")
      .addEventListener("click", openAddInterruptionModal);
    document.getElementById("exportBtn").addEventListener("click", exportData);
    document.getElementById("exportExcelBtn").addEventListener("click", exportToExcel);
    document.getElementById("printBtn").addEventListener("click", quickPrintTable);
    document
      .getElementById("interruptionSummaryBtn")
      .addEventListener("click", showInterruptionSummary);
    document.getElementById("interruptionForm").addEventListener("submit", handleFormSubmit);
    document
      .getElementById("cancelInterruptionBtn")
      .addEventListener("click", closeInterruptionModal);
    document.getElementById("closeSummaryBtn").addEventListener("click", closeInterruptionSummary);
    document.getElementById("closeViewBtn").addEventListener("click", closeViewModal);
  }, 500);
};

const renderTable = () => {
  const tableContainer = document.getElementById("table-container");

  if (mockData.length === 0) {
    tableContainer.innerHTML = `
      <div class="text-center p-8 text-gray-500">
        <p class="text-lg">No service interruptions recorded.</p>
        <p class="text-sm mt-2">Add your first service interruption record using the form above.</p>
      </div>
    `;
  } else {
    // Transform data to include actions and format for table
    const tableData = mockData.map((entry, index) => ({
      "#": entry["#"],
      Date: entry["Date"],
      "Time of Service Interruption": entry["Time of Service Interruption"],
      "Service Affected": entry["Service Affected"],
      "Reason for Interruption": entry["Reason for Interruption"],
      "Duration of Interruption": entry["Duration of Interruption"],
      "Has Information of Interruption Communicated to Stakeholders":
        entry["Has Information of Interruption Communicated to Stakeholders"],
      Status: entry["Status"],
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

function applyTableFormatting() {
  const table = document.querySelector("#table-container table");
  if (!table) return;

  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row, index) => {
    const entry = mockData[index];
    if (!entry) return;

    const cells = row.querySelectorAll("td");

    // Format Status column (index 7)
    if (cells[7]) {
      cells[7].innerHTML = getStatusBadgeHTML(entry.Status);
    }

    // Format Communication column (index 6)
    if (cells[6]) {
      cells[6].innerHTML = getCommunicationBadgeHTML(
        entry["Has Information of Interruption Communicated to Stakeholders"]
      );
    }

    // Format Date with urgency indicator (index 1)
    if (cells[1] && entry["Date"]) {
      const interruptionDate = new Date(entry["Date"]);
      const today = new Date();
      const daysDiff = Math.floor((today - interruptionDate) / (1000 * 60 * 60 * 24));

      let className = "bg-gray-100 text-gray-800";
      if (daysDiff <= 1) className = "bg-red-100 text-red-800"; // Recent/Today
      else if (daysDiff <= 7) className = "bg-orange-100 text-orange-800"; // This week
      else if (daysDiff <= 30) className = "bg-yellow-100 text-yellow-800"; // This month

      cells[1].innerHTML = `<span class="px-2 py-1 rounded text-xs ${className}">${entry["Date"]}</span>`;
    }

    // Format Duration with severity indicator (index 5)
    if (cells[5]) {
      cells[5].innerHTML = getDurationBadgeHTML(entry["Duration of Interruption"]);
    }

    // Truncate long reasons for better table display (index 4)
    if (cells[4] && entry["Reason for Interruption"]) {
      const reason = entry["Reason for Interruption"];
      const truncated = reason.length > 50 ? reason.substring(0, 50) + "..." : reason;
      cells[4].innerHTML = `<span title="${reason}">${truncated}</span>`;
    }
  });
}

const getStatusBadgeHTML = (status) => {
  const statusClasses = {
    Reported: "bg-blue-100 text-blue-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    "Under Investigation": "bg-orange-100 text-orange-800",
    Resolved: "bg-green-100 text-green-800",
    "Partially Resolved": "bg-purple-100 text-purple-800",
  };

  return `<span class="px-2 py-1 rounded-full text-xs font-medium ${
    statusClasses[status] || "bg-gray-100 text-gray-800"
  }">${status}</span>`;
};

const getCommunicationBadgeHTML = (communicated) => {
  const communicationClasses = {
    Yes: "bg-green-100 text-green-800",
    No: "bg-red-100 text-red-800",
    Partial: "bg-yellow-100 text-yellow-800",
  };

  return `<span class="px-2 py-1 rounded-full text-xs font-medium ${
    communicationClasses[communicated] || "bg-gray-100 text-gray-800"
  }">${communicated}</span>`;
};

const getDurationBadgeHTML = (duration) => {
  let className = "bg-green-100 text-green-800"; // Default for short durations

  if (duration.toLowerCase().includes("ongoing")) {
    className = "bg-red-100 text-red-800";
  } else if (duration.includes("hour")) {
    const hours = parseInt(duration.match(/(\d+)\s*hour/)?.[1] || "0");
    if (hours >= 6) className = "bg-red-100 text-red-800";
    else if (hours >= 2) className = "bg-orange-100 text-orange-800";
    else if (hours >= 1) className = "bg-yellow-100 text-yellow-800";
  } else if (duration.includes("minute")) {
    const minutes = parseInt(duration.match(/(\d+)\s*minute/)?.[1] || "0");
    if (minutes >= 120) className = "bg-orange-100 text-orange-800";
    else if (minutes >= 60) className = "bg-yellow-100 text-yellow-800";
  }

  return `<span class="px-2 py-1 rounded text-xs ${className}">${duration}</span>`;
};

const getActionButtonsHTML = (id) => {
  return `
    <div class="flex gap-1">
      <button data-edit="${id}" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors">Edit</button>
      <button data-delete="${id}" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors">Delete</button>
      <button data-view="${id}" class="bg-teal-500 hover:bg-teal-600 text-white px-2 py-1 rounded text-xs transition-colors">View</button>
    </div>
  `;
};

function attachActionListeners() {
  // Edit buttons
  document.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-edit"));
      openEditInterruptionModal(id);
    });
  });

  // Delete buttons
  document.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-delete"));
      deleteInterruption(id);
    });
  });

  // View buttons
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-view"));
      viewInterruption(id);
    });
  });
}

function openAddInterruptionModal() {
  currentEditId = null;
  document.getElementById("interruptionModalTitle").textContent = "Add New Service Interruption";
  resetForm();
  // Auto-generate next ID
  const maxId =
    mockData.length > 0
      ? Math.max(...mockData.map((item) => parseInt(item["#"].split("-")[1])))
      : 0;
  document.getElementById("interruptionId").value = `SI-${String(maxId + 1).padStart(3, "0")}`;
  document.getElementById("interruptionModal").classList.remove("hidden");
}

function openEditInterruptionModal(id) {
  currentEditId = id;
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  document.getElementById("interruptionModalTitle").textContent = "Edit Service Interruption";

  document.getElementById("interruptionId").value = entry["#"];
  document.getElementById("interruptionDate").value = entry["Date"];
  document.getElementById("interruptionTime").value = entry["Time of Service Interruption"];
  document.getElementById("serviceAffected").value = entry["Service Affected"];
  document.getElementById("reasonForInterruption").value = entry["Reason for Interruption"];
  document.getElementById("durationOfInterruption").value = entry["Duration of Interruption"];
  document.getElementById("status").value = entry["Status"];
  document.querySelector(
    `input[name="stakeholdersCommunicated"][value="${entry["Has Information of Interruption Communicated to Stakeholders"]}"]`
  ).checked = true;
  document.getElementById("stakeholdersNotified").value = entry["Stakeholders Notified"] || "";
  document.getElementById("reportedBy").value = entry["Reported By"];
  document.getElementById("resolvedBy").value = entry["Resolved By"] || "";
  document.getElementById("resolutionDetails").value = entry["Resolution Details"] || "";

  document.getElementById("interruptionModal").classList.remove("hidden");
}

function closeInterruptionModal() {
  document.getElementById("interruptionModal").classList.add("hidden");
  resetForm();
}

function closeViewModal() {
  document.getElementById("viewInterruptionModal").classList.remove("hidden");
}

function resetForm() {
  document.getElementById("interruptionForm").reset();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const stakeholdersCommunicated = document.querySelector(
    'input[name="stakeholdersCommunicated"]:checked'
  ).value;

  const formData = {
    "#": document.getElementById("interruptionId").value,
    Date: document.getElementById("interruptionDate").value,
    "Time of Service Interruption": document.getElementById("interruptionTime").value,
    "Service Affected": document.getElementById("serviceAffected").value,
    "Reason for Interruption": document.getElementById("reasonForInterruption").value,
    "Duration of Interruption": document.getElementById("durationOfInterruption").value,
    "Has Information of Interruption Communicated to Stakeholders": stakeholdersCommunicated,
    Status: document.getElementById("status").value,
    "Stakeholders Notified": document.getElementById("stakeholdersNotified").value,
    "Reported By": document.getElementById("reportedBy").value,
    "Resolved By": document.getElementById("resolvedBy").value,
    "Resolution Details": document.getElementById("resolutionDetails").value,
  };

  if (currentEditId) {
    // Edit existing interruption
    const index = mockData.findIndex((item) => item.id === currentEditId);
    if (index !== -1) {
      mockData[index] = { ...mockData[index], ...formData };
    }
  } else {
    // Add new interruption
    const maxId = mockData.length > 0 ? Math.max(...mockData.map((item) => item.id)) : 0;
    const newEntry = {
      id: maxId + 1,
      ...formData,
    };
    mockData.push(newEntry);
  }

  closeInterruptionModal();
  renderTable();
}

function deleteInterruption(id) {
  if (confirm("Are you sure you want to delete this service interruption record?")) {
    const index = mockData.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData.splice(index, 1);
      renderTable();
    }
  }
}

function viewInterruption(id) {
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  const viewContent = `
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Interruption ID</label>
          <p class="mt-1 text-sm text-gray-900 font-medium">${entry["#"]}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Date</label>
          <p class="mt-1 text-sm text-gray-900">${entry["Date"]}</p>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Time of Interruption</label>
          <p class="mt-1 text-sm text-gray-900">${entry["Time of Service Interruption"]}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Service Affected</label>
          <p class="mt-1 text-sm text-gray-900 font-medium">${entry["Service Affected"]}</p>
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Reason for Interruption</label>
        <p class="mt-1 text-sm text-gray-900">${entry["Reason for Interruption"]}</p>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Duration</label>
          <p class="mt-1">${getDurationBadgeHTML(entry["Duration of Interruption"])}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <p class="mt-1">${getStatusBadgeHTML(entry.Status)}</p>
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Stakeholders Communicated</label>
        <p class="mt-1">${getCommunicationBadgeHTML(
          entry["Has Information of Interruption Communicated to Stakeholders"]
        )}</p>
      </div>
      
      ${
        entry["Stakeholders Notified"]
          ? `
      <div>
        <label class="block text-sm font-medium text-gray-700">Stakeholders Notified</label>
        <p class="mt-1 text-sm text-gray-900">${entry["Stakeholders Notified"]}</p>
      </div>
      `
          : ""
      }
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Reported By</label>
          <p class="mt-1 text-sm text-gray-900">${entry["Reported By"]}</p>
        </div>
        ${
          entry["Resolved By"]
            ? `
        <div>
          <label class="block text-sm font-medium text-gray-700">Resolved By</label>
          <p class="mt-1 text-sm text-gray-900">${entry["Resolved By"]}</p>
        </div>
        `
            : ""
        }
      </div>
      
      ${
        entry["Resolution Details"]
          ? `
      <div>
        <label class="block text-sm font-medium text-gray-700">Resolution Details</label>
        <p class="mt-1 text-sm text-gray-900">${entry["Resolution Details"]}</p>
      </div>
      `
          : ""
      }
    </div>
  `;

  document.getElementById("viewInterruptionContent").innerHTML = viewContent;
  document.getElementById("viewInterruptionModal").classList.remove("hidden");
}

function showInterruptionSummary() {
  const statusCounts = mockData.reduce((acc, interruption) => {
    acc[interruption.Status] = (acc[interruption.Status] || 0) + 1;
    return acc;
  }, {});

  const serviceCounts = mockData.reduce((acc, interruption) => {
    acc[interruption["Service Affected"]] = (acc[interruption["Service Affected"]] || 0) + 1;
    return acc;
  }, {});

  const communicationCounts = mockData.reduce((acc, interruption) => {
    acc[interruption["Has Information of Interruption Communicated to Stakeholders"]] =
      (acc[interruption["Has Information of Interruption Communicated to Stakeholders"]] || 0) + 1;
    return acc;
  }, {});

  // Get unresolved interruptions
  const unresolvedInterruptions = mockData.filter(
    (interruption) =>
      interruption.Status !== "Resolved" && interruption.Status !== "Partially Resolved"
  );

  const ongoingInterruptions = mockData.filter((interruption) =>
    interruption["Duration of Interruption"].toLowerCase().includes("ongoing")
  );

  // Get recent interruptions (last 7 days)
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentInterruptions = mockData.filter((interruption) => {
    const interruptionDate = new Date(interruption["Date"]);
    return interruptionDate >= sevenDaysAgo;
  });

  // Calculate average resolution time (simplified)
  const resolvedInterruptions = mockData.filter(
    (interruption) => interruption.Status === "Resolved"
  );

  // Get high-impact interruptions (duration > 2 hours)
  const highImpactInterruptions = mockData.filter((interruption) => {
    const duration = interruption["Duration of Interruption"];
    return duration.includes("hour") && parseInt(duration.match(/(\d+)\s*hour/)?.[1] || "0") >= 2;
  });

  const summaryContent = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Status Overview -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-3">Status Overview</h4>
        <div class="space-y-2">
          ${Object.entries(statusCounts)
            .map(
              ([status, count]) => `
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span class="text-sm">${status}:</span>
              <span class="font-medium">${count}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <!-- Service Distribution -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-3">Most Affected Services</h4>
        <div class="space-y-2 max-h-48 overflow-y-auto">
          ${Object.entries(serviceCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 8)
            .map(
              ([service, count]) => `
            <div class="flex justify-between items-center p-2 ${
              count >= 2 ? "bg-red-50 text-red-800" : "bg-gray-50"
            } rounded">
              <span class="text-xs">${service}:</span>
              <span class="font-medium">${count}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <!-- Communication Status -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-3">Communication Status</h4>
        <div class="space-y-2">
          ${Object.entries(communicationCounts)
            .map(
              ([status, count]) => `
            <div class="flex justify-between items-center p-2 ${
              status === "Yes"
                ? "bg-green-50 text-green-800"
                : status === "No"
                ? "bg-red-50 text-red-800"
                : "bg-yellow-50 text-yellow-800"
            } rounded">
              <span class="text-sm">Communicated - ${status}:</span>
              <span class="font-medium">${count}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <!-- Key Metrics -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-3">Key Metrics</h4>
        <div class="space-y-2">
          <div class="flex justify-between items-center p-2 bg-blue-50 text-blue-800 rounded">
            <span class="text-sm">Total Interruptions:</span>
            <span class="font-medium">${mockData.length}</span>
          </div>
          <div class="flex justify-between items-center p-2 ${
            unresolvedInterruptions.length > 0
              ? "bg-red-50 text-red-800"
              : "bg-green-50 text-green-800"
          } rounded">
            <span class="text-sm">Unresolved:</span>
            <span class="font-medium">${unresolvedInterruptions.length}</span>
          </div>
          <div class="flex justify-between items-center p-2 ${
            ongoingInterruptions.length > 0
              ? "bg-red-50 text-red-800"
              : "bg-green-50 text-green-800"
          } rounded">
            <span class="text-sm">Currently Ongoing:</span>
            <span class="font-medium">${ongoingInterruptions.length}</span>
          </div>
          <div class="flex justify-between items-center p-2 ${
            recentInterruptions.length > 3 ? "bg-orange-50 text-orange-800" : "bg-gray-50"
          } rounded">
            <span class="text-sm">Last 7 Days:</span>
            <span class="font-medium">${recentInterruptions.length}</span>
          </div>
          <div class="flex justify-between items-center p-2 ${
            highImpactInterruptions.length > 0 ? "bg-orange-50 text-orange-800" : "bg-gray-50"
          } rounded">
            <span class="text-sm">High Impact (>2hrs):</span>
            <span class="font-medium">${highImpactInterruptions.length}</span>
          </div>
          <div class="flex justify-between items-center p-2 bg-green-50 text-green-800 rounded">
            <span class="text-sm">Resolved:</span>
            <span class="font-medium">${resolvedInterruptions.length}</span>
          </div>
        </div>
      </div>
    </div>
    
    ${
      unresolvedInterruptions.length > 0
        ? `
    <!-- Unresolved Interruptions Alert -->
    <div class="mt-6">
      <h4 class="font-semibold text-red-800 mb-3">🚨 Unresolved Service Interruptions</h4>
      <div class="bg-red-50 border border-red-200 rounded p-3 max-h-40 overflow-y-auto">
        ${unresolvedInterruptions
          .map(
            (interruption) => `
          <div class="text-sm text-red-800 mb-2 border-b border-red-200 pb-1">
            <strong>${interruption["#"]}</strong>: ${interruption["Service Affected"]} - ${interruption["Duration of Interruption"]}
            <br><span class="text-xs">${interruption["Date"]} at ${interruption["Time of Service Interruption"]}</span>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }
    
    ${
      ongoingInterruptions.length > 0
        ? `
    <!-- Ongoing Interruptions -->
    <div class="mt-6">
      <h4 class="font-semibold text-red-800 mb-3">⏳ Currently Ongoing Interruptions</h4>
      <div class="bg-red-50 border border-red-200 rounded p-3">
        ${ongoingInterruptions
          .map(
            (interruption) => `
          <div class="text-sm text-red-800 mb-2 border-b border-red-200 pb-1">
            <strong>${interruption["Service Affected"]}</strong> - Started: ${
              interruption["Date"]
            } at ${interruption["Time of Service Interruption"]}
            <br><span class="text-xs">Reason: ${interruption["Reason for Interruption"].substring(
              0,
              60
            )}...</span>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }
    
    ${
      recentInterruptions.length > 0
        ? `
    <!-- Recent Interruptions Trend -->
    <div class="mt-6">
      <h4 class="font-semibold text-orange-800 mb-3">📈 Recent Activity (Last 7 Days)</h4>
      <div class="bg-orange-50 border border-orange-200 rounded p-3 max-h-40 overflow-y-auto">
        ${recentInterruptions
          .map(
            (interruption) => `
          <div class="text-sm text-orange-800 mb-1">
            <strong>${interruption["Date"]}</strong>: ${interruption["Service Affected"]} - ${interruption.Status}
          </div>
        `
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }
    
    ${
      highImpactInterruptions.length > 0
        ? `
    <!-- High Impact Interruptions -->
    <div class="mt-6">
      <h4 class="font-semibold text-purple-800 mb-3">⚠️ High Impact Interruptions (>2 hours)</h4>
      <div class="bg-purple-50 border border-purple-200 rounded p-3 max-h-40 overflow-y-auto">
        ${highImpactInterruptions
          .map(
            (interruption) => `
          <div class="text-sm text-purple-800 mb-2 border-b border-purple-200 pb-1">
            <strong>${interruption["Service Affected"]}</strong> - Duration: ${interruption["Duration of Interruption"]}
            <br><span class="text-xs">${interruption["Date"]} | Status: ${interruption.Status}</span>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }
  `;

  document.getElementById("interruptionSummaryContent").innerHTML = summaryContent;
  document.getElementById("interruptionSummaryModal").classList.remove("hidden");
}

function closeInterruptionSummary() {
  document.getElementById("interruptionSummaryModal").classList.add("hidden");
}

function exportData() {
  const csvHeaders = [
    "Interruption ID",
    "Date",
    "Time of Service Interruption",
    "Service Affected",
    "Reason for Interruption",
    "Duration of Interruption",
    "Stakeholders Communicated",
    "Status",
    "Stakeholders Notified",
    "Reported By",
    "Resolved By",
    "Resolution Details",
  ];

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += csvHeaders.join(",") + "\n";

  mockData.forEach((entry) => {
    const row = [
      `"${entry["#"]}"`,
      `"${entry["Date"]}"`,
      `"${entry["Time of Service Interruption"]}"`,
      `"${entry["Service Affected"]}"`,
      `"${entry["Reason for Interruption"].replace(/"/g, '""')}"`,
      `"${entry["Duration of Interruption"]}"`,
      `"${entry["Has Information of Interruption Communicated to Stakeholders"]}"`,
      `"${entry["Status"]}"`,
      `"${(entry["Stakeholders Notified"] || "").replace(/"/g, '""')}"`,
      `"${entry["Reported By"]}"`,
      `"${(entry["Resolved By"] || "").replace(/"/g, '""')}"`,
      `"${(entry["Resolution Details"] || "").replace(/"/g, '""')}"`,
    ];
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "service_interruptions_FKBTH_CL_CS_0703.csv");
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
    "Interruption ID": entry["#"],
    Date: entry["Date"],
    "Time of Service Interruption": entry["Time of Service Interruption"],
    "Service Affected": entry["Service Affected"],
    "Reason for Interruption": entry["Reason for Interruption"],
    "Duration of Interruption": entry["Duration of Interruption"],
    "Stakeholders Communicated":
      entry["Has Information of Interruption Communicated to Stakeholders"],
    Status: entry["Status"],
    "Stakeholders Notified": entry["Stakeholders Notified"] || "",
    "Reported By": entry["Reported By"],
    "Resolved By": entry["Resolved By"] || "",
    "Resolution Details": entry["Resolution Details"] || "",
  }));

  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const colWidths = [
    { wch: 12 }, // Interruption ID
    { wch: 12 }, // Date
    { wch: 12 }, // Time
    { wch: 25 }, // Service Affected
    { wch: 40 }, // Reason
    { wch: 15 }, // Duration
    { wch: 15 }, // Communicated
    { wch: 12 }, // Status
    { wch: 30 }, // Stakeholders
    { wch: 20 }, // Reported By
    { wch: 20 }, // Resolved By
    { wch: 40 }, // Resolution Details
  ];
  ws["!cols"] = colWidths;

  // Add title rows
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL"],
      ["SERVICE INTERRUPTION RECORDS-FKBTH-CL/CS/0703"],
      [""], // Empty row
    ],
    { origin: "A1" }
  );

  // Shift data down to accommodate title
  XLSX.utils.sheet_add_json(ws, excelData, { origin: "A4" });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Service Interruptions");

  // Generate filename with current date
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const filename = `Service_Interruptions_FKBTH_CL_CS_0703_${dateStr}.xlsx`;

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
      <title>Service Interruption Records</title>
      <style>
        @media print {
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 4px; text-align: left; font-size: 8px; }
          th { background-color: #f0f0f0; font-weight: bold; }
          .status-badge { padding: 2px 4px; border-radius: 8px; font-size: 7px; }
        }
        @page { size: A4 landscape; margin: 0.3in; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
        <h3>SERVICE INTERRUPTION RECORDS-FKBTH-CL/CS/0703</h3>
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
