import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import useApi from '../../hooks/useApi.hook'

import { createStyles, makeStyles } from '@material-ui/core/styles'

import {
  Button,
  TextField,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  Typography,
  InputAdornment
} from '@material-ui/core'
import { useFormik } from 'formik'

import UCard from '../utils/UCard.component'

import * as yup from 'yup'

const defaultValues = {
  id: '',
  name: '',
  description: '',
  url_poster_medium: '',
  url_poster_big: '',
  price: '',
  available: false
}
const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es requerido!')
    .min(10, 'El minimo de caracteres aceptados son 10!')
    .max(100, 'El maximo de caracteres aceptados son 100!'),
  description: yup
    .string()
    .required('La descripcion es requerida!')
    .min(50, 'El minimo de caracteres aceptados son 50!')
    .max(500, 'El maximo de caracteres aceptados son 500!'),
  url_poster_medium: yup
    .string()
    .required('La url del poster mediano es requerida!')
    .min(10, 'El minimo de caracteres aceptados son 10!')
    .max(500, 'El maximo de caracteres aceptados son 500!'),
  url_poster_big: yup
    .string()
    .required('La url del poster grande es requerida!')
    .min(10, 'El minimo de caracteres aceptados son 10!')
    .max(500, 'El maximo de caracteres aceptados son 500!'),
  price: yup
    .string()
    .required('El precio es requerido!')
    .min(1, 'El minimo de caracteres aceptados es 1!')
    .max(50, 'El maximo de caracteres aceptados son 50!'),
  available: yup
    .boolean()
    .required('Es necesario saber ni el curso esta disponible actualmente!')
})

