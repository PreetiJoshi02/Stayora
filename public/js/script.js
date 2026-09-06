(() => {
  'use strict';

  // Bootstrap custom form validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      },
      false
    );
  });

  // Tax Toggle Switch functionality on listings index
  const taxSwitch = document.getElementById('taxSwitch');
  if (taxSwitch) {
    taxSwitch.addEventListener('click', () => {
      const taxInfo = document.querySelectorAll('.tax-info');
      for (let info of taxInfo) {
        if (taxSwitch.checked) {
          info.classList.remove('d-none');
        } else {
          info.classList.add('d-none');
        }
      }
    });
  }

  // Auto-dismiss flash alerts after 4 seconds
  const flashAlerts = document.querySelectorAll('.alert-dismissible');
  flashAlerts.forEach((alert) => {
    setTimeout(() => {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
      if (bsAlert) {
        bsAlert.close();
      }
    }, 4000);
  });
})();
