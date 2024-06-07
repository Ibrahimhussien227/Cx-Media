export const DESCRIPTIONFIELD = {
  SAVINGS: {
    headerPlaceholder:
      "Submit any one of the following proofs for your source of funds in pdf, jpeg or png format. Max size 5MB.",
    desc: "",

    titleFile: "SOURCE OF FUNDS PROOF",
    filePlaceHolder: "Upload source of funds proof",
    headerArray: [
      {
        header:
          "Last 3 months of bank statements, showing all transactions including your salary payments.",
        description:
          "Must be an official bank statement and not a screenshot from an Online Banking platform.",
      },
      {
        header: "Recent Pay Slips.",
        description: "Minimum last 3 months.",
      },
      {
        header: "Latest Tax Returns.",
        description: "Validated by a relevant Official Authority.",
      },

      {
        header: "Employment Proof.",
        description:
          "Employment Contract or a Proof of Employment letter signed within the last 12 months.",
      },
    ],
  },
  BUSINESS_INCOME_PROFITS: {
    headerPlaceholder:
      "Submit any one of the following proofs for your source of funds in pdf, jpeg or png format. Max size 5MB.",
    desc: "The submitted proof document must be no older than 12 months.",
    titleFile: "SOURCE OF FUNDS PROOF",
    filePlaceHolder: "Upload source of funds proof",
    headerArray: [
      {
        header:
          "Bank statements or Financial Statements reflecting income and profits. ",
        description:
          "Must be an official bank statement and not a screenshot from an Online Banking platform.",
      },
      {
        header: "Tax Returns Document",
        description: "Validated by a relevant Official Authority.",
      },
    ],
  },
  SALARY_BONUS_INCOME: {
    headerPlaceholder:
      "Submit any one of the following proofs for your source of funds in pdf, jpeg or png format. Max size 5MB.",
    desc: "",

    titleFile: "SOURCE OF FUNDS PROOF",
    filePlaceHolder: "Upload source of funds proof",
    headerArray: [
      {
        header: "Salary, Bonus, or Income Slip",
        description:
          "Must be an official slip issued by your employer, not older than 3 months.",
      },
      {
        header: "Letter from Employer",
        description:
          "A letter from your employer on an official letterhead confirming the payment and signed by an authorized signatory.",
      },
    ],
  },
  INVESTMENTS: {
    headerPlaceholder:
      "Submit any one of the following proofs for the investment in pdf, jpeg or png format. Max size 5MB.",
    desc: "The submitted proof document must include the value of the investment.",
    titleFile: "INVESTMENT PROOF",
    filePlaceHolder: "Upload investment proof",
    headerArray: [
      {
        header: "Investment Certificate",
        description:
          "Must be an official investment certificate issued by a relevant authority.",
      },
      {
        header: "Investment Statement or Letter",
        description:
          "An investment statement or letter confirming the investment.",
      },
    ],
  },
  SALE_OF_PROPERTY: {
    headerPlaceholder:
      "Submit any one of the following proofs for your source of funds in pdf, jpeg or png format. Max size 5MB.",
    desc: "",

    titleFile: "SOURCE OF FUNDS PROOF",
    filePlaceHolder: "Upload source of funds proof",
    headerArray: [
      {
        header: "Copy of Contract of Sale",
      },
      {
        header: "Copy of a Land Registry",
      },
      {
        header: "Title Deed",
      },
      {
        header: "Letter of Sale Confirmation",
        description:
          "A letter from a real estate agent, a conveyancer or a lawyer confirming the sale of the property.",
      },
    ],
  },
  INHERITANCE_GIFT_DONATION: {
    headerPlaceholder:
      "Submit any one of the following proofs for your source of funds.",
    desc: "",

    titleFile: "SOURCE OF FUNDS PROOF",
    filePlaceHolder: "Upload source of funds proof",
    headerArray: [
      {
        header: "Inheritance Proof",
        description:
          "A Will, Grant of Probate, or Trust Deed as proof of the inheritance.",
      },
      {
        header: "Bank statement showing the inheritance transaction.",
        description:
          "Must be an official bank statement and not a screenshot from an Online Banking platform.",
      },
    ],
  },
  WINNINGS: {
    headerPlaceholder:
      "Submit a copy of the ticket, slip or receipt showing the winnings amount and also the date of the winnings in pdf, jpeg or png format. Max size 5MB..",
    desc: "",

    titleFile: "WINNINGS PROOF",
    filePlaceHolder: "Upload winnings proof",
    headerArray: [],
  },
  STUDENT: {
    headerPlaceholder:
      "Submit a copy of your parent’s Salary or Income Slip for the last 3 months in pdf, jpeg or png format. Max size 5MB.",
    desc: "Note: The slip must show the parent’s name, employer name, salary amount, and the period of the salary.",
    titleFile: "PARENT SALARY SLIP",
    filePlaceHolder: "Upload parent’s salary slip",
    headerArray: [],
  },
};

export const VALIDFUNDSKEYS = ["STUDENT", "WINNINGS", "INVESTMENTS"];
