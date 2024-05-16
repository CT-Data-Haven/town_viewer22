import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { LayerGroup } from 'react-leaflet/LayerGroup';
import Typography from '@mui/material/Typography';
import Legend from '../Legend/Legend';

// following Nathan's lead of using inner & outer components to avoid using state
// since react-leaflet doesn't update geography on prop change
const baseStyle = {
    weight: 0.3,
    color: '#eee',
    fillOpacity: 0.7,
    opacity: 1,
};

const hiliteStyle = {
    ...baseStyle,
    weight: 2,
    // color: 'black',
    fillOpacity: 1,
    zIndex: 999,
};

const stateStyle = {
    ...baseStyle,
    color: '#111',
    fillColor: 'transparent',
    pointerEvents: 'none',
    weight: 1.3,
    fillOpacity: 0,
};

const cogStyle = {
    ...stateStyle,
    zIndex: 899,
};

const getCogStyle = (level) => ({
    ...cogStyle,
    weight: level === 'cog' ? hiliteStyle.weight : cogStyle.weight,
})

const getStyle = (feature, location, data, colorscale) => {
    const name = feature.properties.name;
    const fillColor = data[name] ? colorscale(data[name]) : '#ccc';
    const weight = location === name ? hiliteStyle.weight : baseStyle.weight;
    const color = location === name ? stateStyle.color : baseStyle.color;
    const zIndex = location === name ? 999 : 1;

    return {
        ...baseStyle,
        fillColor,
        weight,
        color,
        zIndex,
        opacity: 1,
    };
};


const featureHilite = ({ sourceTarget }) => {
    sourceTarget.setStyle(hiliteStyle);
};

const featureUnhilite = ({ sourceTarget }, location) => {
    if (sourceTarget.feature.properties.name !== location) {
        sourceTarget.setStyle(baseStyle);
    }
};

const ChoroInner = ({
    layers,
    data,
    location,
    level,
    colorscale,
    makeTooltip,
    clickHandler,
    formatter,
    indicator
}) => {
    const handleFeature = (feature, layer) => {
        layer.bindTooltip(() => {
            return makeTooltip(data, feature.properties.name, formatter);
        }, {
            direction: 'top',
            offset: [0, -20],
            className: `custom-tip MuiPaper-elevation2`,
        });
    };

    return (
        <>
            <TileLayer
                key={`tile-layer`}
                opacity={0.2}
                attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                url="https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.png"
            />
            <LayerGroup key={`layers-${indicator}`}>
                <GeoJSON
                    key={`town-layer-${indicator}`}
                    data={layers.towns}
                    style={(feature) => getStyle(feature, location, data, colorscale)}
                    onEachFeature={handleFeature}
                    eventHandlers={{
                        click: (e) => clickHandler(e.sourceTarget.feature.properties.name),
                        mouseover: (e) => featureHilite(e),
                        mouseout: (e) => featureUnhilite(e, location),
                    }}
                />

                <GeoJSON
                    key={`cog-layer-${location}`}
                    data={layers.cog}
                    style={getCogStyle(level)}
                    interactive={false}
                />

                <GeoJSON
                    key={'state-layer'}
                    data={layers.state}
                    style={stateStyle}
                    interactive={false}
                />

            </LayerGroup>
        </>
    );
};

ChoroInner.propTypes = {
    layers: PropTypes.shape({
        towns: PropTypes.object,
        cog: PropTypes.object,
        state: PropTypes.object,
    }).isRequired,
    data: PropTypes.object,
    location: PropTypes.string,
    level: PropTypes.string,
    colorscale: PropTypes.func,
    makeTooltip: PropTypes.func,
    clickHandler: PropTypes.func,
    formatter: PropTypes.func,
    indicator: PropTypes.string,
};

const Choropleth = ({
    data,
    location,
    level,
    layers,
    colorscale,
    indicator,
    formatter,
    bbox,
    makeTooltip,
    clickHandler,
}) => (
    <Box minHeight={400}>
        {layers ? (
            <MapContainer
                id={`map-div-${indicator}`}
                key={`map-key-${indicator}`}
                bounds={bbox}
                scrollWheelZoom={false}
                style={{ height: '400px', }}
                minZoom={8}
                maxZoom={13}
            >
                <ChoroInner
                    layers={layers}
                    location={location}
                    data={data}
                    colorscale={colorscale}
                    makeTooltip={makeTooltip}
                    clickHandler={clickHandler}
                    formatter={formatter}
                    indicator={indicator}
                />
                <Legend colorscale={colorscale} formatter={formatter} />
            </MapContainer>
        ) : <div />}
        <Typography
            variant='caption'
            sx={{
                height: '1rem',
            }}
            as='div'>
            {level === 'town' ? 'With surrounding COG boundary shown' : ''}
        </Typography>
    </Box>
);

Choropleth.propTypes = {
    data: PropTypes.object,
    location: PropTypes.string,
    level: PropTypes.string,
    layers: PropTypes.object,
    colorscale: PropTypes.func,
    indicator: PropTypes.string,
    formatter: PropTypes.func,
    bbox: PropTypes.array,
    makeTooltip: PropTypes.func,
    clickHandler: PropTypes.func,
};

export default Choropleth;
