// src/pages/Properties.tsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PROPERTIES } from './PropertiesData'; 
import type { Property } from './PropertiesData'; // Type-only import
import './Properties.css';

interface FilterState {
  locations: string[];
  types: string[];
  maxPrice: number;
}

const SidebarFilters: React.FC<{
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}> = ({ filters, setFilters }) => {

  const handleCheckboxChange = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const currentList = prev[category] as string[]; 
      const newList = currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];
      return { ...prev, [category]: newList };
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }));
  };

  return (
    <aside className="sidebar-container">
      {/* Location Filter */}
      <div className="filter-group">
        <div className="filter-header">
          <span>📍 Properties Location</span>
        </div>
        <div className="filter-options">
          {['London', 'Mexico'].map((loc) => (
            <label key={loc} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.locations.includes(loc)}
                onChange={() => handleCheckboxChange('locations', loc)}
              />
              <span className="checkmark"></span>
              {loc}
            </label>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="filter-group">
        <div className="filter-header">
          <span>🏠 Type Of Place</span>
        </div>
        <div className="filter-options">
          {['Bungalow', 'Apartment', 'Single Family Home'].map((type) => (
            <label key={type} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() => handleCheckboxChange('types', type)}
              />
              <span className="checkmark"></span>
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="filter-group">
        <div className="filter-header">
          <span>💰 Max Price: ${filters.maxPrice.toLocaleString()}</span>
        </div>
        <div className="filter-options">
          <input 
            type="range" 
            min="5000" 
            max="200000" 
            step="5000"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </aside>
  );
};

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div className="property-card">
      <div className="card-image-container">
        <img src={property.imageUrl} alt={property.title} className="card-image" />
      </div>
      <div className="card-content">
        <div className="card-header">
            <div className="card-icon-title-wrapper">
                <span className="location-icon-purple">🏠</span>
                <h3 className="card-title">{property.title}</h3>
            </div>
          <p className="card-address">{property.address}</p>
        </div>
        <div className="card-details">
          <div className="detail-item"><span>🛏️</span><span>{property.beds} Beds</span></div>
          <div className="detail-item"><span>🛁</span><span>{property.baths} Bath</span></div>
          <div className="detail-item"><span>📐</span><span>{property.sqft}ft</span></div>
        </div>
        <div className="card-footer">
          <span className="card-price">${property.price.toLocaleString()}</span>
          <button 
            className="inquiry-button"
            onClick={() => navigate(`/properties/${property.id}`)}
          >
            More Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export const PropertiesPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    locations: [],
    types: [],
    maxPrice: 200000, 
  });

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((p) => {
      if (filters.locations.length > 0 && !filters.locations.includes(p.location)) return false;
      if (filters.types.length > 0 && !filters.types.includes(p.type)) return false;
      if (p.price > filters.maxPrice) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">Properties</h1>
      </header>

      <div className="content-layout">
        <SidebarFilters filters={filters} setFilters={setFilters} />

        <main className="listing-container">
            <div className="listing-header">
                <h2>Properties</h2>
                <p>Showing {filteredProperties.length} Properties</p>
            </div>
            
            <div className="properties-grid">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))
                ) : (
                  <p>No properties match your filters.</p>
                )}
            </div>
        </main>
      </div>
    </div>
  );
};

export default PropertiesPage;

