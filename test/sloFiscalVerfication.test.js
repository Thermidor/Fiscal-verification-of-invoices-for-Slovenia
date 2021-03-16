const fiscalVerfication = require('../sloFiscalVerfication')
const { v4: uuidv4 } = require('uuid');

// data from certificate
const certDescriptor = {
    certFile: './cert/cert.pem',
    keyFile:  './cert/key.pem',
    passphrase:'password',
    subject:  'CN=TESTNO PODJETJE 1580,2.5.4.5=#130131,OU=10563369,OU=DavPotRacTEST,O=state-institutions,C=SI',
    issuer:   'CN=Tax CA Test, O=state-institutions, C=SI',
    serial:   '6582329214307630886'
}

// test data
const premises = {
    "BusinessPremiseRequest": {
        "Header": {
            "MessageID": uuidv4(),
             "DateTime": "2021-03-09T09:11:33"
        },
        "BusinessPremise": {
            "TaxNumber": 10563369,                 // must be the same as tax number in certificate
            "BusinessPremiseID": "36CF",           // alphanumeric 1-20 characters unique for specific tax number
            "BPIdentifier": {
                "RealEstateBP": {
                    "PropertyID": {                // register nepremičnin:
                        "CadastralNumber": 228,    // katastrska občina
                        "BuildingNumber": 123,     // št. stavbe
                        "BuildingSectionNumber": 5 // št. dela stavbe
                     },
                     "Address": {
                         "Street": "Dolenjska ceta",
                         "HouseNumber": "5",
                         "HouseNumberAdditional": "A",
                         "Community": "Kranj",
                         "City": "Kranj",
                         "PostalCode": "3221"
                     }
                 }
             },
            "ValidityDate": "2021-03-09T09:11:33",        // premise valid from date  
            "SoftwareSupplier": [{"TaxNumber":58912258}],
            "SpecialNotes":"To je poljuben string dolg najvec 1000 znakov. Sicer ni verjetno, da ga bo ko bral, ampak vseeno"
        }
    }
}

var invoiceVATLiable = {
    "InvoiceRequest": {
        "Header": {
            "MessageID": uuidv4(),
            "DateTime": "2021-03-09T09:15:43"
        },
        "Invoice": {
            "TaxNumber": 10563369,
            "IssueDateTime": "2015-11-22T09:55:25",
            "NumberingStructure": "B",
            "InvoiceIdentifier": {
                "BusinessPremiseID": "36CF",
                "ElectronicDeviceID": "REG12",
                "InvoiceNumber": "205"
            },
            "CustomerVATNumber": "38409747",
            "OperatorTaxNumber": 41125029,
            "InvoiceAmount": 50,
            "PaymentAmount": 50,
            "TaxesPerSeller": [
                {
                    "VAT": [
                        {
                            "TaxRate": 9.5,
                            "TaxableAmount": 30,
                            "TaxAmount": 2.85
                        },
                        {
                            "TaxRate": 9.5,
                            "TaxableAmount": 30,
                            "TaxAmount": 2.85
                        }
                    ],
                    "ExemptVATTaxableAmount": 50
                }
            ],
            "ProtectedID": "b081eb3cb4c25b2c52f7d089f9f30a4b",
            "SpecialNotes": "To je poljuben string dolg najvec 1000 znakov. Sicer ni verjetno, da ga bo ko bral, ampak vseeno"
        }
    }
}

var invoiceVATLiableReverse = {
    "InvoiceRequest": {
        "Header": {
            "MessageID": uuidv4(),
            "DateTime": "2021-03-09T10:05:22"
        },
        "Invoice": {
            "TaxNumber": 10563369,
            "IssueDateTime": "2021-03-09T10:05:12",
            "NumberingStructure": "C",
            "InvoiceIdentifier": {
                "BusinessPremiseID": "36CF",
                "ElectronicDeviceID": "REG12",
                "InvoiceNumber": "206"
            },
            "CustomerVATNumber": "38409747",
            "OperatorTaxNumber": 41125029,
            "InvoiceAmount": -50,
            "PaymentAmount": -50,
            "TaxesPerSeller": [
                {
                    "VAT": [
                        {
                            "TaxRate": 9.5,
                            "TaxableAmount": -30,
                            "TaxAmount": -2.85
                        },
                        {
                            "TaxRate": 9.5,
                            "TaxableAmount": -30,
                            "TaxAmount": -2.85
                        }
                    ],
                    "ExemptVATTaxableAmount": -50
                }
            ],
            "ProtectedID": "4b6533c19917aa87238102418e7114df",
            "ReferenceInvoice": [
                {
                    "ReferenceInvoiceIdentifier": {
                        "BusinessPremiseID": "36CF",
                        "ElectronicDeviceID": "REG12",
                        "InvoiceNumber": "205"
                    },
                    "ReferenceInvoiceIssueDateTime": "2021-03-09T09:15:33"
                }
            ],
            "SpecialNotes": "To je poljuben string dolg najvec 1000 znakov. Sicer ni verjetno, da ga bo ko bral, ampak vseeno"
        }
    }
}

const invoiceNotVATLiable = {
    "InvoiceRequest": {
        "Header": {
            "MessageID": uuidv4(),
            "DateTime": "2021-03-09T11:12:22"
        },
        "Invoice": {
            "TaxNumber": 10563369,
            "IssueDateTime": "2021-03-09T11:12:12",
            "NumberingStructure": "B",
            "InvoiceIdentifier": {
                "BusinessPremiseID": "36CF",
                "ElectronicDeviceID": "REG12",
                "InvoiceNumber": "205"
            },
            "ForeignOperator": true,
            "InvoiceAmount": 30,
            "PaymentAmount": 30,
            "TaxesPerSeller": [
                {
                    "ExemptVATTaxableAmount": 30
                }
            ],
            "ProtectedID": "e652e24f2eef84364eca061729188a17",
            "SpecialNotes": "To je poljuben string dolg najvec 1000 znakov. Sicer ni verjetno, da ga bo ko bral, ampak vseeno"
        }
    }
}

const assert = require('assert');describe('Test Fiscal Verification', () => {
    it('should respond to a ping', () => {
        fiscalVerfication.ping(certDescriptor);
    });
    it('should register premises', () => {
        fiscalVerfication.registerPremises(premises, certDescriptor)
            .then(function(rv) {
                console.info("Register Premises returned")
                console.info(rv)
            })
            .catch(function(rv) {
                console.error("Register Premises returned ERROR")
                console.error(rv)
            })
    }); 
    it('should verify invoice for VAT liable issuer', () => {
        fiscalVerfication.issueInvoice(invoiceVATLiable, certDescriptor)
            .then(function(rv) {
                console.info("Invoice VAT liable returned")
                console.info(rv)
            })
            .catch(function(rv) {
                console.error("Invoice VAT liable returned ERROR")
                console.error(rv)
            })
    });
    it('should revert (storno) invoice for VAT liable issuer', () => {
        fiscalVerfication.issueInvoice(invoiceVATLiableReverse, certDescriptor)
            .then(function(rv) {
                console.info("Invoice VAT liable reverse returned")
                console.info(rv)
            })
            .catch(function(rv) {
                console.error("Invoice VAT liable reverse returned ERROR")
                console.error(rv)
            })
    });              
});

