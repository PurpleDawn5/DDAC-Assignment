import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PROPERTIES } from './PropertiesData';
import './PropertyDetails.css'; // <--- Import the new CSS file

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const property = MOCK_PROPERTIES.find(p => p.id === id);

  if (!property) {
    return (
      <div className="property-details-wrapper">
        <p style={{ color: 'var(--text-primary)' }}>Property not found.</p>
        <button className="back-btn" onClick={() => navigate('/properties')}>
           ← Go Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="property-details-wrapper">
       {/* Back Button */}
       <button className="back-btn" onClick={() => navigate('/properties')}>
         <span>←</span> Back to Listings
       </button>

       {/* Main Content Card */}
       <div className="details-card">
         <img 
            src={property.imageUrl} 
            alt={property.title} 
            className="details-hero-img"
         />

         <div>
            <h1 className="details-title">{property.title}</h1>
            
            <p className="details-address">
              <span style={{ backgroundColor: '#e3dfff', padding: '4px', borderRadius: '50%', fontSize:'0.9rem' }}>🏠</span>
              {property.address}
            </p>
            
            <div className="details-stats">
               <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🛏️ {property.beds} Beds</span>
               <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🛁 {property.baths} Baths</span>
               <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>📐 {property.sqft.toLocaleString()} Sqft</span>
            </div>

            <h2 className="details-price">
              ${property.price.toLocaleString()}
            </h2>
            
            <hr className="details-divider" />

            <h3 className="details-section-header">Description</h3>
            <p className="details-description">
              {property.description}
            </p>

            {/* --- Agent Section --- */}
            <div className="agent-card">
              <h3 className="agent-header">Listing Agent</h3>
              <div className="agent-row">
                 <img 
                   src={property.agent.imageUrl} 
                   alt={property.agent.name} 
                   className="agent-avatar" 
                 />
                 <div className="agent-info">
                    <h4>{property.agent.name}</h4>
                    <a href={`tel:${property.agent.phone}`} className="agent-contact">
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