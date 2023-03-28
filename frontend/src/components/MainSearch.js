import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { TextFieldMain } from '../components/dyshText'
import { redirect, useNavigate } from 'react-router-dom';

const MainSearch = (props) => {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate();

  const change = (e) => {
    setSearchInput(e.target.value)
  }

  const submit = async(e) => {
    if (e.code === 'Enter') {
      const ingredientList = searchInput.split(' ').map(x=> x.replace(',','')).join(',')
      console.log('first')
      navigate('/recipe?ingredients='+ingredientList)
    }
  }

  return (
    <div {...props}>
      <TextFieldMain

        sx={{ width: '100%', zIndex: 0 }}
        label={
          <>
            <SearchIcon className='searchLabel' sx={{ color: 'grey', 'paddingRight': '8px' }} />
            Input ingredients (chicken, rice, beans)
          </>
        }
        onChange={change}
        onKeyDown={submit}
        autoComplete='false'
      />
    </div>
  )
}

export default MainSearch