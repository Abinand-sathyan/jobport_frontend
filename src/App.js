import './App.css';
import {Routes,Route} from "react-router-dom"
import Landingpage from './pages/Landingpage';
import ErrorHandling from './pages/ErrorHandling';


// Protected  Routes

import AdminPrivteRoute from './Utils/AdminPrivteRoute';
import UserPrivateRoute from './Utils/UserPrivateRoute';
import RecruiterPrivateRoute from './Utils/RecruiterPrivateRoute';




// client pages

import Loginpage from './pages/user/Loginpage';
import Homepage from './pages/user/Homepage'
import Signupage from './pages/user/Signupage';
import FindJobs from './pages/user/FindJobs';
import Searchjobs from './pages/user/Searchjobs';
import Resume from './pages/user/Resume'
import Profile from './pages/user/Profile'
import Applied from './pages/user/Applied'
import Messages from './pages/user/Messagers'
import Otpvrification from './pages/user/OtpVerification'
import VerifNumber from './pages/user/VerifNumber';
import Restpassword from './pages/user/Restpassword'; 
import Fgotp from './pages/user/Fgotp';


// recuiter pages
import Reqloginpage from './pages/recuiter/Reqloginpage'
import Reqsignupage from './pages/recuiter/Reqsignuppage'
import Reqhomepage from './pages/recuiter/Reqhomepage'
import Myjobspage from './pages/recuiter/Myjobspage'
import Subscription from './pages/recuiter/Subscription'
import Paymentpage from './pages/recuiter/Paymentpage'
import EmployerResume from './pages/recuiter/EmployerResume'
import Messagers from './pages/recuiter/Messagers'
import ProfileReq from './pages/recuiter/ProfileReq';
import Hiredcandidates from './pages/recuiter/hiredcandidate';



// admin pages
import Adminloginpage from './pages/admin/Adminloginpage'
import Adminsignuppage from './pages/admin/Adminsignuppage'
import Adminhomepage from './pages/admin/Adminhomepage';
import Adminuserpage from './pages/admin/Adminuserpage';
import AdminRecruiterpage from './pages/admin/Adminrecruiterpage';
import Adminjobspage from './pages/admin/Adminjobspage';
import AdminSubscription from './pages/admin/AdminSubscription';
import AdminAddsubscription from './pages/admin/AdminAddsubscription';
import Dasboard from './pages/admin/Dasboard';



function App() {
  return (
    <div className="App">
     <Routes>
     
     <Route element={<Landingpage/>} exact path='/'/>
      
      {/* user routes */}
      
      <Route element={<Loginpage/>} exact path='/login'/>
      <Route element={<Signupage/>} path='/signup'/>
      <Route element={<Otpvrification/>} path='/otpverification'/>
      <Route element={<VerifNumber/>} path='/verifynumber'/>
      <Route element={<Restpassword/>} path='/resetpassword'/>
      <Route element={<Fgotp/>} path='/fgtotp'/>

      <Route element={<UserPrivateRoute/>}>
      <Route element={<Homepage/>}  path='/home'/>
      <Route element={<Resume/>}  path='/resumebuild'/>
      <Route element={<FindJobs />} path='/findjobs'/>
      <Route element={<Searchjobs />} path='/search'/>
      <Route element={<Profile/>} path='/profile'/>
      <Route element={<Applied/>} path='/jobapplied'/>
      <Route element={<Messages/>} path='/messages'/>
      </Route>
      {/* recruiter router */}
      
      <Route element={<Reqloginpage/>} exact path='/recruiter/login'/>
      <Route element={<Reqsignupage/>} path='/recuiter/signup'/>

      <Route element={<RecruiterPrivateRoute/>}>
      <Route element={<Reqhomepage/>}  path='/recuiter/reqhome'/>
      <Route element={<Myjobspage />} path='/recruiter/myjobs'/>
      <Route element={<Subscription />} path='/recruiter/subscription'/>
      <Route element={<Paymentpage/>} path='/recruiter/payment'/>
      <Route element={<EmployerResume/>} path='/recruiter/emplyerresume'/>
      <Route element={<Messagers/>} path='/recruiter/messages'/>
      <Route element={<ProfileReq/>} path='/recruiter/profile'/>
      <Route element={<Hiredcandidates/>} path='/recruiter/hiredcandidates'/>
      </Route>
     {/* admin router */}   

     <Route element={<Adminloginpage/>} exact path='/admin/login'/>
     <Route element={<Adminsignuppage/>} path='/admin/signup'/>
     
     <Route element={<AdminPrivteRoute/>}>
     <Route element={<Adminhomepage/>}  path='/admin/home'/>
     <Route element={<Adminuserpage/>}  path='/admin/user'/>
     <Route element={<AdminRecruiterpage/>}  path='/admin/recruiter'/>
     <Route element={<Adminjobspage/>}  path='/admin/jobs'/>
     <Route element={<AdminSubscription/>}  path='/admin/subscription'/>
     <Route element={<AdminAddsubscription/>}  path='/admin/addsubscription'/>
     <Route element={<Dasboard/>}  path='/admin/dashboard'/>
     </Route>

     <Route path="/*" element={<ErrorHandling />}></Route>
    
    </Routes>
    </div>
  );
}

export default App;
