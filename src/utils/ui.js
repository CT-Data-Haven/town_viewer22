import _ from 'lodash';
import { titleCase } from './strings';

export const prepLocations = (locs) => (
    locs.map((loc) => ({ label: loc, value: loc }))
);

// cities come in in snakecase---convert to title for label
export const prepCities = (cities) => {
    const labels = cities.map((city) => titleCase(city));
    const options = cities.map((city) => ({ label: titleCase(city), value: city }));
    const lookup = _.zipObject(cities, labels);
    return [options, lookup];
};

// topics come in json with snakecase key, display string, list of indicators
// return array of objects for selectItems
export const prepTopics = (json) => {
    const topics = _.keys(json);
    const labels = topics.map((topic) => json[topic].display);
    const options = topics.map((topic) => ({ label: json[topic].display, value: topic }));
    const lookup = _.zipObject(topics, labels);
    return [options, lookup];
};


// similar to topics. indicators in 'indicators' slot
// pass e.g. indicators['age']
// return array of objects for selectItems
export const prepIndicators = (json) => {
    const indicators = json.indicators; // array of objects
    const mappable = indicators.filter((d) => d.type === 'm');
    const labels = _.map(mappable, 'display');
    const values = _.map(mappable, 'indicator');
    const options = mappable.map((indicator) => ({ label: indicator.display, value: indicator.indicator }));
    const lookup = _.zipObject(values, labels);
    return [options, lookup];
};

export const getNhoods = (data) => (
    _.chain(data)
        .map('location')
        .uniq()
        .value()
);

export const findLocation = (data, loc) => (
    _.findIndex(data, { location: loc }) + 1
);