document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("scan-form");
  const targetInput = document.getElementById("target");
  const scanOutput = document.getElementById("scan-output");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const target = targetInput.value.trim();

    if (target) {
      try {
        const response = await fetch("/api/scan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ target }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Scan results:", data); // Log the result for debugging
        scanOutput.textContent = JSON.stringify(data.report, null, 2);
      } catch (error) {
        console.error("Error:", error); // Log error details
        scanOutput.textContent = `Error: ${error.message}`;
      }
    }
  });
});
