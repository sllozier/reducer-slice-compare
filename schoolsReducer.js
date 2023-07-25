import Axios from "axios";

// ***ACTION TYPES***
const _getSchools = "GET_SCHOOLS";
const _getSingleSchool = "GET_SINGLESCHOOL";
const _addSchool = "ADD_SCHOOL";
const _deleteSchool = "DELETE_SCHOOL";
const _updateSchool = "UPDATE_SCHOOL";
const _clearSchool = "CLEAR_SCHOOL";
const _removeStudent = "REMOVE_STUDENT";

// ***ACTION CREATORS***
const getSchools = (data) => {
  return {
    type: _getSchools,
    Schools: data,
  };
};

const getSingleSchool = (data) => {
  return {
    type: _getSingleSchool,
    School: data,
  };
};

const addSchool = (data) => {
  return {
    type: _addSchool,
    School: data,
  };
};

const deleteSchool = (data) => {
  return {
    type: _deleteSchool,
    School: data,
  };
};

const updateSchool = (data) => {
  return {
    type: _updateSchool,
    School: data,
  };
};

export const removeStudent = (data) => {
  return {
    type: _removeStudent,
    student: data,
  };
};

export const clearSchool = () => {
  return {
    type: _clearSchool,
    School: null,
  };
};

// ***THUNKS***
export const getAllSchoolsThunk = () => {
  return async (dispatch) => {
    await Axios.get("/api/Schools")
      .then((res) => dispatch(getSchools(res.data)))
      .catch((err) => console.error(err));
  };
};

export const getSingleSchoolThunk = (SchoolId) => {
  return async (dispatch) => {
    await Axios.get(`/api/Schools/${SchoolId}`)
      .then((res) => dispatch(getSingleSchool(res.data)))
      .catch((err) => console.error(err));
  };
};

export const addSchoolThunk = (SchoolData) => {
  return async (dispatch) => {
    await Axios.post(`/api/Schools`, SchoolData)
      .then((res) => dispatch(addSchool(res.data)))
      .catch((err) => console.error(err));
  };
};

export const deleteSchoolThunk = (SchoolData) => {
  return async (dispatch) => {
    await Axios.delete(`/api/Schools/${SchoolData.id}`, SchoolData)
      .then((res) => dispatch(deleteSchool(res.data)))
      .catch((err) => console.error(err));
  };
};

export const updateSchoolThunk = (SchoolData) => {
  return async (dispatch) => {
    await Axios.put(`/api/Schools/${SchoolData.id}`, SchoolData)
      .then((res) => dispatch(updateSchool(res.data)))
      .catch((err) => console.error(err));
  };
};

// ***REDUCER FOR Schools***
export const SchoolsReducer = (state = {}, action) => {
  switch (action.type) {
    case _getSchools:
      return { ...state, Schools: action.Schools };
    case _getSingleSchool:
      return { ...state, School: action.School };
    case _addSchool:
      return { ...state, Schools: [...state.Schools, action.School] };
    case _updateSchool:
      return { ...state, School: action.School };
    case _deleteSchool:
      const index = state.Schools.findIndex(
        (School) => School.id === action.School.id
      );
      const newSchools = [...state.Schools];
      newSchools.splice(index, 1);
      return { ...state, Schools: newSchools };
    case _clearSchool:
      return { ...state, School: action.School };
    case _removeStudent:
      const toRemoveIndex = state.School.students.findIndex(
        (student) => student.id === action.student.id
      );
      const newStudents = [...state.School.students];
      newStudents.splice(toRemoveIndex, 1);
      return { ...state, School: { ...state.School, students: newStudents } };
    default:
      return state;
  }
};
