function downloadCSV(data, filename) {

  if (!data || data.length === 0) {
    return;
  }

  const headers = Object.keys(data[0]);

  const csvRows = [
    headers.join(","),

    ...data.map(row =>
      headers
        .map(field => `"${row[field] ?? ""}"`)
        .join(",")
    )
  ];


  const csvString = csvRows.join("\n");


  const blob = new Blob(
    [csvString],
    { type: "text/csv" }
  );


  const url = window.URL.createObjectURL(blob);


  const link = document.createElement("a");

  link.href = url;

  link.download = filename;

  link.click();


  window.URL.revokeObjectURL(url);

}



// Students Export

export const exportStudentsCSV = (students) => {

  downloadCSV(
    students,
    "students.csv"
  );

};



// Mentors Export

export const exportMentorsCSV = (mentors) => {

  downloadCSV(
    mentors,
    "mentors.csv"
  );

};



// Skills Export

export const exportSkillsCSV = (skills) => {

  downloadCSV(
    skills,
    "skills.csv"
  );

};



// Technologies Export

export const exportTechnologiesCSV = (technologies) => {

  downloadCSV(
    technologies,
    "technologies.csv"
  );

};



// Projects Export

export const exportProjectsCSV = (projects) => {

  downloadCSV(
    projects,
    "projects.csv"
  );

};



// Learning Resources Export


export const exportResourcesCSV = (resources) => {
  downloadCSV(
    resources,
    "learning_resources.csv"
  );
};



// Certificates Export

export const exportCertificatesCSV = (certificates) => {

  downloadCSV(
    certificates,
    "certificates.csv"
  );

};



// Products Export

export const exportProductsCSV = (products) => {

  downloadCSV(
    products,
    "products.csv"
  );

};



// Case Studies Export

export const exportCaseStudiesCSV = (caseStudies) => {

  downloadCSV(
    caseStudies,
    "case_studies.csv"
  );

};