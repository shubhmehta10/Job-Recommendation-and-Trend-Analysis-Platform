const API_URL = "http://localhost:5000/search";

const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

searchBtn.addEventListener("click", () => {
    const jobTitle = document.getElementById("jobTitle").value;
    const location = document.getElementById("location").value;

    if (!jobTitle || !location) {
        alert("Please enter both job title and location.");
        return;
    }

    fetch(`${API_URL}?query=${jobTitle}&location=${location}`)
        .then((response) => response.json())
        .then((data) => {
            displayResults(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            resultsDiv.innerHTML = "<p>Unable to fetch job data. Please try again later.</p>";
        });
});

function displayResults(jobs) {
    resultsDiv.innerHTML = ""; // Clear previous results

    if (jobs.length === 0) {
        resultsDiv.innerHTML = "<p>No jobs found. Try another search.</p>";
        return;
    }

    jobs.forEach((job) => {
        const jobDiv = document.createElement("div");
        jobDiv.classList.add("job");

        jobDiv.innerHTML = `
            <h2>${job.title}</h2>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
        `;

        resultsDiv.appendChild(jobDiv);
    });
}
