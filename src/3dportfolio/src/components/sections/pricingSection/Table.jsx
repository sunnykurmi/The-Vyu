import React from 'react'

const Table = () => {
    const headers = ["", "Standard", "Premium", "Plus"];

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
                description:
                    "(Additional 0.50 INR per email after that)",
            },
            values: ["200", "500", "3000"],
        },
         {
            feature: {
                title: "SMS per month",
                description:
                    "(Additional 0.50 INR per SMS after that)",
            },
            values: ["200", "500", "3000"],
        },
        {
            feature: {
                title: "WhatsApp messages per month",
                description:
                    "(Additional 0.50 INR per WhatsApp messages after that)",
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
            values: ["Within 12 hours", "Within 3 hours", "Within 1 hours"],
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
        <table id='table' className='table-large'>
            <thead>
                <tr className='sub-header'>
                    {headers.map((head, index) => (
                        <th key={index} className={`sub-text1 text-center`}>
                            {head}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className='table-hover'>
                        <td>
                            {typeof row.feature === "string" ? (
                                <span className='sub-text2'>{row.feature}</span>
                            ) : (
                                <div className='item-col'>
                                    <span className='sub-text2'>{row.feature.title}</span>
                                    <p className='para-text'>{row.feature.description}</p>
                                </div>
                            )}
                        </td>
                        {row.values.map((val, i) => (
                            <td key={i} className='para-text black text-center'>
                                {val}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
