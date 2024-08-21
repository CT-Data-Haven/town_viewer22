import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Panel from '../Layout/Panel/Panel';
import Chart from './Chart/Chart';
import Choropleth from "./Choropleth/Choropleth";

const VizPanel = ({
    title,
    indicator,
    location,
    level,
    chartData,
    mapData,
    layers,
    bbox,
    views,
    view,
    viewChangeHandler,
    locationChangeHandler,
    formatter,
    formatLocs,
    barColors,
    colorscale,
    chartHeight,
    locIdx,
    makeTooltip,
}) => {
    const panelProps = {
        minHeight: 200,
        p: '10px',
    };
    return (
        <Panel heading={title}>
            <TabContext value={view}>
                <TabList
                    onChange={viewChangeHandler}
                    aria-label="Tabs to change visualization type"
                    // textColor="secondary"
                    selectionFollowsFocus
                >
                    {views.map((v) => (
                        <Tab
                            key={`view-tab-${v.value}`}
                            label={v.value}
                            value={v.value}
                            icon={v.icon}
                            iconPosition='start'
                            sx={{
                                fontWeight: 'bold',
                                '&.MuiTab-labelIcon': {
                                    minHeight: 'unset',
                                }
                            }}
                        />
                    ))}
                </TabList>
                <TabPanel value='map' sx={panelProps}>
                    <Choropleth
                        data={mapData}
                        location={location}
                        level={level}
                        layers={layers}
                        colorscale={colorscale}
                        indicator={indicator}
                        formatter={formatter}
                        bbox={bbox}
                        makeTooltip={makeTooltip}
                        clickHandler={locationChangeHandler}
                    />
                </TabPanel>
                <TabPanel value='chart' sx={panelProps}>
                    <Chart
                        data={chartData}
                        locIdx={locIdx}
                        level={level}
                        indicator={indicator}
                        formatter={formatter}
                        formatLocs={formatLocs}
                        colors={barColors}
                        height={chartHeight}
                        clickHandler={locationChangeHandler}
                    />
                </TabPanel>
            </TabContext>
        </Panel>
    );
};

VizPanel.propTypes = {
    title: PropTypes.string.isRequired,
    indicator: PropTypes.string.isRequired,
    location: PropTypes.string,
    level: PropTypes.string,
    chartData: PropTypes.array.isRequired,
    mapData: PropTypes.object.isRequired,
    layers: PropTypes.object.isRequired,
    bbox: PropTypes.array.isRequired,
    views: PropTypes.array.isRequired,
    view: PropTypes.string.isRequired,
    viewChangeHandler: PropTypes.func.isRequired,
    locationChangeHandler: PropTypes.func.isRequired,
    formatter: PropTypes.func.isRequired,
    formatLocs: PropTypes.func.isRequired,
    barColors: PropTypes.object.isRequired,
    colorscale: PropTypes.func.isRequired,
    chartHeight: PropTypes.number.isRequired,
    locIdx: PropTypes.number.isRequired,
    makeTooltip: PropTypes.func.isRequired,
};

export default VizPanel;
