import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import {
  Button,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogActions
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import {
  Block,
  Check,
  DeleteRounded,
  CreateRounded,
  BorderColor,
  RotateLeftRounded
} from '@material-ui/icons'
import { useFormik } from 'formik'

import useApi from '../../hooks/useApi.hook'

import UCourse from '../utils/UCourse.component'

import * as yup from 'yup'

const ISValues = {
  id: 0,
  name: '',
  description: '',
  poster: '',
  price: 0,
  level: 'basic',
  available: false
}

const formErrorSchema = yup.object().shape({
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
  poster: yup
    .string()
    .required('La url del poster es requerida!')
    .min(10, 'El minimo de caracteres aceptados son 10!')
    .max(500, 'El maximo de caracteres aceptados son 500!'),
  price: yup
    .number()
    .required('El precio es requerido!')
    .min(0, 'El precio minimo aceptado es es 0!')
    .max(5000, 'El precio maximo aceptado es es 5000!'),
  level: yup.string().required('El nivel es requerido!'),
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
  const [values, setValues] = useState(ISValues)
  const [dialog, setDialog] = useState(false)
  const formik = useFormik({
    initialValues: values,
    validationSchema: formErrorSchema,
    onSubmit: () => onSubmit()
  })

  const onOpen = () => setDialog(true)

  const onClose = () => setDialog(false)

  const onNavigate = (to) => {
    history.push(to)
  }

  const getId = () => Math.round(Math.random() * (10000 - 1) + 1)

  const onChange = (event) => {
    if (event.target.name === 'price') {
      if (event.target.value.length !== 0) {
        setValues((prevValues) => ({
          ...prevValues,
          [event.target.name]: parseFloat(event.target.value)
        }))
      } else {
        setValues((prevValues) => ({
          ...prevValues,
          [event.target.name]: 0
        }))
      }
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: event.target.value
      }))
    }
  }

  const onDelete = (id) => {
    apiHook.deleteOneCourse(id).then(() => onNavigate(`/`))
  }

  const onSubmit = () => {
    if (mode === 'create') {
      const id = getId()
      const course = { ...values, id }
      // console.log(course)
      apiHook.createOneCourse(course).then((res) => {
        onNavigate(`/courses/${res.data.id}`)
      })
    } else if (mode === 'update') {
      const course = values
      // console.log(course)
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
      setValues(ISValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <article className={classes.AddCourse}>
        <form className={classes.AddCourse_form} onSubmit={formik.handleSubmit}>
          <Typography className={classes.u_mb1} variant='h5' component='h2'>
            {mode === 'create'
              ? 'Ingresa los datos del nuevo curso'
              : `Actualiza los datos del curso: ${values.name}`}
          </Typography>
          {mode === 'create' && (
            <Typography
              className={classes.u_mb3}
              color='textSecondary'
              variant='body1'
              component='p'>
              Puedes vaciar todo el formulario pulsando el boton en la parte
              inferior!
            </Typography>
          )}

          <TextField
            className={classes.AddCourse_field}
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
            className={classes.AddCourse_field}
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
            className={classes.AddCourse_field}
            name='poster'
            type='text'
            label='Ingresa la url del poster'
            variant='outlined'
            value={formik.values.poster}
            helperText={
              formik.errors.poster &&
              formik.touched.poster &&
              formik.errors.poster
            }
            error={formik.errors.poster && formik.touched.poster}
            onChange={(e) => {
              formik.handleChange(e)
              onChange(e)
            }}
          />
          <TextField
            className={classes.AddCourse_field}
            name='price'
            type='number'
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
          <FormControl variant='outlined' className={classes.AddCourse_field}>
            <InputLabel id='level-label'>Ingresa un nivel</InputLabel>
            <Select
              labelId='level-label'
              id='level'
              name='level'
              value={formik.values.level}
              onChange={(e) => {
                formik.handleChange(e)
                onChange(e)
              }}>
              <MenuItem value='basic'>Basic</MenuItem>
              <MenuItem value='medium'>Medium</MenuItem>
              <MenuItem value='advanced'>Advanced</MenuItem>
            </Select>
            <FormHelperText>
              {formik.errors.available &&
                formik.touched.available &&
                formik.errors.available}
            </FormHelperText>
          </FormControl>

          <FormControl variant='outlined' className={classes.AddCourse_field}>
            <InputLabel id='select-label'>Ingresa un estado</InputLabel>
            <Select
              labelId='select-label'
              id='select'
              name='available'
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

          <div className={classes.AddCourse_actions}>
            <Button
              type='submit'
              className={classes.AddCourse_actionsButton}
              variant='outlined'
              color='primary'
              startIcon={
                mode === 'create' ? <CreateRounded /> : <BorderColor />
              }>
              {mode}
            </Button>
            {mode === 'create' && (
              <Button
                className={classes.AddCourse_actionsButton}
                variant='outlined'
                color='secondary'
                startIcon={<RotateLeftRounded />}
                onClick={() => {
                  formik.handleReset()
                  setValues(ISValues)
                }}>
                Reset
              </Button>
            )}
            {mode === 'update' && (
              <Button
                className={classes.AddCourse_actionsButton}
                onClick={() => onOpen()}
                variant='outlined'
                color='secondary'
                startIcon={<DeleteRounded />}>
                Delete
              </Button>
            )}
          </div>
        </form>
        <div>
          {/* Este div es necesario para que Course_content tengan su altura por defecto y no la que le asigna el grid template rows */}
          <UCourse course={values} disabledRedirect={true} />
        </div>
      </article>

      <Dialog open={dialog} onClose={onClose}>
        <DialogTitle>
          {'This course will be eliminated, do you agree?'}
        </DialogTitle>
        <DialogActions className={classes.AddCourse_actions}>
          <Button
            className={classes.AddCourse_actionsButton}
            onClick={() => onClose()}
            variant='outlined'
            color='primary'
            startIcon={<Block />}>
            disagree
          </Button>
          <Button
            className={classes.AddCourse_actionsButton}
            onClick={() => {
              onClose()
              onDelete(values.id)
            }}
            variant='contained'
            color='secondary'
            startIcon={<Check />}>
            agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default AddCourse

const useStyles = makeStyles((theme) =>
  createStyles({
    AddCourse: {
      display: 'grid',
      gridTemplateColumns: '50% 35%',
      gridGap: theme.spacing(3),
      justifyContent: 'center'
    },
    AddCourse_form: {
      width: '100%'
    },
    AddCourse_field: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    AddCourse_actions: {
      display: 'flex',
      justifyContent: 'center'
    },
    AddCourse_actionsButton: {
      width: '100%',
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5)
    },
    u_mb1: {
      marginBottom: theme.spacing(1)
    },
    u_mb3: {
      marginBottom: theme.spacing(3)
    }
  })
)
