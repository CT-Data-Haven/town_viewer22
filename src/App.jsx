import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    getMappable,
    getLocations,
    prepNotes,
    prepTopics,
    prepLocations,
    prepIndicators,
    prepChart,
    getChartHeight,
    prepMap,
    prepProfile,
    prepTable,
    makeGeoLayers,
    getGeoLevel,
    getCogFips,
    getCogTowns,
    getBounds,
    getFormatter,
    abbreviate,
    makeChoroScale,
    makeTooltip,
    findLocation,
} from './utils';

// library components
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import BarChartIcon from '@mui/icons-material/BarChart';

// styling
import 'leaflet/dist/leaflet';
import './App.scss'

// data
import fullData from './data/town_wide_2022.json';
import fullNotes from './data/notes.json';
import meta from './data/indicators.json';
import geoMeta from './data/town_cog_xwalk.json';

// bespoke components
import Row from './components/Layout/Row/Row';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Profile from './components/Profile/Profile';
import DataTable from './components/DataTable/DataTable';
import VizPanel from './components/VizPanel/VizPanel';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';

import shp from './data/shapes/towns_topo.json';

function App({ scheme }) {
    const theme = useTheme();

    const topics = Object.keys(meta);
    const views = [
        { value: 'map', icon: <MapIcon fontSize='small' /> },
        { value: 'chart', icon: <BarChartIcon fontSize='small' /> }
    ];

    // state
    const defaultPage = { pageSize: 10, page: 0 };
    const [topic, setTopic] = useState(topics[0]);
    const [indicator, setIndicator] = useState(getMappable(meta[topic])[0]);
    const [view, setView] = useState(views[0].value);
    const [page, setPage] = useState(defaultPage);

    const data = fullData[topic];
    const notes = prepNotes(fullNotes);
    // possible locations depend on topic
    const locations = getLocations(data);
    const [location, setLocation] = useState(locations[0]);

    const [topicOptions, topicLookup] = prepTopics(meta);
    const locationOptions = prepLocations(locations);

    const [indicatorOptions, indicatorLookup] = prepIndicators(meta[topic]);
    let indicators = getMappable(meta[topic]);

    // event handling
    const handleLocation = (value) => {
        setLocation(value);
    };

    const handleTopic = (value) => {
        setTopic(value);
        indicators = getMappable(meta[value]);
        setIndicator(indicators[0]);
        setPage(defaultPage);
    };

    // depends on topic
    const handleIndicator = (value) => {
        setIndicator(value);
    };

    const handleView = (e, value) => {
        setView(value);
    };

    const controlProps = [
        { key: 'location', items: locationOptions, label: 'Select a location', selected: location, changeHandler: handleLocation },
        { key: 'topic', items: topicOptions, label: 'Select a topic', selected: topic, changeHandler: handleTopic },
        { key: 'indicator', items: indicatorOptions, label: 'Select an indicator', selected: indicator, changeHandler: handleIndicator }
    ];

    // current data
    const cog = geoMeta.xwalk[location];
    const level = getGeoLevel(location, cog);
    const mapData = prepMap(data, indicator);
    // const chartData = prepChart(data, indicator, location, geoMeta.cogs[cog], level);
    const chartData = prepChart(data, indicator, location, cog, geoMeta, level);
    const profileData = prepProfile(data, location, meta[topic].indicators);
    const tableData = prepTable(data, meta[topic].indicators, geoMeta);
    const locIdx = findLocation(chartData, location);
    const cogRef = level === 'cog' ? getCogFips(location, geoMeta.cogs) : cog;

    const barColors = {
        base: theme.palette.grey[500],
        hilite: theme.palette.primary.main,
    };

    return (
        <div className='App'>
            <Container fixed>
                <Header heading='Connecticut Town Data Viewer' />

                <ControlPanel controlGrps={controlProps} ncol={3} />

                <Row xs={12} md={[7, 5]}>
                    <VizPanel
                        title={indicatorLookup[indicator]}
                        indicator={indicator}
                        chartData={chartData}
                        mapData={mapData}
                        location={location}
                        level={level}
                        layers={makeGeoLayers(shp, cogRef)}
                        bbox={getBounds(shp)}
                        views={views}
                        view={view}
                        viewChangeHandler={handleView}
                        locationChangeHandler={handleLocation}
                        formatter={getFormatter(meta[topic].indicators, indicator)}
                        formatLocs={abbreviate(20)}
                        barColors={barColors}
                        colorscale={makeChoroScale(mapData, scheme)}
                        chartHeight={getChartHeight(chartData)}
                        locIdx={locIdx}
                        makeTooltip={makeTooltip}
                    />

                    <Profile
                        topic={topicLookup[topic]}
                        location={location}
                        data={profileData}
                    />
                </Row>

                <DataTable
                    topic={topicLookup[topic]}
                    location={location}
                    data={tableData}
                    paginationModel={page}
                    pageChangeHandler={setPage}
                    locationChangeHandler={handleLocation}
                />

                <Footer
                    dwBase={'https://data.world/ctdatahaven/datahaven-profiles-2022'}
                    ghBase={'https://github.com/CT-Data-Haven/town_profile_data22/blob/main/to_distro'}
                    csvFn={'2022_town_acs_health_cws_distro.csv'}
                    towns={getCogTowns(cogRef, geoMeta.xwalk)}
                    cog={geoMeta.cogs[cogRef]}
                    {...notes}
                />
            </Container>
        </div>
    );
}

App.propTypes = {
    scheme: PropTypes.array,
};

export default App;