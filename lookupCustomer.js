document.getElementById('jo-number').addEventListener('input', function () {
    const joNumber = this.value.trim();
    const customerNameParagraph = document.getElementById('customer-name');
  
    if (joNumber.length < 1) {
      customerNameParagraph.textContent = "Customer Name:";
      return;
    }
  
    fetch('POSData.csv')
      .then(response => response.text())
      .then(csv => {
        const lines = csv.trim().split('\n');
        const customerData = {};
  
        // Skip header (first line)
        for (let i = 1; i < lines.length; i++) {
            const columns = lines[i].split(',');   // COMMA-separated
  
          if (columns.length >= 3) {
            const jo = columns[1].trim();           // Column B = JO#
            const customerName = columns[2].trim(); // Column C = CUSTOMER
            customerData[jo] = customerName;
          }
        }
  
        if (customerData[joNumber]) {
          customerNameParagraph.textContent = `Customer Name: ${customerData[joNumber]}`;
        } else {
          customerNameParagraph.textContent = "Customer Name: Customer Not Found";
        }
      })
      .catch(error => {
        console.error('Error loading POSData.csv:', error);
        customerNameParagraph.textContent = "Customer Name: Error loading data";
      });
  });
  