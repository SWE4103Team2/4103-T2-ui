import api from './api';

// Gets Students
// studentID is optional (filter)
export const getStudents = async (studentID, file) => {
  const result = await api.get('/students/getStudents', { params: { studentID, file } });
  return result.data;
};

// Gets Year Student is in. (???)
export const getYear = async (file, studentID, type, userID, searchObject, count, year) => {
  const result = await api.get('/students/getYear', { params: { file, studentID, type, userID, searchObject, count, year } });
  return result.data;
};

// Gets File Names
export const getFileNames = async (type) => {
  const result = await api.get('/students/getFiles', { params: { type } });
  return result.data;
};

// Gets File Types
export const getFileTypes = async () => {
  const result = await api.get('/students/getFileTypes');
  return result.data;
};

// Gets All Courses
export const getAllCourses = async () => {
  const result = await api.get('/students/getAllCourses');
  return result.data;
};

// Gets All Enrollments for a Student with a FileID
export const getEnrollment = async (file, studentID, userID) => {
  const result = await api.get('/students/getEnrollment', { params: { file, studentID, userID }});
  return result.data;
};

// Uploads Core Courses
export const uploadCoreCoursesArr = async (dataIn, userID) => {
  const form = new FormData();
  form.append("BRUH", JSON.stringify(dataIn));
  const result = await api.post('/students/uploadXLSX', form, { params: { userID } });
  return result.data;
};

// Adds a Single Student
export const addSingleStudent = async (stuObject) => {
  const result = await api.get('/students/addSingleStudent', { params: { stuObject } });
  return result.data;
};

// Deletes All records with matching FileID in all tables
export const deleteFile = async (file) => {
  const result = await api.get('/students/deleteFile', { params: { file } });
  return result.data;
};

// Grabs the Number of Students at each campus
export const getCampusCounts = async (file, year) => {
  const result = await api.get('/students/getCampusCounts', { params: { file , year } });
  return result.data;
};

// Grabs the Number of Students in each course
export const getCourseCounts = async (file) => {
  const result = await api.get('/students/getCourseCounts', { params: { file }});
  return result.data;
};

// Grabs the Number of Students according to their rank
export const getRankCounts = async (file) => {
  const result = await api.get('/students/getRankCounts', { params: { file }});
  return result.data;
};

// Grabs the Number of Students that are in each co-op
export const getCoopCounts = async (file, year) => {
  const result = await api.get('/students/getCoopCounts', { params: {file, year }});
  return result.data;
};

// Grabs the Cohort Years for display
export const getStartYears = async (file) => {
  const result = await api.get('/students/getStartYears', {params: { file }});
  return result.data;
};