import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import FooterRow from '../FooterRow/FooterRow';

const Sources = ({ sources }) => (
    <FooterRow heading='Source: DataHaven analysis (2024) of:'>
        <ul style={{ margin: 0 }}>
            {sources.map((source, i) => (
                <Source key={i} {...source} />
            ))}
        </ul>
    </FooterRow>
);

Sources.propTypes = {
    sources: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Source = ({ project, source, url, year }) => (
    <li>
        <span style={{
            fontWeight: '600',
        }}>{`${source} `}</span>
        {`(${year}). `}
        <Link href={url}>{`${project}`}</Link>
    </li>
);

Source.propTypes = {
    project: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Sources;