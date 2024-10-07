import React from "react";

import { Divider } from "@mui/material";

import AffiliationSelection from "./AffiliationSelection";
import AssetTree from "./AssetTree";
import AssetDescription from "./AssetDescription";

import MilitaryEntitiesDataService from "../../data/entities-data";

const assetBrowserStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '24px',
    width: '18vw',
    height: '100vh',
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderRadius: '8px 0 0 8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    zIndex: 5000,
    alignItems: 'center',
    overflow: 'hidden',
    boxSizing: 'border-box',
};

const assetBrowserHeaderStyle: React.CSSProperties =  {
    marginBottom: '16px', 
    textAlign: 'center',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
    paddingBottom: '8px',
}

const dividerStyle: React.CSSProperties = {
    margin: '16px 0', 
    backgroundColor: '#555', 
    height: '2px'
}

const AssetBrowser: React.FC = () => {
    const [lastSelectedAssetID, setLastSelectedItemID] = React.useState<string | null>(null);
    return <div style={assetBrowserStyle}>
        <h2 style={assetBrowserHeaderStyle}>Assets</h2>
        <AffiliationSelection />
        <Divider flexItem={true} sx={dividerStyle}/>
        <AssetTree setLastSelectedItem={setLastSelectedItemID}/>
        { lastSelectedAssetID && <AssetDescription item={MilitaryEntitiesDataService.getInstance().getEntity(lastSelectedAssetID)}/> }
    </div>   
}

export default AssetBrowser;