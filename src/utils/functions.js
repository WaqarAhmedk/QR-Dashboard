import moment from 'moment'

function formatDate(date) {
  return moment(date).format('MMMM DD, YYYY')
}
const handleAccess=(role)=>{
  if (role==='actingAdmin')
    return 'Full Access'
  else if(role==='editor')
    return 'Editor Access'
  else if(role==='viewer')
    return 'View Access'
  else if(role==='whiteLabel')
    return 'White Label'
}

export {formatDate,handleAccess}
