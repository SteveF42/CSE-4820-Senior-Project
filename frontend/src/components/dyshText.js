import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material'


export const TextFieldMain = styled(TextField)(() => ({
  color: "white",
  fieldset: "black",
  backgroundColor: "#B9B9B9",
  borderRadius: '10px',

  label: {
    color: "grey",
  },
  "& label.Mui-focused": {
    color: "#FFA439",
    '& .searchLabel':{
      color: '#FFA439',
    }
  },
  "& .MuiFormLabel-root": {
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: '10px',

    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      color: '#FFA439',
      borderColor: '#FFA439',
    },
    "&.Mui-focused fieldset": {
      borderColor: '#FFA439',
    },
    input: {
      color: "black",
    },
  },
}));


