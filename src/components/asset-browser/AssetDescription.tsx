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
                title={properties.item.getAssetTreeLabel()}
                subheader={properties.item.getSubTypeName && properties.item.getSubTypeName()}
                sx={{ paddingBottom: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
            />
            <CardContent sx={{ padding: '16px' }}>
                <Typography variant="body2" style={{ color: 'lightgray', lineHeight: '1.6' }}>
                    { properties.item.getDescription ? properties.item.getDescription() : "Description unavailable." }
                </Typography>
            </CardContent>
        </Card>
    );
}

export default AssetDescription;