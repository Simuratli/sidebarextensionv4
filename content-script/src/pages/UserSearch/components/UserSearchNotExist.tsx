import React,{useEffect} from 'react'
import { useStore } from '../../../store'

const UserSearchNotExist = () => {
  const {name,fullname} = useStore()
  useEffect(() => {
    console.log("NOT EXIST",fullname)
  }, [])
  
  return (
    <div>UserSearchNotExist --- {fullname}</div>
  )
}

export default UserSearchNotExist