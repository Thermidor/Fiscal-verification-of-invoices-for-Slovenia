# Fiscal-verification-of-invoices-for-Slovenia
Opensource javascript fiscal verification of invoices for Slovenia. Provided by www.emazing.si

Author Jurij Zelič

# Usage:

# Example messages
Can be found in test/sloFiscalVerfication.test.js 

# Unit testing:
1. Apply for tst certificates by sending email to dev.blagajne.fu(at)gov.si (Include Your company name in an email)
2. Coppy cert and key to cert folder. Certificate must be in base64 PEM format with encrypted private key.
3. Correct the data in test/sloFiscalVerfication.test.js:
   certDescriptor - certificate data
   TaxNumber in all the messages must be the same as in certificate 
4. Execute tests (from root folder)
npm install
npm test
