import React from "react";

const TableMobile = ({ plan }) => {
  const data = [
    {
      feature: "Monthly Cost",
      values: ["5,000 INR", "7,000 INR", "20,000 INR"],
    },
    {
      feature: "Pay Annually (Save up to 25%)",
      values: ["54,000 INR (save 10%)", "71,400 INR (save 15%)", "1,80,000 INR (save 25%)"],
    },
    {
      feature: "Online store",
      values: ["Full-featured", "Full-featured", "Full-featured"],
    },
    {
      feature: "SKUs",
      values: ["Upto 250", "Upto 1000", "Upto 5000"],
    },
    {
      feature: {
        title: "Emails per month",
        description: "(Additional 0.50 INR per email after that)",
      },
      values: ["200", "500", "3000"],
    },
    {
      feature: {
        title: "SMS per month",
        description: "(Additional 0.50 INR per SMS after that)",
      },
      values: ["200", "500", "3000"],
    },
    {
      feature: {
        title: "WhatsApp messages per month",
        description: "(Additional 0.50 INR per WhatsApp messages after that)",
      },
      values: ["200", "500", "3000"],
    },
    {
      feature: "Analytics",
      values: ["Basic", "Standard", "Advanced"],
    },
    {
      feature: "Additional staff accounts",
      values: ["-", "Upto 3", "Upto 20"],
    },
    {
      feature: "International markets",
      values: ["-", "Upto 3", "Upto 10"],
    },
    {
      feature: "Transaction fees",
      values: ["4%", "3%", "2%"],
    },
    {
      feature: "Sales channels",
      values: ["-", "-", "Available"],
    },
    {
      feature: "Monthly development hours",
      values: ["-", "Upto 2", "Upto 5"],
    },
    {
      feature: "Priority support",
      values: ["Within 12 hours", "Within 3 hours", "Within 1 hour"],
    },
    {
      feature: "Unlimited web hosting",
      values: ["Included", "Included", "Included"],
    },
    {
      feature: "SSL certificate",
      values: ["Included", "Included", "Included"],
    }
  ];

  return (
    <table id="table" className="table-small">
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="table-hover">
            <td>
              <div className="item-col">
                <span className="sub-text2">
                  {typeof item.feature === "string"
                    ? item.feature
                    : item.feature.title}
                </span>
                {typeof item.feature === "object" && (
                  <p className="para-text">{item.feature.description}</p>
                )}
              </div>
            </td>
            <td className="para-text black text-center">
              {item.values[plan]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableMobile;
