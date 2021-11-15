import api from './api';

export const getStudents = async (studentID, file) => {
  const result = await api.get('/students/getStudents', {params: {studentID, file}});
  return result.data;
};

export const getYear = async (file, studentID, type, userID, searchObject) => {
  const result = await api.get('/students/getYear', {params: {file, studentID, type, userID, searchObject}});
  return result.data;
};

export const getFileNames = async (type) => {
  const result = await api.get('/students/getFiles', {params: {type}});
  return result.data;
};

export const getFileTypes = async () => {
  const result = await api.get('/students/getFileTypes');
  return result.data;
};

export const getAllCourses = async () => {
  const result = await api.get('/students/getAllCourses');
  return result.data;
};

export const getEnrollment = async (file, studentID, userID) => {
  const result = await api.get('/students/getEnrollment', {params: {file, studentID, userID}});
  return result.data;
};

export const uploadCoreCoursesArr = async (arr, userID) => {
  const result = await api.get('/students/uploadXLSX', {params: {arr, userID}});
  return result.data;
};

export const addSingleStudent = async (stuObject) => {
  const result = await api.get('/students/addSingleStudent', {params: {stuObject}});
  return result.data;
};

export const deleteFile = async (file) => {
  const result = await api.get('/students/deleteFile', {params: {file}});
  return result.data;
};

export const getCampusCounts = async (file) => {
  const result = await api.get('/students/getCampusCounts', {params: {file}});
  return result.data;
};

export const getCourseCounts = async (file) => {
  const result = await api.get('/students/getCourseCounts', {params: {file}});
  return result.data;
};

export const getRankCounts = async (file) => {
  const result = await api.get('/students/getRankCounts', {params: {file}});
  return result.data;
};

export const getCoopCounts = async (file) => {
  const result = await api.get('/students/getCoopCounts', {params: {file}});
  return result.data;
};