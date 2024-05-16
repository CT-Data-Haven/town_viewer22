import _ from 'lodash';
import { scaleQuantize } from 'd3-scale';
import { getGridNumericOperators, getGridStringOperators, getGridSingleSelectOperators } from '@mui/x-data-grid';
import { makeFormatter, } from './strings';
import { getCogFips } from './geos';

// filter for indicators with type m
export const getMappable = (json) => (
    _.chain(json.indicators)
        .filter({ type: 'm' })
        .map('indicator')
        .value()
);

export const getLocations = (data) => (
    _.chain(data)
        .map('location')
        .uniq()
        .value()
);


export const prepProfile = (data, location, meta) => {
    const locData = _.chain(data)
        .find({ location: location })
        .omit(['level', 'location'])
        .value();
    return meta.map((indicator, i) => {
        const value = locData[indicator.indicator];
        const fmt = makeFormatter(indicator.format);
        const valType = indicator.format === ',' ? 'count' : 'percent';
        return {
            id: i,
            indicator: indicator.display,
            value: fmt(value),
            type: valType,
        };
    });
};

const capIf = (x, caps) => (
    _.includes(caps, x) ? _.upperCase(x) : _.capitalize(x)
);

const getColOpts = (type) => {
    let allOpts, keepOpts;
    if (type === 'number') {
        allOpts = getGridNumericOperators();
        keepOpts = ['>=', '<=', '='];
    } else if (type === 'string') {
        allOpts = getGridStringOperators();
        keepOpts = ['contains', 'isAnyOf'];
    } else {
        return getGridSingleSelectOperators();
    }
    return _.filter(allOpts, (opt) => _.includes(keepOpts, opt.value));
};

const getCustomCols = (field, type, cogs) => {
    // lookup by field
    const stdOpts = {
        level: {
            valueOptions: ['State', 'COG', 'Town'],
        },
        location: {
            minWidth: 180,
        },
        cog: {
            valueOptions: cogs,
        }
    };
    const isFilterable = type !== 'number';
    const typeOpts = getColOpts(type);
    const opts = {
        filterOperators: typeOpts,
        filterable: isFilterable,
        ...stdOpts[field]
    };
    return opts || {};
};

const makeTableCols = (keys, meta, cogs) => (
    _.chain(keys)
        // .without('level')
        .map((key) => {
            const m = _.find(meta, { indicator: key }) || { indicator: key, display: capIf(key, ['cog']) };
            // isNumeric is true if m.format is defined
            const isNumeric = m.format ? true : false;
            let type;
            // if (m.indicator === 'level') {
            if (_.includes(['level', 'cog'], m.indicator)) {
                type = 'singleSelect';
            } else if (isNumeric) {
                type = 'number';
            } else {
                type = 'string';
            }

            return {
                field: m.indicator,
                key: m.indicator,
                headerName: m.display,
                valueFormatter: isNumeric ? makeFormatter(m.format) : null,
                type: type,
                flex: 1,
                renderHeader: (params) => {
                    return (params.headerName)
                },
                ...getCustomCols(m.indicator, type, cogs),
            };
        })
        .value()
);

const makeTableRows = (data, geo) => (
    _.chain(data)
        // .map((d) => _.omit(d, 'level'))
        .map((d) => ({
            ...d,
            id: d.location,
            level: capIf(d.level, ['cog']),
            cog: d.level === 'cog' ? d.location : geo.cogs[geo.xwalk[d.location]],
        }))
        .value()
);

export const prepTable = (data, meta, geo) => {
    const keys = Object.keys(data[0]);
    keys.splice(2, 0, 'cog');
    const cogNames = Object.values(geo.cogs).sort();
    const columns = makeTableCols(keys, meta, cogNames);
    const rows = makeTableRows(data, geo);
    return { columns, rows };
};

const getCogTowns = (cog, xwalk) => (
    _.chain(xwalk)
        .pickBy((d) => d === cog)
        .keys()
        .sort()
        .value()
);

export const getChartHeight = (data) => {
    const n = data.length;
    const scale = scaleQuantize([5, 40], [400, 500, 600]);
    return scale(n);
}

// order by indicator column descending
export const prepChart = (data, indicator, location, cogFips, geo) => {
    const { cogs, xwalk } = geo;
    const cogName = cogs[cogFips];
    // if town, use state, cog, town
    // otherwise use state + cogs
    const level = _.chain(data)
        .find({ location: location })
        .get('level')
        .value();

    const values = _.chain(data)
        .filter({ level: 'town' })
        .map(indicator)
        .value();

    let chart;
    if (level === 'town') {
        const locs = ['Connecticut', location, cogName];
        const inner = _.filter(data, (d) => _.includes(locs, d.location));
        chart = [
            { location: 'Highest', [indicator]: _.max(values), level: 'endpoint' },
            ...inner,
            { location: 'Lowest', [indicator]: _.min(values), level: 'endpoint' },
        ];
    } else if (level === 'cog') {
        const fips = getCogFips(location, cogs);
        const towns = getCogTowns(fips, xwalk);
        towns.push('Connecticut', location);
        chart = _.filter(data, (d) => _.includes(towns, d.location));
    } else {
        chart = _.filter(data, (d) => d.location === 'Connecticut' || d.level === 'cog');
    }
    return _.chain(chart)
        .sortBy(indicator)
        .reverse()
        .value();
};

export const prepMap = (data, indicator) => (
    _.chain(data)
        .filter((d) => _.endsWith(d.level, 'town'))
        .keyBy('location')
        .mapValues(indicator)
        .value()
);

export const prepNotes = (notes) => {
    const dwSlug = notes.dwurls.towns;
    // const geography = notes.geography[city];
    const sources = notes.sources;
    return {
        dwSlug,
        // geography, 
        sources
    };
};

