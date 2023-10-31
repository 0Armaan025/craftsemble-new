import React from 'react';
import './features.css';
import FeatureCard from './featurecards/FeatureCard';

const Features = () => {
  return (
    <>
        <div className="features">
            

            <h1 className='featuresHeading'>Features</h1>
 

            <div className="featuresRow">
                
                <FeatureCard featureName="Hanko integrity!" featureImage="https://plus.unsplash.com/premium_photo-1681487746049-c39357159f69?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGFzc3dvcmR8ZW58MHx8MHx8fDA%3D" featureDescription="One thing that is super important is 'security', Hanko integrity makes sure that your credentials are secure, not even a pizza can hijack them!"/>
                
            
            </div>
            <div className="featuresRow">
                
                <FeatureCard featureName="Craftshops!" featureImage="https://plus.unsplash.com/premium_photo-1661690088942-d968065868d0?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29ya3Nob3B8ZW58MHx8MHx8fDA%3D" featureDescription="Craftshops are workshops specifically designed and organized by artisans/craftsmen who would love to share the knowledge with the world! make sure join one!"/>
                <FeatureCard featureName="Exhibition!" featureImage="https://images.unsplash.com/photo-1621685743771-fd5e13734ae6?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXhoaWJpdGlvbnxlbnwwfHwwfHx8MA%3D%3D" featureDescription="Exhibitions are showcasing opportunities for all craftsmen and artisans to show their craft/art to the world!"/>
            
            </div>

            <div className="featuresRow">
                
                <FeatureCard featureName="Communities" featureImage="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tbXVuaXRpZXN8ZW58MHx8MHx8fDA%3D" featureDescription="Communities are the houses where you can seek help, guide, learn or teach, or connect to the world, or just have fun! doing everything alone = no fun :)"/>
                <FeatureCard featureName="Blogs" featureImage="https://images.unsplash.com/photo-1485988412941-77a35537dae4?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvZ3N8ZW58MHx8MHx8fDA%3D" featureDescription="Do you love reading? If that's the case, blogs feature is just for you! you can read or write blogs and have fun as always! : )"/>
            
            </div>

            <div className="featuresRow">
                
                <FeatureCard featureName="Virtual Drawing" featureImage="https://images.unsplash.com/photo-1590103514966-5e2a11c13e21?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2hpdGVib2FyZHxlbnwwfHwwfHx8MA%3D%3D" featureDescription="Virtual drawing is something on which you can draw online, yeah, just a broken version of ms paint online ;)"/>
                <FeatureCard featureName="Dashboard" featureImage="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFzaGJvYXJkfGVufDB8fDB8fHww" featureDescription="You have your full dashboard access, where you can see all sorts of data you'd like to!"/>
            
            </div>

            
            <div className="featuresRow">
                
                <FeatureCard featureName="Under Development" featureImage="https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9ufGVufDB8fDB8fHww" featureDescription="NOTE: this website is in construction progress, after Nov 4(end of this hackathon), the work will be resumed again irrespective of winning or losing. "/>
                <FeatureCard featureName="Bugs?" featureImage="https://images.unsplash.com/photo-1550418290-a8d86ad674a6?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVycG9zZXxlbnwwfHwwfHx8MA%3D%3D" featureDescription="the website is created with an intention to remember about unsung creators (our craftsemen and artisans), the old ancient art which is still not too famous unlike our digital art? I mean, that should be fetaured too, right? they work hard as well! + they have been doing this for years!!!, also, all bugs you see on the website are features ;), this all will be updated super soon! thanks : D "/>

                
            
            </div>
            <br/><br/><br/>
        </div>
    </>
  )
}

export default Features;
