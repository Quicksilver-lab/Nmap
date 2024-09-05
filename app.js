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

        if (response.ok) {
          const data = await response.json();
          scanOutput.textContent = JSON.stringify(data.report, null, 2);
        } else {
          const error = await response.json();
          scanOutput.textContent = `Error: ${error.error}`;
        }
      } catch (error) {
        scanOutput.textContent = `Error: ${error.message}`;
      }
    }
  });
});
