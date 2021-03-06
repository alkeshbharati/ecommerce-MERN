import AccountHeaders from '../components/Account/AccountHeader'
import AccountOrders from '../components/Account/AccountOrders'
import AccountPermissions from '../components/Account/AccountPermissions'
import { parseCookies} from 'nookies'
import baseUrl from '../utils/baseUrl'
import Axios from 'axios'

function Account({ user , orders}) {
  return( 
  <>
    <AccountHeaders {...user}/>
    <AccountOrders orders ={orders}/>
    { user.role === 'root' && <AccountPermissions currentUserId = {user._id} />}
  </>
  )
}

Account.getInitialProps = async ctx => {
  const { token } =  parseCookies(ctx)
  if(!token){
    return { order : [] }
  }
  const payload = { headers : { Authorization : token }}
  const url = `${baseUrl}/api/orders`
  const response = await Axios.get(url,payload)
  return response.data
}

export default Account;
