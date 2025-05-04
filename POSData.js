// latestDateFromCSV.js

document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('latest-date');
  
    fetch('POSData.csv')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch CSV');
        return response.text();
      })
      .then(csv => {
        const lines = csv.trim().split('\n');
        
        // Parse each date-time entry in Column A
        const dates = lines
          .map(line => {
            const cleanedLine = line.trim();  // Remove any spaces around the date-time
            const date = new Date(cleanedLine);  // Try parsing the cleaned value
  
            console.log('Parsed date-time:', date);  // Log the parsed date-time
  
            // If the date is valid, keep it
            return !isNaN(date) ? date : null;
          })
          .filter(date => date !== null);  // Remove any invalid entries
  
        if (dates.length === 0) {
          outputElement.textContent = 'No valid dates found.';
          return;
        }
  
        // Find the latest date by comparing all the date objects
        const latest = new Date(Math.max(...dates));
        outputElement.textContent = latest.toLocaleString();  // Format the date-time
      })
      .catch(error => {
        console.error('Error reading POSData.csv:', error);
        outputElement.textContent = 'Could not load POSData.csv';
      });
  });
  