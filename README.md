# Fiscal-verification-of-invoices-for-Slovenia
Opensource javascript fiscal verification of invoices for Slovenia. Provided by www.emazing.si

Author Jurij Zelič

# Instalation via npm:
npm install git+https://github.com/Thermidor/Fiscal-verification-of-invoices-for-Slovenia.git

# Usage:
const fiscalVerfication = require('slo-fiscal-verification')

// create objects certDescriptor, premises and invoiceVATLiable. Examples can be found at https://github.com/Thermidor/Fiscal-verification-of-invoices-for-Slovenia/blob/main/test/sloFiscalVerfication.test.js  

//Register premises:  
fiscalVerfication.registerPremises(premises, certDescriptor)
    .then(function(rv) {
        console.info("Register Premises returned")
        console.info(rv)
    })
    .catch(function(rv) {
        console.error("Register Premises returned ERROR")
        console.error(rv)
})

//Verify invoice
fiscalVerfication.issueInvoice(invoiceVATLiable, certDescriptor)
    .then(function(rv) {
        console.info("Invoice VAT liable returned")
        console.info(rv)
    })
    .catch(function(rv) {
        console.error("Invoice VAT liable returned ERROR")
        console.error(rv)
})




# Example messages
Can be found in test/sloFiscalVerfication.test.js 

# Unit testing:
1. Apply for test certificates by sending email to dev.blagajne.fu(at)gov.si (Include Your company name in an email)
2. Copy cert and key to cert folder. Certificate must be in base64 PEM format with encrypted private key.
3. Correct the data in test/sloFiscalVerfication.test.js:
   certDescriptor - certificate data
   TaxNumber in all the messages must be the same as in certificate 
4. Execute tests (from root folder)
npm install  
npm test  
