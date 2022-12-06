import { Button, TextField, Typography } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme } from '@mui/material/styles'
import CustomPaper from '../../components/CustomPaper'

import { Link } from 'react-router-dom'
import { Stepper, Step, StepLabel } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';

const steps = ["アカウント登録", "基本情報", "学校情報"];

const Step3 = ({ redirectTo = '/' }) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { toggleThis } = useMenu()
  const { setAuth } = useAuth()

  const subjects = [
    {label: '国語'}, 
    {label: '数学'}, 
  ];

  function handleSubmit(event) {
    event.preventDefault()
    authenticate({
      displayName: 'User',
      email: username,
    })
  }

  const authenticate = (user) => {
    setAuth({ isAuthenticated: true, ...user })
    toggleThis('isAuthMenuOpen', false)

    let from = new URLSearchParams(location.search).get('from')

    if (from) {
      navigate(from, { replace: true })
    } else {
      navigate(redirectTo, { replace: true })
    }
  }

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'サインアップ',
        defaultMessage: '',
      })}
      onBackClick={() => {
        navigate(-1)
      }}
    >
      <CustomPaper elevation={6}>
        <div
          className={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `100%`,
          }}
        >
          <Typography component="h1" variant="h5">
            {/* {intl.formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })} */}
            サインアップ
          </Typography>

          {/* <Stepper>
            <Step key="">
              <StepLabel>{steps[0]}</StepLabel>
            </Step>
          </Stepper> */}

          <Stepper activeStep={2} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
          </Stepper>

          <form
            style={{ marginTop: theme.spacing(1) }}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              // value={username}
              // onInput={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              // label={intl.formatMessage({
              //   id: 'username',
              //   defaultMessage: 'Username',
              // })}
              label="学校名"
              name="school"
              // autoComplete="username"
              autoFocus
            />
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={subjects}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="教科名" />}
            />
            <TextField
              // value={password}
              // onInput={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="club"
              label={intl.formatMessage({
                id: '部活動',
                defaultMessage: '',
              })}
              placeholder=""
              id="club"
              // autoComplete="current-password"
            />
            <TextField
              // value={password}
              // onInput={(e) => setPassword(e.target.value)}
              type="number"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="dob"
              label={intl.formatMessage({
                id: '勤続年数',
                defaultMessage: '',
              })}
              placeholder="1"
              id="dob"
              // autoComplete="current-password"
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">役職</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                <FormControlLabel value="" control={<Radio />} label="担任" />
                <FormControlLabel value="" control={<Radio />} label="学年主任" />
                <FormControlLabel value="" control={<Radio />} label="生活指導" />
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: theme.spacing(3, 0, 2) }}
            >
              {/* {intl.formatMessage({ id: 'sign_up', defaultMessage: '登録' })} */}
              登録
            </Button>
          </form>
        </div>
      </CustomPaper>
    </Page>
  )
}

export default Step3