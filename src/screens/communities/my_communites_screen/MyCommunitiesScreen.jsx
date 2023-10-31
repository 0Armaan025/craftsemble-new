import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import CommuntiyCard from '../community_card/CommunityCard';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

const MyCommunitiesScreen = () => {
  return (
    <>
         <div className="myCommunities">
        <Navbar/>
        <br/>
        <br/>
            <h1 className="communitiesHeading" style={{color: "black"}}>Your Communities</h1>
            <center><h5>Wanna explore some? <Link to="/explore-communities">Here you can!</Link></h5></center>
            <br/>
            <CommuntiyCard communityImage="https://events.mlh.io/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGNYIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8d10b2f93840083610c0b108d4998e9c494526c3/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2QzNKbGMybDZaVWtpRGpFeU1EQjROakF3SVFZN0JsUT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--e95a9989726607e7d6ee02cb34a6a4d9a8bf29c1/social-website-AD-QHD.jpg" communityName="name" communityDescription="Ipsum est amet laborum est. Laboris enim enim do do qui ullamco exercitation laboris anim reprehenderit id magna reprehenderit est. Non dolor do occaecat mollit pariatur ea adipisicing. Fugiat excepteur amet nostrud aute eiusmod ea ad ad ea. Deserunt commodo proident laboris elit fugiat minim qui aute ex."/>
            <CommuntiyCard communityImage="https://events.mlh.io/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGNYIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8d10b2f93840083610c0b108d4998e9c494526c3/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2QzNKbGMybDZaVWtpRGpFeU1EQjROakF3SVFZN0JsUT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--e95a9989726607e7d6ee02cb34a6a4d9a8bf29c1/social-website-AD-QHD.jpg" communityName="name" communityDescription="Ipsum est amet laborum est. Laboris enim enim do do qui ullamco exercitation laboris anim reprehenderit id magna reprehenderit est. Non dolor do occaecat mollit pariatur ea adipisicing. Fugiat excepteur amet nostrud aute eiusmod ea ad ad ea. Deserunt commodo proident laboris elit fugiat minim qui aute ex."/>
            <CommuntiyCard communityImage="https://events.mlh.io/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGNYIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8d10b2f93840083610c0b108d4998e9c494526c3/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2QzNKbGMybDZaVWtpRGpFeU1EQjROakF3SVFZN0JsUT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--e95a9989726607e7d6ee02cb34a6a4d9a8bf29c1/social-website-AD-QHD.jpg" communityName="name" communityDescription="Ipsum est amet laborum est. Laboris enim enim do do qui ullamco exercitation laboris anim reprehenderit id magna reprehenderit est. Non dolor do occaecat mollit pariatur ea adipisicing. Fugiat excepteur amet nostrud aute eiusmod ea ad ad ea. Deserunt commodo proident laboris elit fugiat minim qui aute ex."/>
            <CommuntiyCard communityImage="https://events.mlh.io/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGNYIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8d10b2f93840083610c0b108d4998e9c494526c3/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2QzNKbGMybDZaVWtpRGpFeU1EQjROakF3SVFZN0JsUT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--e95a9989726607e7d6ee02cb34a6a4d9a8bf29c1/social-website-AD-QHD.jpg" communityName="name" communityDescription="Ipsum est amet laborum est. Laboris enim enim do do qui ullamco exercitation laboris anim reprehenderit id magna reprehenderit est. Non dolor do occaecat mollit pariatur ea adipisicing. Fugiat excepteur amet nostrud aute eiusmod ea ad ad ea. Deserunt commodo proident laboris elit fugiat minim qui aute ex."/>
       </div>
       <Footer/>
    </>
  );
}

export default MyCommunitiesScreen;
