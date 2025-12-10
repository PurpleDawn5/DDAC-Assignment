// src/pages/PropertyDetails.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PROPERTIES } from './PropertiesData';
import './Properties.css';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const property = MOCK_PROPERTIES.find(p => p.id === id);

  if (!property) {
    return (
      <div className="page-wrapper">
        <p>Property not found.</p>
        <button className="back-button" onClick={() => navigate('/properties')}>
           ← Go Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
       {/* Updated nicer back button */}
       <button className="back-button" onClick={() => navigate('/properties')}>
         <span>←</span> Back to Listings
       </button>

       <div style={{ background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
         <img 
            src={property.imageUrl} 
            alt={property.title} 
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '15px' }} 
         />

         <div style={{ marginTop: '30px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', marginTop: 0 }}>{property.title}</h1>
            <p style={{ color: '#888', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ backgroundColor: '#e3dfff', padding: '4px', borderRadius: '50%', fontSize:'0.9rem' }}>🏠</span>
              {property.address}
            </p>
            
            <div style={{ display: 'flex', gap: '25px', margin: '25px 0', fontSize: '1.1rem', color: '#888' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🛏️ {property.beds} Beds</span>
               <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🛁 {property.baths} Baths</span>
               <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>📐 {property.sqft.toLocaleString()} Sqft</span>
            </div>

            <h2 style={{ color: '#6c5ce7', fontSize: '2rem', margin: '20px 0' }}>
              ${property.price.toLocaleString()}
            </h2>
            
            <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />

            <h3 style={{ fontSize: '1.4rem' }}>Description</h3>
            <p style={{ lineHeight: '1.7', color: '#555', fontSize: '1.05rem' }}>
              {property.description}
            </p>

            {/* --- New Agent Details Section (Replaces the old button) --- */}
            <div className="agent-section-card">
              <h3 className="agent-section-title">Listing Agent</h3>
              <div className="agent-profile-wrapper">
                 <img 
                   src={property.agent.imageUrl} 
                   alt={property.agent.name} 
                   className="agent-image-large" 
                 />
                 <div className="agent-details">
                    <h4>{property.agent.name}</h4>
                    {/* Makes the phone number clickable to call */}
                    <a href={`tel:${property.agent.phone}`} className="agent-phone-link">
                       📞 {property.agent.phone}
                    </a>
                 </div>
              </div>
            </div>

         </div>
       </div>
    </div>
  );
};

export default PropertyDetails;