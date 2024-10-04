import React,{useEffect} from 'react'
import { useStore } from '../../../store'

const UserSearchExist = () => {
  const {userBackendData} = useStore()

  useEffect(() => {
   console.log(userBackendData,'EXIST ')
  }, [])
  
  return (
    <div>UserSearchExist</div>
  )
}

export default UserSearchExist