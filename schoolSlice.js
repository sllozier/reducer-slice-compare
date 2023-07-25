import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");

const schoolSlice = createSlice({
  name: "schoolList",
  initialState: {},
  reducers: {
    getschoolList: (state, action) => {
      state.schoolList = action.payload;
      return state;
    },
    addschool: (state, action) => {
      state.schoolList.push(action.payload);
      return state;
    },
    getschool: (state, action) => {
      state.schoolData = action.payload;
      return state;
    },
    removeschool: (state, action) => {
      state.schoolList = state.schoolList.filter(
        (school) => school.id != action.payload.id
      );
      return state;
    },
    _unregisterStudent: (state, action) => {
      state.schoolData.students = state.schoolData.students.filter(
        (student) => student.id !== action.payload.id
      );
      return state;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
      return state;
    },
  },
});
export default schoolSlice.reducer;
export const {
  getschoolList,
  addschool,
  getschool,
  removeschool,
  _unregisterStudent,
} = schoolSlice.actions;
export const fetchSchools = () => async (dispatch) => {
  const { data: schoolList } = await axios.get("/api/schools");
  dispatch(getschoolList(schoolList));
};

export const fetchschoolData = (schoolId) => async (dispatch) => {
  const { data: schoolData } = await axios.get(`/api/schools/${schoolId}`);
  dispatch(getschool(schoolData));
};
export const addschoolData = (newschoolData) => async (dispatch) => {
  try {
    const { data: newData } = await axios.post("/api/schools", newschoolData);
    dispatch(addschool(newData));
  } catch (error) {
    dispatch(setErrorMsg(error.response.data));
  }
};
export const removeschoolData = (schoolData, navigate) => async (dispatch) => {
  const { data: deletedschool } = await axios.delete(
    `/api/schools/${schoolData.id}`
  );
  dispatch(removeschool(deletedschool));
  navigate("/schools");
};
export const updateschoolData = (updatedschool) => async (dispatch) => {
  const { data: updatedschoolData } = await axios.put(
    `/api/schools/${updatedschool.id}`,
    updatedschool
  );
  dispatch(getschool(updatedschoolData));
};
export const unregisterStudent =
  (updatedStudentProfile) => async (dispatch) => {
    const { data: updatedStudent } = await axios.put(
      `/api/students/${updatedStudentProfile.id}`,
      updatedStudentProfile
    );
    dispatch(_unregisterStudent(updatedStudent));
  };
