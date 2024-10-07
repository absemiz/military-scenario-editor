import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { IAssetTreeItem } from "../../types/asset-browser";

interface AssetDescriptionProperties {
    item: IAssetTreeItem;
}

const assetDescriptionStyle: React.CSSProperties = {
    width: '100%',
    height: '360px',
    overflowY: 'auto',
    backgroundColor: '#1E1E1E',
    marginTop: '8px',
    padding: '0',
    color: 'white',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
};

const AssetDescription: React.FC<AssetDescriptionProperties> = (properties: AssetDescriptionProperties) => {
    return (
        <Card sx={assetDescriptionStyle}>
            <CardHeader
                titleTypographyProps={{ variant: 'h6', color: 'white' }}
                subheaderTypographyProps={{ variant: 'body2', color: 'gray' }}
                title={properties.item.label}
                subheader={properties.item.subTypeName && properties.item.subTypeName()}
                sx={{ paddingBottom: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
            />
            <CardContent sx={{ padding: '16px' }}>
                <Typography variant="body2" style={{ color: 'lightgray', lineHeight: '1.6' }}>
                    {properties.item.description || "No description available."}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default AssetDescription;