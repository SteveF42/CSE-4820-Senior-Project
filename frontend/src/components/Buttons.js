import { Button } from '@mui/material'
import styled from '@emotion/styled'


export const LoginButton = styled(Button)(() => ({
    color: 'grey',
    borderColor: '#41597E',
    background: '#CFE5E7',
    borderRadius: '10px',
    ':hover': {
        backgroundColor: '#aacacd',
        borderColor: '#364967'
    },
    ":disabled": {
        color: '#41597F',

    }
}))