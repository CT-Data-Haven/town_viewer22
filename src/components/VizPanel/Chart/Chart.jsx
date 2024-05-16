import PropTypes from 'prop-types';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';
import Tooltip from '../Tooltip/Tooltip';

// coloring happens across series array but that's a weird way to shape this data
// instead get the index of nhood within the series, then use css to color

const Chart = ({
    data,
    level,
    indicator,
    formatter,
    colors,
    locIdx,
    clickHandler,
    height,
    formatLocs,
}) => {
    const onClick = (_e, bar) => {
        if (bar.axisValue === 'Highest' || bar.axisValue === 'Lowest') return;
        clickHandler(bar.axisValue);
    };

    const hiliteKey = `& .MuiBarElement-root:nth-of-type(${locIdx})`;

    return (
        <>
            <BarChart
                dataset={data}
                series={[{
                    dataKey: indicator,
                    valueFormatter: formatter,
                }]}
                xAxis={[{
                    id: 'value',
                    valueFormatter: formatter,
                    tickNumber: 5,
                }]}
                yAxis={[{
                    id: 'location',
                    dataKey: 'location',
                    scaleType: 'band',
                    valueFormatter: formatLocs,
                }]}
                leftAxis={{
                    axisId: 'location',
                    tickFontSize: 14,
                    tickLabelStyle: { fontFamily: 'Barlow Semi Condensed' },
                    disableTicks: true,
                }}
                layout="horizontal"
                sx={{
                    width: '100%',
                    '& .MuiBarElement-root:hover': {
                        stroke: 'black',
                        strokeWidth: 1,
                    },
                    '& .MuiBarElement-root': {
                        fill: colors.base,
                        transitionDuration: '0.1s',
                    },
                    [hiliteKey]: {
                        fill: colors.hilite
                    },

                }}
                height={height}
                margin={{ top: 10, right: 20, bottom: 20, left: 150 }}
                grid={{ vertical: true }}
                tooltip={{ trigger: 'axis' }}
                onAxisClick={onClick}
                slots={{
                    axisContent: Tooltip,
                }}
            />
            <Typography
                variant='caption'
                sx={{
                    height: '1rem',
                }}
                as='div'>
                {level === 'town' ? 'With lowest and highest town values' : ''}
            </Typography>
        </>
    );
};

Chart.propTypes = {
    data: PropTypes.array.isRequired,
    level: PropTypes.string.isRequired,
    indicator: PropTypes.string.isRequired,
    formatter: PropTypes.func.isRequired,
    colors: PropTypes.object.isRequired,
    locIdx: PropTypes.number,
    clickHandler: PropTypes.func,
    height: PropTypes.number.isRequired,
    formatLocs: PropTypes.func,
};

export default Chart;