const AddCourse = () => {
  const { id } = useParams()
  const classes = useStyles()
  const history = useHistory()
  const apiHook = useApi()
  const [mode, setMode] = useState('create')
  // const [course, setCourse] = useState(defaultValues)
  const [values, setValues] = useState(defaultValues)

  const formik = useFormik({
    initialValues: values,
    validationSchema: formSchema,
    onSubmit: () => onSubmit()
  })

  const onNavigate = (to) => {
    history.push(to)
  }

  const getId = () => Math.round(Math.random() * (10000 - 1) + 1)

  const onChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }))
  }

  const onDelete = (id) => {
    const confirm = window.confirm('Desea eliminar este curso ?')
    if (confirm) {
      apiHook.deleteOneCourse(id).then((res) => onNavigate(`/`))
    }
  }

  const onSubmit = () => {
    if (mode === 'create') {
      const id = getId()
      const course = { ...values, id }
      apiHook.createOneCourse(course).then((res) => {
        onNavigate(`/courses/${res.data.id}`)
      })
    } else if (mode === 'update') {
      const course = values
      apiHook.updateOneCourse(course).then((res) => {
        onNavigate(`/courses/${res.data.id}`)
      })
    }
  }

  useEffect(() => {
    if (id) {
      setMode('update')
      apiHook.getOneCourse(id).then((res) => {
        setValues(res.data)
        formik.setValues(res.data)
      })
    } else {
      setMode('create')
      formik.handleReset()
      // formik.setValues(defaultValues)
      setValues(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <article className={classes.grid}>
      <div>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Typography
            className={classes.u_margin_bottom}
            variant='h5'
            component='h2'>
            {mode === 'create'
              ? 'Ingresa los datos del nuevo curso'
              : `Actualiza los datos del curso: ${values.name}`}
          </Typography>
          {mode === 'create' && (
            <Typography
              className={classes.u_margin_bottom}
              color='textSecondary'
              variant='body1'
              component='p'>
              Puedes vaciar todo el formulario pulsando el boton en la parte
              inferior!
            </Typography>
          )}

          <TextField
            className={classes.field}
            name='name'
            type='text'
            label='Ingresa un nombre'
            variant='outlined'
            value={formik.values.name}
            helperText={
              formik.errors.name && formik.touched.name && formik.errors.name
            }
            error={formik.errors.name && formik.touched.name}
            onChange={(e) => {
              formik.handleChange(e)
              onChange(e)
            }}
          />
          <TextField
            className={classes.field}
            name='description'
            type='text'
            multiline={true}
            rows={5}
            label='Ingresa una descripcion'
            variant='outlined'
            value={formik.values.description}
            helperText={
              formik.errors.description &&
              formik.touched.description &&
              formik.errors.description
            }
            error={formik.errors.description && formik.touched.description}
            onChange={(e) => {
              formik.handleChange(e)
              onChange(e)
            }}
          />
          <TextField
            className={classes.field}
            name='url_poster_medium'
            type='text'
            label='Ingresa la url del poster en tamaño mediano'
            variant='outlined'
            value={formik.values.url_poster_medium}
            helperText={
              formik.errors.url_poster_medium &&
              formik.touched.url_poster_medium &&
              formik.errors.url_poster_medium
            }
            error={
              formik.errors.url_poster_medium &&
              formik.touched.url_poster_medium
            }
            onChange={(e) => {
              formik.handleChange(e)
              onChange(e)
            }}
          />
          <TextField
            className={classes.field}
            name='url_poster_big'
            type='text'
            label='Ingresa la url del poster en tamaño grande'
            variant='outlined'
            value={formik.values.url_poster_big}
            helperText={
              formik.errors.url_poster_big &&
              formik.touched.url_poster_big &&
              formik.errors.url_poster_big
            }
            error={
              formik.errors.url_poster_big && formik.touched.url_poster_big
            }
            onChange={(e) => {
              formik.handleChange(e)
              onChange(e)
            }}
          />
          <TextField
            className={classes.field}
            name='price'
            type='text'
            label='Ingresa un precio para el curso'
            variant='outlined'
            value={formik.values.price}
            helperText={
              formik.errors.price && formik.touched.price && formik.errors.price
            }
            error={formik.errors.price && formik.touched.price}
            onChange={(e) => {
              formik.handleChange(e)
              onChange(e)
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>$</InputAdornment>
              )
            }}
          />
          <FormControl className={classes.field}>
            <Select
              labelId='select'
              id='select'
              name='available'
              variant='outlined'
              value={formik.values.available}
              onChange={(e) => {
                formik.handleChange(e)
                onChange(e)
              }}>
              <MenuItem value={true}>Disponible</MenuItem>
              <MenuItem value={false}>No disponible</MenuItem>
            </Select>
            <FormHelperText>
              {formik.errors.available &&
                formik.touched.available &&
                formik.errors.available}
            </FormHelperText>
          </FormControl>

          <div className={classes.buttons}>
            <Button
              type='submit'
              className={classes.button}
              variant='contained'
              color='primary'>
              {mode}
            </Button>
            {mode === 'create' && (
              <Button
                className={classes.button}
                variant='contained'
                color='secondary'
                onClick={() => {
                  formik.handleReset()
                  setValues(defaultValues)
                }}>
                Reset data
              </Button>
            )}
            {mode === 'update' && (
              <Button
                className={classes.button}
                variant='contained'
                color='secondary'
                onClick={() => onDelete(values.id)}>
                Delete
              </Button>
            )}
          </div>
        </form>
      </div>
      <div>
        <UCard course={values} disabled={true} />
      </div>
    </article>
  )
}
export default AddCourse

const useStyles = makeStyles((theme) =>
  createStyles({
    grid: {
      display: 'grid',
      gridTemplateColumns: '35% 35%',
      gridGap: theme.spacing(3),
      justifyContent: 'center'
      // padding: `0 ${theme.spacing(3)}`
    },
    form: {
      width: '100%'
    },
    field: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    buttons: {
      textAlign: 'center'
    },
    button: {
      width: '40%',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    u_margin_bottom: {
      marginBottom: theme.spacing(3)
    }
  })
)
