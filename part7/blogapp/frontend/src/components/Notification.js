import { useStoreValue } from '../StoreContext'
import { Alert } from '@mui/material'

const Notification = () => {
  const info = useStoreValue().notice
  if (!info.message) {
    return
  }

  // const style = {
  //   color: info.type === 'error' ? 'red' : 'green',
  //   background: 'lightgrey',
  //   fontSize: 20,
  //   borderStyle: 'solid',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  // }

  // return <div style={style}>{info.message}</div>
  return <Alert severity={info.type}>{info.message}</Alert>
}

export default Notification
