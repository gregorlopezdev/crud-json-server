import Axios from 'axios'

const useApi = () => {
  const getAllCourses = () => {
    return Axios.get(`${process.env.REACT_APP_API}/courses`)
  }
  const getOneCourse = (id) => {
    return Axios.get(`${process.env.REACT_APP_API}/courses/${id}`)
  }
  const createOneCourse = (course) => {
    return Axios.post(`${process.env.REACT_APP_API}/courses`, course)
  }
  const updateOneCourse = (course) => {
    return Axios.patch(`${process.env.REACT_APP_API}/courses/${course.id}`, course)
  }
  const deleteOneCourse = (course) => {
    return Axios.delete(`${process.env.REACT_APP_API}/courses/${course.id}`)
  }

  return {
    getAllCourses,
    getOneCourse,
    createOneCourse,
    updateOneCourse,
    deleteOneCourse
  }
}

export default useApi
