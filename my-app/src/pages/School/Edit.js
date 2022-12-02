import { Button, TextField, Typography } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme } from '@mui/material/styles'
import CustomPaper from '../../components/CustomPaper'

const Edit = ({ redirectTo = '/' }) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const [username, setUsername] = useState('')
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

    >
      <CustomPaper elevation={1}>
        <div >
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
              label={intl.formatMessage({
                id: '学校名',
                defaultMessage: '',
              })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name=""
              label={intl.formatMessage({
                id: '創立年',
                defaultMessage: '',
              })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="addr"
              label={intl.formatMessage({
                id: '住所',
                defaultMessage: '',
              })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={intl.formatMessage({
                id: '最寄駅',
                defaultMessage: '',
              })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="tel"
              label={intl.formatMessage({
                id: '電話番号',
                defaultMessage: '',
              })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="mailaddr"
              label={intl.formatMessage({
                id: 'メールアドレス',
                defaultMessage: '',
              })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name=""
              label={intl.formatMessage({
                id: 'URL',
                defaultMessage: '',
              })}
              id=""
            />
            <Button variant="contained" component="label"
              style={{ margin: theme.spacing(3, 0, 2) }}>
              学校写真アップロード
              <input hidden accept="image/*" multiple type="file" />
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: theme.spacing(3, 0, 2) }}
            >
              {intl.formatMessage({ id: '更新'})}
            </Button>
          </form>
        </div>
      </CustomPaper>
    </Page>
  )
}

export default Edit
