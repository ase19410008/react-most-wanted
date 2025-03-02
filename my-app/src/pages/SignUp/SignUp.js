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

const steps = ["アカウント登録", "基本情報", "在籍情報"];

const SignUp = ({ redirectTo = '/' }) => {
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
        defaultMessage: 'サインアップ',
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
            {intl.formatMessage({ id: 'サインアップ', defaultMessage: 'サインアップ' })}
          </Typography>

          <Stepper activeStep={0} alternativeLabel>
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
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={intl.formatMessage({
                id: '教師ID',
                defaultMessage: '',
              })}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={intl.formatMessage({
                id: 'パスワード',
                defaultMessage: 'パスワード',
              })}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              value={confirmPassword}
              onInput={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password_confirm"
              label={intl.formatMessage({
                id: '再確認用パスワード',
                defaultMessage: '再確認用パスワード',
              })}
              type="password"
              id="password_confirm"
              autoComplete="current-password"
            />
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: theme.spacing(3, 0, 2) }}
            >
              {intl.formatMessage({ id: 'sign_up', defaultMessage: 'Step2' })}
            </Button> */}
            <Link to="step2">基本情報</Link>
          </form>
        </div>
      </CustomPaper>
    </Page>
  )
}

export default SignUp
