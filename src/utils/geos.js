import _ from 'lodash';
import { bbox, feature, merge } from 'topojson-client';
import { scaleQuantile } from 'd3-scale';
import { wordsAnd } from './strings';

export const getBounds = (geo) => {
    const b = bbox(geo);
    return [[b[1], b[0]], [b[3], b[2]]];
};

export const makeGeoLayers = (shp, cog) => {
    const towns = feature(shp, shp.objects.towns_topo);
    // const meshed = mesh(shp, shp.objects.towns_topo, (a, b) => a.properties.cog_fips !== b.properties.cog_fips);
    const stateMerge = merge(shp, shp.objects.towns_topo.geometries);
    const cogMerge = merge(shp, shp.objects.towns_topo.geometries.filter((d) => d.properties.cog_fips === cog));
    return { towns, state: stateMerge, cog: cogMerge };
};

export const getGeoLevel = (location, cog) => {
    if (cog) {
        return 'town';
    } else if (location === 'Connecticut') {
        return 'state';
    } else {
        return 'cog';
    }
};

export const getCogFips = (location, cogs) => (
    _.invert(cogs)[location]
);

export const getCogTowns = (cog, xwalk) => {
    const towns = _.chain(xwalk)
        .pickBy((d) => d === cog)
        .keys()
        .sort()
        .value();
    return wordsAnd(towns);
}

const quantBreaks = (data) => {
    // decide how many breaks to use depending on number of unique values
    const unique = _.uniq(data);
    const n = unique.length || 5;
    return n < 5 ? 3 : 5;
};

export const makeChoroScale = (data, scheme) => {
    const vals = _.values(data);
    const nBrks = quantBreaks(vals);
    const palette = scheme[nBrks];
    return scaleQuantile()
        .domain([_.min(vals), _.max(vals)])
        .range(palette)
        .unknown('#ddd');
};

export const makeTooltip = (data, name, formatter) => (
    `${name}: <strong>${formatter(data[name])}</strong>`
);