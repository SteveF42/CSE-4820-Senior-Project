import styled from "@emotion/styled";
import { Button } from "@mui/material";


export const YellowButton = styled(Button)(() => ({
    color: 'white',
    borderColor: '#FFA439',
    ':hover': {
        backgroundColor: '#FFA439',
        borderColor: '#FFA439'
    }
}))