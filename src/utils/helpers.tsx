export const rainFlood = {
  columns: [
    {
      name: "",
      selector: (row: any) => row.name,
    },
    {
      name: "Risk",
      selector: (row: any) => row.risk,
    },
  ],
  data: [
    {
      name: "River flood caution",
      risk: "No",
    },
    {
      name: "Urban flood",
      risk: "Yes",
    },
    {
      name: "Water speed",
      risk: "No",
    },
  ],
};

export const climateForcast = {
  columns: [
    {
      name: "",
      selector: (row: any) => row.name,
    },
    {
      name: "2011",
      selector: (row: any) => row.year2011,
    },
    {
      name: "2030",
      selector: (row: any) => row.year2030,
    },
    {
      name: "2050",
      selector: (row: any) => row.year2050,
    },
  ],
  data: [
    {
      name: "2.5",
      year2011: "No",
      year2030: "Yes",
      year2050: "No",
    },
    {
      name: "4.5",
      year2011: "Yes",
      year2030: "No",
      year2050: "No",
    },
    {
      name: "8.5",
      year2011: "No",
      year2030: "No",
      year2050: "Yes",
    },
  ],
};

export const propertyDetails = {
  columns: [
    {
      name: "",
      selector: (row: any) => row.name,
    },
    {
      name: "2011",
      selector: (row: any) => row.year2011,
    },
  ],
  data: [
    {
      name: "Year of building",
      year2011: "No",
    },
    {
      name: "Year of refurbishment",
      year2011: "No",
    },
    {
      name: "Commercial or private",
      year2011: "No",
    },
    {
      name: "Size of the building",
      year2011: "No",
    },
    {
      name: "Size of the plot",
      year2011: "No",
    },
  ],
};

export const riskReduction = {
  columns: [
    {
      name: "Measures",
      selector: (row: any) => row.name,
      width: "220px",
    },
    {
      name: "Investment Cost",
      selector: (row: any) => row.cost,
      width: "160px",
    },
    {
      name: "Maintenance Cost",
      selector: (row: any) => row.maintenance,
      width: "160px",
    },
    {
      name: "Efficiency",
      selector: (row: any) => row.efficiency,
      width: "160px",
    },
    {
      name: "Co-benifites",
      selector: (row: any) => row.benifites,
      wrap: true,
    },
  ],
  data: [
    {
      name: "Dry swale",
      cost: "Low",
      maintenance: "Low",
      efficiency: "Medium",
      benifites:
        "Climate change adaptation, Climate change mitigation, Sustainable Water management, Pollution Prevention and control, Protection and restoration of bio-diversity",
    },
    {
      name: "Infiltration trenches",
      cost: "Low",
      maintenance: "Low",
      efficiency: "Medium",
      benifites:
        "Climate change adaptation, Climate change mitigation, Sustainable Water management, Pollution Prevention and control, Protection and restoration of bio-diversity",
    },
    {
      name: "Intensive green roofs",
      cost: "Low",
      maintenance: "Low",
      efficiency: "Medium",
      benifites:
        "Climate change adaptation, Climate change mitigation, Sustainable Water management, Pollution Prevention and control, Protection and restoration of bio-diversity",
    },
    {
      name: "Extensive green roofs",
      cost: "Low",
      maintenance: "Low",
      efficiency: "Medium",
      benifites:
        "Climate change adaptation, Climate change mitigation, Sustainable Water management, Pollution Prevention and control, Protection and restoration of bio-diversity",
    },
  ],
};
