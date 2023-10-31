import BecomeAnArtisanScreen from "./screens/become_an_artisan_screen/BecomeAnArtisanScreen";
import Communities from "./screens/communities/Communities";
import MyCommunitiesScreen from "./screens/communities/my_communites_screen/MyCommunitiesScreen";
import ExhibitionScreen from "./screens/exhibition_screen/ExhibitionScreen";
import HomeScreen from "./screens/home_screen/HomeScreen";
import ListACommunityScreen from "./screens/list_a_community_screen/ListACommunityScreen";
import ProfileScreen from "./screens/profile_screen/ProfileScreen";
import WorkshopRegistrationScreen from "./screens/workshops_registration_screen/WorkshopsRegistrationScreen";
import WorkshopsScreen from "./screens/workshops_screen/WorkshopsScreen";
import { Route, Link, Routes } from "react-router-dom";
import ErrorPage from "./screens/error_page/ErrorPage";
import DashboardScreen from "./screens/dashboard_screen/DashboardScreen";
import MessagesScreen from "./screens/messages_screen/MessagesScreen";
import VirtualDrawingScreen from "./screens/virtual_drawing_screen/VirtualDrawingScreen";
import BlogsScreen from "./screens/blogs_screen/Blogs";
import AddBlog from "./screens/blogs_screen/AddBlog";
import WorkshopCreationScreen from "./screens/workshop_creation_screen/WorkshopCreationScreen";
import ExhibitionCardDetailsScreen from "./screens/exhibition_screen/ExhibitionCardDetailsScreen";
import UploadCraftScreen from "./screens/upload_craft_screen/UploadCraftScreen";
import HankoAuth from "./components/HankoAuth";
import HankoAuthScreen from "./screens/hanko_auth_screen/HankoAuthScreen";
import MessageSendingScreen from "./screens/messages_screen/MessageSendingScreen";
import FullBlog from "./screens/blogs_screen/FullBlog";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route path="/explore-communities" element={<Communities />} />
        <Route path="/hanko-auth" element={ <HankoAuthScreen/>} />
        <Route path="/exhibition" element={<ExhibitionScreen />} />
        <Route path="/workshops" element={<WorkshopsScreen />} />
        <Route path="/workshop-registration/:workshopId" element={<WorkshopRegistrationScreen />} />
        <Route path="/become-an-artisan" element={<BecomeAnArtisanScreen />} />
        <Route path="/list-a-community" element={<ListACommunityScreen />} />
        <Route path="/blogs" element={<BlogsScreen />} />
        <Route path="/workshop-creation" element={<WorkshopCreationScreen />} />
        <Route path="/my-communities" element={<MyCommunitiesScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/upload-craft" element={<UploadCraftScreen />} />
        <Route path="/project-details/:projectId" element={<ExhibitionCardDetailsScreen/>}/> 
        <Route path="/messages" element={<MessagesScreen />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/blog/:blogId" element={<FullBlog />} />
        <Route path="/send-message" element={<MessageSendingScreen />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="" element={<ErrorPage />} />
        <Route element={<ErrorPage />} />
        <Route path = "/dashboard" element={<DashboardScreen/>}/>
        <Route path = "/virtual-drawing-screen" element={<VirtualDrawingScreen/>}/>
      </Routes>

    </>
  );
}

export default App;
