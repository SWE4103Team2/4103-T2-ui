export const studentColumns = [
  {field: 'Student_ID', headerName: 'ID',         flex: 0.5,  align: "center", headerAlign: "center"},
  {field: 'ShortName',  headerName: 'Name',       flex: 1,    align: "center", headerAlign: "center"},
  {field: 'Cohort',     headerName: 'Cohort',     flex: 1,    align: "center", headerAlign: "center"},
  {field: 'Rank',       headerName: 'Rank',       flex: 0.5,  align: "center", headerAlign: "center"},
  {field: 'Status',     headerName: 'Status',     flex: 1,    align: "center", headerAlign: "center"},
  {field: 'FirstName',  headerName: 'First Name', flex: 1,    align: "center", headerAlign: "center", hide:"true"},
  {field: 'LastName',   headerName: 'Last Name',  flex: 1,    align: "center", headerAlign: "center", hide:"true"},
  {field: 'Year',       headerName: 'Year',       flex: 0.5,  align: "center", headerAlign: "center", hide:"true"},
  {field: 'Start_Date', headerName: 'Start Date', flex: 0.5,  align: "center", headerAlign: "center", hide:"true"},
  {field: 'Program',    headerName: 'Program',    flex: 0.5,  align: "center", headerAlign: "center", hide:"true"},
];

export const transcriptColumns = [
  {field: 'Course',     headerName: 'Course ID',    flex: 1,    align: "center", headerAlign: "center"},
  {field: 'Title',      headerName: 'Title',        flex: 3,    align: "center", headerAlign: "center"},
  {field: 'Grade',      headerName: 'Grade',        flex: 1,    align: "center", headerAlign: "center"},
  {field: 'Term',       headerName: 'Term',         flex: 1,    align: "center", headerAlign: "center"},
  {field: 'Section',    headerName: 'Section',      flex: 1,    align: "center", headerAlign: "center"},
  {field: 'Credit_Hrs', headerName: 'Credit Hours', flex: 1,    align: "center", headerAlign: "center"},
  {field: 'Type',       headerName: 'Type',         flex: 1,    align: "center", headerAlign: "center"},
  {field: 'Passed',     headerName: 'Passed',       flex: 1,    align: "center", headerAlign: "center"},
];

export const columnsCountSortable = [
    {field: 'CountName', headerName: 'Type',   flex: 1,    align: "center", headerAlign: "center"},
    {field: 'Count',     headerName: 'Total',  flex: 1,    align: "center", headerAlign: "center"},
];
  
export const columnsCountNotSortable = [
    {field: 'CountNameNotSortable', headerName: 'Type',   flex: 1,    align: "center", headerAlign: "center", sortable: false},
    {field: 'CountNotSortable',     headerName: 'Total',  flex: 1,    align: "center", headerAlign: "center", sortable: false},
];