import { Button } from '@mui/material'
import styled from '@emotion/styled'


export const LoginButton = styled(Button)(() => ({
    color: 'white',
    borderColor: '#41597E',
    background: '#41597E',
    borderRadius:'10px',
    ':hover': {
        backgroundColor: '#364967',
        borderColor: '#364967'
    },
    ":disabled": {
        color: '#41597F',

    }
}))