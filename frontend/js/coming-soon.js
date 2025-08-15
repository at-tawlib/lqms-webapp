import { showLoading } from "./ui-utils/show-loading.js";

export const renderComingSoon = (sectionTitle = "Section", documentCode = "") => {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  setTimeout(() => {
    contentDiv.innerHTML = `
      <div>
        <div class="flex flex-col items-center justify-center">
          <!-- Construction Icon -->
          <div class="mb-4">
            <svg class="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.09-.21 2.08-.64 3-1.22V15c0-1.1-.9-2-2-2s-2 .9-2 2v3.78c-.92.58-1.91 1.01-3 1.22-4.16-1-9-5.45-9-11V7l10-5z"/>
              <path d="M17 10v1h-2v-1c0-.55-.45-1-1-1s-1 .45-1 1v1h-2v-1c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2z"/>
            </svg>
          </div>

          <!-- Main Message -->
          <h3 class="text-2xl font-bold text-gray-800 mb-2">${sectionTitle}</h3>
          <h4 class="text-xl text-gray-600 mb-4">Coming Soon</h4>
          
          <!-- Description -->
          <div class="text-center max-w-md">
            <p class="text-gray-500 mb-2">
              This section is currently under development.
            </p>
            
            <!-- Features Preview -->
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
              <h5 class="font-semibold text-gray-700 mb-2">Expected Features:</h5>
              <ul class="text-sm text-gray-600 space-y-2">
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Data entry and management
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Export to Excel
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Print functionality
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Real-time updates
                </li>
              </ul>
            </div>

            <!-- Progress Indicator -->
            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div class="bg-green-600 h-2 rounded-full transition-all duration-1000" style="width: 25%"></div>
            </div>
            <p class="text-xs text-gray-400 mb-4">Development Progress: 25%</p>

            <!-- Call to Action -->
            <div class="space-y-3">
              <button 
                id="notifyBtn" 
                class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm transition-colors"
              >
                📧 Notify When Ready
              </button>
              <div>
                <button 
                  id="backBtn" 
                  class="text-green-600 hover:text-green-700 text-sm underline transition-colors"
                >
                  ← Back to Dashboard
                </button>
              </div>
            </div>
          </div>

          <!-- Estimated Timeline -->
          <div class="mt-6 text-center">
            <p class="text-xs text-gray-400">
              Estimated completion: <span class="font-semibold">Q2 2025</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Notification Modal -->
      <div
        id="notifyModal"
        class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
      >
        <div class="bg-white rounded-lg shadow-2xl max-w-md w-full">
          <div class="bg-green-600 text-white p-4 rounded-t-lg">
            <h3 class="text-lg font-bold">Get Notified</h3>
          </div>
          <div class="p-6">
            <p class="text-gray-600 mb-4">
              Enter your email to be notified when this section becomes available.
            </p>
            <form id="notifyForm">
              <input
                type="email"
                id="emailInput"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="your.email@example.com"
                required
              />
              <div class="flex gap-2">
                <button
                  type="submit"
                  class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Subscribe
                </button>
                <button
                  type="button"
                  id="closeNotifyBtn"
                  class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    document.getElementById("notifyBtn").addEventListener("click", openNotifyModal);
    document.getElementById("closeNotifyBtn").addEventListener("click", closeNotifyModal);
    document.getElementById("notifyForm").addEventListener("submit", handleNotifySubmit);
    document.getElementById("backBtn").addEventListener("click", handleBackClick);

    // Animate progress bar on load
    setTimeout(() => {
      const progressBar = document.querySelector(".bg-green-600.h-2");
      if (progressBar) {
        progressBar.style.width = "35%";
      }
    }, 1000);
  }, 500);
};

function openNotifyModal() {
  document.getElementById("notifyModal").classList.remove("hidden");
}

function closeNotifyModal() {
  document.getElementById("notifyModal").classList.add("hidden");
  document.getElementById("notifyForm").reset();
}

function handleNotifySubmit(e) {
  e.preventDefault();

  const email = document.getElementById("emailInput").value;

  // Simulate API call
  setTimeout(() => {
    alert(`Thank you! We'll notify you at ${email} when this section is ready.`);
    closeNotifyModal();
  }, 500);
}

function handleBackClick() {
  // You can customize this based on your navigation system
  // For example, trigger a navigation event or call a specific function
  if (window.history.length > 1) {
    window.history.back();
  } else {
    // Fallback - could trigger dashboard navigation
    console.log("Navigate to dashboard");
    // Example: window.location.hash = '#dashboard';
  }
}

// Export variants for different sections
export const renderEquipmentMaintenanceComingSoon = () =>
  renderComingSoon("Equipment Maintenance", "EQUIPMENT MAINTENANCE LOG-FKBTH-CL/EM/2301");

export const renderInventoryComingSoon = () =>
  renderComingSoon("Inventory Management", "INVENTORY TRACKING-FKBTH-CL/INV/3401");

export const renderQualityControlComingSoon = () =>
  renderComingSoon("Quality Control", "QUALITY CONTROL RECORDS-FKBTH-CL/QC/4501");

export const renderStaffManagementComingSoon = () =>
  renderComingSoon("Staff Management", "STAFF RECORDS-FKBTH-CL/HR/5601");

export const renderReportsComingSoon = () =>
  renderComingSoon("Reports & Analytics", "LABORATORY REPORTS-FKBTH-CL/RPT/6701");

export const renderCalibrationComingSoon = () =>
  renderComingSoon("Equipment Calibration", "CALIBRATION RECORDS-FKBTH-CL/CAL/7801");

export const renderSampleTrackingComingSoon = () =>
  renderComingSoon("Sample Tracking", "SAMPLE TRACKING LOG-FKBTH-CL/ST/8901");

export const renderIncidentReportingComingSoon = () =>
  renderComingSoon("Incident Reporting", "INCIDENT REPORTS-FKBTH-CL/IR/9001");
