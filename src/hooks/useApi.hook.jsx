import Axios from 'axios'

const useApi = () => {
  const getAllCourses = () => {
    return Axios.get(`${process.env.REACT_APP_API}/courses`)
  }
  const getOneCourse = (url) => {
    return Axios.get(`${process.env.REACT_APP_API}/${url}`)
  }
  const updateOneCourse = (url) => {}
  const deleteOneCourse = (url) => {}

  return {
    getAllCourses,
    getOneCourse,
    updateOneCourse,
    deleteOneCourse
  }
}

export default useApi
