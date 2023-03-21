import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { TextFieldMain } from '../components/dyshText'

const MainSearch = (props) => {
  return (
    <div {...props}>
      <TextFieldMain
        
        sx={{ width: '100%', zIndex: 0 }}
        label={
          <>
            <SearchIcon className='searchLabel' sx={{ color: 'grey', 'paddingRight': '8px' }} />
            Search Recipe
          </>
        }
      />
    </div>
  )
}

export default MainSearch