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
import Step3 from './Step3'

const steps = ["アカウント登録", "基本情報", "学校情報"];

const Step2 = ({ redirectTo = '/' }) => {
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
        id: 'sign_up',
        defaultMessage: ' Sign up',
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

          <Stepper activeStep={1} alternativeLabel>
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
              value={username}
              onInput={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={intl.formatMessage({
                id: '氏名',
                defaultMessage: '氏名',
              })}
              placeholder="佐久間　雄大"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="dob"
              label={intl.formatMessage({
                id: '生年月日',
                defaultMessage: '',
              })}
              placeholder="2000/08/28"
              id="dob"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="personal"
              label={intl.formatMessage({
                id: '性格',
                defaultMessage: '',
              })}
              placeholder=""
              id="personal"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="edu"
              label={intl.formatMessage({
                id: '最終学歴',
                defaultMessage: '',
              })}
              placeholder="国際情報工科自動車大学校"
              id="edu"
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">性別</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                <FormControlLabel value="female" control={<Radio />} label="女性" />
                <FormControlLabel value="male" control={<Radio />} label="男性" />
              </RadioGroup>
            </FormControl>
            <Typography>プロフィール画像</Typography>
            <Button variant="contained" component="label"
              style={{ margin: theme.spacing(3, 0, 2) }}>
              アップロード
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: theme.spacing(3, 0, 2) }}
            >
              {intl.formatMessage({ id: 'sign_up', defaultMessage: 'Step3' })}
            </Button> */}
            <Link to="../step3" relative='path'>学校情報</Link>
          </form>
        </div>
      </CustomPaper>
    </Page>
  )
}

export default Step2
