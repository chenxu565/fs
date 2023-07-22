import { useNoticeValue } from "../NoticeContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  // if (true) return null
  const noticeValue = useNoticeValue()
  
  return (
    noticeValue 
      ? <div style={style}>{noticeValue}</div>
      : null
  )
}

export default Notification
