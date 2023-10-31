import React, { useEffect, useRef, useState } from 'react';

import Navbar from '../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import './dashboardscreen.css';
import { Hanko } from '@teamhanko/hanko-elements';
import Footer from '../components/footer/Footer';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firebase Firestore functions

const DashboardScreen = () => {
  const barChartRef1 = useRef();
  const barChartRef2 = useRef();

  const [userStats, setUserStats] = useState({ stars: 0, artsUploaded: 0 });

  useEffect(() => {
    const createBarChart = (ctx, data, labels, chartLabel) => {
      if (ctx.chart) {
        ctx.chart.destroy();
      }

      ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: chartLabel,
              data: data,
              backgroundColor: 'rgba(92, 190, 255, 0.523)',
              borderColor: 'rgb(0, 0, 0)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: [
              {
                beginAtZero: true,
              },
            ],
          },
        },
      });
    };

    // Function to fetch user statistics from Firebase
    const fetchUserStatistics = async () => {
      const db = getFirestore();
      const hankoApi = "https://6a2c061a-8cdd-4297-af87-11afe6acdd0a.hanko.io";
      const hanko = new Hanko(hankoApi);
          
      const currentUser = hanko.user.getCurrent();    
      const { id } = await currentUser;


      const userDocRef = doc(db, 'users', id);

      try {
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setUserStats({
            stars: userData.stars,
            artsUploaded: userData.artsUploaded,
          });

          // Update the chart with the fetched data
          createBarChart(
            barChartRef1.current,
            [userData.stars],
            ['Your stars'],
            'Stars'
          );
          createBarChart(
            barChartRef2.current,
            [userData.artsUploaded],
            ['Your crafts uploaded'],
            'Crafts Uploaded'
          );
        }
      } catch (error) {
        
      }
    };

    fetchUserStatistics();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-screen">
        <div className="sidebar">
          <div className="sidebar-item">
            <Link
              to="/dashboard"
              className="sidebar-item"
              style={{ color: 'white', margin: '0px', padding: '0px' }}
            >
              Dashboard
            </Link>
          </div>
          <Link
            to="/profile"
            className="sidebar-item"
            style={{ color: 'white', padding: '0px', margin: '0px' }}
          >
            <div className="sidebar-item">Profile</div>
          </Link>
          <Link
            to="/virtual-drawing-screen"
            className="sidebar-item"
            style={{ color: 'white', padding: '0px', margin: '0px' }}
          >
            <div className="sidebar-item">Virtual Drawing</div>
          </Link>
          <div className="sidebar-item">
            <Link
              to="/send-message"
              style={{ color: 'white', margin: '0px', padding: '0px', background: 'none' }}
            >
              Messages
            </Link>
          </div>
          <div className="sidebar-item">Logout</div>
        </div>
        <div className="content">
          <center>
            <h1 className="dashboardHeading" style={{ color: 'white' }}>
              🤔 Your Statistics 📔
            </h1>
            <div
              className="charts"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div className="chart-container">
                <canvas ref={barChartRef1}></canvas>
              </div>
              <div className="spacerNew" style={{ width: '50px' }}></div>
              <div className="chart-container">
                <canvas ref={barChartRef2}></canvas>
              </div>
            </div>
            {/* <br /> */}
            <h3 style={{color: "#b8c1ec"}}>Still in beta (dev. mode)</h3>
            <h3 style={{color: "#b8c1ec"}}>These are your statistics</h3>
            <h4 style={{color: "#b8c1ec"}}>Stars: {userStats.stars}</h4>
            <h4 style={{color: "#b8c1ec"}}>Arts Uploaded: {userStats.artsUploaded}</h4>
          </center>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardScreen;
