import { Button, Stack, TextField, Typography } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme } from '@mui/material/styles'
import CustomPaper from '../../components/CustomPaper'

import { Link } from 'react-router-dom'
import Enroll from './Enroll'
import Club from './Club'
import MainFeaturedPost from './MainFeaturedPost'

const mainFeaturedPost = {
  image: 'https://seiryojoho-h.fcs.ed.jp/wysiwyg/image/download/1/1/',
  imageText: 'main image description',
};

const School = ({ redirectTo = '/' }) => {
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
    <Page>
      <MainFeaturedPost post={mainFeaturedPost} />
      <CustomPaper elevation={1}>
        <div >
          <Stack direction="row" spacing={2}>
            <Typography>学校名</Typography>
            <Typography>福島県立清陵情報高等学校</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>創立年</Typography>
            <Typography>1980</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>住所</Typography>
            <Typography>福島県郡山市</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>最寄駅</Typography>
            <Typography>郡山</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>電話番号</Typography>
            <Typography>0248720180</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>メールアドレス</Typography>
            <Typography>info-@gmail.com</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>URL</Typography>
            <Typography>wiz.ac.jp</Typography>
          </Stack>
          <Typography>在校生徒(2022年)</Typography>
          <Enroll/>
          <Club />
        </div>
      </CustomPaper>
    </Page>
  )
}

export default School
